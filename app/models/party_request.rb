class PartyRequest < ApplicationRecord
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true
    validates :date, presence: true
    validates :name, presence: true
    validates :phone_number, presence: true
    validate :valid_number_of_participants
    validates :package, presence:true
    enum :package, [ :local_train, :express_train, :a_train, :adult_party ]
    validate :is_future?
    validate :is_valid_time?
    validate :is_open?
    def broadcast
        ActionCable.server.broadcast("party_requests", self)
    end
    def is_valid_time?
        errors.add(:date, "must be between 10 AM and 6 PM") unless self.date.hour >= 10 && self.date.hour <= 18
    end
    def is_future?
        errors.add(:date, "must be in the future") unless self.date.future?
    end
    def confirm
        payment_link = Stripe::PaymentLink.create({
            line_items: [{price: "price_1LlIfsCvxdyaKhHoL71UZoEk", quantity: 3}],
            after_completion: {type: 'redirect', redirect: {url: 'https://example.com'}},
        })
        PartyRequestedMailer.with(party_request: self).admin_party_confirmation.deliver_later
        PartyRequestedMailer.with(party_request: self, payment_url: payment_link.url).user_party_confirmation.deliver_later
        self.update(pending: false)

    end
    def is_open?
        # This method checks if there is any party within 2 hours of this party
        dates = PartyRequest.where('pending=false').pluck(:date)
        invalid_date = dates.any? { |date| ((date - self.date) / 1.minutes).abs <= 180}

        if invalid_date
            errors.add(:date, "is not available. Another party is already booked at that time")
        end
    end
    def valid_number_of_participants
        case self.package
        when :local_train || :express_train || :a_train
            errors.add(:number_of_participants, "must be at least 15") unless self.number_of_participants >= 15
        when :adult_party
            errors.add(:number_of_participants, "must be at least 10") unless self.number_of_participants >= 10
        end
    end
    

end

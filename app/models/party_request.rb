class PartyRequest < ApplicationRecord
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, allow_nil: true
    validates :date, presence: true
    validates :number_of_participants, presence: true
    validate :valid_number_of_participants
    validates :package, presence:true
    enum :package, [ :local_train, :express_train, :a_train, :adult_party ]
    enum :status,  {:pending => 0, :pending_payment => 1, :confirmed => 2, :rejected => 3}, default: 0
    validate :is_future?
    validate :is_valid_time?
    validate :is_open?

    belongs_to :user,optional: true
    
    def broadcast
        ActionCable.server.broadcast("party_requests", self.as_json(include: :user))
    end
    def is_valid_time?
        errors.add(:date, "must be between 10 AM and 6 PM") unless self.date.hour >= 10 && self.date.hour <= 18
    end
    def is_future?
        errors.add(:date, "must be in the future") unless self.date.future?
    end
    def confirm
        # generate payment link and email to user
        
        self.update(status: :confirmed)

    end
    def is_open?
        # TODO: Check party package. if its local then 1.5 hours... add this logic
        # This method checks if there is any party within 2 hours of this party
        dates = PartyRequest.where(status: :confirmed).pluck(:date)
        invalid_date = dates.any? { |date| ((date - self.date) / 1.minutes).abs <= 120}

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

    def get_name
        self&.name || self.user.first_name
    end
    def get_email
        self&.email || self.user.email
    end
    def get_phone_number
        self&.phone_number || self.user.phone_number
    end
    def package_name
        package.split("_").map {|word| word.capitalize}.join(" ")
    end
    

end

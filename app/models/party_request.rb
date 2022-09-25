class PartyRequest < ApplicationRecord
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true
    validates :date, presence: true
    validates :name, presence: true
    validates :phone_number, presence: true
    validate :is_future?
    def broadcast
        ActionCable.server.broadcast("party_requests", self)
    end
    def is_future?
        errors.add(:date, "must be in the future") unless self.date.future?
    end
end

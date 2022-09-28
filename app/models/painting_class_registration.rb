class PaintingClassRegistration < ApplicationRecord
    belongs_to :user, optional: true # in case they are not logged in
    belongs_to :painting_class

    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true
    validates :phone_number, presence: true
    validate :class_full?
    def broadcast
        ActionCable.server.broadcast("class_registrations", self)
    end
    def class_full?
        errors.add(:painting_class, "is full") if self.painting_class.full?
    end
end

class PaintingClassRegistration < ApplicationRecord
    belongs_to :user, optional: true # in case they are not logged in
    belongs_to :painting_class

    # figure out how to make either user_id present or name,phone,email...
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, allow_nil: true
    validate :class_full?
    def broadcast
        ActionCable.server.broadcast("class_registrations", self)
    end
    def class_full?
        errors.add(:painting_class, "is full") if self.painting_class.full?
    end
    def get_name
        self.name || self.user.first_name
    end
    def get_email
        self.email || self.user.email
    end
    def get_phone_number
        self.phone_number || self.user.phone_number
    end
end

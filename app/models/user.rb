class User < ApplicationRecord
    has_secure_password
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true
    validates :username,presence: true, uniqueness: true
    validates :password_digest, length: {minimum: 6}

    has_many :orders
    # has_many :painting_class_registrations
    # has_many :painting_classes, through: :painting_class_registrations
end

class PartyRequest < ApplicationRecord
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true
end

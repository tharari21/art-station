class PaintingClassRegistration < ApplicationRecord
    belongs_to :user, optional: true # in case they are not logged in
    belongs_to :painting_class

    validates :email, presence: true
    validates :phone_number, presence: true
end

class PaintingClass < ApplicationRecord
    belongs_to :painting
    has_many :painting_class_registrations
    has_many :users, through: :painting_class_registrations
end
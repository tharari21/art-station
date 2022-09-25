class PaintingClass < ApplicationRecord
    belongs_to :painting
    has_many :painting_class_registrations
    has_many :users, through: :painting_class_registrations

    def seats_available
        self.max_capacity - self.painting_class_registrations.sum(:number_of_students)
    end
end
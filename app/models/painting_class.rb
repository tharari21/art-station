class PaintingClass < ApplicationRecord
    belongs_to :painting
    has_many :painting_class_registrations # dependent: :destroy # When a painting class is deleted
    has_many :users, through: :painting_class_registrations
    validate :is_future?
    validate :is_valid_time?

    def seats_available
        self.max_capacity - number_of_students
    end
    def number_of_students
        self.painting_class_registrations.sum(:number_of_students)
    end
    def full?
        seats_available == 0
    end
    # TODO: Make these a module
    def is_valid_time?
        errors.add(:date, "must be between 10 AM and 6 PM") unless self.date.hour >= 10 && self.date.hour <= 18
    end
    def is_future?
        errors.add(:date, "must be in the future") unless self.date.future?
    end
    def self.upcoming_paintings
        painting_ids = self.order(:date).uniq { |class_| class_.painting_id }.slice(0,2).pluck(:painting_id)
        Painting.where('id in (?)', painting_ids)
    end
    
end
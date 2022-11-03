class PaintingClass < ApplicationRecord
    belongs_to :painting
    has_many :painting_class_registrations, dependent: :destroy # When a painting class is deleted
    has_many :users, through: :painting_class_registrations
    validate :is_future?
    validate :is_valid_time?
    validate :is_open?, on: :create

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
    def is_open?
        
        # This method checks if there is any party within 2 hours of this class
        dates = PaintingClass.pluck(:date)
        invalid_date = dates.any? { |date| ((date - self.date) / 1.minutes).abs <= 119}
        if invalid_date
            errors.add(:date, "is not available. Another class is already booked at that time")
        end
    end
    def self.upcoming_paintings
        painting_ids = self.order(:date).uniq { |class_| class_.painting_id }.slice(0,2).pluck(:painting_id)
        Painting.where('id in (?)', painting_ids)
    end
    
end

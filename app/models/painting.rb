class Painting < ApplicationRecord
    has_one_attached :image
    has_many :painting_classes
    
    validates :name, uniqueness: true
    validate :acceptable_image

    def acceptable_image
        return unless image.attached?
        # Verify that image is not too big
        unless image.byte_size <= 1.megabyte
            errors.add(:image, "is too big")
        end
        acceptable_types = ["image/jpeg", "image/png"]
        unless acceptable_types.include?(image.content_type)
            errors.add(:image, "must be a JPEG or PNG")
        end

    end
end
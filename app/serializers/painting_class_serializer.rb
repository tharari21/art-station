class PaintingClassSerializer < ActiveModel::Serializer
  belongs_to :painting, serializer: PaintingSerializer
  has_many :painting_class_registrations, serializer: PaintingClassRegistrationSerializer
  attributes :id, :date, :price, :painting, :max_capacity, :seats_available, :painting_class_registrations
end

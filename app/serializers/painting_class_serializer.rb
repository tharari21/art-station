class PaintingClassSerializer < ActiveModel::Serializer
  belongs_to :painting, serializer: PaintingSerializer
  attributes :id, :date, :price, :painting, :max_capacity, :seats_available, :painting_class_registrations
end

class PaintingClassSerializer < ActiveModel::Serializer
  attributes :id, :date, :price, :painting, :max_capacity
  belongs_to :painting, serializer: PaintingSerializer
end

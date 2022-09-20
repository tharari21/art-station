class PaintingClassSerializer < ActiveModel::Serializer
  attributes :id, :date, :price, :painting
  belongs_to :painting, serializer: PaintingSerializer
end

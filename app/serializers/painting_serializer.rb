
include Rails.application.routes.url_helpers
class PaintingSerializer < ActiveModel::Serializer
  attributes :id, :name, :image
  # has_one :image

  def image
    return url_for(object.image) if object.image.attached?
  end

  
end

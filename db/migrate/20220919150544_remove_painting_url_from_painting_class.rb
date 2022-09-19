class RemovePaintingUrlFromPaintingClass < ActiveRecord::Migration[7.0]
  def change
    remove_column :painting_classes, :painting_url
  end
end

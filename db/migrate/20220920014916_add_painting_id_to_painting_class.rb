class AddPaintingIdToPaintingClass < ActiveRecord::Migration[7.0]
  def change
    add_column :painting_classes, :painting_id, :integer
  end
end

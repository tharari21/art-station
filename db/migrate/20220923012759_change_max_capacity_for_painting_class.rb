class ChangeMaxCapacityForPaintingClass < ActiveRecord::Migration[7.0]
  def change
    change_column :painting_classes, :max_capacity, :integer, :default => 20
  end
end

class CreatePaintingClasses < ActiveRecord::Migration[7.0]
  def change
    create_table :painting_classes do |t|
      t.datetime :date
      t.string :painting_url
      t.integer :max_capacity
      t.float :price

      t.timestamps
    end
  end
end

class CreatePaintingClassRegistrations < ActiveRecord::Migration[7.0]
  def change
    create_table :painting_class_registrations do |t|
      t.integer :user_id
      t.integer :painting_class_id
      t.string :name

      t.timestamps
    end
  end
end

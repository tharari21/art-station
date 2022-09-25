class RemoveUserIdFromPaintingClassRegistrations < ActiveRecord::Migration[7.0]
  def change
    remove_column :painting_class_registrations, :user_id
  end
end

class AddUserIdToPaintingClassRegistration < ActiveRecord::Migration[7.0]
  def change
    add_column :painting_class_registrations, :user_id, :integer
  end
end

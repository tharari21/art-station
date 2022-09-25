class RemoveAgeFromPartyClassRegistration < ActiveRecord::Migration[7.0]
  def change
    remove_column :painting_class_registrations, :age
  end
end

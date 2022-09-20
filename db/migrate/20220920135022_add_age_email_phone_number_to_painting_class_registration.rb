class AddAgeEmailPhoneNumberToPaintingClassRegistration < ActiveRecord::Migration[7.0]
  def change
    add_column :painting_class_registrations, :age, :integer
    add_column :painting_class_registrations, :email, :string
    add_column :painting_class_registrations, :phone_number, :string
  end
end

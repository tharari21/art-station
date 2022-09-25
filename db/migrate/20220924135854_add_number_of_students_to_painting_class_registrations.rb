class AddNumberOfStudentsToPaintingClassRegistrations < ActiveRecord::Migration[7.0]
  def change
    add_column :painting_class_registrations, :number_of_students, :integer
  end
end

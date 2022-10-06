class PaintingClassRegistrationSerializer < ActiveModel::Serializer
  belongs_to :user
  belongs_to :painting_class
  attributes :id, :name, :email, :phone_number, :number_of_students, :user, :painting_class

end

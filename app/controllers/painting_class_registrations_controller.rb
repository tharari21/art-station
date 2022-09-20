class PaintingClassRegistrationsController < ApplicationController

    def create
        students = params[:students].map do |student|
            new_student = {}
            new_student[:painting_class_id] = params[:id]
            new_student[:name] = student[:name]
            new_student[:age] = student[:age]
            new_student[:email] = params[:email]
            new_student[:phone_number] = params[:phone_number]
            new_student
        end
        puts "students!!"
        p students
        registration = PaintingClassRegistration.create!(students)
        render json: registration, status: :created

    end
    private
    def painting_class_registration_params
        # params.permit(:user_id, :name, :age,  :students)
    end
end

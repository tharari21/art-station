class PaintingClassesController < ApplicationController
    def index            
        render json: PaintingClass.all
    end
    def create
        if @user.admin
            PaintingClass.create!(painting_class_params)
        else
            render json: {message: "You must be an admin to create a class"}, status: :unauthorized
        end
    end
    private
    def painting_class_params
        params.permit(:date, :painting, :max_capacity, :price)
    end
end

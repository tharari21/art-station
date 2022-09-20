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
    def upcoming
        upcoming_classes = PaintingClass.where('date > ?', Date.current)
        render json: upcoming_classes
    end
    def currently_occupied
        render json: {occupied_seats: PaintingClassRegistration.where('painting_class_id=?', params[:id]).count}        
    end
    private
    def painting_class_params
        params.permit(:date, :painting, :max_capacity, :price)
    end
end

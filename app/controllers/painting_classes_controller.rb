include Rails.application.routes.url_helpers
class PaintingClassesController < ApplicationController
    before_action :authorized, only: [:create]
    def index
        render json: PaintingClass.all.order(:date)
    end
    def create
        # TODO: Make the checking for admin a method in application controller
        if @user.admin
            painting_class = PaintingClass.create!(painting_class_params)
            painting_class.update!(price: 30)
            render json: painting_class, status: :created
        else
            render json: {errors: ["You must be an admin to create a class"]}, status: :unauthorized
        end
    end
    def show
        painting_class = PaintingClass.find(params[:id])
        render json: painting_class
    end
    def destroy
        painting_class = PaintingClass.find(params[:id])
        if painting_class.destroy
            render json: painting_class
        else
            render json: {errors: painting_class.errors.full_messages}, status: :unprocessable_entity
        end
    end
    def upcoming
        upcoming_classes = PaintingClass.includes(:painting_class_registrations).where('date > ?', Date.current).order(:date)
        render json: upcoming_classes
    end
    
    def registered
        painting_class = PaintingClass.find(params[:id])
        render json: painting_class.painting_class_registrations, include: [:user]
    end

    def get_latest_classes
        # order painting classes by date
        # get unique painting ids
        
        painting_ids = PaintingClass.order(:date)
    end
    

    private
    def painting_class_params
        params.permit(:date, :painting_id, :max_capacity, :price)
    end
end

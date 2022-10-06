class PaintingsController < ApplicationController
    before_action :authorized, only: [:create, :index]

    def index
        render json: Painting.all
    end
    def create
        if @user.admin
            painting = Painting.create!(painting_params)
            render json: painting, status: :created

        else
            render json: {errors: ["You must be an admin to create a painting"]}
        end
    end
    private
    def painting_params
        params.permit(:name, :image, tags: [])
    end
end

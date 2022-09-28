class PaintingsController < ApplicationController
    def index
        render json: Painting.all
    end
    def create
        painting = Painting.create!(painting_params)
        render json: painting, status: :created
    end
    private
    def painting_params
        params.permit(:name, :image)
    end
end

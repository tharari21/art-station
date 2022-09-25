class PaintingsController < ApplicationController
    def index
        render json: Painting.all
    end
end

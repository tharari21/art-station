include Rails.application.routes.url_helpers
class PaintingClassesController < ApplicationController
    before_action :authorized, only: [:create]
    def index
        render json: PaintingClass.all
    end
    def create
        if @user.admin
            painting_class = PaintingClass.create!(painting_class_params)
            # stripe_product = Stripe::Product.create({name: "#{painting_class.painting.name} #{painting_class.date}", images: [url_for(painting_class.painting.image)]})
            # puts stripe_product
            # Stripe::Price.create({product: stripe_product.id, unit_amount: 3000, currency: 'usd'},)
            painting_class.update(price: 30)
            render json: painting_class, status: :created
        else
            render json: {errors: ["You must be an admin to create a class"]}, status: :unauthorized
        end
    end
    def show
        painting_class = PaintingClass.find(params[:id])
        render json: painting_class
    end
    def upcoming
        upcoming_classes = PaintingClass.includes(:painting_class_registrations).where('date > ?', Date.current)
        render json: upcoming_classes
    end
    
    def registered
        painting_class = PaintingClass.find(params[:id])
        render json: painting_class.painting_class_registrations, include: [:user]
    end

    def get_latest_classes
        PaintingClass.order(:date)
    end

    private
    def painting_class_params
        params.permit(:date, :painting_id, :max_capacity, :price)
    end
end

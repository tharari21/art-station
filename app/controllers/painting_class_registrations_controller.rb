class PaintingClassRegistrationsController < ApplicationController

    def create
        painting_class = PaintingClass.find(params[:id])
        registration = painting_class.painting_class_registrations.create!(painting_class_registration_params)
        
        session = Stripe::Checkout::Session.create(
            mode: "payment",
            payment_method_types: ['card'],
            success_url: "http://localhost:4000?success=true",
            cancel_url: "http://localhost:4000?cancelled=true",
            # can use price data if you're creating on the fly
            line_items: [{quantity: params[:number_of_students],price: "price_1LlIfsCvxdyaKhHoL71UZoEk"}],
            customer_email: get_current_user&.email || params[:email],
        )
        render json: {session: session, registration: registration}, status: :created
        

    end
    private
    def painting_class_registration_params
        params.permit(:name, :email, :phone_number, :number_of_students)
    end
end

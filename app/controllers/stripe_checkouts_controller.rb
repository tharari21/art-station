class StripeCheckoutsController < ApplicationController
    def create
        session = Stripe::Checkout::Session.create(
            mode: "payment",
            payment_method_types: ['card'],
            success_url: "http://localhost:4000?success=true",
            cancel_url: "http://localhost:4000?cancelled=true",
            # can use price data if you're creating on the fly
            line_items: [{quantity: params[:number_of_students],price: "price_1LlIfsCvxdyaKhHoL71UZoEk"}],
            customer_email: get_current_user&.email || params[:email],
        )
        render json: {session: session}, status: :created
    end
end

class PaintingClassRegistrationsController < ApplicationController

    def create
        
        painting_class = PaintingClass.find(params[:id])
        order_data = [{
            quantity: params[:number_of_students], 
            price_data: {
                currency: "usd", 
                unit_amount: 3000,
                product_data: {
                    name: "Painting class on #{painting_class.date.strftime("%B %d, %Y @ %I:%M %p")}", 
                    images: [painting_class.painting.image_url]
                }
            }
        }]

        user = get_current_user
        session = Stripe::Checkout::Session.create(
            mode: "payment",
            payment_method_types: ['card'],
            success_url: "http://localhost:4000?success=true",
            cancel_url: "http://localhost:4000?cancelled=true",
            # can use price data if you're creating on the fly
            # line_items: [{quantity: params[:number_of_students],price: "price_1LlIfsCvxdyaKhHoL71UZoEk"}],
            line_items: order_data,
            customer_email: user&.email || params[:email],
            metadata: {
                class_id: params[:id],
                name: params[:name],
                email: params[:email],
                phone_number: params[:phone_number],
                number_of_students: params[:number_of_students],
            }
        )
        render json: {session: session}, status: :created
        

    end
    # private
    # def painting_class_registration_params
    #     params.permit(:name, :email, :phone_number, :number_of_students)
    # end
end

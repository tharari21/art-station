class PartyRequestsController < ApplicationController
    def index
        render json: PartyRequest.all,include: [:user]
    end
    def create
        get_current_user
        if @user
            party_request = PartyRequest.create!(user_id: @user.id, date: params[:date], package: params[:package], number_of_participants: params[:number_of_participants])
        else
            party_request = PartyRequest.create!(party_request_params)
        end
        PartyRequestedMailer.with(party_request: party_request).admin_party_request.deliver_later
        PartyRequestedMailer.with(party_request: party_request).user_party_request.deliver_later
        party_request.broadcast
        render json: party_request, status: :created
    end
   
    def update
        party_request = PartyRequest.find(params[:id])
        if party_request.update(party_request_params)
            if party_request_params[:status] === "pending_payment"
                payment_link = Stripe::PaymentLink.create({
                    line_items: [{price: "price_1Lp04CCvxdyaKhHomF1uHVJO", quantity: 1}],
                    after_completion: {type: 'redirect', redirect: {url: 'http://localhost:4000?success=true'}},
                    metadata: {
                        party_request_id: party_request.id
                    }
                })
                PartyRequestedMailer.with(party_request: party_request).admin_party_confirmation.deliver_later
                PartyRequestedMailer.with(party_request: party_request, payment_url: payment_link.url).user_party_confirmation.deliver_later
            end
            render json: party_request, include: [:user]
        else
            render json: {error:party_request.errors.full_messages}, status: :unprocessable_entity
        end
    end
    def destroy
        party_request = PartyRequest.find(params[:id])
        if party_request.destroy
            render json: party_request
        else
            render json: {error: "Could not delete party request"}, status: :unprocessable_entity
        end
    end
    def pending
        pending = PartyRequest.where('date > ? AND status=0', DateTime.current)
        render json: pending, include: [:user]
    end
    private
    def party_request_params
        params.permit(:date, :name, :email, :phone_number, :number_of_participants, :package, :user_id,:status)
    end
end

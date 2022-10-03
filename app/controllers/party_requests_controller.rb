class PartyRequestsController < ApplicationController
    def index
        render json: PartyRequest.all
    end
    def create
        get_current_user
        if @user
            party_request = PartyRequest.create!(user_id: @user.id, date: params[:date], package: params[:package], number_of_participants: params[:number_of_participants])
        else
            party_request = PartyRequest.create!(party_request_params)
        end
        party_request.update(pending: true)
        PartyRequestedMailer.with(party_request: party_request).admin_party_request.deliver_later
        PartyRequestedMailer.with(party_request: party_request).user_party_request.deliver_later
        party_request.broadcast
        render json: party_request, status: :created
    end
    def confirm
        party_request = PartyRequest.find(params[:id])
        if party_request.confirm
            render json: party_request
        else
            render json: {error: "could not confirm party request"}, status: :not_found
        end
    end
    def update
        party_request = PartyRequest.find(params[:id])
        p "PARTY PARAMS"
        p params
        if party_request.update(party_request_params)
            render json: party_request
        else
            render json: {error: "Could not update party request"}, status: :unprocessable_entity
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
        pending = PartyRequest.where('date > ? AND pending=true', DateTime.current)
        render json: pending, include: [:user]
    end
    private
    def party_request_params
        params.permit(:date, :name, :email, :phone_number, :number_of_participants, :package, :user_id)
    end
end

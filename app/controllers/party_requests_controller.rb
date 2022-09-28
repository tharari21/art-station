class PartyRequestsController < ApplicationController
    def index
        render json: PartyRequest.all
    end
    def create
        party_request = PartyRequest.create!(party_request_params)
        party_request.update(pending: true)
        
        party_request.broadcast
        render json: party_request, status: :created
        
    end
    def pending
        pending = PartyRequest.where('date > ? AND pending=true', DateTime.current)
        render json: pending
    end
    private
    def party_request_params
        params.permit(:date, :name, :email, :phone_number)
    end
end

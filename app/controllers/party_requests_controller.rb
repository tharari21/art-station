class PartyRequestsController < ApplicationController
    def index
        render json: PartyRequest.all
    end
    def upcoming
        upcoming = PartyRequest.where('date > ?', Date.current)
        render json: upcoming
    end
end

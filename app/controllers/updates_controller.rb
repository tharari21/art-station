class UpdatesController < ApplicationController
    def index
        latest_news = Update.where('created_at > ?', Date.current-1.week)
        render json: latest_news
    end
    def create
        byebug
    end
    
end

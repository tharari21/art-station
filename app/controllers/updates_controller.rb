class UpdatesController < ApplicationController
    def index
        render json: Update.all
    end
    def latest
        latest_news = Update.where('created_at > ?', Date.current-1.week)
        render json: latest_news
    end
end

class UsersController < ApplicationController
    before_action :authorized, only: [:update,:orders, :classes, :upcoming_party_requests]
    def create
        user = User.create!(user_params)
        user.admin = false
        token = encode_token({user_id: user.id})
        cookies.signed[:jwt] = {
            value: token,
            expires: 1.week.from_now,
            httponly: true, 
        }
        render json: {id: user.id, username: user.username, email: user.email, admin: user.admin, first_name: user.first_name, last_name: user.last_name, phone_number: user.phone_number }, status: :created
    end
    def update
        @user.update!(user_params)
        render json: {id: @user.id, username: @user.username, email: @user.email, admin: @user.admin, first_name: @user.first_name, last_name: @user.last_name, phone_number: @user.phone_number }
        
    end
    def orders
        render json: @user.orders
    end
    def classes
        registrations = @user.painting_class_registrations
        render json: registrations, include: {:painting_class => {:include => :painting}}
    end
    def upcoming_party_requests
        party_requests = @user.party_requests.where('date > ?', DateTime.current)
        render json: party_requests
    end
    private
    def user_params
        params.permit(:username, :email, :password, :password_confirmation, :first_name, :last_name, :phone_number)
    end
end

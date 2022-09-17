class UsersController < ApplicationController
    def create
        user = User.create!(user_params)
        token = encode_token({user_id: user.id})
        render json: {token: token}, status: :created
    end
    private
    def user_params
        params.permit(:username, :email, :password, :password_confirmation)
    end
end

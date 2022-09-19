class AuthController < ApplicationController
    skip_before_action :authorized, only: [:create]
    def create
        user = User.find_by!(username: params[:username])
        if user.authenticate(params[:password])
            token = encode_token({user_id: user.id})
            return render json: {token: token}, status: :ok
        end
        render json: {message: "Invalid username or password"}
    end
end

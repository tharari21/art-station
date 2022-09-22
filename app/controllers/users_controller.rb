class UsersController < ApplicationController
    def create
        user = User.create!(user_params)
        user.admin=false
        token = encode_token({user_id: user.id})
        cookies.signed[:jwt] = {
            value: token,
            expires: 1.week.from_now,
            httponly: true,
        }
        render json: {id: user.id, username: user.username, email: user.email, admin: user.admin}, status: :created
    end
    private
    def user_params
        params.permit(:username, :email, :password, :password_confirmation)
    end
end

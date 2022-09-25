class AuthController < ApplicationController
    def create
        user = User.find_by!(username: params[:username])
        if user.authenticate(params[:password])
            token = encode_token({user_id: user.id})
            cookies.signed[:jwt] = {
                value: token,
                expires: 1.week.from_now,
                httponly: true,
            }
            render json: {id: user.id, username: user.username, email: user.email, admin: user.admin }, status: :created
            
        else
            render json: {errors: ["Invalid username or password"]}
        end
    end
    def show
        user = get_current_user
        render json: user, only: [:id, :username, :email ,:admin]
    end
    def destroy
        cookies.delete :jwt
        head :no_content
    end
end

class AuthController < ApplicationController
    def create
        p "USER"
        user = User.find_by!(email: params[:email])
        p user
        if user.authenticate(params[:password])
            token = encode_token({user_id: user.id})
            cookies.signed[:jwt] = {
                value: token,
                expires: 1.week.from_now,
                httponly: true,
            }
            render json: {id: user.id, username: user.username, email: user.email, admin: user.admin }, status: :created
            
        else
            render json: {errors: ["Invalid username or password"]}, status: :unprocessable_entity
        end
    end
    def show
        user = get_current_user
        render json: user, only: [:id, :username, :email ,:admin, :first_name, :last_name, :phone_number]
    end
    def destroy
        cookies.delete :jwt
        head :no_content
    end
end

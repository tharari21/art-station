class AuthController < ApplicationController
    def create
        puts "LOGGING"
        user = User.find_by!(username: params[:username])
        if user.authenticate(params[:password])
            token = encode_token({user_id: user.id})
            cookies.signed[:jwt] = {
                value: token,
                expires: 1.week.from_now,
                # domain: 'http://localhost:4000',
                httponly: true,
            }
            return render json: {token: token}, status: :ok
        end
        render json: {message: "Invalid username or password"}
    end
    def destroy
        cookies.delete :jwt
    end
end

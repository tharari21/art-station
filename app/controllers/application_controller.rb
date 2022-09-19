class ApplicationController < ActionController::API
    # skip_before_action :verify_authenticity_token
    before_action :authorized

    rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found

    SECRET_KEY = Rails.application.secrets.secret_key_base. to_s
    
    def encode_token(payload, exp=24.hours.from_now.to_i)
        payload[:exp] = exp
        JWT.encode(payload, SECRET_KEY)
    end
    def auth_headers
        request.headers["Authorization"]
    end
    def decoded_token
        if auth_headers
            token = auth_headers.split(" ")[1]
            # begin
            JWT.decode(token, SECRET_KEY)
            # rescue JWT::DecodeError
            #     render json: {message: "Invalid token"}, status: :unauthorized
            # rescue JWT::ExpiredSignature
            #     render json: {message: "Token expired"}, status: :unauthorized
            # end
        end
    end
    def current_user
        payload = decoded_token
        if payload
            user_id = payload[0]['user_id']
            @user = User.find(user_id)
        end
    end
    def logged_in?
        !!current_user
    end
    def authorized
        begin
            render json: {message: "Please log in"}, status: :unauthorized unless logged_in?
        rescue JWT::DecodeError
            render json: {message: "Invalid token"}, status: :unauthorized
        rescue JWT::ExpiredSignature
            render json: {message: "Token expired"}, status: :unauthorized
        end
    end
    
    private

    def render_record_invalid(e)
        return render json: {message: e.invalid.record.full_messages}, status: :unprocessable_entity
    end
    def render_record_not_found(e)
        puts "record not found"
        return render json: {message: "#{e.model} not found"}, status: :not_found
    end
end

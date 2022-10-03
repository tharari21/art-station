class ApplicationController < ActionController::API
    include ActionController::Cookies
    # skip_before_action :verify_authenticity_token
    
    rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
    rescue_from JWT::DecodeError, with: :render_invalid_token
    rescue_from JWT::ExpiredSignature, with: :render_expired_token

    SECRET_KEY = Rails.application.secrets.secret_key_base.to_s
    
    def encode_token(payload, exp=24.hours.from_now.to_i)
        payload[:exp] = exp
        JWT.encode(payload, SECRET_KEY)
    end
    def decoded_token
        jwt = cookies.signed[:jwt]
        puts jwt
        begin
            JWT.decode(jwt, SECRET_KEY)
        rescue JWT::DecodeError
            nil
        end
    end
    def get_current_user
        payload = decoded_token
        if payload
            user_id = payload[0]['user_id']
            @user = User.find(user_id)
        end
    end
    def logged_in?
        !!get_current_user
    end
    def authorized
        render json: {errors: ["Please log in"]}, status: :unauthorized unless logged_in?
    end
    
    private
    
    def render_record_invalid(e)
        return render json: {errors: e.record.errors.full_messages}, status: :unprocessable_entity
    end
    def render_record_not_found(e)
        return render json: {errors: ["#{e.model} not found"]}, status: :not_found
    end
    def render_invalid_token(e)
        render json: {errors: ["Invalid token"]}, status: :unauthorized
    end
    def render_expired_token
        render json: {errors: ["Token expired"]}, status: :unauthorized
    end
end

class PartyRequestedMailer < ApplicationMailer
    
    def admin_party_request
        @party_request = params[:party_request]
        mail(to: "tharari93@gmail.com", subject: "#{@party_request&.name || @party_request.user.first_name + " " + @party_request.user.last_name} Requested to Book a Party")
    end
    def user_party_request
        @party_request = params[:party_request]
        mail(to: params[:party_request]&.email || params[:party_request].user.email, subject: "You Have Requested to Book a Party at The Art Station")
    end
    def admin_party_confirmation
        @party_request = params[:party_request]
        mail(to: "tharari93@gmail.com", subject: "You Have Confirmed #{@party_request.get_name}'s Request to Book a Party")
    end
    def user_party_confirmation
        @party_request = params[:party_request]
        @payment_url = params[:payment_url]
        mail(to: @party_request.get_email, subject: "Your Party Request Has Been Confirmed!")
    end
    def user_party_rejection
    end
end

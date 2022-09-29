class PartyRequestedMailer < ApplicationMailer
    
    def admin_party_request
        @party_request = params[:party_request]
        mail(to: "tharari93@gmail.com", subject: "#{@party_request.name} Requested to Book a Party")
    end
    def user_party_request
        @party_request = params[:party_request]
        mail(to: params[:party_request].email, subject: "You Have Requested to Book a Party at The Art Station")
    end
    def admin_party_confirmation
        @party_request = params[:party_request]
        mail(to: "tharari93@gmail.com", subject: `You Have Confirmed #{@party_request.name}'s Request to Book a Party`)
    end
    def user_party_confirmation
        @party_request = params[:party_request]
        mail(to: params[:party_request].email, subject: "Your Party Request Has Been Confirmed!")
    end
    def user_party_rejection
    end
end

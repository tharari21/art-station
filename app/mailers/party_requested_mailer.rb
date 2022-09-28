class PartyRequestedMailer < ApplicationMailer
    def notify_admin
        @party_request = params[:party_request]
        mail(to: "tharari93@gmail.com", subject: "#{@party_request.name} Requested to Book a Party")
    end
    def notify_user
        @party_request = params[:party_request]
        mail(to: params[:party_request].email, subject: "You Have Requested to Book a Party at The Art Station")

    end
end

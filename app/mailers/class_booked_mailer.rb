class ClassBookedMailer < ApplicationMailer
    def class_booked
        @registration = params[:registration]
        @url = "http://localhost:4000"
        
        mail(to: params[:email], subject: "Your Art Station class is booked!")
    end
end

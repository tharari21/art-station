class ClassBookedMailer < ApplicationMailer
    def notify_user
        @registration = params[:registration]
        @url = "http://localhost:4000"
        
        mail(to: params[:email], subject: "Your Art Station Class is Booked!")
    end
    def notify_admin
        @registration = params[:registration]
        mail(to: 'tharari93@gmail.com', subject: "A New User Registered For a Class!")

    end
end

class ClassBookedMailer < ApplicationMailer
    def class_booked(email)
        @url = "http://localhost:4000"
        mail(to: email, subject: "Your class is booked!")
    end
end

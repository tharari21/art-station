class WebhooksController < ApplicationController
    def create
        payload = request.body.read
        sig_header = request.env['HTTP_STRIPE_SIGNATURE']
        # Production
        # endpoint_secret = Rails.application.credentials.dig(:stripe, :secret_key)
        endpoint_secret = Rails.application.credentials.dig(:stripe, :signing_secret)
        event = nil

        begin
            # Verify event came from stripe
            event = Stripe::Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )

        rescue JSON::ParserError => e
            # Invalid payload
            status 400
            return
        end
        puts event.type
        # Handle the event
        case event.type
        when 'payment_intent.succeeded'
            payment_intent = event.data.object # contains a Stripe::PaymentIntent
            # Then define and call a method to handle the successful payment intent.
            # handle_payment_intent_succeeded(payment_intent)
        when 'payment_intent.created'
            # Get the receipt url
            puts "PAYMENT INTENT"
            
            
        when 'checkout.session.completed'
            puts "CHECKOUT SESSION COMPLETE"
            # Get the customer email
            
            # ClassBookedMailer.class_booked(event[:data][:object][:customer_details][:email]).deliver_later
            session = event.data.object # does not contain line items
            if session.metadata.try(:class_id)
                handle_class_checkout(session.metadata)
            elsif session.metadata.try(:party_request_id)
                handle_party_deposit_checkout(session.metadata)
            end

        when 'payment_method.attached'
            payment_method = event.data.object # contains a Stripe::PaymentMethod
            # Then define and call a method to handle the successful attachment of a PaymentMethod.
            # handle_payment_method_attached(payment_method)
        # ... handle other event types
        else
            puts "Unhandled event type: #{event.type}"
        end

        head :no_content, status: 200
    end
    def handle_class_checkout(metadata)
        painting_class = PaintingClass.find(metadata.class_id.to_i)
        registration = painting_class.painting_class_registrations.create(
            # user_id: metadata&.user_id&.to_i, # &. only works for nil classes or hashes but metadata is a stripe object
            user_id: metadata.try(:user_id).try(:to_i),
            name: metadata.try(:name), 
            email: metadata.try(:email), 
            phone_number: metadata.try(:phone_number),
            number_of_students: metadata.number_of_students.to_i
        )
        registration.broadcast
        # perhaps store orders or customers? not sure
        # if metadata.user_id
        #     Orders.create!(user_id: metadata.user_id.to_i, session_id: id,name: "Painting Class",amount: 1000)
        # end
        ClassBookedMailer.with(registration: registration, email: metadata.try(:email) || User.find(metadata.user_id).email).notify_user.deliver_later
        ClassBookedMailer.with(registration: registration).notify_admin.deliver_later

    end
    def handle_party_deposit_checkout(metadata)
        party_request = PartyRequest.find(metadata.party_request_id)
        if party_request.update(status: :confirmed)
            PartyRequestedMailer.with(party_request: party_request).admin_party_confirmed.deliver_later
            PartyRequestedMailer.with(party_request: party_request).user_party_confirmed.deliver_later
        else
            p "ERRORS"
            p party_request.errors.full_messages
        end
        
    end
end

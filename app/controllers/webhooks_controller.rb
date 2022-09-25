class WebhooksController < ApplicationController
    def create
        payload = request.body.read
        sig_header = request.env['HTTP_STRIPE_SIGNATURE']
        # Production
        # endpoint_secret = Rails.application.credentials.dig(:stripe, :secret_key)
        endpoint_secret = Rails.application.credentials.dig(:stripe, :signing_secret)
        event = nil

        begin
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
            ClassBookedMailer.class_booked(event[:data][:object][:customer_details][:email]).deliver_later

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
end

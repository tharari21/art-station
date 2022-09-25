import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm'
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51LlFBUCvxdyaKhHoHl5h6LfinnLpjZNvYsRlKbQtGTwK9nU3qXQLKbhXtAOSHKJWQjoyeChgJ7NB40pClUMqQPIh00lvBR3gzh"
);

import React from 'react'

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState("");
    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch("http://localhost:3000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, []);
    const appearance = {
      theme: "stripe",
    };
    const options = {
      clientSecret,
      appearance,
    };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Checkout
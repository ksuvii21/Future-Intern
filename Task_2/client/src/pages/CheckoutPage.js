import React from 'react';
import Checkout from '../components/Checkout';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.error("Stripe publishable key is not set. Please check your .env file.");
}

const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

const CheckoutPage = () => {
  if (!stripePromise) {
    return <div className="min-h-screen bg-red-900 text-white flex items-center justify-center p-8 text-center">Error: Stripe is not configured. Please add REACT_APP_STRIPE_PUBLISHABLE_KEY to your .env file in the client directory.</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
};

export default CheckoutPage;

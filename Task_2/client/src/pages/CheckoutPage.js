import React, { useState, useEffect } from 'react';
import Checkout from '../components/Checkout';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

const CheckoutPage = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!stripePublishableKey) {
      const errorMessage = "Stripe publishable key is not set. Please create a `.env` file in the `client` directory and add `REACT_APP_STRIPE_PUBLISHABLE_KEY=your_key_here`. Remember to restart your development server after creating the file.";
      console.error(errorMessage);
      setError(errorMessage);
      return;
    }

    const stripe = loadStripe(stripePublishableKey);
    setStripePromise(stripe);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-red-900 text-white flex items-center justify-center p-8 text-left">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Stripe Configuration Error</h2>
          <p className="font-mono bg-red-800 p-4 rounded-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
};

export default CheckoutPage;

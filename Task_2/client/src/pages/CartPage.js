import React, { useEffect } from 'react';
import Cart from '../components/Cart';

const CartPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <Cart />
      </div>
    </div>
  );
};

export default CartPage;

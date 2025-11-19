import React, { useEffect } from 'react';

const ReturnPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Return Policy</h1>
          <p className="text-gray-400 text-lg">Easy returns, hassle-free exchanges</p>
        </div>

        <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-8">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-4">30-Day Return Window</h2>
            <p className="text-gray-300 mb-6">
              We want you to love your purchase! If you're not completely satisfied, you can return most items within 30 days of delivery for a full refund or exchange.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Eligible Items</h3>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Unworn clothing with original tags attached</li>
              <li>Accessories in original packaging</li>
              <li>Jewelry with certificates of authenticity</li>
              <li>Items not marked as final sale</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">Return Process</h3>
            <ol className="list-decimal list-inside text-gray-300 mb-6 space-y-2">
              <li>Log into your account and navigate to your orders</li>
              <li>Select the item(s) you wish to return</li>
              <li>Choose your return reason and preferred resolution</li>
              <li>Print the prepaid return label</li>
              <li>Pack and ship the item within 5 business days</li>
            </ol>

            <h3 className="text-xl font-semibold text-white mb-3">Return Shipping</h3>
            <p className="text-gray-300 mb-6">
              Return shipping is free for all eligible returns. We'll provide a prepaid shipping label for your convenience.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Processing Time</h3>
            <p className="text-gray-300 mb-6">
              Once we receive your return, we'll process it within 5-7 business days. You'll receive an email confirmation when your refund is issued.
            </p>

            <div className="bg-[#ea698b]/10 border border-[#ea698b]/30 rounded-lg p-4">
              <p className="text-[#ea698b] font-semibold">
                Need help with a return? Contact our support team at returns@fanseerebel.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;

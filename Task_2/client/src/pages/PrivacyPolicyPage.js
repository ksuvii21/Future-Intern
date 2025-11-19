import React, { useEffect } from 'react';

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400 text-lg">How we protect and use your information</p>
        </div>

        <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-8">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
            <p className="text-gray-300 mb-6">
              We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Personal Information</h3>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Name, email address, and contact information</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information (processed securely)</li>
              <li>Order history and preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">How We Use Your Information</h3>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Provide customer support</li>
              <li>Send order confirmations and updates</li>
              <li>Improve our products and services</li>
              <li>Send marketing communications (with consent)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">Information Sharing</h3>
            <p className="text-gray-300 mb-6">
              We do not sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>With service providers who assist our operations</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">Data Security</h3>
            <p className="text-gray-300 mb-6">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <div className="bg-[#ea698b]/10 border border-[#ea698b]/30 rounded-lg p-4">
              <p className="text-[#ea698b] font-semibold">
                Last updated: January 2025. For questions, contact privacy@fanseerebel.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

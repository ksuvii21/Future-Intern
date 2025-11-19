import React, { useEffect } from 'react';

const RefundPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Refund Policy</h1>
          <p className="text-gray-400 text-lg">Transparent and fair refund process</p>
        </div>

        <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-8">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-4">Refund Timeline</h2>
            <p className="text-gray-300 mb-6">
              We process refunds promptly to ensure your satisfaction. Here's what you can expect:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-[#2a1a3e] border border-[#571089]/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Return Processing</h3>
                <p className="text-gray-300">5-7 business days after receiving your return</p>
              </div>
              <div className="bg-[#2a1a3e] border border-[#571089]/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Refund to Account</h3>
                <p className="text-gray-300">3-5 business days after processing</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-3">Refund Methods</h3>
            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
              <li>Original payment method (credit/debit card)</li>
              <li>Store credit for future purchases</li>
              <li>Bank transfer for select payment methods</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">Partial Refunds</h3>
            <p className="text-gray-300 mb-6">
              In some cases, partial refunds may apply for damaged items or missing components. We'll clearly communicate any deductions.
            </p>

            <div className="bg-[#ea698b]/10 border border-[#ea698b]/30 rounded-lg p-4">
              <p className="text-[#ea698b] font-semibold">
                Questions about your refund? Reach out to support@fanseerebel.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;

import React from 'react';

const DisclaimerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Disclaimer</h1>
          <p className="text-gray-400 text-lg">Important legal information and limitations</p>
        </div>

        <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-8">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-4">General Disclaimer</h2>
            <p className="text-gray-300 mb-6">
              The information provided on this website is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Product Information</h3>
            <p className="text-gray-300 mb-6">
              Product descriptions, specifications, and pricing are subject to change without notice. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice. Colors and images may vary slightly from actual products due to monitor settings and photography conditions.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Pricing and Availability</h3>
            <p className="text-gray-300 mb-6">
              All prices are subject to change without notice. While we make every effort to ensure the accuracy of pricing information, errors may occur. In the event of a pricing error, we reserve the right to cancel orders placed at incorrect prices.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Third-Party Links</h3>
            <p className="text-gray-300 mb-6">
              This website may contain links to third-party websites or services that are not owned or controlled by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Limitation of Liability</h3>
            <p className="text-gray-300 mb-6">
              In no event shall Fansee Rebel, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the website or services.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Governing Law</h3>
            <p className="text-gray-300 mb-6">
              These terms shall be interpreted and governed by the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these terms will not be considered a waiver of those rights.
            </p>

            <div className="bg-[#ea698b]/10 border border-[#ea698b]/30 rounded-lg p-4">
              <p className="text-[#ea698b] font-semibold">
                By using our website, you acknowledge that you have read and understood this disclaimer and agree to be bound by its terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;

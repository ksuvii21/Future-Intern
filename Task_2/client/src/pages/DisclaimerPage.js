import React from 'react';

const DisclaimerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Disclaimer</h1>
          <p className="text-gray-400 text-lg">Important legal information</p>
        </div>

        <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-8">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-4">Website Disclaimer</h2>
            <p className="text-gray-300 mb-6">
              The information provided on Fansee Rebel website is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">External Links Disclaimer</h3>
            <p className="text-gray-300 mb-6">
              The site may contain (or you may be sent through the site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Professional Disclaimer</h3>
            <p className="text-gray-300 mb-6">
              The site cannot and does not contain legal advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Product Information</h3>
            <p className="text-gray-300 mb-6">
              Product specifications, pricing, and availability are subject to change without notice. We strive to provide accurate information, but we do not warrant that product descriptions or other content on this site is accurate, complete, reliable, current, or error-free.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Limitation of Liability</h3>
            <p className="text-gray-300 mb-6">
              In no event shall Fansee Rebel, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
            </p>

            <div className="bg-[#ea698b]/10 border border-[#ea698b]/30 rounded-lg p-4">
              <p className="text-[#ea698b] font-semibold">
                By using our website, you hereby consent to our disclaimer and agree to its terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;

import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How do I track my order?',
    answer: 'Once your order is shipped, you will receive an email with a tracking number and a link to the courier\'s website. You can also find the tracking information in your order history on your profile page.',
  },
  {
    question: 'What are the shipping options and costs?',
    answer: 'We offer several shipping options, including Standard (5-7 business days) and Express (1-2 business days). Shipping costs are calculated at checkout based on your location and the selected shipping method. We offer free standard shipping on orders over ₹5000.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day hassle-free return policy. If you are not satisfied with your purchase, you can return it for a full refund or exchange. The item must be in its original condition with all tags attached. Please visit our returns page to initiate a return.',
  },
  {
    question: 'How can I apply a discount code?',
    answer: 'You can apply your discount code during the checkout process. There will be a field labeled "Discount Code" or "Promo Code" where you can enter your code. The discount will be applied to your total amount.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Currently, we only ship within India. We are working on expanding our shipping to international destinations in the near future. Stay tuned for updates!',
  },
];

const FAQItem = ({ faq, index, toggleFAQ }) => {
  return (
    <div className="border-b border-[#571089]/30">
      <button
        onClick={() => toggleFAQ(index)}
        className="w-full text-left py-6 px-4 flex justify-between items-center text-white hover:bg-white/5 transition-colors"
      >
        <span className="text-lg font-semibold">{faq.question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${faq.open ? 'transform rotate-180' : ''}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${faq.open ? 'max-h-screen' : 'max-h-0'}`}
      >
        <div className="p-4 pt-0 text-gray-300">
          <p>{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQPage = () => {
  const [faqList, setFaqList] = useState(faqs.map(f => ({ ...f, open: false })));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFAQ = index => {
    setFaqList(
      faqList.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }
        return faq;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-gradient-to-r from-[#ea698b]/20 to-[#822faf]/20 border border-[#ea698b]/30 rounded-full mb-6">
            <HelpCircle className="w-10 h-10 text-[#ea698b]" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 text-lg">
            Find answers to common questions about our products, shipping, and policies.
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl shadow-2xl">
          {faqList.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} toggleFAQ={toggleFAQ} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
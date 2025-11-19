import React, { useEffect } from 'react';
import { Heart, Users, Award, Globe } from 'lucide-react';

const AboutUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">About Fansee Rebel</h1>
          <p className="text-gray-400 text-lg">Empowering fashion rebels worldwide</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <p className="text-gray-300 mb-4">
              Founded in 2020, Fansee Rebel emerged from a passion for bold, unapologetic fashion that challenges conventions and celebrates individuality. What started as a small online boutique has grown into a global community of fashion enthusiasts who dare to be different.
            </p>
            <p className="text-gray-300">
              We believe fashion is more than clothing—it's a statement, an attitude, and a way of life. Our curated collection features unique pieces that empower you to express your true self.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-300 mb-4">
              To revolutionize the fashion industry by making high-quality, unique fashion accessible to everyone. We strive to create a platform where creativity meets commerce, and where every customer feels valued and empowered.
            </p>
            <p className="text-gray-300">
              We're committed to sustainability, ethical sourcing, and supporting emerging designers who share our vision of inclusive, boundary-pushing fashion.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
            <Users className="w-12 h-12 text-[#ea698b] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">100K+ Customers</h3>
            <p className="text-gray-400 text-sm">Fashion rebels worldwide</p>
          </div>
          <div className="text-center bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
            <Award className="w-12 h-12 text-[#ea698b] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">50+ Designers</h3>
            <p className="text-gray-400 text-sm">Emerging talent featured</p>
          </div>
          <div className="text-center bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
            <Globe className="w-12 h-12 text-[#ea698b] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">25+ Countries</h3>
            <p className="text-gray-400 text-sm">Global shipping available</p>
          </div>
          <div className="text-center bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6">
            <Heart className="w-12 h-12 text-[#ea698b] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">98% Satisfaction</h3>
            <p className="text-gray-400 text-sm">Customer happiness rate</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="text-xl font-semibold text-white mb-3">Authenticity</h4>
              <p className="text-gray-300">We celebrate real voices and genuine expressions in fashion.</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-white mb-3">Inclusivity</h4>
              <p className="text-gray-300">Fashion for every body, every style, every story.</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-white mb-3">Sustainability</h4>
              <p className="text-gray-300">Ethical practices and eco-friendly materials.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;

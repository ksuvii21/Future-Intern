import React from 'react';
import { Package, DollarSign, BarChart2 } from 'lucide-react';

const SellerDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0a2e] to-[#0a0015] py-8 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#ea698b] to-[#d55d92] bg-clip-text text-transparent mb-2">
            Seller Dashboard
          </h1>
          <p className="text-gray-400">Welcome to your seller portal. Manage your products and view your sales performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 text-white">
            <Package className="w-8 h-8 text-[#ea698b] mb-4" />
            <h2 className="text-2xl font-bold mb-2">Manage Products</h2>
            <p className="text-gray-400">Add, edit, and view your product listings.</p>
          </div>
          <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 text-white">
            <DollarSign className="w-8 h-8 text-[#ea698b] mb-4" />
            <h2 className="text-2xl font-bold mb-2">View Earnings</h2>
            <p className="text-gray-400">Track your sales and review your payment history.</p>
          </div>
          <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0015] border border-[#571089]/30 rounded-2xl p-6 text-white">
            <BarChart2 className="w-8 h-8 text-[#ea698b] mb-4" />
            <h2 className="text-2xl font-bold mb-2">Analytics</h2>
            <p className="text-gray-400">Analyze your store's performance and customer insights.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
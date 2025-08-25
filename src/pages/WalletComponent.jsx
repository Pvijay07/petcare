import React, { useState, useEffect } from 'react';
import { ArrowLeft, Wallet, TrendingUp, TrendingDown, Calendar, User, Briefcase } from 'lucide-react';

const WalletComponent = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const transactions = [
    {
      id: 1,
      petMaster: "Ugendra",
      service: "Training",
      amount: 15000,
      type: "credit",
      description: "Booking amt",
      date: "11-05-2023"
    },
    {
      id: 2,
      petMaster: "Jayanta",
      service: "Grooming",
      amount: 15000,
      type: "debit",
      description: "Paid amt",
      date: "11-05-2023"
    },
    {
      id: 3,
      petMaster: "Lokesh",
      service: "Walking",
      amount: 15000,
      type: "credit",
      description: "Booking amt",
      date: "11-05-2023"
    },
    {
      id: 4,
      petMaster: "Mahesh",
      service: "Boarding",
      amount: 15000,
      type: "credit",
      description: "Booking amt",
      date: "11-05-2023"
    }
  ];

  const handleGoHome = () => {
    // Navigate to home - in real app this would use React Router
    console.log('Navigate to home');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`flex items-center justify-between mb-6 transition-all duration-700 ${
          isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleGoHome}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
              <Wallet className="w-7 h-7 text-indigo-600" />
              <span>My Wallet</span>
            </h1>
          </div>
        </div>

        {/* Wallet Balance Card */}
        <div className={`mb-8 transition-all duration-700 delay-200 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-indigo-100 text-sm font-medium mb-2">Wallet Balance Amount</p>
                <div className="flex items-center space-x-2">
                  <span className="text-4xl font-bold animate-pulse">₹10,000</span>
                  <div className="bg-white/20 rounded-full p-2">
                    <Wallet className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <div className="opacity-20">
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Table */}
        <div className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-700 delay-400 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Table Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-4 gap-4 text-sm font-semibold text-gray-700">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Pet Master</span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4" />
                <span>Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wallet className="w-4 h-4" />
                <span>Amount</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Date</span>
              </div>
            </div>
          </div>

          {/* Transaction Rows */}
          <div className="divide-y divide-gray-100">
            {transactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`px-6 py-4 hover:bg-gray-50 cursor-pointer transform transition-all duration-300 hover:scale-[1.01] ${
                  isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`}
                style={{ 
                  transitionDelay: `${600 + index * 100}ms`,
                  animationDelay: `${600 + index * 100}ms`
                }}
                onClick={() => setSelectedTransaction(transaction)}
              >
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="font-medium text-gray-900">
                    {transaction.petMaster}
                  </div>
                  <div className="text-gray-600">
                    {transaction.service}
                  </div>
                  <div className={`flex items-center space-x-2 font-semibold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>
                      {transaction.type === 'credit' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </div>
                  <div className="text-gray-600">
                    <div className="text-sm">{transaction.description}</div>
                    <div className="text-xs text-gray-500 flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{transaction.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction Detail Modal */}
        {selectedTransaction && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full transform animate-in zoom-in-95 duration-200">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Transaction Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pet Master:</span>
                  <span className="font-medium">{selectedTransaction.petMaster}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{selectedTransaction.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className={`font-semibold ${
                    selectedTransaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedTransaction.type === 'credit' ? '+' : '-'}
                    {formatCurrency(selectedTransaction.amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{selectedTransaction.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Description:</span>
                  <span className="font-medium">{selectedTransaction.description}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors duration-200 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <div className={`fixed bottom-6 right-6 transition-all duration-700 delay-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <button className="bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 active:scale-95">
            <TrendingUp className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletComponent;
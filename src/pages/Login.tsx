import React, { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const LoginPage = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle login logic here
      console.log('Submitted:', emailOrPhone);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 p-6 text-center">
            <h2 className="text-2xl font-bold text-white">Welcome Back!</h2>
            <p className="text-indigo-100 mt-1">Sign in to continue</p>
          </div>
          
          {/* Login Form */}
          <div className="p-6 sm:p-8">
            <div className="flex justify-center mb-6">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                alt="User login" 
                className="w-24 h-24 rounded-full border-4 border-indigo-100 object-cover"
              />
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {emailOrPhone.includes('@') ? (
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Email or Phone Number"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition duration-200"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center px-4 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  'Processing...'
                ) : (
                  <>
                    Continue
                    <ArrowRightIcon className="h-5 w-5 ml-2" />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <a 
                  href="#signup" 
                  className="text-indigo-600 font-medium hover:text-indigo-800 hover:underline transition duration-200"
                >
                  Sign up
                </a>
              </p>
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-6">
              <button className="w-full py-2 px-4 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition duration-200">
                Skip for now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
import React, { useState, useRef, useEffect } from 'react';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef([]);

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to next input
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 4);
    if (!isNaN(pasteData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pasteData.length; i++) {
        newOtp[i] = pasteData[i];
      }
      setOtp(newOtp);
    }
  };

  // Handle verify
  const handleVerify = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 4) {
      console.log('Verifying OTP:', enteredOtp);
      // Add your verification logic here
    }
  };

  // Handle resend OTP
  const handleResend = () => {
    console.log('Resending OTP...');
    setResendDisabled(true);
    setCountdown(30);
    // Add your resend logic here
  };

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with back button */}
          <div className="p-4 border-b border-gray-200">
            <a href="#" className="inline-block">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-gray-600 hover:text-indigo-600 transition duration-200"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </a>
          </div>
          
          {/* OTP Content */}
          <div className="p-6 sm:p-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-10 w-10 text-indigo-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">Verification</h3>
            <p className="text-gray-600 text-center mb-8">
              We have sent the login OTP on your registered mobile number.
            </p>

            {/* OTP Inputs */}
            <div className="mb-8">
              <div className="flex justify-center space-x-4 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-16 h-16 text-3xl text-center border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition duration-200"
                  />
                ))}
              </div>
              <button
                onClick={handleVerify}
                disabled={otp.join('').length !== 4}
                className={`w-full py-3 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ${
                  otp.join('').length !== 4 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Verify
              </button>
            </div>

            {/* Resend OTP */}
            <div className="text-center">
              <p className="text-gray-600 mb-1">Didn't receive any code?</p>
              <button
                onClick={handleResend}
                disabled={resendDisabled}
                className={`text-indigo-600 font-medium hover:text-indigo-800 hover:underline transition duration-200 ${
                  resendDisabled ? 'text-gray-400 cursor-not-allowed' : ''
                }`}
              >
                {resendDisabled ? `Resend OTP in ${countdown}s` : 'Resend New OTP'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
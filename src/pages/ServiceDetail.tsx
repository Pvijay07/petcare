import React, { useState } from 'react';
import { ArrowLeft, Plus, Check, Clock, Star, Bone } from 'lucide-react';

const PetBookingService = () => {
  const [selectedPackageType, setSelectedPackageType] = useState('perday');
  const [selectedServiceDays, setSelectedServiceDays] = useState('mon-sat');
  const [selectedWalksPerDay, setSelectedWalksPerDay] = useState('2');
  const [selectedTime, setSelectedTime] = useState('');
  const [customTime, setCustomTime] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [packageSelected, setPackageSelected] = useState(false);

  const packageTypes = [
    {
      id: 'monthly',
      name: 'Monthly Package',
      icon: Star,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'perday',
      name: 'Per Day Package',
      icon: Bone,
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const serviceDays = [
    { id: 'mon-sat', label: 'Mon-Sat' },
    { id: 'mon-sun', label: 'Mon-Sun' }
  ];

  const walkOptions = [
    { id: '1', label: '1 Walk' },
    { id: '2', label: '2 Walk' },
    { id: '3', label: '3 Walk' }
  ];

  const timeSlots = [
    { id: 'morning', label: 'Morning', suffix: 'AM' },
    { id: 'afternoon', label: 'Afternoon', suffix: 'PM' },
    { id: 'evening', label: 'Evening', suffix: 'PM' }
  ];

  const features = [
    'Booking Guarantee',
    'Professional Dog Walker Only',
    'Secure Payment',
    'Assured Service',
    'Each Walk Duration: 30min'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
          <div className="flex items-center space-x-4">
            <button className="text-white hover:bg-white/20 rounded-full p-2 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-white text-lg font-semibold">Booking Summary</h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* My Pet Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">My Pet</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    🐕
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                </div>
                <p className="text-center text-sm font-medium mt-2">Zoro</p>
              </div>
              <button className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center hover:border-indigo-400 transition-colors">
                <Plus size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Service Type */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Service Type</h2>
            <div className="grid grid-cols-1 gap-3">
              {packageTypes.map((pkg) => {
                const Icon = pkg.icon;
                return (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackageType(pkg.id)}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      selectedPackageType === pkg.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <Icon 
                        size={20} 
                        className={selectedPackageType === pkg.id ? 'text-indigo-600' : 'text-gray-500'} 
                      />
                      <span className={`font-medium ${
                        selectedPackageType === pkg.id ? 'text-indigo-700' : 'text-gray-700'
                      }`}>
                        {pkg.name}
                      </span>
                      <Icon 
                        size={20} 
                        className={selectedPackageType === pkg.id ? 'text-indigo-600' : 'text-gray-500'} 
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Package Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Select Package</h2>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
              {/* Dog Walking Header */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🐕‍🦺</span>
                </div>
                {selectedPackageType === 'monthly' && (
                  <div className="mb-2">
                    <span className="text-2xl font-bold text-indigo-600">₹96/-</span>
                    <p className="text-sm text-gray-600">Per Walk</p>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-800">Dog Walking</h3>
              </div>

              {/* Service Days (Monthly only) */}
              {selectedPackageType === 'monthly' && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Required Service Days</h4>
                  <div className="flex space-x-2">
                    {serviceDays.map((day) => (
                      <button
                        key={day.id}
                        onClick={() => setSelectedServiceDays(day.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedServiceDays === day.id
                            ? 'bg-indigo-500 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Walks Per Day */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Required Walk Per Day</h4>
                <div className="flex space-x-2">
                  {walkOptions.map((walk) => (
                    <button
                      key={walk.id}
                      onClick={() => setSelectedWalksPerDay(walk.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedWalksPerDay === walk.id
                          ? 'bg-indigo-500 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {walk.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check size={16} className="text-green-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Select Package Button */}
              <button
                onClick={() => setPackageSelected(!packageSelected)}
                className={`w-full py-3 rounded-xl font-medium transition-colors ${
                  packageSelected
                    ? 'bg-green-500 text-white'
                    : 'bg-indigo-500 text-white hover:bg-indigo-600'
                }`}
              >
                {packageSelected ? 'Package Selected ✓' : 'Select Package'}
              </button>
            </div>
          </div>

          {/* Service Date */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Service Required Date</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <label className="block text-xs text-gray-500 mt-1">From</label>
              </div>
              <div>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <label className="block text-xs text-gray-500 mt-1">To</label>
              </div>
            </div>
          </div>

          {/* Preferable Time */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <Clock size={20} className="text-indigo-500" />
              <h2 className="text-lg font-semibold text-gray-800">Select Preferable Time</h2>
            </div>
            
            <div className="space-y-3">
              {timeSlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`flex items-center justify-between p-4 border-2 rounded-xl transition-colors ${
                    selectedTime === slot.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id={slot.id}
                      name="timeSlot"
                      checked={selectedTime === slot.id}
                      onChange={() => setSelectedTime(slot.id)}
                      className="w-4 h-4 text-indigo-600"
                    />
                    <label htmlFor={slot.id} className="font-medium text-gray-700">
                      {slot.label}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="00:00"
                      value={selectedTime === slot.id ? customTime : ''}
                      onChange={(e) => selectedTime === slot.id && setCustomTime(e.target.value)}
                      className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <span className="text-sm text-gray-500">{slot.suffix}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Proceed Button */}
          <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-lg">
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetBookingService;
import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Star, Shield, Eye, CheckCircle, User, Calendar, Clock, Phone, MessageCircle } from 'lucide-react';

const BookingsComponent = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const bookings = [
    {
      id: 1,
      name: "Kiran",
      location: "Bangalore",
      rating: 4.4,
      cost: 8000,
      service: "Training",
      image: "/api/placeholder/80/80",
      status: "active",
      verified: true,
      completedDate: null,
      description: "Professional dog training with 5+ years experience"
    },
    {
      id: 2,
      name: "Raju",
      location: "Hyderabad",
      rating: 4.4,
      cost: 6000,
      service: "Walking",
      image: "/api/placeholder/80/80",
      status: "active",
      verified: true,
      completedDate: null,
      description: "Daily pet walking services in your neighborhood"
    },
    {
      id: 3,
      name: "Jayanth",
      location: "Hyderabad",
      rating: 4.4,
      cost: 7000,
      service: "Boarding",
      image: "/api/placeholder/80/80",
      status: "completed",
      verified: true,
      completedDate: "2024-01-15",
      description: "Pet boarding with 24/7 care and attention"
    },
    {
      id: 4,
      name: "Lokesh",
      location: "Hyderabad",
      rating: 4.4,
      cost: 4000,
      service: "Grooming",
      image: "/api/placeholder/80/80",
      status: "active",
      verified: true,
      completedDate: null,
      description: "Professional pet grooming and spa services"
    }
  ];

  const handleGoHome = () => {
    console.log('Navigate to home');
  };

  const handleViewProfile = (booking) => {
    console.log('View profile:', booking.name);
    setSelectedBooking(booking);
  };

  const handleViewDetails = (booking) => {
    console.log('View details for:', booking.service);
  };

  const filteredBookings = activeFilter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === activeFilter);

  const getServiceIcon = (service) => {
    switch (service.toLowerCase()) {
      case 'training': return '🎓';
      case 'walking': return '🚶';
      case 'boarding': return '🏠';
      case 'grooming': return '✂️';
      default: return '🐕';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
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
              <Calendar className="w-7 h-7 text-purple-600" />
              <span>My Bookings</span>
            </h1>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={`mb-6 transition-all duration-700 delay-100 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'All Bookings', count: bookings.length },
                { key: 'active', label: 'Active', count: bookings.filter(b => b.status === 'active').length },
                { key: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                    activeFilter === filter.key
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking, index) => (
            <div
              key={booking.id}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${200 + index * 150}ms`,
                animationDelay: `${200 + index * 150}ms`
              }}
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Profile Image */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {booking.name.charAt(0)}
                    </div>
                    {booking.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 shadow-lg">
                        <Shield className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{booking.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{booking.rating}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                        {booking.status === 'completed' ? (
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3" />
                            <span>Completed</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>Active</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Service and Cost */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-purple-100 rounded-full p-2 text-2xl">
                          {getServiceIcon(booking.service)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{booking.service}</p>
                          <p className="text-sm text-gray-600">{booking.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600">₹{booking.cost.toLocaleString()}/-</p>
                        <p className="text-sm text-gray-600">Package Cost</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      {booking.status === 'completed' ? (
                        <button
                          onClick={() => handleViewDetails(booking)}
                          className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Service Completed</span>
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleViewProfile(booking)}
                            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
                          >
                            <User className="w-4 h-4" />
                            <span>View Profile</span>
                          </button>
                          <button
                            onClick={() => handleViewDetails(booking)}
                            className="flex-1 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </button>
                        </>
                      )}
                    </div>

                    {/* Completed Date */}
                    {booking.completedDate && (
                      <div className="mt-3 text-sm text-gray-500 flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Completed on {new Date(booking.completedDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No bookings found</h3>
            <p className="text-gray-500">Try adjusting your filter or check back later</p>
          </div>
        )}

        {/* Profile Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full transform animate-in zoom-in-95 duration-300">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg mx-auto mb-4">
                  {selectedBooking.name.charAt(0)}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{selectedBooking.name}</h3>
                <div className="flex items-center justify-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedBooking.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{selectedBooking.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="text-2xl">{getServiceIcon(selectedBooking.service)}</div>
                    <div>
                      <p className="font-semibold text-gray-800">{selectedBooking.service}</p>
                      <p className="text-sm text-gray-600">{selectedBooking.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Package Cost:</span>
                  <span className="text-2xl font-bold text-purple-600">₹{selectedBooking.cost.toLocaleString()}/-</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-medium"
                >
                  Close
                </button>
                <button className="flex-1 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Contact</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <div className={`fixed bottom-6 right-6 transition-all duration-700 delay-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <button className="bg-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 active:scale-95">
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingsComponent;
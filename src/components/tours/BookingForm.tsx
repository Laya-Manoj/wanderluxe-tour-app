import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, CreditCard, Lock } from 'lucide-react';

interface BookingFormProps {
  tourId: number;
  tourPrice: number;
}

const BookingForm = ({ tourId, tourPrice }: BookingFormProps) => {
  const [step, setStep] = useState(1);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    travelers: 2,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    paymentMethod: 'card',
  });

  const [isBooking, setIsBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Mock available dates
  const availableDates = [
    { date: '2025-05-15', spotsLeft: 6 },
    { date: '2025-06-12', spotsLeft: 4 },
    { date: '2025-07-10', spotsLeft: 8 },
    { date: '2025-08-14', spotsLeft: 2 },
    { date: '2025-09-18', spotsLeft: 7 },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Simulate booking process
      setIsBooking(true);
      setTimeout(() => {
        setIsBooking(false);
        setBookingComplete(true);
      }, 1500);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const totalPrice = tourPrice * formData.travelers;

  return (
    <div>
      {bookingComplete ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-4"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Booking Confirmed!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for your booking. A confirmation has been sent to your email.
          </p>
          <button 
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition w-full"
            onClick={() => window.location.href = '/account/bookings'}
          >
            View My Bookings
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Departure Date
                </label>
                <div className="relative">
                  <select
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    required
                  >
                    <option value="">Choose a date</option>
                    {availableDates.map((option) => (
                      <option key={option.date} value={option.date}>
                        {new Date(option.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} 
                        {' '}- {option.spotsLeft} spots left
                      </option>
                    ))}
                  </select>
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Travelers
                </label>
                <div className="relative">
                  <select
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>{num} {num === 1 ? 'traveler' : 'travelers'}</option>
                    ))}
                  </select>
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
              
              <div className="pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Price per person</span>
                  <span>${tourPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total price</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 mt-4 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition"
                disabled={!formData.date}
              >
                Continue to Booking
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <h3 className="font-medium">Traveler Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requests (Optional)
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div className="pt-2">
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                >
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
                    <span>Payment Options</span>
                  </div>
                  <svg className={`w-5 h-5 transition-transform duration-200 ${showPaymentOptions ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showPaymentOptions && (
                  <div className="mt-3 bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="card"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <label htmlFor="card" className="ml-2 text-sm text-gray-700">Credit/Debit Card</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="gpay"
                          name="paymentMethod"
                          value="gpay"
                          checked={formData.paymentMethod === 'gpay'}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <label htmlFor="gpay" className="ml-2 text-sm text-gray-700">Google Pay</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="netbanking"
                          name="paymentMethod"
                          value="netbanking"
                          checked={formData.paymentMethod === 'netbanking'}
                          onChange={handleChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <label htmlFor="netbanking" className="ml-2 text-sm text-gray-700">Net Banking</label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="pt-2">
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Lock className="h-4 w-4 mr-2" />
                  <span>Secure payment processed with 256-bit encryption</span>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <button
                    type="submit"
                    className="w-full py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition flex justify-center items-center"
                    disabled={isBooking}
                  >
                    {isBooking ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      `Complete Booking • $${totalPrice.toLocaleString()}`
                    )}
                  </button>
                  
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-800 text-sm text-center"
                    onClick={handleBack}
                    disabled={isBooking}
                  >
                    &larr; Back to dates and travelers
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </form>
      )}
    </div>
  );
};

export default BookingForm;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { addPoints } from '../store/loyaltyPoints';

function Book_hotel() {
  const location = useLocation();
  const currentUser = useSelector(state => state.auth?.userData);
  console.log(currentUser);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { selectedHotel } = location.state || {}


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const bookHotel = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setMessage("");
      

      const response = await axios.post(`/api/v1/hotels/bookHotel/${selectedHotel._id}`, {
        userId: currentUser._id,
        hotelId: selectedHotel._id,
        ...formData,
      });

      console.log(response.data);


      setMessage("Booking successful!");
    } catch (error) {
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 flex flex-col items-center">
      {/* Hotel Card with Image and Info */}
      <div className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-xl mb-8">
        <div className="relative h-64 md:h-80 w-full">
          <img
            src={selectedHotel.image[0]}
            alt={selectedHotel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold">{selectedHotel.name}</h1>
            <div className="flex items-center mt-2">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <p className="text-lg">{selectedHotel.place}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 py-4 px-6">
            <h2 className="text-2xl font-bold text-white">Book Your Stay</h2>
            <p className="text-indigo-100">Complete the form to reserve your room</p>
          </div>

          <form onSubmit={handleSubmit(bookHotel)} className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Full Name"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    {...register('fullName', { required: true })}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {errors.fullName && <p className="text-sm text-red-600">Full name is required</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Your Email"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    {...register('email', { required: true })}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>
                {errors.email && <p className="text-sm text-red-600">Valid email is required</p>}
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
                  Guests <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="guests"
                    min="1"
                    max="10"
                    placeholder="2"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    {...register('guests', { required: true })}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                </div>
                {errors.guests && <p className="text-sm text-red-600">Number of guests is required</p>}
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                  Mobile <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    {...register('phone', { required: true })}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {errors.mobile && <p className="text-sm text-red-600">Mobile number is required</p>}
              </div>

              {/* Check-in Date */}
              <div className="space-y-2">
                <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
                  Check-in <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="checkIn"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    {...register('checkIn', { required: true })}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {errors.checkIn && <p className="text-sm text-red-600">Check-in date is required</p>}
              </div>

              {/* Check-out Date */}
              <div className="space-y-2">
                <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
                  Check-out <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="checkOut"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    {...register('checkOut', { required: true })}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {errors.checkOut && <p className="text-sm text-red-600">Check-out date is required</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Confirm Booking'
                )}
              </button>
            </div>

            {/* Status Messages */}
            {message && (
              <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700">
                {message}
              </div>
            )}
            {error && (
              <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Book_hotel;

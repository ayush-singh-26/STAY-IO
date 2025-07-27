import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Book_hotel() {
  const { hotelId } = useParams();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const currentUser = useSelector(state => state.auth?.userData);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const checkInDate = searchParams.get('checkInDate');  
  const checkOutDate = searchParams.get('checkOutDate');
  const guestCount = Number(searchParams.get('guests'));


  useEffect(() => {
    axios.get(`/api/v1/hotels/getHotelById/${hotelId}`)
      .then((res) => {
        setSelectedHotel(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching booking details:", err);
        setError("Failed to load hotel details");
      });
  }, [hotelId]);

  const bookHotel = async (formData) => {
    try {
      const response = await axios.post(`/api/v1/booking/create-booking/${hotelId}`, {
        checkInDate,
        checkOutDate,
        guests : guestCount,
        ...formData,
      });
    } catch (err) {
      console.error("Booking error:", err);
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!selectedHotel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p>Loading hotel details...</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Book Your Stay</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Hotel Image and Details */}
          <div className="w-full lg:w-1/2">
            {/* Hotel Image */}
            <div className="rounded-xl overflow-hidden shadow-lg mb-6">
              <img
                src={selectedHotel.images?.[0]}
                alt={selectedHotel.name}
                className="w-full h-64 sm:h-80 md:h-96 object-cover"
              />
            </div>

            {/* Hotel Details */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedHotel.name}</h2>
              <div className="flex items-center text-gray-600 mb-4">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{selectedHotel.place}</span>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="font-semibold text-lg mb-3">Your Booking Details</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Check-in</p>
                    <p className="font-medium">{checkInDate}</p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Check-out</p>
                    <p className="font-medium">{checkOutDate}</p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="font-medium">{guestCount}</p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Price per night</p>
                    <p className="font-medium">${selectedHotel.price}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-indigo-700 py-4 px-6">
                <h2 className="text-xl font-bold text-white">Personal Information</h2>
                <p className="text-indigo-100">Please fill in your details</p>
              </div>

              <form onSubmit={handleSubmit(bookHotel)} className="p-6 space-y-5">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    defaultValue={currentUser?.fullname || ''}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    {...register('fullName', { required: 'Full name is required' })}
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={currentUser?.email || ''}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{3,6}$/im,
                        message: "Invalid phone number"
                      }
                    })}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                </div>

                {/* <div>
                  <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    id="specialRequests"
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    {...register('specialRequests')}
                  />
                </div> */}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
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
                  <div className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                    {message}
                  </div>
                )}
                {error && (
                  <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book_hotel;
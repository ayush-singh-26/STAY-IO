import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addPoints } from '../store/loyaltyPoints';

function Book_hotel() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
    }
  });

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.userData);
  console.log(currentUser);

  const selectedHotel = useSelector((state) => state.search.selectedHotel);
  console.log(selectedHotel);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const checkInDate = watch("checkIn");
  const checkOutDate = watch("checkOut");

  const bookHotel = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setMessage("");

      const response = await axios.post('/api/v1/hotels/bookHotel', {
        userId: currentUser._id,
        hotelId: selectedHotel._id,
        hotelName: selectedHotel.name,
        place: selectedHotel.place,
        price: selectedHotel.price + selectedHotel.taxes,
        image: selectedHotel.image[0],
        ...formData,
      });

      const loyaltyPoints = await axios.patch(`/api/v1/hotels/loyaltyPoints/${selectedHotel._id}`, {
        userId: currentUser._id,
      },

        // dispatch(addPoints(loyaltyPoints.loyaltyPoints))
      )
      console.log(loyaltyPoints)



      setMessage("Booking successful!");
    } catch (error) {
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="bg-gray-100 min-h-screen p-6 flex flex-col items-center">
      {/* Hotel Image */}
      <div className="w-full max-w-4xl mb-6 rounded-lg overflow-hidden shadow-lg">
        <img src={selectedHotel.image[0]} alt={selectedHotel.name} className="w-full h-80 object-cover" />
      </div>

      {/* Hotel Information */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-semibold text-gray-800">{selectedHotel.name}</h1>
        <p className="text-xl text-gray-500">{selectedHotel.place}</p>
      </div>

      {/* Booking Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Book Your Stay</h2>

        <form onSubmit={handleSubmit(bookHotel)} className="space-y-4">
          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="fullname" className="font-medium text-gray-700">Full Name:</label>
            <input
              type="text"
              placeholder="Enter Your Full Name"
              className="border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              {...register('name', { required: true })}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">Full name is required</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-gray-700">Email:</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              {...register('email', { required: true })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
          </div>

          {/* Number of Guests */}
          <div className="flex flex-col">
            <label htmlFor="guests" className="font-medium text-gray-700">Number of Guests:</label>
            <input
              type="number"
              placeholder="Enter Number of Guests"
              className="border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              {...register('guests', { required: true })}
            />
            {errors.guests && <p className="text-red-500 text-sm mt-1">Number of guests is required</p>}
          </div>

          {/* Check-in Date */}
          <div className="flex flex-col">
            <label htmlFor="checkIn" className="font-medium text-gray-700">Check-in Date:</label>
            <input
              type="date"
              className="border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              {...register('checkIn', { required: true })}
            />
            {errors.checkIn && <p className="text-red-500 text-sm mt-1">Check-in date is required</p>}
          </div>

          {/* Check-out Date */}
          <div className="flex flex-col">
            <label htmlFor="checkOut" className="font-medium text-gray-700">Check-out Date:</label>
            <input
              type="date"
              className="border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              {...register('checkOut', { required: true })}
            />
            {errors.checkOut && <p className="text-red-500 text-sm mt-1">Check-out date is required</p>}
          </div>

          {/* Mobile Number */}
          <div className="flex flex-col">
            <label htmlFor="mobile" className="font-medium text-gray-700">Mobile Number:</label>
            <input
              type="tel"
              placeholder="Enter Your Mobile Number"
              className="border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              {...register('mobile', { required: true })}
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">Mobile number is required</p>}
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-colors"

            >
              {loading ? 'Booking...' : 'Book Now'}
            </button>
          </div>

          {/* Success or Error Message */}
          {message && <p className="text-green-500 text-center mt-4">{message}</p>}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Book_hotel;

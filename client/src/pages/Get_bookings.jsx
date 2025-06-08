import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Get_bookings() {
    const [bookings, setBookings] = React.useState([]);
    const navigate = useNavigate();
    console.log(bookings);

    useEffect(() => {
        const fetchBookings = async () => {
            const response = await axios.get('/api/v1/hotels/getBookings');
            console.log(response.data);
            setBookings(response.data.data);

        }
        fetchBookings();

    }, []);



    const cancelBooking = async (id) => {
        try {
            console.log(id);
            const response = await axios.delete(`/api/v1/hotels/cancelBookings/${id}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error cancelling booking:', error.message);
        }
    };



    return (
        <div className="p-4 max-w-7xl mx-auto">
            {bookings.length > 0 ? (
                <ul className="grid grid-cols-1 gap-6">
                    {bookings.map((booking) => (
                        <li
                            key={booking._id}
                            className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                        >
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/5">
                                    <img
                                        src={booking?.hotelId?.image?.[0] || '/placeholder-hotel.jpg'}
                                        className="w-full h-64 md:h-full object-cover"
                                        alt={booking.hotelId?.name}
                                        onError={(e) => {
                                            e.target.src = '/placeholder-hotel.jpg';
                                        }}
                                    />
                                </div>

                                <div className="p-6 md:w-3/5">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-1">{booking.hotelId?.name}</h2>
                                            <div className="flex items-center text-sm text-gray-600 mb-4">
                                                <span className="mr-2">⭐ {booking.hotelId?.rating || '4.5'}</span>
                                                <span>•</span>
                                                <span className="ml-2">{booking.hotelId?.location || 'City, Country'}</span>
                                            </div>
                                        </div>
                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            {booking.status || 'Confirmed'}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div className="space-y-2">
                                            <p className="text-gray-600">
                                                <span className="font-medium text-gray-900">Booked By:</span> {booking.fullName}
                                            </p>
                                            <p className="text-gray-600">
                                                <span className="font-medium text-gray-900">Email:</span> {booking.email}
                                            </p>
                                            <p className="text-gray-600">
                                                <span className="font-medium text-gray-900">Guests:</span> {booking.guests || '1'}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-gray-600">
                                                <span className="font-medium text-gray-900">Check-in:</span> {new Date(booking.checkIn).toLocaleDateString()}
                                            </p>
                                            <p className="text-gray-600">
                                                <span className="font-medium text-gray-900">Check-out:</span> {new Date(booking.checkOut).toLocaleDateString()}
                                            </p>
                                            <p className="text-gray-600">
                                                <span className="font-medium text-gray-900">Total Price:</span> ₹{booking.hotelId?.price * (new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24) || booking.hotelId?.price}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                                        <button
                                            onClick={() => cancelBooking(booking.hotelId._id)}
                                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                                        >
                                            Cancel Booking
                                        </button>
                                        <button className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors text-sm font-medium">
                                            View Receipt
                                        </button>
                                        <button className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors text-sm font-medium">
                                            Contact Hotel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center py-16">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No bookings found</h3>
                    <p className="text-gray-500 max-w-md mx-auto">You haven't made any reservations yet. Start exploring hotels to book your stay.</p>
                    <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium">
                        Browse Hotels
                    </button>
                </div>
            )}
        </div>
    );

}
export default Get_bookings

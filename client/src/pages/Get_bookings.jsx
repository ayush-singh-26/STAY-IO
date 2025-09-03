import axios from "axios";
import { useState, useEffect } from "react";
import { FiCalendar, FiMapPin, FiXCircle, FiCheckCircle, FiClock } from "react-icons/fi";
import { toast } from "react-toastify";

function Get_bookings() {
    const [bookings, setBookings] = useState([]);    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('/api/v1/booking/getUser-booking');
                setBookings(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [bookings]);

    const cancelBooking = async (bookingId) => {
        try {
            await axios.patch(`/api/v1/booking/cancel-booking/${bookingId}`);
            toast.success('Your booking is cancelled')
        } catch (error) {
            setError('Failed to cancel booking. Please try again.');
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const createCheckoutSession = async(bookingId)=>{        
        const response = await axios.post('/api/v1/hotels/checkout/create-checkout-session',{bookingId});
        console.log(response);
        window.location.href = response.data.url;
    }


    if (bookings.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900">No bookings found</h3>
                    <p className="mt-1 text-sm text-gray-500">You haven't made any bookings yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div className="mb-4 md:mb-0">
                    <h1 className="text-2xl font-bold text-gray-800">Your Bookings</h1>
                    <p className="text-gray-600 mt-1">Manage your upcoming and past reservations</p>
                </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hotel Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                    Dates
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {bookings.map((booking) => (
                                <tr key={booking._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-24 w-32 rounded-md overflow-hidden">
                                                <img
                                                    className="h-full w-full object-cover"
                                                    src={booking.hotel?.images?.[0] || 'https://via.placeholder.com/150'}
                                                    alt={booking.hotel?.name}
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{booking.hotel?.name}</div>
                                                <div className="text-sm text-gray-500 flex items-center mt-1">
                                                    <FiMapPin className="mr-1" size={14} />
                                                    {booking.hotel?.place}
                                                </div>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    Guests: {booking.guestCount || 1}
                                                </div>
                                                <div className="text-sm font-medium text-gray-900 mt-1">
                                                    {booking.totalPrice?.toFixed(2) || '0.00'}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                                        <div className="text-sm text-gray-900">
                                            <div className="flex items-center">
                                                <FiCalendar className="mr-1" size={14} />
                                                {formatDate(booking.checkInDate)}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">to {formatDate(booking.checkOutDate)}</div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'completed'
                                                ? 'bg-green-100 text-green-800'
                                                : booking.status === 'cancelled'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {booking.status}
                                            </span>

                                            {booking.status === 'pending' && (
                                                <button
                                                    onClick={() => createCheckoutSession(booking._id)}
                                                    className="px-3 py-1 text-sm rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors"
                                                >
                                                    Pay Now
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-start space-x-2">
                                            {['completed', 'pending'].includes(booking.status.toLowerCase()) && (
                                                <button
                                                    onClick={() => cancelBooking(booking._id)}
                                                    className="text-red-600 hover:text-red-900 hover:underline"
                                                >
                                                    Cancel
                                                </button>
                                            )}

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Get_bookings;
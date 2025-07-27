import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Comment from "../components/Comment";

function Hotel_details() {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [guestCount, setGuestCount] = useState(1)
  const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);


  useEffect(() => {
    axios.get(`/api/v1/hotels/getHotelById/${hotelId}`)
      .then((res) => {
        setSelectedHotel(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching booking details:", err);
      });
  }, [hotelId])

  const deleteHotel = async () => {
    try {
      const response = await axios.delete(`/api/v1/hotels/deleteHotel/${selectedHotel._id}`);
      navigate('/');
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  }


  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full mb-8 rounded-xl overflow-hidden shadow-lg">
        <div className="md:col-span-2 md:row-span-2 relative group">
          <img className="object-cover w-full h-full min-h-[400px] transition-transform duration-500 group-hover:scale-105" src={selectedHotel?.images[0]} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {selectedHotel?.images.slice(1, 5).map((image, index) => (
          <div key={index} className="relative group hidden md:block">
            <img
              className="object-cover w-full h-48 transition-transform duration-500 group-hover:scale-105"
              src={image}
              alt={`${selectedHotel?.name} ${index + 2}`}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{selectedHotel?.name}</h1>
                <div className="flex items-center text-gray-600 mb-3">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-lg">{selectedHotel?.place}</span>
                </div>
              </div>
              <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
                <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">{selectedHotel?.rating}</span>
              </div>
            </div>

            <p className="text-gray-700 mt-4">{selectedHotel?.additional}</p>
            <p className="mt-4 text-gray-700 leading-relaxed">{selectedHotel?.description}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedHotel?.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <Comment selectedHotel={selectedHotel} />
          </div>
        </div>

        <div className="sticky top-6 h-fit">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Stay</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Room Type:</span>
                <span className="font-medium">Deluxe Suite</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-In:</span>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Check-Out:</span>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guests:</span>
                <div className="relative">
                  <select
                    id="guests"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                    <option value="7+">7+ Guests</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Base Price:</span>
                <span className="font-medium">₹{selectedHotel?.price}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Taxes & Fees:</span>
                <span className="font-medium">₹{selectedHotel?.taxes}</span>
              </div>
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Non-refundable
              </p>
            </div>

            <div className="space-y-3">
              <button
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center"
                onClick={() => navigate(`booking?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guests=${guestCount}`)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Book Now
              </button>

              <button
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center"
                onClick={() => handleClickHotel(selectedHotel._id)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Update Hotel
              </button>

              <button
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center"
                onClick={deleteHotel}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Hotel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <h3 className="text-xl font-medium text-gray-600">Thank you for choosing {selectedHotel?.name}</h3>
        <p className="text-gray-500 mt-2">We look forward to serving you</p>
      </div>
    </div>
  );
}

export default Hotel_details;

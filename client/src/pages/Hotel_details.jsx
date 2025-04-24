import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Comment from "../components/Comment";

function Hotel_details() {
  const navigate = useNavigate();
  const selectedHotel = useSelector((state) => state.search.selectedHotel);
  console.log(selectedHotel);
  
  if (!selectedHotel) {
    return <p>Loading...</p>;
  }

  const deleteHotel = async () => {
    try {
      const response = await axios.delete(`/api/v1/hotels/deleteHotel/${selectedHotel._id}`);
      console.log(response.data);
      navigate('/searchHotel');
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  }


  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col">
        {/* Image Grid */}
        <div className="grid grid-cols-4 gap-4 w-full mb-6 rounded-lg overflow-hidden">
          <div className="col-span-2 row-span-2">
            <img
              className="object-cover w-full h-full"
              src={selectedHotel.image[0]}
              alt={`${selectedHotel.name} 1`}
            />
          </div>

          {/* Top-right images */}
          {selectedHotel.image.slice(1, 5).map((image, index) => (
            <div key={index}>
              <img
                className="object-cover w-full h-48"
                src={image}
                alt={`${selectedHotel.name} ${index + 2}`}
              />
            </div>
          ))}
        </div>

        {/* Hotel Details */}
        <div className="w-full bg-white rounded-lg p-6 shadow-md mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{selectedHotel.name}</h1>
          <h2 className="text-2xl text-gray-600 mb-1">{selectedHotel.place}</h2>
          <p className="text-gray-700">{selectedHotel.additional}</p>
          <p className="mt-4 text-gray-700">{selectedHotel.description}</p>
        </div>

        {/* Features */}
        <div className="bg-gray-100 rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-semibold text-blue-600 mb-4">Features & Amenities</h1>
          <ul className="list-disc pl-5 text-gray-700">
            {selectedHotel.amenities.map((amenity, index) => (
              <li key={index} className="mb-2">{amenity}</li>
            ))}
          </ul>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <h1 className="text-xl font-bold text-gray-800 mb-4">Total Price Breakdown:</h1>
          <div className="space-y-2">
            <p className="text-gray-700">Base Price: <span className="font-semibold">₹{selectedHotel.price}</span></p>
            <p className="text-gray-700">For 2 adults: <span className="font-semibold">₹{selectedHotel.price * 2}</span></p>
            <p className="text-gray-700">Room: <span className="font-semibold">Steel</span></p>
            <p className="text-gray-700">Taxes & Fees: <span className="font-semibold">₹{selectedHotel.taxes}</span></p>
            <p className="text-xl font-semibold text-gray-800">Total: ₹{selectedHotel.price * 2 + selectedHotel.taxes}</p>
          </div>
          <p className="text-red-500 mt-2">Non-refundable</p>
        </div>

        {/* Booking Button */}
        <button
          className="w-full p-4 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300 mb-6"
          onClick={() => navigate(`/booking/${selectedHotel._id}`)}
        >
          Book Now
        </button>
        <button
          className="w-full p-4 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition-colors duration-300 mb-6"
          onClick={deleteHotel}
        >
          Delete This Hotel
        </button>
        <button
          className="w-full p-4 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-300"
          onClick={()=> navigate('/updateHotel')}
        >
          Update This Hotel
        </button>

        {/* Thank You */}
        <h1 className="text-center text-gray-600 mt-8 text-lg">Thank You for Choosing Us</h1>
      </div>
      <Comment/>
    </div>
  );
}

export default Hotel_details;

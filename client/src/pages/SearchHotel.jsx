import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSearchResults, setSelectedHotel } from "../store/SearchSlice";
import { Link } from "react-router-dom";

function SearchHotel() {
  const [sort, setSort] = useState("price");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const searchResults = useSelector((state) => state.search.searchResults) || [];

  useEffect(() => {
    const fetchHotelsData = async () => {
      try {
        const response = await axios.get("/api/v1/hotels/getHotel", {
          params: {
            place: searchQuery,
            sort: `${sort}:${order}`,
          },
        });
        dispatch(setSearchResults(response.data.hotels));
      } catch (error) {
        setError("Unable to fetch hotel data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchHotelsData();
    }
  }, [searchQuery, sort, order, dispatch]);

  const handleHotelClick = (hotel) => {
    dispatch(setSelectedHotel(hotel));
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleDescription=(str)=>{
    str=str.substr(0,100)+"..."
    return str;
  }

  return searchResults.length > 0 ? (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-7xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 rounded-t-lg flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Search results for <span className="capitalize">{searchQuery}</span>: {searchResults.length}
        </h1>
        <div className="flex items-center gap-4">
          <span>Sort by:</span>
          <select
            className="p-2 rounded-md bg-white text-gray-800 border border-gray-300"
            value={sort}
            onChange={handleSortChange}
          >
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {/* Hotel List */}
      <h2 className="text-3xl font-semibold text-gray-800 my-6">Available Hotels</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((hotel) => (
          <li
            key={hotel._id}
            className="bg-white p-6 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-xl"
          >
            <Link to={`/${hotel._id}`} onClick={() => handleHotelClick(hotel)} className="block">
              <img
                className="w-full h-48 object-cover rounded-md mb-4"
                src={hotel.image[0]}
                alt={`Image of ${hotel.name}`}
              />
              <h1 className="text-xl font-semibold text-gray-900 mb-2">{hotel.name}</h1>
              <p className="text-lg text-gray-600 mb-2">
                ₹{hotel.price} + ₹{hotel.taxes} taxes
              </p>
              <p className="text-sm text-gray-500 mb-4">{handleDescription(hotel.description)}</p>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                View Details
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p className="text-center text-gray-500 p-4">No hotel data available</p>
  );
}

export default SearchHotel;

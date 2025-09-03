import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Hotel_Card from "./Hotel_Card";

function SearchHotel() {
  const [sort, setSort] = useState("price");
  const [order, setOrder] = useState("asc");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { searchQuery } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults);
  

  useEffect(() => {
    const fetchHotelsData = async () => {
      setLoading(true); 
      try {
        const response = await axios.get("/api/v1/hotels/getHotel", {
          params: {
            place: searchQuery,
            sort: `${sort}:${order}`,
          },
        });
        console.log(response.data);
        
        setSearchResults(response.data.hotels);
        setError("");
      } catch (error) {
        console.error(error);
        setError("Unable to fetch hotel data. Please try again later.");
        setSearchResults([]);
      } finally {
        setLoading(false); 
      }
    };

    if (searchQuery) {
      fetchHotelsData();
    }
  }, [searchQuery, sort, order]);

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  if (loading) {
    return <p className="text-center text-blue-600 p-6 text-xl">Loading hotels...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 p-6">{error}</p>;
  }

  if (searchResults?.length === 0) {
    return <p className="text-center text-gray-500 p-4">No hotel data available</p>;
  }

  return (
    <div className="mx-auto p-6 bg-white shadow-lg rounded-lg max-w-7xl">
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

      <h2 className="text-3xl font-semibold text-gray-800 my-6">Available Hotels</h2>
      <Hotel_Card searchResults={searchResults} />
    </div>
  );
}

export default SearchHotel;

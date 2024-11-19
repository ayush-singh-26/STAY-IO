import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery } from "../store/SearchSlice";
import { trending_places } from "../../config/trending_places";
import axios from "axios";

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchQuery = useSelector((state) => state.search.searchQuery);
    const searchResults = useSelector((state) => state.search.searchResults);

    const handleSearchInputChange = (place) => {
        dispatch(setSearchQuery(place)); 
        localStorage.setItem("place", query);
    };

    // Handle search button click
    const handleSearch = () => {
        if (searchQuery) {
            navigate("/searchHotel"); 
        } else {
            alert("Please enter a destination to search");
        }
    };

    const topRated = async () => {
        const response = await axios.get()
    }

    return (
        <>
            <div className="bg-cover bg-center h-80 lg:h-96" style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}>
                <div className="h-full flex flex-col items-center justify-center bg-black bg-opacity-60 p-4">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 animate-fadeInDown">
                        Sign in & Save Money
                    </h1>
                    <p className="text-lg lg:text-2xl text-white text-center animate-fadeInUp">
                        Save 10% or more at participating properties – just look for the blue Genius label.
                    </p>

                    {/* Search Bar Section */}
                    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-xl transition-shadow hover:shadow-2xl">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                            {/* Where */}
                            <div className="w-full lg:w-1/4">
                                <label htmlFor="destination" className="block text-gray-700 font-semibold mb-2">Where</label>
                                <input
                                    id="destination"
                                    className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchQuery || ""}
                                    onChange={(e) => handleSearchInputChange(e.target.value)}
                                    type="text"
                                    placeholder="Search destinations"
                                />
                            </div>

                            {/* Check-in */}
                            <div className="w-full lg:w-1/5">
                                <label htmlFor="checkin" className="block text-gray-700 font-semibold mb-2">Check-in</label>
                                <input
                                    id="checkin"
                                    className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="date"
                                />
                            </div>

                            {/* Check-out */}
                            <div className="w-full lg:w-1/5">
                                <label htmlFor="checkout" className="block text-gray-700 font-semibold mb-2">Check-out</label>
                                <input
                                    id="checkout"
                                    className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="date"
                                />
                            </div>

                            {/* Guests */}
                            <div className="w-full lg:w-1/5">
                                <label htmlFor="guests" className="block text-gray-700 font-semibold mb-2">Guests</label>
                                <input
                                    id="guests"
                                    className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    type="number"
                                    placeholder="Number of guests"
                                />
                            </div>

                            <button
                                onClick={handleSearch}
                                className="w-full lg:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-transform transform hover:scale-105 hover:bg-blue-700"
                            >
                                Search
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            {/* Trending Places Section */}
            <div className="max-w-6xl mx-auto mt-10 p-5">
                <h1 className="text-2xl font-bold text-white mb-6">Explore India</h1>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {trending_places.map((place) => (
                        <li
                            key={place.place}
                            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
                        >
                            <Link to={`/searchHotel`} onClick={() => handleSearchInputChange(place.place)}>
                                <img src={place.image} alt={place.place} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-900">{place.place}</h2>
                                    <p className="text-sm text-gray-600 mt-2">{place.description}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="max-w-6xl mx-auto mt-10 p-5">
                <h1 className="text-2xl font-bold text-white mb-6">Offers and Deals:</h1>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <div>

                    </div>
                    <div></div>
                </ul>
            </div>

            {/*browse Properties of previous searches*/}
            <div className="max-w-6xl mx-auto mt-10 p-5">
                <h1 className="text-2xl font-bold text-white mb-6">Continue browsing hotels in {searchQuery}</h1>
                <ul className="flex whitespace-nowrap overflow-auto space-x-4 hide-scrollbar">
                    {searchResults?.slice(0, 10).map((hotel) => (
                        <li
                            key={hotel._id}
                            className="w-72 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl flex-shrink-0"
                        >
                            <Link>
                                {/* Setting fixed width and height for the image */}
                                <div className="w-full h-48 overflow-hidden rounded-t-lg">
                                    <img
                                        src={hotel.image[0]}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-800">{hotel.name}</h2>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>

            </div>
            <div className="max-w-6xl mx-auto mt-10 p-5">
                <h1 className="text-2xl font-bold text-white mb-6">Most loving Hotel rooms</h1>
                <ul className="flex whitespace-nowrap overflow-auto space-x-4 hide-scrollbar">
                    {searchResults?.slice(0, 10).map((hotel) => (
                        <li
                            key={hotel._id}
                            className="w-72 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl flex-shrink-0"
                        >
                            <Link>
                                {/* Setting fixed width and height for the image */}
                                <div className="w-full h-48 overflow-hidden rounded-t-lg">
                                    <img
                                        src={hotel.image[0]}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-800">{hotel.name}</h2>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Home;

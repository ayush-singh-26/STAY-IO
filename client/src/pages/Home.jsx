import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { trending_places } from "../../config/trending_places";
import Hotel_Card from "./Hotel_Card";
import { FiSearch, FiMapPin, FiCalendar, FiUser, FiHeart, FiStar, FiChevronRight } from "react-icons/fi";

function Home() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split('T')[0]);
    const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
    const [guests, setGuests] = useState(2);

    const searchResults = useSelector(state => state.search.searchResults);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search-hotel/${searchQuery}`, {
                state: {
                    checkIn: checkInDate,
                    checkOut: checkOutDate,
                    guests: guests
                }
            });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="bg-white">
            {/* Hero Section with Search */}
            <section className="relative bg-cover bg-center h-[70vh] min-h-[500px] lg:h-[80vh]" 
                    style={{ backgroundImage: "url('/images/hotel-hero.jpg')" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/40"></div>
                <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fadeIn">
                            Find Your Perfect Stay
                        </h1>
                        <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-fadeIn delay-100">
                            Discover exclusive deals and book your dream hotel today
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="w-full max-w-6xl mx-auto mt-8 animate-fadeIn">
                        <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                                {/* Destination */}
                                <div className="md:col-span-4">
                                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                                        Where are you going?
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiMapPin className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <input
                                            id="destination"
                                            className="w-full border border-gray-300 p-3 rounded-lg pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            type="text"
                                            placeholder="City, region or hotel"
                                        />
                                    </div>
                                </div>

                                {/* Check-in Date */}
                                <div className="md:col-span-2">
                                    <label htmlFor="checkin" className="block text-sm font-medium text-gray-700 mb-2">
                                        Check-in
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiCalendar className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <input
                                            id="checkin"
                                            className="w-full border border-gray-300 p-3 rounded-lg pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            type="date"
                                            value={checkInDate}
                                            onChange={(e) => setCheckInDate(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                </div>

                                {/* Check-out Date */}
                                <div className="md:col-span-2">
                                    <label htmlFor="checkout" className="block text-sm font-medium text-gray-700 mb-2">
                                        Check-out
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiCalendar className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <input
                                            id="checkout"
                                            className="w-full border border-gray-300 p-3 rounded-lg pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            type="date"
                                            value={checkOutDate}
                                            onChange={(e) => setCheckOutDate(e.target.value)}
                                            min={checkInDate || new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                </div>

                                {/* Guests */}
                                <div className="md:col-span-2">
                                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                                        Guests
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiUser className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <select
                                            id="guests"
                                            className="w-full border border-gray-300 p-3 rounded-lg pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all duration-200"
                                            value={guests}
                                            onChange={(e) => setGuests(e.target.value)}
                                        >
                                            {[1, 2, 3, 4, 5, 6].map(num => (
                                                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                            ))}
                                            <option value="7+">7+ Guests</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <FiChevronRight className="h-5 w-5 text-gray-400 transform rotate-90" />
                                        </div>
                                    </div>
                                </div>

                                {/* Search Button */}
                                <div className="md:col-span-2">
                                    <button
                                        onClick={handleSearch}
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg active:scale-95"
                                    >
                                        <FiSearch className="w-5 h-5 mr-2" />
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending Destinations */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Popular Destinations</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore these trending locations for your next vacation</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trending_places.map((place) => (
                        <div key={place?.place} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <Link 
                                to={`/search-hotel/${place.place}`} 
                                className="block h-full"
                                onClick={() => setSearchQuery(place.place)}
                            >
                                <div className="aspect-w-16 aspect-h-9 h-64">
                                    <img
                                        src={place?.image}
                                        alt={place?.place}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6 w-full">
                                    <h3 className="text-xl font-bold text-white mb-1">{place?.place}</h3>
                                    <p className="text-white/90 text-sm">{place?.description}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                        <div className="text-center md:text-left mb-6 md:mb-0">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Exclusive Offers</h2>
                            <p className="text-lg text-gray-600">Special deals just for you</p>
                        </div>
                        <Link 
                            to="/deals" 
                            className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                            View all offers <FiChevronRight className="ml-1" />
                        </Link>
                    </div>
                    <Hotel_Card searchResults={searchResults} />
                </div>
            </section>

            {/* Top Rated Hotels */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Rated Hotels</h2>
                        <p className="text-lg text-gray-600">Loved by our guests</p>
                    </div>
                    <Link 
                        to="/top-hotels" 
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                        View all hotels <FiChevronRight className="ml-1" />
                    </Link>
                </div>
                <Hotel_Card searchResults={searchResults} />
            </section>
        </div>
    );
}

export default Home;
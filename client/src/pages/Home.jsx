import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { trending_places } from "../../config/trending_places";
import Hotel_Card from "./Hotel_Card";

function Home() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const searchResults = useSelector(state => state.search.searchResults)
    // console.log(searchResults);

    const handleSearch = () => {
        navigate(`/search-hotel/${searchQuery}`);
    };

    return (
        <>
            {/* Hero Section with Search */}
            <div className="relative bg-cover bg-center h-screen max-h-[600px] lg:max-h-[700px]" style={{ backgroundImage: "url('/images/hotel-hero.jpg')" }}>
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
                        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                                {/* Destination */}
                                <div className="md:col-span-4">
                                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                                        Destination
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            id="destination"
                                            className="w-full border border-gray-300 p-3 rounded-lg pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            type="text"
                                            placeholder="Where are you going?"
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
                                            <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <input
                                            id="checkin"
                                            className="w-full border border-gray-300 p-3 rounded-lg pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            type="date"
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
                                        <input
                                            id="checkout"
                                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            type="date"
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                </div>

                                {/* Guests */}
                                <div className="md:col-span-2">
                                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                                        Guests
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="guests"
                                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all duration-200"
                                        >
                                            {[1, 2, 3, 4, 5, 6].map(num => (
                                                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                            ))}
                                            <option value="7+">7+ Guests</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Search Button */}
                                <div className="md:col-span-2">
                                    <button
                                        onClick={handleSearch}
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trending Destinations */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Popular Destinations</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore these trending locations for your next vacation</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trending_places.map((place) => (
                        <div key={place?.place} className="group relative overflow-hidden rounded-xl shadow-lg">
                            <Link to={`/search-hotel/${searchQuery}`} onClick={(e) => setSearchQuery(e.target.value)} className="block">
                                <img
                                    src={place?.image}
                                    alt={place?.place}
                                    className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6 w-full">
                                    <h3 className="text-xl font-bold text-white mb-1">{place?.place}</h3>
                                    <p className="text-white/90 text-sm">{place?.description}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Special Offers */}
            <div className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">Exclusive Offers</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Special deals just for you</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* {offers.map((offer) => (
          <div key={offer.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl">
            <div className="relative h-48">
              <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {offer.discount} OFF
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
              <p className="text-gray-600 mb-4">{offer.description}</p>
              <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                View Deal →
              </button>
            </div>
          </div>
        ))} */}
                    </div>
                </div>
            </div>

            {/* Recently Viewed */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Continue browsing in {searchQuery}</h2>
                        <p className="text-gray-600">Pick up where you left off</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">See all</button>
                </div>

                <div className="relative">
                    <div className="flex space-x-6 overflow-x-auto pb-6 -mx-4 px-4 hide-scrollbar">
                        {/* {searchResults?.slice(0, 8).map((hotel) => (
                            <div key={hotel._id} className="flex-shrink-0 w-72">
                                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl h-full flex flex-col">
                                    <Link className="block flex-1">
                                        <div className="relative h-48">
                                            <img
                                                src={hotel.image[0]}
                                                alt={hotel.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 shadow-sm">
                                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="p-4 flex-1">
                                            <h3 className="font-bold text-gray-900 mb-1">{hotel.name}</h3>
                                            <div className="flex items-center text-sm text-gray-600 mb-2">
                                                <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                </svg>
                                                <span>4.8</span>
                                                <span className="mx-1">•</span>
                                                <span>120 reviews</span>
                                            </div>
                                            <div className="text-gray-900 font-semibold">${hotel.price} <span className="text-gray-600 font-normal">/ night</span></div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>

            {/* Top Rated Hotels */}
            <div className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">Top Rated Hotels</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Loved by our guests</p>
                    </div>

                    <Hotel_Card searchResults={searchResults} />
                </div>
            </div>
        </>
    );
}

export default Home;

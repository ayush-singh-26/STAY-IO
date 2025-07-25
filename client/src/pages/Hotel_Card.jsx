import { Link, useNavigate } from 'react-router-dom';

function Hotel_Card({ searchResults }) {
    const navigate = useNavigate();

    const handleHotel = (hotel) => {
        navigate(`/hotel/${hotel._id}`)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchResults?.map((hotel) => (
                <div onClick={() => handleHotel(hotel)} key={hotel._id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl">
                    <Link className="block">
                        <div className="relative h-64">
                            <img
                                src={hotel.images[0]}
                                alt={hotel.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 text-sm font-semibold shadow-sm">
                                {hotel.ratings}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                            <div className="flex items-center text-gray-600 mb-4">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span>{hotel.place}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-lg font-bold text-gray-900">${hotel.price}</span>
                                    <span className="text-gray-600"> / night</span>
                                </div>
                                <button className="text-blue-600 hover:text-blue-800 font-medium">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Hotel_Card

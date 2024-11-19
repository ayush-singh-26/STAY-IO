import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import { useSelector } from 'react-redux';

function Navbar() {

  const currentUser = useSelector((state) => state.auth);
  const loyaltyPoints = useSelector((state) => state.loyaltyPoints);
  console.log(loyaltyPoints);
  
  

  return (
    <nav className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-4 shadow-md sticky">
      <div className="container mx-auto flex items-center justify-between">
        {/* Branding */}
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl text-white font-semibold tracking-widest">SKY-STAY</h1>
        </div>

        {/* Links */}
        <div className="flex space-x-6 items-center">
          <Link to="/home" className="text-gray-200 hover:text-white transition-colors duration-300 px-3 py-2 rounded-lg">
            Home
          </Link>
          <Link to="/searchHotel" className="text-gray-200 hover:text-white transition-colors duration-300 px-3 py-2 rounded-lg">
            Hotel
          </Link>
          <Link to="/getBookings" className="text-gray-200 hover:text-white transition-colors duration-300 px-3 py-2 rounded-lg">
            Bookings
          </Link>
          <Link to="/getBookings" className="text-gray-200 hover:text-white transition-colors duration-300 px-3 py-2 rounded-lg">
            Loyalty Points: {currentUser.userData.loyaltyPoints}
          </Link>

          {/* Authenticated User */}
          {currentUser.userData ? (
            <div className="flex items-center space-x-4">
              <Logout />
              <Link to="/profile">
                <img
                  className="h-10 w-10 rounded-full object-cover border-2 border-white"
                  src={currentUser.userData.avatar}
                  alt="User Avatar"
                />
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/register" className="text-white bg-gray-900 hover:bg-gray-700 transition-colors duration-300 px-4 py-2 rounded-lg">
                Sign Up
              </Link>
              <Link to="/login" className="text-white bg-gray-900 hover:bg-gray-700 transition-colors duration-300 px-4 py-2 rounded-lg">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

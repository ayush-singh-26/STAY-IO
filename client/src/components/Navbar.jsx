import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { TiHome } from "react-icons/ti";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import axios from 'axios';
import dropdown from '../assets/dropdown_icon.svg'
import { signInSuccess } from '../store/authSlice';
import { signOut } from '../store/authSlice';

function Navbar() {

  const [showMenu, setShowMenu] = useState(false);
  const currentUser = useSelector(state => state.auth.userData)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(() => {
    try {
      const fetchUserData = async () => {
        const response = await axios.get('/api/v1/users/current-user');
        dispatch(signInSuccess(response.data.data))
      }
      fetchUserData()
    } catch (error) {
      dispatch(signOut())
    }
  }, [dispatch]);  

  const logoutHandler = async () => {
    try {
      await axios.post('/api/v1/users/logout');
      dispatch(signOut());
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const toggleMenu = () => setShowMenu(prev => !prev);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <TiHome className='text-3xl text-indigo-600' />
              <span className="text-xl font-bold text-gray-900">STAY-IO</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                  ? 'text-indigo-700 bg-indigo-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              Home
            </NavLink>

            {currentUser ? (
              <div className="flex items-center gap-2 cursor-pointer group relative">
                <img className="w-8 rounded-full" src={currentUser?.avatar} alt="avatar" />
                <img className="w-2.5 hover:rotate-180" src={dropdown} alt="dropdown" />
                <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                  <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                    <p onClick={() => navigate('/profile')} className="hover:text-black cursor-pointer">Profile</p>
                    <p onClick={() => navigate('/my-bookings')} className="hover:text-black cursor-pointer">My Booking</p>
                    <p onClick={() => navigate('/admin')} className="hover:text-black cursor-pointer">Admin</p>
                    <p onClick={() => navigate('/change-password')} className="hover:text-black cursor-pointer">Change Password</p>
                    <p onClick={logoutHandler} className="hover:text-black cursor-pointer">Logout</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                  Sign in
                </Link>
                <Link to="/sign-up" className="px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-2xl text-gray-800">
              {showMenu ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>
      </div>

      {showMenu && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white border-t border-gray-200">
          <NavLink
            to="/"
            onClick={() => setShowMenu(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
          >
            Home
          </NavLink>

          {currentUser ? (
            <>
              <p onClick={() => { navigate('/profile'); setShowMenu(false); }} className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-100 cursor-pointer">Profile</p>
              <p onClick={() => { navigate('/my-bookings'); setShowMenu(false); }} className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-100 cursor-pointer">My Booking</p>
              <p onClick={() => { navigate('/change-password'); setShowMenu(false); }} className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-100 cursor-pointer">Change Password</p>
              <p onClick={() => { logoutHandler(); setShowMenu(false); }} className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-100 cursor-pointer">Logout</p>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setShowMenu(false)} className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-100">Sign in</Link>
              <Link to="/sign-up" onClick={() => setShowMenu(false)} className="block px-3 py-2 rounded-md text-base text-white bg-indigo-600 text-center hover:bg-indigo-700">Sign up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;

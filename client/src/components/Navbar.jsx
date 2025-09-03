import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { TiHome } from "react-icons/ti";
import axios from 'axios';
import { signInSuccess } from '../store/authSlice';
import { signOut } from '../store/authSlice';
import { assets } from '../assets/assets';
import { RoleProtectedRoute } from './ProtectedRoutes';

function Navbar() {

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


  return (
    <div className="flex items-center justify-between py-3 px-4 sm:px-6 border-b border-gray-300">
      <Link to="/" className="flex items-center space-x-2">
        <TiHome className='text-3xl text-indigo-600' />
        <span className="text-xl font-bold text-gray-900">STAY-IO</span>
      </Link>

      <div className="flex items-center gap-4 sm:gap-6">
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
            <img className="w-8 rounded-full" src={currentUser?.avatar} alt="" />
            <img className="w-2.5 hover:rotate-180" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p onClick={() => navigate('/profile')} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={() => navigate('/my-bookings')} className="hover:text-black cursor-pointer">My Bookings</p>
                <RoleProtectedRoute roles={['Admin', 'Instructor']}>
                                    <p onClick={() => navigate('/admin')} className="hover:text-black cursor-pointer">Admin</p>
                                </RoleProtectedRoute>
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
    </div>
  );
}

export default Navbar;

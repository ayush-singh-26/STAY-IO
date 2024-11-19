import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { deleteUser } from '../store/authSlice';

const Profile = () => {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found, please login again.');
        setLoading(false);
        return;
      }
      console.log(token);

      try {
        const response = await axios.get('/api/v1/users/current-user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(response.data.data);
        setUserData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleDelete = async (req, res, next) => {
    try {
      const response = await axios.delete('/api/v1/users/deleteAccount');
      console.log(response.data);
      dispatch(deleteUser());
      navigate('/home')

    } catch (error) {
      console.error("Error deleting account", error);
    }


  }


  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }
  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      <div className="bg-gray-800 text-white rounded-2xl shadow-lg max-w-lg w-full p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-400">Your Profile</h1>

        {userData ? (
          <div className="space-y-6">
            {/* Avatar Upload */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <img
                src={userData.avatar}
                alt="User Avatar"
                className="w-full h-full object-cover rounded-full border-4 border-indigo-500"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-500 rounded-full text-center cursor-pointer text-white hover:bg-indigo-600 focus:outline-none"
              />
            </div>

            {/* User Info */}
            <div className="space-y-3 text-center">
              <p className="text-xl">
                <span className="font-semibold text-indigo-400">Full Name:</span> {userData.fullname}
              </p>
              <p className="text-xl">
                <span className="font-semibold text-indigo-400">Email:</span> {userData.email}
              </p>
            </div>

            {/* Change Password Link */}
            <div className="text-center mt-6">
              <Link
                to='/change-password'
                className="inline-block px-6 py-2 text-indigo-500 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-300"
              >
                Change Password
              </Link>
            </div>
            <div className="text-center mt-6">
              <button
                onClick={handleDelete}
                className="inline-block px-6 py-2 text-indigo-500 border border-indigo-500 rounded-full hover:bg-red-700 hover:text-white transition-all duration-300"
              >
                Delete Account
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">User not found</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

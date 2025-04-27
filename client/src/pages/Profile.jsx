import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { FaLock } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { signOut } from '../store/authSlice';

const Profile = () => {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)        
        const response = await axios.get('/api/v1/users/current-user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setUserData(response.data.data);
      } catch (error) {
        dispatch(signOut())
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleDelete = async () => {    
    try {
      const response = await axios.delete('/api/v1/users/deleteAccount');
      dispatch(signOut());
      navigate('/')
    } catch (error) {
      console.error("Error deleting account", error);
    }
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {userData &&
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/3 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-indigo-600">Profile Picture</h2>
                <div className="relative group w-40 h-40 mx-auto">
                  <img
                    src={userData?.avatar || "https://via.placeholder.com/150"}
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full border-4 border-indigo-400 group-hover:opacity-70 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="cursor-pointer bg-indigo-500 text-white p-3 rounded-full hover:bg-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-center text-gray-500 mt-3 text-sm">Click to change photo</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                <h2 className="text-xl font-bold mb-2 text-indigo-600">Account Actions</h2>
                <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <span className="text-gray-800">Change Password</span>
                  <FaLock className='text-indigo-600' />
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors" onClick={handleDelete}>
                  <span className="text-gray-800" >Delete Account</span>
                  <RiDeleteBinFill className='text-red-500' />
                </button>
              </div>
            </div>

            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-indigo-600">Profile Information</h2>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-600 mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue={userData?.fullname || "John Doe"}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 mb-2">Username</label>
                      <input
                        type="text"
                        defaultValue={userData?.username || "johndoe"}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={userData?.email || "john@example.com"}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        defaultValue={userData?.phone || "+1 (555) 123-4567"}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        }
      </div>

      {/* Change Password Modal - Hidden by default */}
      <div className="hidden fixed inset-0 bg-black/30 items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
          <h3 className="text-xl font-bold mb-4 text-indigo-600">Change Password</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-2">Current Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Confirm New Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
              />
            </div>
            <div className="flex justify-end space-x-4 pt-2">
              <button
                type="button"
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

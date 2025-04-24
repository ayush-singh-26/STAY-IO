import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInSuccess } from "../store/authSlice";
import OAuth from "../components/OAuth";

function SignUp() {
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    

    const onSignUp = async (data) => {
        try {
            setLoading(true);
            const formData = new FormData(); 
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });

            // Avatar is a file input
            if (data.avatar[0]) {
                formData.append('avatar', data.avatar[0]);
            }
            
            const response = await axios.post(`api/v1/users/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setLoading(false);
            
            if (response.data.success) {
                setMessage(response.data.message);
                dispatch(signInSuccess({ email: response.data.email, password: response.data.password }));
                navigate('/profile');


            } else {
                setMessage(response.data.message);
            }
        } catch (e) {
            setLoading(false);
            setMessage(e.response?.data?.message || 'Registration failed');
        }
    };

    const handleFileChange = (e) => {
        setValue('avatar', e.target.files); // Ensure correct file handling for avatars
    };


    return (
        <div className="w-full flex justify-center items-center min-h-screen bg-gray-900">
            <div className="w-full p-8 max-w-md bg-gray-800 text-white space-y-6 rounded-md shadow-md">
                <form onSubmit={handleSubmit(onSignUp)} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="fullname" className="block text-sm font-medium text-gray-300">
                            Fullname:
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            placeholder="Enter your fullname"
                            {...register('fullname', { required: "Full name is required" })}
                            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                        />
                        {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            {...register('email', {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Please enter a valid email address"
                                }
                            })}
                            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            {...register('password', {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long"
                                }
                            })}
                            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            {...register('username', { required: "Username is required" })}
                            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="avatar" className="block text-sm font-medium text-gray-300">
                            Avatar:
                        </label>
                        <input
                            type="file"
                            id="avatar"
                            onChange={handleFileChange}
                            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" disabled={loading} className="p-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700">
                            {loading ? 'Loading...' : 'Sign Up'}
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <OAuth/>
                    </div>

                    <p className="text-center text-gray-300 cursor-pointer" onClick={() => navigate('/login')}>
                        Already have an account?
                    </p>
                </form>

                {message && <p className="text-center text-red-500 mt-4">{message}</p>}
            </div>
        </div>
    );
}

export default SignUp;

import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { signInSuccess } from "../store/authSlice";
import OAuth from "../components/OAuth";
import Spinner from "../components/Loader/Spinner";
import { toast } from "react-toastify";

function SignUp() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const onSignUp = async (data) => {
        try {
            setLoading(true)
            const response = await axios.post(`api/v1/users/register`, data);
            localStorage.setItem('accessToken', response.data.data.accessToken);            
            dispatch(signInSuccess(response.data.data.user));
            navigate('/profile');

        } catch (e) {
            setLoading(false);
            toast.error("Registration failed")
        }
    };


    return (
        <div className="w-full flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full p-6 max-w-md bg-white space-y-6 rounded-lg shadow-2xl">
                <h2 className="text-2xl font-bold text-center text-gray-800">Create Account</h2>

                <form onSubmit={handleSubmit(onSignUp)} className="space-y-4">
                    <div className="space-y-1">
                        <label htmlFor="fullname" className="block text-sm font-medium text-gray-600">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            placeholder="John Doe"
                            {...register('fullname', { required: "Full name is required" })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.fullname && <p className="mt-1 text-sm text-red-600">{errors.fullname.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="john@example.com"
                            {...register('email', {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Please enter a valid email"
                                }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            {...register('password', {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {loading ? (
                            <Spinner msg={"Signing up..."} />
                        ) : 'Sign Up'}
                    </button>

                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-sm text-gray-500">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="flex justify-center">
                        <OAuth />
                    </div>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <button onClick={() => navigate('/login')} className="font-medium text-blue-600 hover:text-blue-500">
                        Log in
                    </button>
                </p>

            </div>
        </div>
    );
}

export default SignUp;

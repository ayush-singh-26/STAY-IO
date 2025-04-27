import '../index.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../store/authSlice';
import Spinner from '../components/Loader/Spinner';
import OAuth from '../components/OAuth';


function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


    const onLogin = async (data) => {
        setMessage('');
        setLoading(true);
        dispatch(signInStart());

        try {
            const response = await axios.post('/api/v1/users/login', data);            
            setMessage(response.data.message);
            localStorage.setItem('token', response.data.data.accessToken);
            dispatch(signInSuccess(response.data.data.user));
            navigate('/profile');
        } catch (e) {
            const errorMsg = e.response?.data?.message || 'Authentication failed';
            dispatch(signInFailure(errorMsg));
            setMessage(errorMsg);
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className="w-full flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full p-6 max-w-md bg-white rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>

                <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
                    <div className="space-y-1">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Please enter a valid email',
                                },
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
                            placeholder="••••••••"
                            {...register('password', {
                                required: 'Password is required',
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
                            <Spinner msg={"Signing in..."} />
                        ) : 'Login'}
                    </button>

                    <div className="flex items-center justify-between mt-2">
                        <button
                            onClick={() => navigate('/forgot-password')}
                            className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                            Forgot password?
                        </button>
                        <button
                            onClick={() => navigate('/sign-up')}
                            className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                            New user? Register
                        </button>
                    </div>

                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-sm text-gray-500">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="flex justify-center">
                        <OAuth />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;

import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ForgotPassword() {
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.patch('/api/v1/users/forgot-password', data);
            console.log(response.data);
            setSuccess(true);
        } catch (error) {
            console.error("Error submitting forgot password request:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
                {success ? (
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-blue-600 mb-4">Check Your Email</h1>
                        <p className="text-gray-700 mb-6">
                            A password reset link has been sent to your email address. Please check your inbox and follow the instructions to reset your password.
                        </p>
                        <p className="text-gray-500">
                            If you don’t receive the email shortly, please check your spam or junk folder, or try requesting a new reset link.
                        </p>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-semibold text-center mb-6 text-blue-600">Forgot Password</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;

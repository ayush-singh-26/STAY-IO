import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {useLocation} from "react-router-dom"

function Reset_password() {
    const [message,setMessage]=useState("")
    const { register, watch, formState: { errors },handleSubmit } = useForm()
    const location =useLocation();



    const onSubmit = async (data) => {
        const urlParams= new URLSearchParams(location.search);
        const token = urlParams.get("token")
        console.log(token);
        
        try {
            const response = await axios.post('/api/v1/users/reset-password',{
                token,
                password : data.newPassword
            })
            setMessage(response.data.message)
        } catch (error) {
            setMessage(error.message)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-semibold text-center mb-6 text-blue-600">Reset Password</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password:</label>
                        <input
                            type="password"
                            {...register("newPassword", { required: "Password is required" })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter new password"
                        />
                        {errors.newPassword && (
                            <p className="text-xs text-red-600 mt-1">{errors.newPassword.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password:</label>
                        <input
                            type="password"
                            {...register("confirmPassword", {
                                validate: (value) =>
                                    value === watch("newPassword") || "Passwords do not match"
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Confirm new password"
                        />
                        {errors.confirmPassword && (
                            <p className="text-xs text-red-600 mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
                    >
                        Reset Password
                    </button>
                    {message && <p className="text-center text-green-500 mt-4">{message}</p>}
                </form>
            </div>
        </div>
    );
}

export default Reset_password;

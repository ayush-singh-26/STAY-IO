import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function PasswordChange() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = React.useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/v1/users/change-password", {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      setMessage({ type: "success", text: response.data.message });
      reset(); 
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response ? error.response.data.message : "An error occurred",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl text-white font-bold mb-4 text-center">Change Password</h2>
        {message && (
          <div
            className={`p-3 mb-4 text-center rounded ${
              message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter current password"
            {...register("oldPassword", { required: "Current password is required" })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.oldPassword && <p className="text-red-500 text-sm mt-1">{errors.oldPassword.message}</p>}
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter new password"
            {...register("newPassword", { required: "New password is required" })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
}

export default PasswordChange;

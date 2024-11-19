import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../store/authSlice";
function Logout() {
    const navigate = useNavigate();
    const dispatch =useDispatch();

    const logoutHandler = async () => {
        try {
            await axios.post('/api/v1/users/logout');
            dispatch(signOut());
            navigate('/home');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <button
            onClick={logoutHandler}
            className="text-gray-300 hover:text-white border-b-2 border-transparent hover:border-black px-3 py-2 rounded-lg"
        >
            Logout
        </button>
    );
}

export default Logout;

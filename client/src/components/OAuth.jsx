import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'

import { app } from '../firebase'

import { useDispatch } from 'react-redux'
import axios from "axios";
import {signInSuccess} from "../store/authSlice"


function OAuth() {
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            console.log(result);

            const response = await axios.post('/api/v1/users/google', {

                name: result.user.displayName,
                email: result.user.email,
                avatar: result.user.photoURL

            })
            // const data = await response.json();
            dispatch(signInSuccess(response));

        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <button className="" onClick={handleGoogleClick}>
            Continue with Google
        </button>
    );
}

export default OAuth;

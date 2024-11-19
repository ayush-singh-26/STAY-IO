import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store/store.js';
import { persistor } from './store/store.js';
import {
  Home,
  Profile,
  Login,
  SearchHotel,
  PasswordChange,
  SignUp,
  Hotel_details,
  Book_hotel,
  Get_bookings
} from './pages/index.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { Add_hotel } from './pages/Add_hotel.jsx';
import Edit_hotel from './pages/Edit_hotel.jsx';
import Reset_password from './pages/Reset_password.jsx';
import Forgot_password from './pages/Forgot_password.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>,
      <Route path='/register' element={<SignUp />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/change-password' element={<PasswordChange />} />
      <Route path='/searchHotel' element={<SearchHotel />} />
      <Route path='/:id' element={<Hotel_details />} />
      <Route path='/booking/:id' element={<Book_hotel/>} />
      <Route path='/getBookings' element={<Get_bookings/>} />
      <Route path='/addHotel' element={<Add_hotel/>} />
      <Route path='/updateHotel' element={<Edit_hotel/>} />
      <Route path='/reset-password' element={<Reset_password/>} />
      <Route path='/forgot-password' element={<Forgot_password/>} />


    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
      <RouterProvider router={router} />
      </PersistGate>
    </Provider>
)

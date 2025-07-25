import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
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
import { Add_hotel } from './pages/admin/Add_hotel.jsx';
import Edit_hotel from './pages/admin/Edit_hotel.jsx';
import Reset_password from './pages/Reset_password.jsx';
import Forgot_password from './pages/Forgot_password.jsx';
import Admin_Panel from './pages/admin/Admin_Panel.jsx';
import Navbar from './components/Navbar.jsx';
// import BookingSuccess from './pages/BookingSuccess.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'sign-up', element: <SignUp /> },
      { path: 'profile', element: <Profile /> },
      { path: 'change-password', element: <PasswordChange /> },
      { path: 'search-hotel/:searchQuery', element: <SearchHotel /> },
      { path: 'hotel/:hotelId', element: <Hotel_details /> },
      { path: 'hotel/:hotelId/booking', element: <Book_hotel /> },
      { path: 'my-bookings', element: <Get_bookings /> },
      // { path: 'booking-success', element: <BookingSuccess /> },
    ]
  },
  {
    path: '/admin',
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      { path: '', element: <Admin_Panel /> },
      { path: 'add-hotel', element: <Add_hotel /> },
      { path: 'edit-hotel', element: <Edit_hotel /> },
    ]

  }
]
  // createRoutesFromElements(
  //   <Route path="/" element={<App />}>,
  //     <Route path='/register' element={<SignUp />} />
  //     <Route path='/home' element={<Home />} />
  //     <Route path='/login' element={<Login />} />
  //     <Route path='/profile' element={<Profile />} />
  //     <Route path='/change-password' element={<PasswordChange />} />
  //     <Route path='/searchHotel' element={<SearchHotel />} />
  //     <Route path='/:id' element={<Hotel_details />} />
  //     <Route path='/booking/:id' element={<Book_hotel/>} />
  //     <Route path='/getBookings' element={<Get_bookings/>} />
  //     <Route path='/addHotel' element={<Add_hotel/>} />
  //     <Route path='/updateHotel' element={<Edit_hotel/>} />
  //    


  //   </Route>
  // )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)

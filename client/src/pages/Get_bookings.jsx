import axios from "axios";
import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";

function Get_bookings() {
    const [bookings, setBookings] = React.useState([]);
    const navigate=useNavigate();
    console.log(bookings);
    
    useEffect(() => {
        const fetchBookings = async () => {
            const response = await axios.get('/api/v1/hotels/getBookings');
            console.log(response.data);
            setBookings(response.data.data);

        }
        fetchBookings();

    }, []);



    const cancelBooking = async (id) => {
        try {
            console.log(id);
            
            const response = await axios.delete(`/api/v1/hotels/cancelBookings/${id}`);
        
            
            console.log(response.data);
        } catch (error) {
            console.error('Error cancelling booking:',error.message);
        }
    };
    


    return (
        <div className="mx-auto p-4 bg-white shadow-md rounded-lg flex justify-center">
            <ul className="">

                {bookings.length>0 ?
                bookings.map((booking) => (
                    <li key={booking.booking_id} className="text-lg text-black m-3">
                        <img src={booking.image} className="rounded-md" alt="" />
                        <h2 className="text-3xl font-semibold ">Hotel Name: {booking.hotelName}</h2>
                        <p>Booked By: {booking.name}</p>
                        <p>Check In Date: {booking.checkIn}</p>
                        <p>Check Out Date: {booking.checkOut}</p>
                        <p>Price: {booking.price}</p>
                        <button className="bg-red-600 p-3 rounded-md" onClick={()=>{cancelBooking(booking.booking_id)}}>Cancel booking</button>
                        <hr />
                    </li>
                )):
                <p>No Bookings found</p>
                }
            </ul>
        </div>
    );
}

export default Get_bookings;

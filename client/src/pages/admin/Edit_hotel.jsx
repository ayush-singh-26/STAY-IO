import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setSelectedHotel } from "../../store/SearchSlice"; // Import your action

function Edit_hotel() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const selectedHotel = useSelector((state) => state.search.selectedHotel);
    console.log(selectedHotel);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedHotel) {
            // Pre-fill the form with selectedHotel data
            setValue("name", selectedHotel.name);
            setValue("place", selectedHotel.place);
            setValue("description", selectedHotel.description);
            setValue("price", selectedHotel.price);
            setValue("taxes", selectedHotel.taxes);
        }
    }, [selectedHotel, setValue]);


    const updateHotel = async (data) => {
        try {
            // Update hotel in backend
            const response = await axios.patch(`/api/v1/hotels/updateHotel/${selectedHotel._id}`, data);

            // Update Redux state with the new hotel data
            dispatch(setSelectedHotel(response.data.updatedHotel)); 

            // Navigate back to hotel details page after update
            // navigate(`/hotel/${selectedHotel._id}`);
        } catch (error) {
            console.error("Error updating hotel:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValue(name, value);

        // Update Redux state
        dispatch(setSelectedHotel({
            ...selectedHotel,
            [name]: value
        }));
    };

    const handleImageChange=(e)=>{
        const { name, value } = e.target;
        dispatch(setSelectedHotel({
           ...selectedHotel,
            images: [...selectedHotel.images, value]
        }));
    }

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Edit Hotel</h1>

            <form onSubmit={handleSubmit(updateHotel)} className="space-y-4">
                {/* Hotel Name */}
                <div>
                    <label htmlFor="name" className="block text-gray-600 mb-2">Hotel Name</label>
                    <input
                        type="text"
                        {...register('name', { required: 'Hotel name is required' })}
                        className={`w-full p-3 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter hotel name"
                        onChange={handleInputChange}
                    />
                    {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
                </div>

                {/* Place */}
                <div>
                    <label htmlFor="place" className="block text-gray-600 mb-2">Place</label>
                    <input
                        type="text"
                        {...register('place', { required: 'Place is required' })}
                        className={`w-full p-3 border rounded-lg ${errors.place ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter place"
                        onChange={handleInputChange}
                    />
                    {errors.place && <p className="text-red-500 mt-1">{errors.place.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-gray-600 mb-2">Description</label>
                    <textarea
                        {...register('description', { required: 'Description is required' })}
                        className={`w-full p-3 border rounded-lg ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter description"
                        onChange={handleInputChange}
                    />
                    {errors.description && <p className="text-red-500 mt-1">{errors.description.message}</p>}
                </div>

                {/* Price */}
                <div>
                    <label htmlFor="price" className="block text-gray-600 mb-2">Price</label>
                    <input
                        type="number"
                        {...register('price', { required: 'Price is required' })}
                        className={`w-full p-3 border rounded-lg ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter price"
                        onChange={handleInputChange}
                    />
                    {errors.price && <p className="text-red-500 mt-1">{errors.price.message}</p>}
                </div>

                {/* Taxes */}
                <div>
                    <label htmlFor="taxes" className="block text-gray-600 mb-2">Taxes</label>
                    <input
                        type="number"
                        {...register('taxes', { required: 'Taxes are required' })}
                        className={`w-full p-3 border rounded-lg ${errors.taxes ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter taxes"
                        onChange={handleInputChange}
                    />
                    {errors.taxes && <p className="text-red-500 mt-1">{errors.taxes.message}</p>}
                </div>

                {/* Image URL */}
                <div>
                    <label htmlFor="image" className="block text-gray-600 mb-2">Image URL</label>
                    <input
                        type="url"
                        {...register('image', { required: 'Image URL is required' })}
                        className={`w-full p-3 border rounded-lg ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter image URL"
                        onChange={handleImageChange}
                    />
                    {errors.image && <p className="text-red-500 mt-1">{errors.image.message}</p>}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Update Hotel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Edit_hotel;

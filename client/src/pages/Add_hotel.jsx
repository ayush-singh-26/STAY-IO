import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { hotelFacilities } from '../../config/hotelFacilty';

export const Add_hotel = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const addHotel = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('place', data.place);
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('taxes', data.taxes);

      const files = data.image; // This should be a FileList
      for (let i = 0; i < files.length; i++) {
        formData.append('image', files[i]);
      }
      const amenitie =data.amenities;
      for(let i=0;i<amenitie.length;i++) {
        formData.append('amenities', amenitie[i]);
      }

      const response = await axios.post('/api/v1/hotels/addHotel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error('Error adding hotel:', error);
      setLoading(false)
    }
  };

  const handleFileChange = (e) => {
    setValue('image', e.target.files);
  };

  const amenitiesHandle=(e)=>{
    setValue('amenities', [...value, e.target.checked]);
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Hotel</h1>

      <form onSubmit={handleSubmit(addHotel)} className="space-y-4">

        <div>
          <label htmlFor="name" className="block text-gray-600 mb-2">Hotel Name</label>
          <input
            type="text"
            {...register('name', { required: 'Hotel name is required' })}
            className={`w-full p-3 border rounded-lg transition duration-300 ${errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
            placeholder="Enter hotel name"
          />
          {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="place" className="block text-gray-600 mb-2">Place</label>
          <input
            type="text"
            {...register('place', { required: 'Place is required' })}
            className={`w-full p-3 border rounded-lg transition duration-300 ${errors.place ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
            placeholder="Enter place"
          />
          {errors.place && <p className="text-red-500 mt-1">{errors.place.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-600 mb-2">Description</label>
          <input
            type="text"
            {...register('description', { required: 'Description is required' })}
            className={`w-full p-3 border rounded-lg transition duration-300 ${errors.description ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
            placeholder="Enter description"
          />
          {errors.description && <p className="text-red-500 mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label htmlFor="price" className="block text-gray-600 mb-2">Price</label>
          <input
            type="number"
            {...register('price', { required: 'Price is required' })}
            className={`w-full p-3 border rounded-lg transition duration-300 ${errors.price ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
            placeholder="Enter price"
          />
          {errors.price && <p className="text-red-500 mt-1">{errors.price.message}</p>}
        </div>

        <div>
          <label htmlFor="taxes" className="block text-gray-600 mb-2">Taxes</label>
          <input
            type="number"
            {...register('taxes', { required: 'Taxes are required' })}
            className={`w-full p-3 border rounded-lg transition duration-300 ${errors.taxes ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
            placeholder="Enter taxes"
          />
          {errors.taxes && <p className="text-red-500 mt-1">{errors.taxes.message}</p>}
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Amenities</label>
          <div className="space-y-2">
            {hotelFacilities.map((facility, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  value={facility}
                  onChange={amenitiesHandle}
                  {...register('amenities', { required: 'At least one amenity is required' })}
                  className="mr-2 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{facility}</span>
              </label>
            ))}
          </div>
          {errors.amenities && <p className="text-red-500 mt-1">{errors.amenities.message}</p>}
        </div>

        <div>
          <label htmlFor="image" className="block text-gray-600 mb-2">Image</label>
          <input
            type="file"
            id="image"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-lg transition duration-300 focus:outline-none focus:border-blue-500"
          />
          {errors.image && <p className="text-red-500 mt-1">{errors.image.message}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {!loading ? "Add Hotel" : "Adding..."}
          </button>
        </div>
      </form>
    </div>
  );
};

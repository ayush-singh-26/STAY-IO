import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { hotelFacilities } from '../../../config/hotelFacilty';

export const Add_hotel = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const addHotel = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'image') {
          Array.from(value).forEach(file => formData.append('image', file));
        } else if (key === 'amenities') {
          value.forEach(amenity => formData.append('amenities', amenity));
        } else {
          formData.append(key, value);
        }
      });

      await axios.post('/api/v1/hotels/addHotel', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setLoading(false);
    } catch (error) {
      console.error('Error adding hotel:', error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add New Hotel</h1>
          <p className="text-gray-600 mt-1">Fill in the details to list your property</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 lg:col-span-3">
        <form onSubmit={handleSubmit(addHotel)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['name', 'place'].map(field => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {field}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  {...register(field, { required: `${field} is required` })}
                  className={`w-full px-4 py-2 rounded-lg border ${errors[field] ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition`}
                />
                {errors[field] && <p className="mt-1 text-sm text-red-600">{errors[field].message}</p>}
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={3}
                className={`w-full px-4 py-2 rounded-lg border ${errors.description ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
            </div>

            {['price', 'taxes'].map(field => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {field}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    {...register(field, { required: `${field} is required` })}
                    className={`w-full pl-8 pr-4 py-2 rounded-lg border ${errors[field] ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition`}
                  />
                </div>
                {errors[field] && <p className="mt-1 text-sm text-red-600">{errors[field].message}</p>}
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {hotelFacilities.map(facility => (
                <label key={facility} className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                  <input
                    type="checkbox"
                    value={facility}
                    {...register('amenities', { required: 'Select at least one amenity' })}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{facility}</span>
                </label>
              ))}
            </div>
            {errors.amenities && <p className="mt-2 text-sm text-red-600">{errors.amenities.message}</p>}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Hotel Images</h3>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition cursor-pointer">
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="mt-2 text-sm font-medium text-gray-700">
                <span className="text-blue-600">Click to upload</span> or drag and drop
              </span>
              <span className="mt-1 text-xs text-gray-500">PNG, JPG up to 5MB</span>
              <input
                type="file"
                multiple
                {...register('image', { required: 'Hotel images are required' })}
                className="hidden"
              />
            </label>
            {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image.message}</p>}
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Add Hotel'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
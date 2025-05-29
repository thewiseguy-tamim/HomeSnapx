import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authApiClient from '../../Services/auth-api-client';

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    image: null, // Store new image file
  });
  const [existingImage, setExistingImage] = useState(null); // Store existing image URL
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for submission

  useEffect(() => {
    console.log('Service ID from useParams:', id);
    if (!id || id === 'undefined' || isNaN(id) || parseInt(id) <= 0) {
      setError('Invalid service ID');
      setLoading(false);
      return;
    }

    const fetchService = async () => {
      try {
        const response = await authApiClient.get(`/services/${id}/`);
        console.log('API Response:', response.data);
        const { name, description, price, duration, image } = response.data;
        // Convert ISO 8601 duration (e.g., PT1H30M) to HH:MM
        const durationMatch = duration.match(/PT(\d+)H(\d+)M/);
        const hours = durationMatch ? durationMatch[1] : '00';
        const minutes = durationMatch ? durationMatch[2] : '00';
        const formattedDuration = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
        setFormData({ name, description, price: parseFloat(price).toFixed(2), duration: formattedDuration, image: null });
        setExistingImage(image); // Store existing image URL
        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err.response);
        setError(err.response?.data?.detail || 'Failed to load service');
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0] || null;
      if (file) {
        // Validate file type and size
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
          setError('Please upload a JPEG or PNG image');
          return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          setError('Image size must be less than 5MB');
          return;
        }
        setFormData({ ...formData, image: file });
      } else {
        setFormData({ ...formData, image: null });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: null });
    setExistingImage(null); // Clear existing image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      // Convert duration to ISO 8601 format (e.g., PT1H30M)
      const durationParts = formData.duration.split(':');
      const hours = parseInt(durationParts[0]) || 0;
      const minutes = parseInt(durationParts[1]) || 0;
      const duration = `PT${hours}H${minutes}M`;

      // Use FormData for multipart upload
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('description', formData.description);
      payload.append('price', parseFloat(formData.price).toFixed(2));
      payload.append('duration', duration);
      if (formData.image) {
        payload.append('image', formData.image); // New image
      } else if (existingImage === null) {
        payload.append('image', ''); // Clear image if removed
      }

      console.log('Update Payload:', [...payload.entries()]);
      await authApiClient.put(`/services/${id}/`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Service updated successfully!');
      setFormData({ ...formData, image: null }); // Reset image field
      document.querySelector('input[name="image"]').value = ''; // Reset file input
    } catch (err) {
      console.error('Update Error:', err.response);
      const errorMessage = err.response?.data?.image
        ? `Image error: ${err.response.data.image.join(', ')}`
        : err.response?.data?.detail || 'Failed to update service';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    try {
      setIsSubmitting(true);
      await authApiClient.delete(`/services/${id}/`);
      setSuccess('Service deleted successfully!');
      setTimeout(() => navigate('/dashboard/services'), 1000);
    } catch (err) {
      console.error('Delete Error:', err.response);
      setError(err.response?.data?.detail || 'Failed to delete service');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error && !formData.name) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate('/dashboard/services')}
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700"
        >
          Back to Services
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Service</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength="100"
            minLength="1"
            disabled={isSubmitting}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
            placeholder="Enter service name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            minLength="1"
            disabled={isSubmitting}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
            placeholder="Enter service description"
            rows="4"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
            disabled={isSubmitting}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
            placeholder="Enter price"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration (HH:MM)</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            pattern="\d{1,2}:\d{2}"
            disabled={isSubmitting}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
            placeholder="e.g., 01:30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Service Image (Optional)</label>
          {existingImage && (
            <div className="mt-1 mb-2">
              <p className="text-sm text-gray-600">Current Image:</p>
              <img
                src={existingImage}
                alt="Current service"
                className="w-full max-w-xs rounded-md shadow-sm border border-gray-300"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                disabled={isSubmitting}
                className="mt-2 py-1 px-3 bg-red-600 text-white text-sm font-semibold rounded-md shadow hover:bg-red-700 disabled:opacity-50"
              >
                Remove Image
              </button>
            </div>
          )}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            disabled={isSubmitting}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
            ) : (
              'Update Service'
            )}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isSubmitting}
            className={`flex-1 py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Delete Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditService;
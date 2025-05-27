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
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

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
        const { name, description, price, duration } = response.data;
        // Convert ISO 8601 duration (e.g., PT1H30M) to HH:MM
        const durationMatch = duration.match(/PT(\d+)H(\d+)M/);
        const hours = durationMatch ? durationMatch[1] : '00';
        const minutes = durationMatch ? durationMatch[2] : '00';
        const formattedDuration = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
        setFormData({ name, description, price: parseFloat(price).toFixed(2), duration: formattedDuration });
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Convert duration to ISO 8601 format (e.g., PT1H30M)
      const durationParts = formData.duration.split(':');
      const hours = parseInt(durationParts[0]) || 0;
      const minutes = parseInt(durationParts[1]) || 0;
      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price).toFixed(2),
        duration: `PT${hours}H${minutes}M`,
      };

      console.log('Update Payload:', payload);
      await authApiClient.put(`/services/${id}/`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSuccess('Service updated successfully!');
    } catch (err) {
      console.error('Update Error:', err.response);
      setError(err.response?.data?.detail || 'Failed to update service');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    try {
      await authApiClient.delete(`/services/${id}/`);
      setSuccess('Service deleted successfully!');
      setTimeout(() => navigate('/dashboard/services'), 1000);
    } catch (err) {
      console.error('Delete Error:', err.response);
      setError(err.response?.data?.detail || 'Failed to delete service');
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 01:30"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update Service
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex-1 py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditService;
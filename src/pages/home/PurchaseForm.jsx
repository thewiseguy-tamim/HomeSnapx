import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../../Services/api-client';
 // Import the axios instance

const PurchaseForm = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    full_name: '',
    address: '',
    phone_number: '',
    service_id: serviceId,
  });
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post('/api/purchase/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Purchase response:', response.data);
      navigate(`/shop/${serviceId}`);
    } catch (err) {
      console.error('Purchase error:', err.response?.data);
      setError(
        err.response?.data?.detail ||
        Object.values(err.response?.data || {}).join(' ') ||
        'Failed to process purchase. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Purchase</h2>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="full_name">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              id="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="address">
              Address
            </label>
            <textarea
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="phone_number">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone_number"
              id="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded hover:bg-primary-dark disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Confirm Purchase'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PurchaseForm;
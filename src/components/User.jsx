import React, { useState, useEffect } from 'react';
import authApiClient from '../Services/auth-api-client';

class UserErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-400 text-center p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-red-500">Something went wrong.</h2>
          <p className="mt-3 text-gray-600">{this.state.error?.message || 'Unknown error'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await authApiClient.get('/users/');
        const userData = response.data.results || response.data;
        setUsers(Array.isArray(userData) ? userData : []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await authApiClient.delete(`/users/${userId}/`);
        setUsers(users.filter(user => user.id !== userId));
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      await authApiClient.patch(`/users/${userId}/promote/`, { role });
      const fetchResponse = await authApiClient.get('/users/');
      const userData = fetchResponse.data.results || fetchResponse.data;
      setUsers(Array.isArray(userData) ? userData : []);
      setSelectedRoles(prev => ({ ...prev, [userId]: '' }));
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        err.response?.data?.role?.[0] ||
        `Failed to promote user to ${role}`
      );
    }
  };

  const handleSelectRole = (userId, role) => {
    setSelectedRoles(prev => ({ ...prev, [userId]: role }));
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-50 to-gray-100">
      <div className="text-2xl font-semibold text-indigo-600 animate-pulse">Loading...</div>
    </div>
  );
  if (error) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-50 to-gray-100">
      <div className="text-red-400 text-xl font-medium p-8 bg-white/80 rounded-2xl shadow-xl backdrop-blur-sm border border-gray-100">{error}</div>
    </div>
  );

  return (
    <UserErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8 text-center animate-fade-in">User List</h1>
          {users.length === 0 ? (
            <p className="text-center text-gray-500 text-lg font-medium p-8 bg-white/80 rounded-2xl shadow-xl backdrop-blur-sm border border-gray-100">No users found.</p>
          ) : (
            <div className="overflow-hidden shadow-2xl rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white uppercase text-xs font-medium">
                  <tr>
                    <th className="py-4 px-6 rounded-tl-2xl">ID</th>
                    <th className="py-4 px-6">Username</th>
                    <th className="py-4 px-6">Email</th>
                    <th className="py-4 px-6">Role</th>
                    <th className="py-4 px-6">First Name</th>
                    <th className="py-4 px-6">Last Name</th>
                    <th className="py-4 px-6 rounded-tr-2xl">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-indigo-50/50 transition-all duration-300">
                      <td className="py-4 px-6 text-gray-700">{user.id}</td>
                      <td className="py-4 px-6 text-gray-700">{user.username || 'N/A'}</td>
                      <td className="py-4 px-6 text-gray-700">{user.email || 'N/A'}</td>
                      <td className="py-4 px-6 text-gray-700">{user.role || 'N/A'}</td>
                      <td className="py-4 px-6 text-gray-700">{user.first_name || 'N/A'}</td>
                      <td className="py-4 px-6 text-gray-700">{user.last_name || 'N/A'}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="flex items-center gap-3">
                            <select
                              value={selectedRoles[user.id] || ''}
                              onChange={(e) => handleSelectRole(user.id, e.target.value)}
                              className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white/90 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 hover:bg-gray-50"
                            >
                              <option value="" disabled>Select Role</option>
                              <option value="CLIENT">Client</option>
                              <option value="ADMIN">Admin</option>
                            </select>
                            {selectedRoles[user.id] && (
                              <button
                                onClick={() => handleRoleChange(user.id, selectedRoles[user.id])}
                                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                              >
                                Apply
                              </button>
                            )}
                          </div>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </UserErrorBoundary>
  );
};

export default User;
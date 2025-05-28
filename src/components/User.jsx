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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Something went wrong</h2>
            <p className="text-gray-300">{this.state.error?.message || 'Unknown error'}</p>
          </div>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-purple-400/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-purple-400 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Loading Users...
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center shadow-2xl">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Error</h2>
        <p className="text-gray-300">{error}</p>
      </div>
    </div>
  );

  return (
    <UserErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Users
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Manage your team members with style and efficiency
            </p>
          </div>

          {users.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">No Users Found</h3>
                <p className="text-gray-400">Your user list is empty. Add some users to get started.</p>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-white/10">
                <div className="grid grid-cols-12 gap-2 p-4 text-xs font-semibold text-purple-200 uppercase tracking-wider">
                  <div className="col-span-1">ID</div>
                  <div className="col-span-2">Username</div>
                  <div className="col-span-2">Email</div>
                  <div className="col-span-1">Role</div>
                  <div className="col-span-2">First Name</div>
                  <div className="col-span-1">Last Name</div>
                  <div className="col-span-3">Actions</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-white/5">
                {users.map((user, index) => (
                  <div 
                    key={user.id} 
                    className="grid grid-cols-12 gap-2 p-4 hover:bg-white/5 transition-all duration-300 group items-center"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="col-span-1 text-gray-300 font-mono text-xs bg-slate-800/50 rounded-lg px-2 py-1 inline-block w-fit">
                      #{user.id}
                    </div>
                    <div className="col-span-2 text-white font-medium text-sm truncate">
                      {user.username || <span className="text-gray-500 italic">N/A</span>}
                    </div>
                    <div className="col-span-2 text-gray-300 text-sm truncate">
                      {user.email || <span className="text-gray-500 italic">N/A</span>}
                    </div>
                    <div className="col-span-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'ADMIN' 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                          : user.role === 'CLIENT'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                      }`}>
                        {user.role || 'N/A'}
                      </span>
                    </div>
                    <div className="col-span-2 text-gray-300 text-sm truncate">
                      {user.first_name || <span className="text-gray-500 italic">N/A</span>}
                    </div>
                    <div className="col-span-1 text-gray-300 text-sm truncate">
                      {user.last_name || <span className="text-gray-500 italic">N/A</span>}
                    </div>
                    <div className="col-span-3 flex items-center gap-2">
                      <select
                        value={selectedRoles[user.id] || ''}
                        onChange={(e) => handleSelectRole(user.id, e.target.value)}
                        className="bg-slate-800/80 border border-slate-600 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:bg-slate-700/80 flex-1"
                      >
                        <option value="" disabled>Select Role</option>
                        <option value="CLIENT">Client</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                      {selectedRoles[user.id] && (
                        <button
                          onClick={() => handleRoleChange(user.id, selectedRoles[user.id])}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 text-xs font-medium"
                        >
                          Apply
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-3 py-1 rounded-lg hover:from-red-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-red-500/25 transform hover:scale-105 text-xs font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </UserErrorBoundary>
  );
};

export default User;
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  X, 
  Trash2, 
  Eye,
  Calendar,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

const AdminPanel = () => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState({});
  const [enquiries, setEnquiries] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Only fetch data if user is admin
    if (user && token && user.is_admin) {
      fetchAdminData();
    }
  }, [user, token]);

  // Redirect if not admin
  if (!user || !token || !user.is_admin) {
    return (
      <div className="py-20 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Admin privileges required to access this page.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, enquiriesRes, usersRes] = await Promise.all([
        api.getAdminStats(token),
        api.getAllEnquiries(token),
        api.getAllUsers(token)
      ]);

      const [statsData, enquiriesData, usersData] = await Promise.all([
        statsRes.json(),
        enquiriesRes.json(),
        usersRes.json()
      ]);

      if (statsRes.ok) setStats(statsData);
      if (enquiriesRes.ok) setEnquiries(enquiriesData);
      if (usersRes.ok) setUsers(usersData);

    } catch (error) {
      console.error('Error fetching admin data:', error);
      setError('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const updateEnquiryStatus = async (id, status) => {
    try {
      const res = await api.updateEnquiryStatus(id, status, token);
      if (res.ok) {
        setEnquiries(enquiries.map(e => e.id === id ? { ...e, status } : e));
        // Update stats
        fetchAdminData();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      alert('Error updating status');
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        const res = await api.deleteUser(id, token);
        if (res.ok) {
          setUsers(users.filter(u => u.id !== id));
          // Update stats
          fetchAdminData();
        } else {
          alert('Failed to delete user');
        }
      } catch (error) {
        alert('Error deleting user');
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'cancelled':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const tabs = [
    { id: 'stats', label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'enquiries', label: 'Enquiries', icon: <FileText className="h-5 w-5" /> },
    { id: 'users', label: 'Users', icon: <Users className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> }
  ];

  if (loading) {
    return (
      <div className="py-20 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading admin panel...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 px-8 py-6 text-white rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
                <p className="text-blue-100">Welcome back, {user.username}!</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-100">Last Updated</div>
                <div className="text-lg font-semibold">{new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Dashboard/Stats Tab */}
            {activeTab === 'stats' && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <Users className="h-8 w-8 text-blue-200" />
                      <span className="text-3xl font-bold">{stats.total_users || 0}</span>
                    </div>
                    <div className="text-blue-100">Total Users</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <FileText className="h-8 w-8 text-green-200" />
                      <span className="text-3xl font-bold">{stats.total_enquiries || 0}</span>
                    </div>
                    <div className="text-green-100">Total Enquiries</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <Clock className="h-8 w-8 text-yellow-200" />
                      <span className="text-3xl font-bold">{stats.pending_enquiries || 0}</span>
                    </div>
                    <div className="text-yellow-100">Pending Enquiries</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <CheckCircle className="h-8 w-8 text-purple-200" />
                      <span className="text-3xl font-bold">{stats.completed_enquiries || 0}</span>
                    </div>
                    <div className="text-purple-100">Completed Enquiries</div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Enquiries</h3>
                    <div className="space-y-3">
                      {enquiries.slice(0, 5).map((enquiry) => (
                        <div key={enquiry.id} className="flex items-center justify-between py-2 px-3 bg-white rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{enquiry.name}</div>
                            <div className="text-sm text-gray-600">{enquiry.location}</div>
                          </div>
                          <div className="flex items-center">
                            {getStatusIcon(enquiry.status)}
                            <span className="text-xs text-gray-500 ml-2">
                              {new Date(enquiry.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Users</h3>
                    <div className="space-y-3">
                      {users.slice(-5).map((user) => (
                        <div key={user.id} className="flex items-center justify-between py-2 px-3 bg-white rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{user.username}</div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(user.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Enquiries Tab */}
            {activeTab === 'enquiries' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">All Enquiries ({enquiries.length})</h3>
                  <div className="flex space-x-2">
                    <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                      <option value="">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {enquiries.map((enquiry) => (
                    <div key={enquiry.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h4 className="text-lg font-semibold text-gray-900 mr-4">{enquiry.name}</h4>
                            <span className="text-sm text-gray-500">#{enquiry.id}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            {new Date(enquiry.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(enquiry.status)}
                          <select
                            value={enquiry.status}
                            onChange={(e) => updateEnquiryStatus(enquiry.id, e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6 mb-4">
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-2">Contact Information</h5>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2" />
                              {enquiry.email}
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2" />
                              {enquiry.phone}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              {enquiry.location}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-2">Property Details</h5>
                          <div className="space-y-1 text-sm text-gray-600">
                            {enquiry.roof_type && <div><strong>Roof:</strong> {enquiry.roof_type}</div>}
                            {enquiry.electricity_bill && <div><strong>Bill:</strong> {enquiry.electricity_bill}</div>}
                            {enquiry.user_id && <div><strong>User ID:</strong> {enquiry.user_id}</div>}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-2">Actions</h5>
                          <div className="space-y-2">
                            <button className="flex items-center text-green-600 hover:text-green-800 text-sm font-medium">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </button>
                            <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                              <Phone className="h-4 w-4 mr-1" />
                              Call Customer
                            </button>
                          </div>
                        </div>
                      </div>

                      {enquiry.message && (
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h5 className="text-sm font-medium text-gray-900 mb-2">Customer Message</h5>
                          <p className="text-sm text-gray-700">{enquiry.message}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">All Users ({users.length})</h3>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                    Export Users
                  </button>
                </div>

                <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Joined
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                  {user.username.charAt(0).toUpperCase()}
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">{user.username}</div>
                                  <div className="text-sm text-gray-500">ID: {user.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              <div>{user.email}</div>
                              <div className="text-gray-500">{user.phone || 'N/A'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.is_admin
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {user.is_admin ? 'Admin' : 'User'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {new Date(user.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              <div className="flex space-x-2">
                                <button className="text-green-600 hover:text-green-800 font-medium">
                                  View
                                </button>
                                {!user.is_admin && user.id !== user.id && (
                                  <button
                                    onClick={() => deleteUser(user.id)}
                                    className="text-red-600 hover:text-red-800 font-medium flex items-center"
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">System Settings</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Application Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          System Maintenance Mode
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                          <option>Disabled</option>
                          <option>Enabled</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New User Registration
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                          <option>Enabled</option>
                          <option>Disabled</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">New Enquiry Alerts</span>
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                          Enabled
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Weekly Reports</span>
                        <button className="bg-gray-400 text-white px-3 py-1 rounded text-sm">
                          Disabled
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-red-900">Clear All Data</div>
                        <div className="text-sm text-red-700">Permanently delete all enquiries and user data</div>
                      </div>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        Clear Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
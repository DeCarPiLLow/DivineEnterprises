import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, FileText, AlertCircle, CheckCircle, Clock, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

const UserProfile = () => {
  const { user, token } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  

  useEffect(() => {
    // Only fetch enquiries if user is authenticated
    if (user && token) {
      const fetchEnquiries = async () => {
        try {
          const res = await api.getUserEnquiries(token);
          const data = await res.json();
          if (res.ok) {
            setEnquiries(data);
          } else {
            setError('Failed to fetch enquiries');
          }
        } catch (error) {
          console.error('Error fetching enquiries:', error);
          setError('Error loading enquiries');
        } finally {
          setLoading(false);
        }
      };

      fetchEnquiries();
    } else {
      // If not authenticated, set loading to false
      setLoading(false);
    }
  }, [user, token]);

  // Redirect to home if not authenticated
  if (!user || !token) {
    return (
      <div className="py-20 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please log in to view your profile.</p>
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'cancelled':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <div className="py-20 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading your profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-blue-600 px-8 py-12 text-white">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mr-6">
                <User className="h-10 w-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome, {user.username}!</h1>
                <p className="text-blue-100">
                  Member since {new Date(user.created_at || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Information */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Username</div>
                        <div className="font-semibold text-gray-900">{user.username}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="font-semibold text-gray-900">{user.email}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="font-semibold text-gray-900">
                          {user.phone || 'Not provided'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Member Since</div>
                        <div className="font-semibold text-gray-900">
                          {new Date(user.created_at || Date.now()).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Stats */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Account Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{enquiries.length}</div>
                        <div className="text-xs text-gray-600">Total Enquiries</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {enquiries.filter(e => e.status === 'completed').length}
                        </div>
                        <div className="text-xs text-gray-600">Completed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enquiries Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-green-600" />
                    My Enquiries
                  </h2>
                  <button 
                  onClick={() => navigate("/contact")}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                    New Enquiry
                  </button>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {error}
                  </div>
                )}

                {enquiries.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Enquiries Yet</h3>
                    <p className="text-gray-600 mb-6">
                      You haven't submitted any enquiries. Start your solar journey today!
                    </p>
                    <button onClick={() => navigate("/contact")} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Submit Your First Enquiry
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enquiries.map((enquiry) => (
                      <div key={enquiry.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              Solar Installation Enquiry
                            </h3>
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="h-4 w-4 mr-1" />
                              Submitted on {new Date(enquiry.created_at).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex items-center">
                            {getStatusIcon(enquiry.status)}
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ml-2 ${getStatusColor(enquiry.status)}`}>
                              {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1).replace('-', ' ')}
                            </span>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-gray-600 mb-1">Contact Details:</div>
                            <div className="space-y-1">
                              <div><span className="font-medium">Name:</span> {enquiry.name}</div>
                              <div><span className="font-medium">Email:</span> {enquiry.email}</div>
                              <div><span className="font-medium">Phone:</span> {enquiry.phone}</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-600 mb-1">Property Details:</div>
                            <div className="space-y-1">
                              <div><span className="font-medium">Location:</span> {enquiry.location}</div>
                              {enquiry.roof_type && (
                                <div><span className="font-medium">Roof Type:</span> {enquiry.roof_type}</div>
                              )}
                              {enquiry.electricity_bill && (
                                <div><span className="font-medium">Monthly Bill:</span> {enquiry.electricity_bill}</div>
                              )}
                            </div>
                          </div>
                        </div>

                        {enquiry.message && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="text-sm text-gray-600 mb-1">Message:</div>
                            <div className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg">
                              {enquiry.message}
                            </div>
                          </div>
                        )}

                        {/* Action buttons based on status */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <div className="text-xs text-gray-500">
                              Enquiry ID: #{enquiry.id}
                            </div>
                            <div className="space-x-2">
                              {enquiry.status === 'pending' && (
                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                  Edit Enquiry
                                </button>
                              )}
                              <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
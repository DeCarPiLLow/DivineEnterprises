import React, { useState } from 'react';
import { X, User, Mail, Phone, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login, register } = useAuth();
  // hello
  
  // Form validation
  const validateForm = () => {
    if (isLogin) {
      if (!formData.email.trim()) {
        setError('Email is required');
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        return false;
      }
    } else {
      if (!formData.username.trim()) {
        setError('Username is required');
        return false;
      }
      if (formData.username.length < 3) {
        setError('Username must be at least 3 characters long');
        return false;
      }
      if (!formData.email.trim()) {
        setError('Email is required');
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        return false;
      }
    }

    if (!formData.password) {
      setError('Password is required');
      return false;
    }

    if (!isLogin && formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      phone: '',
      password: ''
    });
    setError('');
    setSuccess('');
    setShowPassword(false);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        const result = await login({
          email: formData.email.trim(),
          password: formData.password
        });

        if (result.success) {
          setSuccess('Login successful! Welcome back!');
          setTimeout(() => {
            handleClose();
          }, 1500);
        } else {
          setError(result.message || 'Login failed. Please check your credentials.');
        }
      } else {
        // Registration
        const result = await register({
          username: formData.username.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          password: formData.password
        });

        if (result.success) {
          setSuccess('Registration successful! You can now login with your credentials.');
          setTimeout(() => {
            switchMode();
          }, 2000);
        } else {
          setError(result.message || 'Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (error) setError('');
    if (success) setSuccess('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative transform transition-all">
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10 rounded-2xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <div className="text-gray-600">
                {isLogin ? 'Signing you in...' : 'Creating your account...'}
              </div>
            </div>
          </div>
        )}

        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isLogin ? 'Welcome Back!' : 'Join SolarSquare'}
              </h2>
              <p className="text-gray-600 mt-1">
                {isLogin 
                  ? 'Sign in to access your solar dashboard' 
                  : 'Create an account to get started'}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1"
              disabled={loading}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
              <div className="text-sm">{success}</div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
              <div className="text-sm">{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Login → Email */}
            {isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter your email address"
                    autoComplete="email"
                  />
                </div>
              </div>
            )}

            {/* Registration → Username + Email + Phone */}
            {!isLogin && (
              <>
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Choose a username"
                      autoComplete="username"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Enter your email address"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Optional - for better customer support
                  </p>
                </div>
              </>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder={isLogin ? "Enter your password" : "Create a secure password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {!isLogin && (
                <div className="mt-2">
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${formData.password.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      Minimum 6 characters
                    </div>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${/[A-Za-z]/.test(formData.password) && /[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      Contains letters and numbers (recommended)
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                <>
                  {isLogin ? '🚀 Sign In to Dashboard' : '🌟 Create My Account'}
                </>
              )}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              onClick={switchMode}
              disabled={loading}
              className="text-green-600 hover:text-green-700 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLogin ? 'Create New Account' : 'Sign In Instead'}
            </button>
          </div>

          {/* Benefits Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              {isLogin ? 'Welcome back to SolarSquare!' : 'Why join SolarSquare?'}
            </h3>
            <ul className="text-xs text-gray-600 space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Track your solar enquiries and installations
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Get personalized solar recommendations
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Access exclusive offers and updates
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Priority customer support and service
              </li>
            </ul>
          </div>

          {/* Privacy Notice
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              By {isLogin ? 'signing in' : 'creating an account'}, you agree to our{' '}
              <a href="#" className="text-green-600 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>.
              We protect your data and never share your information with third parties.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
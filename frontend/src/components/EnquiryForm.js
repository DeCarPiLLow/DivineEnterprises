// import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { api } from '../services/api';

// const EnquiryForm = ({ standalone = false }) => {
//   const {token } = useAuth();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     location: '',
//     roof_type: '',
//     electricity_bill: '',
//     message: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');

//   const roofTypes = [
//     { value: '', label: 'Select roof type' },
//     { value: 'rcc', label: 'RCC (Concrete)' },
//     { value: 'metal', label: 'Metal Sheet' },
//     { value: 'tile', label: 'Tile Roof' },
//     { value: 'other', label: 'Other' }
//   ];

//   const billRanges = [
//     { value: '', label: 'Select range' },
//     { value: 'below-2000', label: 'Below ₹2,000' },
//     { value: '2000-5000', label: '₹2,000 - ₹5,000' },
//     { value: '5000-10000', label: '₹5,000 - ₹10,000' },
//     { value: '10000-20000', label: '₹10,000 - ₹20,000' },
//     { value: 'above-20000', label: 'Above ₹20,000' }
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       const res = await api.createEnquiry(formData, token);
//       const data = await res.json();
      
//       if (res.ok) {
//         setSuccess(true);
//         setFormData({
//           name: '',
//           email: '',
//           phone: '',
//           location: '',
//           roof_type: '',
//           electricity_bill: '',
//           message: ''
//         });
//         setTimeout(() => setSuccess(false), 5000);
//       } else {
//         setError(data.message || 'Failed to submit enquiry');
//       }
//     } catch (error) {
//       setError('Error submitting enquiry. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     // Clear error when user starts typing
//     if (error) setError('');
//   };

//   const containerClass = standalone 
//     ? "py-20 bg-gray-50" 
//     : "";

//   const formContainerClass = standalone 
//     ? "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" 
//     : "";

//   return (
//     <section className={containerClass}>
//       <div className={formContainerClass}>
//         {standalone && (
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Get Free Solar Consultation
//             </h2>
//             <p className="text-xl text-gray-600">
//               Fill out the form below and our solar experts will contact you within 24 hours
//             </p>
//           </div>
//         )}

//         {/* Success Message */}
//         {success && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
//             <div className="text-green-500 mr-3">✅</div>
//             <div>
//               <strong>Thank you!</strong> Our team will contact you soon with your personalized solar solution.
//             </div>
//           </div>
//         )}

//         {/* Error Message */}
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
//             <div className="text-red-500 mr-3">❌</div>
//             <div>{error}</div>
//           </div>
//         )}

//         <div className="bg-white rounded-2xl shadow-lg p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Personal Information */}
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
//                   placeholder="Enter your full name"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             {/* Contact Information */}
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
//                   placeholder="Enter your phone number"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Location <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
//                   placeholder="City, State"
//                 />
//               </div>
//             </div>

//             {/* Property Information */}
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Roof Type
//                 </label>
//                 <select
//                   name="roof_type"
//                   value={formData.roof_type}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
//                 >
//                   {roofTypes.map((type) => (
//                     <option key={type.value} value={type.value}>
//                       {type.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Monthly Electricity Bill
//                 </label>
//                 <select
//                   name="electricity_bill"
//                   value={formData.electricity_bill}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
//                 >
//                   {billRanges.map((range) => (
//                     <option key={range.value} value={range.value}>
//                       {range.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Additional Information */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Additional Message
//               </label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 rows={4}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
//                 placeholder="Tell us about your requirements, preferred installation time, or any specific questions..."
//               />
//             </div>

//             {/* Benefits Highlight */}
//             <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
//               <h4 className="font-semibold text-gray-900 mb-2">What happens next?</h4>
//               <ul className="text-sm text-gray-700 space-y-1">
//                 <li>• Free rooftop inspection within 48 hours</li>
//                 <li>• 3D design of your solar system in 30 minutes</li>
//                 <li>• Customized quote with financing options</li>
//                 <li>• No obligation consultation</li>
//               </ul>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
//                   Submitting...
//                 </div>
//               ) : (
//                 '🌟 Get Free Consultation'
//               )}
//             </button>

//             {/* Privacy Notice */}
//             <p className="text-xs text-gray-500 text-center">
//               By submitting this form, you agree to our privacy policy. 
//               We respect your privacy and will never share your information.
//             </p>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EnquiryForm;


import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

const EnquiryForm = ({ standalone = false }) => {
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    roof_type: '',
    electricity_bill: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const roofTypes = [
    { value: '', label: 'Select roof type' },
    { value: 'rcc', label: 'RCC (Concrete)' },
    { value: 'metal', label: 'Metal Sheet' },
    { value: 'tile', label: 'Tile Roof' },
    { value: 'other', label: 'Other' }
  ];

  const billRanges = [
    { value: '', label: 'Select range' },
    { value: 'below-2000', label: 'Below ₹2,000' },
    { value: '2000-5000', label: '₹2,000 - ₹5,000' },
    { value: '5000-10000', label: '₹5,000 - ₹10,000' },
    { value: '10000-20000', label: '₹10,000 - ₹20,000' },
    { value: 'above-20000', label: 'Above ₹20,000' }
  ];

  // Pre-fill user data when component mounts or user changes
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.username || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await api.createEnquiry(formData, token);
      const data = await res.json();
      
      if (res.ok) {
        setSuccess(true);
        setFormData({
          name: user ? user.username : '',
          email: user ? user.email : '',
          phone: user ? user.phone : '',
          location: '',
          roof_type: '',
          electricity_bill: '',
          subject: '',
          message: ''
        });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.message || 'Failed to submit enquiry');
      }
    } catch (error) {
      setError('Error submitting enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const containerClass = standalone 
    ? "py-20 bg-gray-50" 
    : "";

  const formContainerClass = standalone 
    ? "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" 
    : "";

  return (
    <section className={containerClass}>
      <div className={formContainerClass}>
        {standalone && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Free Solar Consultation
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and our solar experts will contact you within 24 hours
            </p>
            {user && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-green-700">
                  Welcome back, {user.username}! Your contact information has been pre-filled.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
            <div className="text-green-500 mr-3">✅</div>
            <div>
              <strong>Thank you!</strong> Our team will contact you soon with your personalized solar solution.
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
            <div className="text-red-500 mr-3">❌</div>
            <div>{error}</div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={!!user}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    user ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Enter your full name"
                />
                {user && (
                  <p className="text-sm text-gray-500 mt-1">
                    Pre-filled from your profile
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={!!user}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    user ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Enter your email"
                />
                {user && (
                  <p className="text-sm text-gray-500 mt-1">
                    Pre-filled from your profile
                  </p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={!!user}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    user ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Enter your phone number"
                />
                {user && (
                  <p className="text-sm text-gray-500 mt-1">
                    Pre-filled from your profile
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="City, State"
                />
              </div>
            </div>

            {/* Property Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Roof Type
                </label>
                <select
                  name="roof_type"
                  value={formData.roof_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                >
                  {roofTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Electricity Bill
                </label>
                <select
                  name="electricity_bill"
                  value={formData.electricity_bill}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                >
                  {billRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.Subject}
                  onChange={handleChange}
                  required
                  className="w-full px-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Subject"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2">
                Additional Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Tell us about your requirements, preferred installation time, or any specific questions..."
              />
            </div>

            {/* Benefits Highlight */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-gray-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Free rooftop inspection within 48 hours</li>
                <li>• Customized quote with financing options</li>
                <li>• No obligation consultation</li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Submitting...
                </div>
              ) : (
                '🌟 Get Free Consultation'
              )}
            </button>

            {/* Privacy Notice */}
            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to our privacy policy. 
              We respect your privacy and will never share your information.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EnquiryForm;
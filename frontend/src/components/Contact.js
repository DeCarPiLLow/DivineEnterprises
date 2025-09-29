import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import EnquiryForm from './EnquiryForm';

const Contact = () => {
  
  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Call Us',
      content: '+91 9876543210',
      subContent: 'Mon-Sat 9:00 AM - 6:00 PM',
      action: 'tel:+919876543210'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Us',
      content: 'info@solarsquare.in',
      subContent: 'Get response within 24 hours',
      action: 'mailto:info@solarsquare.in'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Visit Us',
      content: 'Indore, Madhya Pradesh',
      subContent: '',
      action: null
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'WhatsApp',
      content: '+91 9876543210',
      subContent: 'Quick chat support',
      action: 'https://wa.me/919876543210'
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, url: '#', name: 'Facebook' },
    { icon: <Twitter className="h-5 w-5" />, url: '#', name: 'Twitter' },
    { icon: <Instagram className="h-5 w-5" />, url: '#', name: 'Instagram' },
    { icon: <Linkedin className="h-5 w-5" />, url: '#', name: 'LinkedIn' }
  ];

  const officeHours = [
    { day: 'Monday - Friday', time: '9:00 AM - 7:00 PM' },
    { day: 'Saturday', time: '9:00 AM - 5:00 PM' },
    { day: 'Sunday', time: 'Emergency calls only' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your solar journey? Get in touch with our experts for a free consultation
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl p-8 text-white h-full">
              <h3 className="text-2xl font-bold mb-8">Get in Touch</h3>
              
              {/* Contact Methods */}
              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="p-2 bg-white/20 rounded-lg mr-4 group-hover:bg-white/30 transition-colors">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold mb-1">{item.title}</div>
                      {item.action ? (
                        <a 
                          href={item.action}
                          className="text-blue-100 hover:text-white transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <div className="text-blue-100">{item.content}</div>
                      )}
                      <div className="text-sm text-blue-200 mt-1">{item.subContent}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Office Hours */}
              <div className="border-t border-white/20 pt-6 mb-8">
                <h4 className="font-semibold mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Office Hours
                </h4>
                <div className="space-y-2">
                  {officeHours.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-blue-100">{item.day}</span>
                      <span className="text-white font-medium">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors group"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mt-8 p-4 bg-red-500/20 rounded-lg border border-red-300/30">
                <h4 className="font-semibold text-red-100 mb-2">24/7 Emergency Support</h4>
                <p className="text-sm text-red-200">
                  For existing customers with urgent solar system issues
                </p>
                <a 
                  href="tel:+919876543211" 
                  className="text-red-100 hover:text-white font-medium"
                >
                  +91 9876543211
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h3>
              <EnquiryForm standalone={false} />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Service Areas */}
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Service Areas</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Indore & Suburbs</li>
            </ul>
          </div>

          {/* Response Time */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Response Time</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Enquiry Response</span>
                <span className="text-sm font-semibold text-blue-600"> 2 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Site Inspection</span>
                <span className="text-sm font-semibold text-blue-600"> 48 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Quote Delivery</span>
                <span className="text-sm font-semibold text-blue-600"> 24 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Installation Start</span>
                <span className="text-sm font-semibold text-blue-600"> 7 days</span>
              </div>
            </div>
          </div>

          {/* Quality Assurance */}
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quality Assurance</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• UL Certified Components</li>
              <li>• Professional Installation Team</li>
              <li>• Post-Installation Support</li>
              <li>• Performance Monitoring</li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Make the Switch?
            </h3>
            <p className="text-lg mb-6 leading-relaxed">
              Join over 25,000 satisfied customers who are saving money with solar energy.
              Get your free consultation today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Schedule Site Visit
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                Call Now: +91 9876543210
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
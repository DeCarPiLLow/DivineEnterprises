import React from 'react';
import { Phone, Mail, MapPin, /*, Twitter, Instagram, Linkedin, ArrowRight*/ } from 'lucide-react';
import logo from "../assets/Logo.png"

const Footer = () => {
  const footerLinks = {
    services: [
      { name: 'Rooftop Solar Installation', href: '/services' },
      { name: 'Solar System Maintenance', href: '/services' },
      { name: 'Energy Consultation', href: '/services' }
    ],
    company: [
      { name: 'About Us', href: '#' }
      // { name: 'Our Team', href: '#' },
      // { name: 'Careers', href: '#' },
      // { name: 'Press Releases', href: '#' }
      ]
    // support: [
    //   { name: 'Help Center', href: '#' },
    //   { name: 'Contact Support', href: '#' },
    //   { name: 'System Status', href: '#' },
    //   { name: 'Installation Guide', href: '#' }
    // ],
    // legal: [
    //   { name: 'Privacy Policy', href: '#' },
    //   { name: 'Terms of Service', href: '#' },
    //   { name: 'Cookie Policy', href: '#' },
    //   { name: 'Warranty Terms', href: '#' }
    // ]
  };

  // const socialLinks = [
  //   { name: 'Facebook', icon: <Facebook className="h-5 w-5" />, href: '#' },
  //   { name: 'Twitter', icon: <Twitter className="h-5 w-5" />, href: '#' },
  //   { name: 'Instagram', icon: <Instagram className="h-5 w-5" />, href: '#' },
  //   { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, href: '#' }
  // ];

  // const certifications = [
  //   'UL Certified',
  //   'ISO 9001:2015',
  //   'IEC 61215',
  //   'IEC 61730'
  // ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated with Solar Insights</h3>
              <p className="text-gray-400">
                Get the latest news, tips, and exclusive offers delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                Subscribe
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img
                src={logo}
                alt="Divine Enterprises Logo"
                className="h-20 w-auto"
              />
              <span className="text-2xl font-bold">Divine Enterprises</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Making clean energy accessible 
              for everyone with professional installation and 
              comprehensive maintenance services.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-3 text-green-500" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-3 text-green-500" />
                <span>Solardivine69@gmail.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-3 text-green-500" />
                <span>Indore, Madhya Pradesh, India</span>
              </div>
            </div>

            {/* Social Links */}
            {/* <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors group"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div> */}
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-10">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Legal
          <div>
            <h3 className="text-lg font-semibold mb-6">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>*/}
        </div>

        {/* Certifications
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Certified & Trusted</h4>
              <div className="flex flex-wrap gap-4">
                {certifications.map((cert) => (
                  <span
                    key={cert}
                    className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-6 md:mt-0">
              <div className="text-sm text-gray-400">
                <div className="mb-1">24/7 Customer Support</div>
                <div className="text-green-500 font-semibold">+91 9876543211</div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Awards & Recognition
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-green-500 mb-2">🏆</div>
              <div className="text-sm text-gray-400">India's 3rd Largest EPC Contractor</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500 mb-2">⚡</div>
              <div className="text-sm text-gray-400">90 MW+ Solar Installations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500 mb-2">🌟</div>
              <div className="text-sm text-gray-400">25,000+ Satisfied Customers</div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              &copy; 2025 Divine Enterprises. All rights reserved. | Powering India's Solar Revolution
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-6">
              <span className="text-xs text-gray-500">Made with ❤️ for a sustainable future</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">System Status: Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
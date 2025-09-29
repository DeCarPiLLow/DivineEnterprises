import React from 'react';
import { CheckCircle } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '90%', label: 'upto Bill Reduction' },
    { number: '12+', label: 'Years Experienced Engineers' }
  ];

  const features = [
    'Free guidance from experienced solar consultants',
    'Complete rooftop inspection before installation',
    'No compromise with Material Quality',
    'Free 5-year annual maintenance contract'
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Divine Enterprises
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Divine Enterprises is a Govt. Authorized 'A' class electrical contractor
            & authorized vendor for SITC of solar rooftop plant.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Features List */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Why Choose Divine Enterprises?
              </h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start group">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Company Quote */}
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-l-4 border-green-500">
                <blockquote className="text-gray-700 italic text-lg leading-relaxed">
                  "I'd put my money on the sun and solar energy. 
                  What a source of power! I hope we don't have to wait until oil and coal run out before we tackle that."
                </blockquote>
                <cite className="text-green-600 font-semibold text-sm mt-2 block">
                  — Thomas Edison
                </cite>
              </div>
            </div>

            {/* Award Section */}
            <div className="text-center ">
              {/* <div className="text-8xl mb-6">🏆</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Award Winning Company
              </h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                India's third-largest EPC contractor with UL certification 
                and Rs. 30 lakhs daily solar installations.
              </p> */}

              {/* Certifications */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                <h5 className="font-bold text-gray-900 mb-3">Why Choose Solar?</h5>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li> Electricity Bill Reduction upto 90%</li>
                  <li> Subsidy from Central Govt. of upto Rs. 78000.00</li>
                  <li> Solar energy is 50% more cost effective than Thermal Electricity</li>
                  <li> Solar energy provides a cleaner, safer alternative that reduces Air pollution</li>
                  <li> Solar energy can be used in remote areas where grid electricity is not available</li>
                  <li> Loan availablity from Nationalized Bank with low interest rate of 6% up-to Rs 2,00,000</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto">
              To make clean, sustainable energy accessible to every Indian household, 
              helping our customers save money while contributing to a greener planet 
              for future generations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
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
    'Free 5-year annual maintenance services',
    'Reputed make used for Solar roof top plant',
    'Use of best design according to the site & enviornment conditions'
  ];

  const solarbenefits = [
    'Electricity Bill Reduction upto 90',
    'Subsidy from Central Govt. of upto Rs. 78000.00',
    'Solar energy is 50% more cost effective than Thermal Electricity',
    'Solar energy provides a cleaner, safer alternative that reduces Air pollution',
    'Loan availablity from Nationalized Bank with low interest rate of 6% to 6.5% up-to Rs 2,00,000'            
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
            & authorized vendor for SITC of solar rooftop plant having well trained and experienced engineers team.
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
                {features.map((solarbenefits, index) => (
                  <div key={index} className="flex items-start group">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700 leading-relaxed">{solarbenefits}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-6">
                Why Choose Solar?
              </h3>
              <div className="space-y-4">
                {solarbenefits.map((feature, index) => (
                  <div key={index} className="flex items-start group">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
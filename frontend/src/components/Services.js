import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Award } from 'lucide-react';

const Services = ({activeSection ,setActiveSection}) => {

  const navigate = useNavigate();

  const services = [
    {
      icon: <Zap className="h-12 w-12 text-blue-500" />,
      title: 'Solar Panel Installation',
      description: 'Safe and seamless installation with chemically anchored mounting structures for 25+ years durability.',
      features: [
        'Chemically anchored mounting',
        '25+ years system durability',
        'Professional installation team',
        'Safety-first approach'
      ]
    },
    {
      icon: <Award className="h-12 w-12 text-orange-500" />,
      title: 'Annual Maintenance',
      description: 'Free 5-year maintenance including quarterly cleaning and system efficiency monitoring.',
      features: [
        'Quarterly panel cleaning',
        'System performance monitoring',
        'Preventive maintenance',
        'Free 5-year coverage'
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            End-to-end solar solutions from inspection to installation and maintenance
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="group">
              <div className="bg-gray-50 rounded-2xl p-6 h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-gray-500 flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Process Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Our Installation Process
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Site Inspection', desc: 'Free rooftop assessment' },
              { step: '2', title: 'Custom Design', desc: 'Tailored solar system design for your home' },
              { step: '3', title: 'Installation', desc: 'Professional installation by certified experts' },
              { step: '4', title: 'Maintenance', desc: 'Ongoing support and maintenance for 5 years' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Environmental Impact
          </h3>
          <p className="text-lg mb-8 leading-relaxed">
            Installing even a 1 kW solar system means avoiding 1 metric ton of CO₂ 
            every year for 25 years - equivalent to planting 15 trees!
          </p>
          
          {/* Impact Visualization */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">1 kW</div>
              <div className="text-sm">Solar System</div>
            </div>
            <div className="text-2xl font-bold">=</div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">1 Ton</div>
              <div className="text-sm">CO₂ Saved/Year</div>
            </div>
            <div className="text-2xl font-bold">=</div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">15</div>
              <div className="text-sm">Trees Planted</div>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-2xl mb-2">🌱</div>
              <div className="font-semibold">Clean Energy</div>
              <div className="text-sm text-green-100">Zero emissions power generation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💰</div>
              <div className="font-semibold">Cost Savings</div>
              <div className="text-sm text-green-100">Up to 90% reduction in electricity bills</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🏡</div>
              <div className="font-semibold">Property Value</div>
              <div className="text-sm text-green-100">Increase your home's market value</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Go Solar?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who are saving money and helping the environment with solar energy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
            onClick={() => navigate('/contact')}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
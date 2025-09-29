import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Home, Calculator, Sun, Building2 /*, ChevronDown, Zap, TrendingUp, Users*/ } from 'lucide-react';

const SolarCalculator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    zipCode: '',
    unitRate: '',
    monthlyBill: '',
    roofSize: 'medium',
    propertyType: 'residential',
    electricityProvider: '',
    roofShade: 'no-shade'
  });
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const roofSizes = {
    'small': { label: 'Small (< 1,000 sq ft)', multiplier: 0.7 },
    'medium': { label: 'Medium (1,000 - 2,000 sq ft)', multiplier: 1.0 },
    'large': { label: 'Large (> 2,000 sq ft)', multiplier: 1.4 }
  };

  const shadeOptions = {
    'no-shade': { label: 'Little to no shade', efficiency: 1.0 },
    'some-shade': { label: 'Some shade during the day', efficiency: 0.85 },
    'heavy-shade': { label: 'Heavy shade most of the day', efficiency: 0.65 }
  };

  const calculateSolar = () => {
    const monthlyBillNum = parseFloat(formData.monthlyBill);
    const unitRateNum = parseFloat(formData.unitRate);

    if (!monthlyBillNum || !unitRateNum) return;

    // Basic calculations based on typical Indian solar metrics
    const annualUsage = monthlyBillNum * 12 / unitRateNum; // Assuming ₹6/kWh average rate in India
    const roofMultiplier = roofSizes[formData.roofSize].multiplier;
    const shadeEfficiency = shadeOptions[formData.roofShade].efficiency;
    
    const systemSize = (annualUsage / 1500) * roofMultiplier * shadeEfficiency; // kW (India gets more sun hours)
    const systemCost = systemSize * 65000; // ₹65,000/kW installed (typical Indian cost)
    const governmentSubsidy = Math.min(systemSize * 18000, 78000); // Central govt subsidy up to ₹78,000
    const netCost = systemCost - governmentSubsidy;
    
    const annualSavings = monthlyBillNum * 12 * 0.90; // Assuming 90% offset
    const monthlySavings = annualSavings / 12;
    const paybackPeriod = netCost / annualSavings;
    
    // 25-year calculations
    let totalSavings = 0;
    for (let year = 1; year <= 25; year++) {
      const yearlyRate = 6 * Math.pow(1.05, year - 1); // 5% annual increase in India
      totalSavings += annualUsage * yearlyRate * 0.90;
    }
    const netSavings = totalSavings - netCost;

    setResults({
      systemSize: systemSize.toFixed(1),
      numberOfPanels: Math.ceil(systemSize * 1000 / 400),
      systemCost: Math.round(systemCost),
      governmentSubsidy: Math.round(governmentSubsidy),
      netCost: Math.round(netCost),
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      paybackPeriod: paybackPeriod.toFixed(1),
      totalSavings: Math.round(totalSavings),
      netSavings: Math.round(netSavings),
      co2Offset: Math.round(annualUsage * 0.82 * 25) // kg CO2 (India's emission factor)
    });
    setShowResults(true);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else calculateSolar();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header
        <div className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center">
              <Sun className="h-8 w-8 text-orange-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-800">It's My Sun</h1>
            </div>
          </div>
        </div> */}

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Results Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Solar Estimate</h2>
            <p className="text-xl text-gray-600">Based on your energy usage in {formData.zipCode}</p>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Monthly Savings</h3>
              <p className="text-4xl font-bold text-green-600">₹{results.monthlySavings.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Average per month</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">System Cost</h3>
              <p className="text-4xl font-bold text-blue-600">₹{results.netCost.toLocaleString()}</p>
              <p className="text-sm text-gray-500">After government subsidy</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center border-l-4 border-purple-500">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Payback Period</h3>
              <p className="text-4xl font-bold text-purple-600">{results.paybackPeriod} years</p>
              <p className="text-sm text-gray-500">Break-even point</p>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Solar System Details</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-4">System Specifications</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">System Size:</span>
                    <span className="font-semibold">{results.systemSize} kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Number of Panels:</span>
                    <span className="font-semibold">{results.numberOfPanels} panels</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Roof Size:</span>
                    <span className="font-semibold">{roofSizes[formData.roofSize].label.split('(')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shading:</span>
                    <span className="font-semibold">{shadeOptions[formData.roofShade].label}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Financial Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">System Cost:</span>
                    <span className="font-semibold">₹{results.systemCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Government Subsidy:</span>
                    <span className="font-semibold text-green-600">-₹{results.governmentSubsidy.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-800 font-medium">Net Cost:</span>
                    <span className="font-bold">₹{results.netCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Savings:</span>
                    <span className="font-semibold text-green-600">₹{results.annualSavings.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Long-term Savings */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">25-Year Financial Impact</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-2">Total Savings</p>
                <p className="text-4xl font-bold text-green-600">₹{results.totalSavings.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-2">Net Profit</p>
                <p className="text-4xl font-bold text-blue-600">₹{results.netSavings.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-lg text-gray-700">Environmental Impact: <span className="font-bold text-green-600">{results.co2Offset.toLocaleString()} kg</span> of CO₂ offset over 25 years</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Go Solar?</h3>
            <p className="text-lg text-gray-600 mb-6">Get connected with pre-screened solar installers in your area for free quotes</p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <button 
                onClick={() => navigate("/contact")}
                className="w-full sm:w-auto bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Get Free Quotes
              </button>
              <button 
                onClick={() => setShowResults(false)}
                className="w-full sm:w-auto bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Recalculate
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-gray-100 rounded-lg p-6 mt-8">
            <p className="text-sm text-gray-600">
              <strong>Disclaimer:</strong> These estimates are based on typical installations in India and may vary based on your specific situation, state government incentives, electricity tariffs, and actual energy usage. Final costs and savings will depend on your system design, local regulations, and installation specifics. Government subsidies may vary by state and system capacity. This calculator is for informational purposes only.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* <div className="flex items-center">
              <Sun className="h-10 w-10 text-orange-500 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">It's My Sun</h1>
            </div> */}
            <div className="text-left">
              <p className="text-sm text-gray-600">Solar Calculator</p>
              <p className="text-lg font-semibold text-orange-600">Step {step} of 3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">Progress</span>
            <span className="text-sm font-medium text-gray-600">{Math.round((step/3)*100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step/3)*100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {step === 1 && (
            <div className="text-center">
              <MapPin className="h-16 w-16 text-orange-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Where are you located?</h2>
              <p className="text-gray-600 mb-8">We'll use your location to calculate local solar potential and incentives</p>
              
              <div className="max-w-md mx-auto">
                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                  ZIP Code
                </label>
                <input
                  type="number"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="Enter your ZIP code"
                  max="999999"
                  min="100000"
                />
                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                  Unit Rate
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500 text-lg">₹</span>
                  <input
                    type="number"
                    value={formData.unitRate}
                    onChange={(e) => setFormData({...formData, unitRate: e.target.value})}
                    className="w-full pl-8 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="8.00"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <DollarSign className="h-16 w-16 text-orange-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">What's your monthly electric bill?</h2>
              <p className="text-gray-600 mb-8">This helps us estimate your energy usage and potential savings</p>
              
              <div className="max-w-md mx-auto mb-8">
                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                  Monthly Electric Bill
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500 text-lg">₹</span>
                  <input
                    type="number"
                    value={formData.monthlyBill}
                    onChange={(e) => setFormData({...formData, monthlyBill: e.target.value})}
                    className="w-full pl-8 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="3000"
                  />
                </div>
              </div>

              <div className="text-left max-w-md mx-auto">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Property Type
                </label>
                <div className="space-y-2">
                  {['residential', 'commercial'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="propertyType"
                        value={type}
                        checked={formData.propertyType === type}
                        onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                        className="mr-3 text-orange-500"
                      />
                      <span className="capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <Home className="h-16 w-16 text-orange-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Tell us about your roof</h2>
              <p className="text-gray-600 mb-8">This information helps us size your solar system accurately</p>
              
              <div className="space-y-8">
                <div className="text-left max-w-md mx-auto">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Roof Size
                  </label>
                  <div className="space-y-3">
                    {Object.entries(roofSizes).map(([key, size]) => (
                      <label key={key} className="flex items-center p-3 border-2 border-gray-200 rounded-xl hover:border-orange-300 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="roofSize"
                          value={key}
                          checked={formData.roofSize === key}
                          onChange={(e) => setFormData({...formData, roofSize: e.target.value})}
                          className="mr-3 text-orange-500"
                        />
                        <span>{size.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="text-left max-w-md mx-auto">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How much shade does your roof get?
                  </label>
                  <div className="space-y-3">
                    {Object.entries(shadeOptions).map(([key, option]) => (
                      <label key={key} className="flex items-center p-3 border-2 border-gray-200 rounded-xl hover:border-orange-300 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="roofShade"
                          value={key}
                          checked={formData.roofShade === key}
                          onChange={(e) => setFormData({...formData, roofShade: e.target.value})}
                          className="mr-3 text-orange-500"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
              step === 1 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={nextStep}
            disabled={
              (step === 1 && !formData.zipCode) ||
              (step === 1 && !formData.unitRate) ||
              (step === 1 && formData.zipCode && parseFloat(formData.zipCode) < 100000) ||
              (step === 1 && formData.zipCode && parseFloat(formData.zipCode) > 999999) ||
              (step === 2 && !formData.monthlyBill)
            }
            className={`px-8 py-3 rounded-xl font-semibold transition-colors ${
              (step === 1 && !formData.zipCode) || (step === 2 && !formData.monthlyBill)
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg transform hover:scale-105'
            }`}
          >
            {step === 3 ? (
              <span className="flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Savings
              </span>
            ) : (
              'Next'
            )}
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          {/* <p className="text-sm text-gray-500 mb-4">Trusted by thousands of homeowners</p> */}
          <div className="flex justify-center items-center space-x-8 text-gray-400">
            {/* <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span className="text-sm">50,000+ estimates</span>
            </div> */}
            <div className="flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              <span className="text-sm">Licensed installers</span>
            </div>
            <div className="flex items-center">
              <Sun className="h-5 w-5 mr-2" />
              <span className="text-sm">Free service</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Hero = () => {
//   const navigate = useNavigate();
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       title: "#1 Rooftop Solar Company",
//       subtitle: "Save upto 90% on electricity bills with solar installation",
//       image: "🏠",
//     },
//     {
//       title: "Go Green, Go Solar",
//       subtitle: "Join thousands of satisfied humans saving money with solar",
//       image: "🌟",
//     },
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [slides.length]);

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   return (
//     <section className="bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 pt-16 min-h-screen flex items-center">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
//         <div className="text-center text-white">
//           {/* Slide Content */}
//           <div className="min-h-[350px] flex flex-col justify-center">
//             <div className="text-8xl mb-8 animate-pulse">
//               {slides[currentSlide].image}
//             </div>
//             <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
//               {slides[currentSlide].title}
//             </h1>
//             <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
//               {slides[currentSlide].subtitle}
//             </p>
//           </div>

//           {/* Call to Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
//             <button
//               onClick={() => navigate("/contact")}
//               className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
//             >
//               Get Free Consultation
//             </button>
//             {/* <button
//               onClick={() => navigate("/solarcalculator")}
//               className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
//             >
//               Calculate Your Savings
//             </button> */}
//           </div>

//           {/* Slide Indicators */}
//           <div className="flex justify-center space-x-3">
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`w-4 h-4 rounded-full transition-all duration-300 ${
//                   currentSlide === index
//                     ? "bg-white scale-110"
//                     : "bg-white/50 hover:bg-white/75"
//                 }`}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>

//           {/* Stats Preview */}
//           <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-16 max-w-4xl mx-auto">
//             <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
//               <div className="text-sm text-blue-100">Upto</div>
//               <div className="text-2xl font-bold">90%</div>
//               <div className="text-sm text-blue-100">Bill Reduction</div>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
//               <div className="text-2xl font-bold">12+</div>
//               <div className="text-sm text-blue-100">Years Experience</div>
//               <div className="text-sm text-blue-100">Engineers</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import solarBg1 from "../assets/solar-bg-1.JPG";
import solarBg2 from "../assets/solar-bg-2.JPG";

const Hero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "#1 Rooftop Solar Company",
      subtitle: "Save upto 90% on electricity bills with solar installation",
      image: logo,
      bgImage: solarBg1,
    },
    {
      title: "Go Green, Go Solar",
      subtitle: "Join thousands of satisfied humans saving money with solar",
      image: logo,
      bgImage: solarBg2,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      className="pt-16 min-h-screen flex items-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${slides[currentSlide].bgImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full text-center text-white">
          
          {/* Slide Content */}
          <div className="min-h-[350px] flex flex-col justify-center">
            {/* <div className="text-8xl mb-8 animate-pulse">
              {slides[currentSlide].image}
            </div> */}
            <div className="flex justify-center mb-8 animate-pulse">
              <img
                src={slides[currentSlide].image}
                alt="Slide Logo"
                className="w-32 h-32 object-contain"
              />
            </div>
            
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
              {slides[currentSlide].subtitle}
            </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => navigate("/contact")}
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Free Consultation
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-white scale-110"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-16 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-sm text-blue-100">Upto</div>
              <div className="text-2xl font-bold">90%</div>
              <div className="text-sm text-blue-100">Bill Reduction</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">12+</div>
              <div className="text-sm text-blue-100">Years Experience</div>
              <div className="text-sm text-blue-100">Engineers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
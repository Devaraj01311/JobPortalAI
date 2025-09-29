import React, { useState } from "react";
import Slider from "react-slick";

const CompanyLogoSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const companies = [
    { id: 1, name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { id: 2, name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { id: 3, name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { id: 4, name: "Facebook", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" },
    { id: 5, name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { id: 6, name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
    { id: 7, name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { id: 8, name: "Intel", logo: "https://pngimg.com/d/intel_PNG21.png" },
    { id: 9, name: "Adobe", logo: "https://logos-world.net/wp-content/uploads/2020/06/Adobe-Logo-1993-2014.png" },
    { id: 10, name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1800,
    cssEase: "linear",
    beforeChange: (current, next) => setActiveIndex(next),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="px-6 md:px-12">
      <h2 className="text-start mt-6 text-3xl md:text-4xl text-black font-extrabold tracking-tight mb-8">
        Top <span className="text-3xl text-blue-500">Hiring Companies</span> 
      </h2>

      <div className="company-slider bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl shadow-md py-8 px-4">
        <Slider {...settings}>
          {companies.map((company, index) => (
            <div key={company.id} className="flex justify-center items-center h-36">
              <div
                className={`w-32 h-32 bg-white shadow-md rounded-2xl flex items-center justify-center p-4 transition-all duration-300 
                ${index === activeIndex ? "scale-110 shadow-xl" : "opacity-60"}`}
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className={`max-h-16 max-w-24 object-contain transition-all duration-300 
                  ${index === activeIndex ? "grayscale-0" : "grayscale"}`}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CompanyLogoSlider;

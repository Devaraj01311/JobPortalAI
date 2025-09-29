import React from "react";

const CareerSection = () => {
  return (
    <section className="relative w-full py-16 px-6 md:px-12 lg:px-20 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50 -z-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug">
          <span className="text-5xl text-blue-500" > Find Your Career.</span> <br /> You Deserve it.
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Each month, more than <span className="font-semibold">7 million</span> jobseekers
            turn to us in their search for work, making over{" "}
            <span className="font-semibold">160,000 applications</span> every day.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-8">
            {[
              { name: "Twitter", logo: "https://cdn-icons-png.flaticon.com/512/733/733579.png" },
              { name: "Instagram", logo: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png" },
              { name: "Workplace", logo: "https://static.vecteezy.com/system/resources/previews/018/930/698/non_2x/facebook-logo-facebook-icon-transparent-free-png.png" },
              { name: "YouTube", logo: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png" },
              { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-16 h-16 bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <img src={item.logo} alt={item.name} className="h-8 w-8 object-contain" />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="md:hidden grid grid-cols-2 gap-3 w-full">
            <img
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c"
              alt="Career 1"
              loading="lazy"
              className="col-span-2 w-full h-44 sm:h-48 object-cover rounded-xl shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6"
              alt="Career 2"
              loading="lazy"
              className="w-full h-36 sm:h-40 object-cover rounded-xl shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Career 3"
              loading="lazy"
              className="w-full h-36 sm:h-40 object-cover rounded-xl shadow-md"
            />
          </div>
          <div className="hidden md:block relative w-full h-96">
            <img
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c"
              alt="Career 1"
              loading="lazy"
              className="
                absolute
                -left-8 -top-6
                z-20
                w-64 md:w-72 lg:w-80
                h-44 md:h-52 lg:h-56
                object-cover rounded-xl shadow-2xl
                transition-transform duration-300
                hover:scale-105
              "
            />
            <img
              src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6"
              alt="Career 2"
              loading="lazy"
              className="
                absolute
                -right-8 top-1
                z-10
                w-60 md:w-64 lg:w-80
                h-48 md:h-52 lg:h-52
                object-cover rounded-xl shadow-lg
                transition-transform duration-300
                hover:scale-105
              "
            />
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Career 3"
              loading="lazy"
              className="
                absolute
                left-20 -bottom-6
                z-30
                w-72 md:w-80 lg:w-96
                h-52 md:h-56 lg:h-64
                object-cover rounded-xl shadow-xl
                transition-transform duration-300
                hover:scale-105
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerSection;

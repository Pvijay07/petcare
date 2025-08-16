import { Hero } from "@/components/Hero";
import React from "react";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaBell,
  FaInfoCircle,
  FaCommentAlt,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const services = [
    { id: 1, name: "Boarding", icon: "/assets/boarding-img.png" },
    { id: 2, name: "Grooming", icon: "/assets/boarding-img.png" },
    { id: 3, name: "Training", icon: "/assets/boarding-img.png" },
    { id: 4, name: "Walking", icon: "/assets/boarding-img.png" },
  ];
  const navigate = useNavigate();

  const blogs = [
    {
      title: "How to Calm Dog Anxiety",
      excerpt: "All of us have things that scare us,",
      date: "10th February, 2021",
      image: "/images/blog-dog.png",
    },
    // Add more blog posts as needed
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm flex justify-between items-center">
        <div className="menu-icon space-y-1.5 cursor-pointer">
          <span className="block w-6 h-0.5 bg-gray-600"></span>
          <span className="block w-6 h-0.5 bg-gray-600"></span>
          <span className="block w-4 h-0.5 bg-gray-600"></span>
        </div>

        <div className="flex items-center text-gray-700">
          <FaMapMarkerAlt className="mr-1 text-red-500" />
          <span className="text-sm">Bangalore, Hoodi</span>
        </div>

        <div className="relative">
          <FaBell className="text-gray-600 text-xl" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-20">
        {/* Search Section */}
        <section className="mb-6">
          <p className="text-gray-500 mb-1">Hey Jayan</p>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            What are you <span className="text-indigo-600">looking for?</span>
          </h1>

          <div className="relative">
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="search"
              placeholder="Search services"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
            />
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Services</h2>
            <button className="text-indigo-600 text-sm font-medium">
              See all
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/service/${service.id}`);
                  }}
                >
                  <img
                    src={service.icon}
                    alt={service.name}
                    className="w-8 h-8"
                  />
                </div>
                <h6 className="text-xs text-gray-700 text-center">
                  {service.name}
                </h6>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Hero />
        </section>
      </main>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around items-center">
        <div className="text-center">
          <FaInfoCircle className="mx-auto text-gray-500 text-xl" />
        </div>

        <div className="text-center">
          <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center -mt-8 mx-auto shadow-lg">
            <img src="/images/paw-foot.png" alt="Home" className="w-6 h-6" />
          </div>
          <p className="text-xs mt-1 text-indigo-600 font-medium">Home</p>
        </div>

        <div className="text-center">
          <FaCommentAlt className="mx-auto text-gray-500 text-xl" />
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

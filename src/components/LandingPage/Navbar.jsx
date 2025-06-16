import { SiTrainerroad } from "react-icons/si"; 
import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-white fixed top-[48px] z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-gray-800">
              <SiTrainerroad />
            </a>
          </div>

          {/* Toggle button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-800 hover:text-gray-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Links */}
          <div className={`lg:flex lg:items-center ${isOpen ? "block" : "hidden"}`}>
            <div className="flex flex-col lg:flex-row lg:space-x-6">
              <a href="/" className="text-gray-700 hover:text-blue-500 py-2 lg:py-0">Home</a>
              <a href="/" className="text-gray-700 hover:text-blue-500 py-2 lg:py-0">About</a>
              <a href="/" className="text-gray-700 hover:text-blue-500 py-2 lg:py-0">Services</a>

              {/* Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 hover:text-blue-500 py-2 lg:py-0">Pages</button>
                <div className="absolute left-0 mt-2 w-40 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hidden group-hover:block">
                  <a href="/" className="block px-4 py-2 hover:bg-gray-100">Features</a>
                  <a href="/" className="block px-4 py-2 hover:bg-gray-100">Our Team</a>
                  <a href="/" className="block px-4 py-2 hover:bg-gray-100">Testimonial</a>
                  <a href="/" className="block px-4 py-2 hover:bg-gray-100">Appointment</a>
                  <a href="/404" className="block px-4 py-2 hover:bg-gray-100">404 Page</a>
                </div>
              </div>

              <a href="/contact" className="text-gray-700 hover:text-blue-500 py-2 lg:py-0">Contact</a>
            </div>
          </div>

          {/* Button */}
          <div className="hidden lg:block">
            <a
              href="/admin"
              className="ml-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}

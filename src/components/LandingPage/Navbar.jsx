import { SiTrainerroad } from "react-icons/si";
import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-[#fff8e6] fixed top-[48px] z-40 shadow-sm border-b border-[#f3e6ca]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2 text-[#d3932d] text-2xl font-bold">
            <SiTrainerroad />
            <a href="/" className="tracking-wider">TRAINING HUB</a>
          </div>

          {/* Mobile Toggle */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#d3932d] focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className={`lg:flex lg:items-center ${isOpen ? "block" : "hidden"}`}>
            <div className="flex flex-col lg:flex-row lg:space-x-6 text-sm font-medium">
              <a href="/" className="text-[#d3932d] hover:text-orange-700 py-2 lg:py-0 transition">Home</a>
              <a href="/" className="text-[#d3932d] hover:text-orange-700 py-2 lg:py-0 transition">About</a>
              <a href="/" className="text-[#d3932d] hover:text-orange-700 py-2 lg:py-0 transition">Services</a>

              {/* Dropdown */}
              <div className="relative group">
                <button className="text-[#d3932d] hover:text-orange-700 py-2 lg:py-0 transition">Pages</button>
                <div className="absolute left-0 mt-2 w-44 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hidden group-hover:block">
                  <a href="/" className="block px-4 py-2 text-sm hover:bg-[#f9f2e2] text-[#d3932d]">Features</a>
                  <a href="/" className="block px-4 py-2 text-sm hover:bg-[#f9f2e2] text-[#d3932d]">Our Team</a>
                  <a href="/" className="block px-4 py-2 text-sm hover:bg-[#f9f2e2] text-[#d3932d]">Testimonial</a>
                  <a href="/" className="block px-4 py-2 text-sm hover:bg-[#f9f2e2] text-[#d3932d]">Appointment</a>
                  <a href="/404" className="block px-4 py-2 text-sm hover:bg-[#f9f2e2] text-[#d3932d]">404 Page</a>
                </div>
              </div>

              <a href="/contact" className="text-[#d3932d] hover:text-orange-700 py-2 lg:py-0 transition">Contact</a>
            </div>
          </div>

          {/* Login Button */}
          <div className="hidden lg:block">
            <a
              href="/admin/auth/login"
              className="ml-4 inline-block bg-[#d3932d] text-white px-4 py-2 rounded hover:bg-[#b97d1c] transition"
            >
              Login
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}

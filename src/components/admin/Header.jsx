import { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiSun,
  FiMoon,
  FiUser,
  FiSettings,
  FiLogOut,
  FiHelpCircle,
} from "react-icons/fi";

// Utility localStorage aman
function safeLocalStorage() {
  try {
    if (typeof window !== "undefined" && window.localStorage) return window.localStorage;
  } catch {}
  return { getItem:()=>null, setItem:()=>{} };
}

export default function Header() {
  // Initial state diambil dari localStorage DAN prefers-color-scheme
  const getInitialDark = () => {
    const ls = safeLocalStorage();
    const saved = ls.getItem("traininghub-dark");
    if (saved !== null) return saved === "true";
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return true;
    return false;
  };

  const [dark, setDark] = useState(getInitialDark);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef();

  // SET class dark di <html> pada setiap perubahan dan saat mount
  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    safeLocalStorage().setItem("traininghub-dark", dark);
  }, [dark]);

  // Inisialisasi sekali agar class dark terset di awal (penting!)
  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, []); // hanya sekali

  // Tutup dropdown jika klik di luar menu
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    }
    if (dropdown) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdown]);

  return (
    <header className="sticky top-0 z-30 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-b-2xl shadow-xl border-b border-[#d3932d]/30 px-6 py-3 flex items-center justify-between transition-all duration-300">
      <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-2" style={{ color: "#d3932d" }}>
        <span className="drop-shadow-glow flex items-center gap-2">
          <svg width="30" height="30" viewBox="0 0 40 40" className="inline-block" fill="none">
            <circle cx="20" cy="20" r="18" fill="#d3932d" />
            <text x="20" y="27" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold" fontFamily="Arial">TH</text>
          </svg>
          TrainingHub
        </span>
        <span className="text-base text-zinc-600 dark:text-zinc-200 bg-[#d3932d] bg-opacity-10 px-2 py-1 rounded-md font-semibold ml-1">Admin</span>
      </h1>
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative max-w-xs">
          <FiSearch className="absolute left-3 top-2.5 text-[#d3932d]" />
          <input
            type="text"
            placeholder="Search training..."
            aria-label="Search training"
            className="pl-10 pr-3 py-2 rounded-lg shadow-inner outline-none focus:ring-2 focus:ring-[#d3932d] border border-[#d3932d]/30 bg-white/80 dark:bg-zinc-800/80 text-gray-900 dark:text-zinc-100 placeholder:text-[#d3932d]/50 transition"
          />
        </div>
        
        {/* Avatar and Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            aria-label="Open profile menu"
            className="w-10 h-10 rounded-full border-2 border-[#d3932d] focus:ring-2 focus:ring-[#d3932d]/30 transition flex items-center justify-center"
            onClick={() => setDropdown((d) => !d)}
            tabIndex={0}
          >
            <img
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=64&h=64&facepad=2"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full object-cover"
              style={{ background: "#f6e9d6" }}
            />
          </button>
          {/* Dropdown */}
          <div
            className={`absolute right-0 mt-2 min-w-[180px] bg-white dark:bg-zinc-900 border border-[#d3932d]/20 rounded-xl shadow-xl overflow-hidden py-2 transition-all duration-200 z-50 ${
              dropdown
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
            tabIndex={-1}
            role="menu"
            aria-label="Profile menu"
          >
            <div className="px-4 py-2 flex items-center gap-2 border-b border-[#d3932d]/10">
              <img
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=64&h=64&facepad=2"
                alt="Admin Avatar"
                className="w-8 h-8 rounded-full object-cover"
                style={{ background: "#f6e9d6" }}
              />
              <div>
                <div className="font-bold text-[#d3932d]">Admin Name</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-300">admin@traininghub.com</div>
              </div>
            </div>
            <button
              className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-[#d3932d]/10 dark:hover:bg-[#d3932d]/20 transition cursor-pointer text-zinc-700 dark:text-zinc-100"
              role="menuitem"
            >
              <FiUser className="text-[#d3932d]" />
              Profile
            </button>
            <button
              className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-[#d3932d]/10 dark:hover:bg-[#d3932d]/20 transition cursor-pointer text-zinc-700 dark:text-zinc-100"
              role="menuitem"
            >
              <FiSettings className="text-[#d3932d]" />
              Settings
            </button>
            <button
              className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-[#d3932d]/10 dark:hover:bg-[#d3932d]/20 transition cursor-pointer text-zinc-700 dark:text-zinc-100"
              role="menuitem"
            >
              <FiHelpCircle className="text-[#d3932d]" />
              Help
            </button>
            <div className="border-t border-[#d3932d]/10 my-1" />
            {/* LOGOUT LINK */}
            <a
              href="/"
              className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition cursor-pointer text-red-600 dark:text-red-400"
              role="menuitem"
            >
              <FiLogOut className="text-red-400" />
              <a href="/"></a>
              Logout
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
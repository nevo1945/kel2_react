import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const supabaseUrl = "https://mniwbtlawknevocoljyw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uaXdidGxhd2tuZXZvY29sanl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTgwNTIsImV4cCI6MjA2NTU3NDA1Mn0.J3lXY83_HMclM5yknFx-jM-zZiUWiwgR21nve8zIG0Q";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Carousel() {
  const [slides, setSlides] = useState([]);
  const [curr, setCurr] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const fetchCarousel = async () => {
      const { data, error } = await supabase.from("carousel").select("*");
      if (!error && data) setSlides(data);
    };
    fetchCarousel();
  }, []);

  // Auto play every 4s
  useEffect(() => {
    if (slides.length < 2) return;
    timeoutRef.current = setTimeout(() => {
      setCurr((c) => (c + 1) % slides.length);
    }, 4000);
    return () => clearTimeout(timeoutRef.current);
  }, [curr, slides.length]);

  const goTo = (idx) => {
    setCurr(idx);
    clearTimeout(timeoutRef.current);
  };

  const prev = () => goTo(curr === 0 ? slides.length - 1 : curr - 1);
  const next = () => goTo((curr + 1) % slides.length);

  return (
    <div className="relative w-full max-w-[98vw] xl:max-w-[1700px] mx-auto mt-8 mb-10 rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-[#fffbf5] to-[#fff6e3] dark:from-[#23211a] dark:to-[#1a1915] border border-[#d3932d]/10">
      {/* Slides */}
      <div className="relative h-[260px] sm:h-[350px] lg:h-[500px]">
        {slides.map((item, idx) => (
          <div
            key={item.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              idx === curr ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            aria-hidden={idx !== curr}
          >
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 scale-105 blur-[1px] brightness-75"
              draggable="false"
              loading="lazy"
              style={{ transition: 'filter .7s, transform .7s' }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-2">
              <div className="backdrop-blur-md bg-white/30 dark:bg-black/30 rounded-2xl p-4 sm:p-8 md:p-12 shadow-xl border border-[#d3932d]/20 max-w-2xl mx-auto animate-fadein">
                <h5 className="uppercase tracking-widest text-xs md:text-sm text-[#d3932d] font-bold mb-2 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 40 40" className="inline-block" fill="none">
                    <circle cx="20" cy="20" r="18" fill="#d3932d" />
                    <text x="20" y="27" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="Arial">TH</text>
                  </svg>
                  {item.subtitle}
                </h5>
                <h1 className="md:text-4xl text-2xl font-black mb-3 text-zinc-900 dark:text-white drop-shadow-lg leading-tight transition-colors duration-300 text-center">
                  {item.title}
                </h1>
                {item.button_text && (
                  <a
                    href={item.button_link || "#"}
                    className="inline-block px-8 py-3 mt-2 rounded-full font-bold text-base shadow-md bg-[#d3932d] hover:bg-[#b87a20] text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d3932d]/40"
                  >
                    {item.button_text}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
        {/* Loader fallback */}
        {!slides.length && (
          <div className="flex w-full h-full items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#d3932d]/20 border-b-[#d3932d]"></div>
          </div>
        )}
      </div>
      {/* Controls */}
      {slides.length > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute top-1/2 -translate-y-1/2 left-3 md:left-10 z-20 bg-white/80 dark:bg-zinc-800/80 hover:bg-[#d3932d] hover:text-white border border-[#d3932d]/50 shadow-lg rounded-full p-2 md:p-4 transition-all flex items-center justify-center group"
          >
            <FiChevronLeft className="text-2xl md:text-3xl group-hover:scale-125 transition" />
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="absolute top-1/2 -translate-y-1/2 right-3 md:right-10 z-20 bg-white/80 dark:bg-zinc-800/80 hover:bg-[#d3932d] hover:text-white border border-[#d3932d]/50 shadow-lg rounded-full p-2 md:p-4 transition-all flex items-center justify-center group"
          >
            <FiChevronRight className="text-2xl md:text-3xl group-hover:scale-125 transition" />
          </button>
          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-[#d3932d] transition-all duration-200 ${
                  i === curr
                    ? "bg-[#d3932d] scale-125 shadow-xl"
                    : "bg-white/60 dark:bg-zinc-700"
                }`}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </>
      )}
      {/* Golden border and noise effect for material feel */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-[#d3932d]/30"
        style={{
          boxShadow: "0 4px 60px 0 #d3932d22, 0 1.5px 8px 0 #d3932d14",
          background: "url('https://transparenttextures.com/patterns/symphony.png') repeat",
          opacity: 0.07
        }}
      ></div>
    </div>
  );
}
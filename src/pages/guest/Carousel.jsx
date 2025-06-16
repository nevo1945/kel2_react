import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mniwbtlawknevocoljyw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uaXdidGxhd2tuZXZvY29sanl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTgwNTIsImV4cCI6MjA2NTU3NDA1Mn0.J3lXY83_HMclM5yknFx-jM-zZiUWiwgR21nve8zIG0Q"; // Ganti dengan anon key kamu
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Carousel() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchCarousel = async () => {
      const { data, error } = await supabase.from("carousel").select("*");
      if (!error) setSlides(data);
    };
    fetchCarousel();
  }, []);

  return (
    <div className="container-fluid p-0 mb-5">
      <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {slides.map((item, index) => (
            <div key={item.id} className={`carousel-item ${index === 0 ? "active" : ""}`}> 
              <img className="w-100" src={item.image_url} alt={item.title} style={{ maxHeight: "500px", objectFit: "cover" }} />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <div className="p-3" style={{ maxWidth: 700 }}>
                  <h5 className="text-white text-uppercase mb-3 animated slideInDown">
                    {item.subtitle}
                  </h5>
                  <h1 className="display-1 text-white mb-md-4 animated zoomIn">
                    {item.title}
                  </h1>
                  {item.button_text && (
                    <a href={item.button_link || "#"} className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">
                      {item.button_text}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#header-carousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

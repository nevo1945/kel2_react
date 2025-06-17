import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching testimonials:", error);
      } else {
        setTestimonials(data);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="container-fluid py-6 bg-light">
      <div className="container">
        <div
          className="text-center mx-auto wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: "600px" }}
        >
          <h1 className="display-6 text-uppercase mb-5">
            What Our Clients Say
          </h1>
        </div>
        <div className="row g-4">
          {testimonials.length > 0 ? (
            testimonials.map((t, index) => (
              <div
                key={t.id}
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay={`${0.1 + (index % 4) * 0.1}s`}
              >
                <div className="card h-100 shadow rounded-4 border-0">
                  <div className="card-body text-center p-4">
                    <img
                      src={t.avatar_url || "https://via.placeholder.com/100"}
                      alt={t.name}
                      className="rounded-circle mb-3"
                      width="80"
                      height="80"
                    />
                    <h5 className="fw-bold">{t.name}</h5>
                    <p className="text-muted mb-2">{t.role}</p>
                    <p className="fst-italic">"{t.content}"</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Loading testimonials...</p>
          )}
        </div>
      </div>
    </div>
  );
}

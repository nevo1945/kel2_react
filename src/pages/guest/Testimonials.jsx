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
    <div className="container my-5">
      <h2 className="text-center mb-4">What Our Clients Say</h2>
      <div className="row">
        {testimonials.map((t) => (
          <div key={t.id} className="col-md-4">
            <div className="card p-3 shadow">
              <img
                src={t.avatar_url || "https://via.placeholder.com/100"}
                alt={t.name}
                className="rounded-circle mb-3"
                width="80"
              />
              <h5>{t.name}</h5>
              <p className="text-muted">{t.role}</p>
              <p>"{t.content}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

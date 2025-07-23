import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: "", role: "", content: "", avatar_url: "" });

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setTestimonials(data);
    };

    fetchTestimonials();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await supabase.from("testimonials").insert([form]);
    setForm({ name: "", role: "", content: "", avatar_url: "" });

    // Fetch again after insert
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setTestimonials(data);
  };

  return (
    <div className="container-fluid py-6 bg-light">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
          <h1 className="display-6 text-uppercase">What Our Clients Say</h1>
        </div>

        {/* Form Input Guest Testimonial */}
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Your Role"
                className="form-control"
              />
            </div>
            <div className="col-12">
              <input
                type="text"
                name="avatar_url"
                value={form.avatar_url}
                onChange={handleChange}
                placeholder="Avatar URL (optional)"
                className="form-control"
              />
            </div>
            <div className="col-12">
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Your Testimonial"
                className="form-control"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary px-5">
                Submit Testimonial
              </button>
            </div>
          </div>
        </form>

        {/* Testimonial Cards */}
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

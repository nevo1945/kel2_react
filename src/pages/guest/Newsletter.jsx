import { useState } from "react";
import { supabase } from "../../lib/supabaseClient"; // pastikan path ini sesuai dengan struktur project kamu

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("newsletter")
      .insert([{ email }]);

    if (error) {
      setMessage("Failed to subscribe. Please try again.");
      console.error("Supabase Error:", error);
    } else {
      setMessage("Thank you for subscribing!");
      setEmail("");
    }

    setLoading(false);
  };

  return (
    <div className="container-fluid newsletter mt-6 wow fadeIn" data-wow-delay="0.1s">
      <div className="container pb-5">
        <div className="bg-white p-5 mb-5">
          <div className="row g-5">
            <div className="col-md-6 wow fadeIn" data-wow-delay="0.3s">
              <h1 className="display-6 text-uppercase mb-4">Newsletter</h1>
              <div className="d-flex">
                <i className="far fa-envelope-open fa-3x text-primary me-4"></i>
                <p className="fs-5 fst-italic mb-0">
                  Subscribe to get our latest news and updates directly in your inbox.
                </p>
              </div>
            </div>
            <div className="col-md-6 wow fadeIn" data-wow-delay="0.5s">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control border-0 bg-light"
                    id="mail"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="mail">Your Email</label>
                </div>
                <button className="btn btn-primary w-100 py-3" type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Now"}
                </button>
                {message && <p className="mt-3 text-center">{message}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

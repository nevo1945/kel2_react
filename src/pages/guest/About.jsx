// Guest/pages/About.jsx
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://mniwbtlawknevocoljyw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uaXdidGxhd2tuZXZvY29sanl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTgwNTIsImV4cCI6MjA2NTU3NDA1Mn0.J3lXY83_HMclM5yknFx-jM-zZiUWiwgR21nve8zIG0Q" // ganti dengan anon key Anda
);

export default function About() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      const { data, error } = await supabase.from("about").select("*").single(); // Ambil satu baris saja
      if (!error) setAboutData(data);
    };
    fetchAbout();
  }, []);

  if (!aboutData) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="container-fluid pt-6 pb-6 bg-gray-50">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6">
            <div className="about-img">
              <img
                className="img-fluid w-100 rounded"
                src={aboutData.image_url || "/assets/Weldork-1.0.0/img/about.jpg"}
                alt={aboutData.title}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <h1 className="display-6 text-uppercase mb-4">{aboutData.title}</h1>
            <p className="mb-4">{aboutData.description}</p>

            <div className="row g-4 mb-4">
              <div className="col-sm-6 d-flex align-items-start gap-3">
                <div className="bg-white p-3 rounded shadow">
                  <i className="fa fa-users-cog fa-2x text-primary"></i>
                </div>
                <h5 className="lh-base text-uppercase mb-0">Certified Expert & Team</h5>
              </div>
              <div className="col-sm-6 d-flex align-items-start gap-3">
                <div className="bg-white p-3 rounded shadow">
                  <i className="fa fa-tachometer-alt fa-2x text-primary"></i>
                </div>
                <h5 className="lh-base text-uppercase mb-0">Fast & Reliable Services</h5>
              </div>
            </div>

            <ul className="mb-3 space-y-2">
              <li><i className="fa fa-check-square text-primary me-2"></i>High quality service</li>
              <li><i className="fa fa-check-square text-primary me-2"></i>Professional team support</li>
              <li><i className="fa fa-check-square text-primary me-2"></i>Custom metal fabrication</li>
            </ul>

            <div className="border border-4 border-primary p-4 text-center mt-4 bg-white shadow">
              <h4 className="lh-base text-uppercase mb-0">
                We’re Good in All Metal Works Using Quality Welding Tools
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Konfigurasi Supabase
const supabaseUrl = "https://mniwbtlawknevocoljyw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uaXdidGxhd2tuZXZvY29sanl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTgwNTIsImV4cCI6MjA2NTU3NDA1Mn0.J3lXY83_HMclM5yknFx-jM-zZiUWiwgR21nve8zIG0Q";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Features() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      const { data, error } = await supabase.from("features").select("*");
      if (!error) setFeatures(data);
    };
    fetchFeatures();
  }, []);

  return (
    <div className="container-fluid pt-6 pb-6">
      <div className="container pt-4">
        <div className="row g-0 feature-row wow fadeIn" data-wow-delay="0.1s">
          {features.map((item, index) => (
            <div
              key={item.id}
              className="col-md-6 col-lg-3 wow fadeIn"
              data-wow-delay={`0.${index + 3}s`}
            >
              <div className="feature-item border h-100">
                <div className="feature-icon btn-xxl-square bg-primary mb-4 mt-n4">
                  <i className={`fa ${item.icon_class} fa-2x text-white`}></i>
                </div>
                <div className="p-5 pt-0">
                  <h5 className="text-uppercase mb-3">{item.title}</h5>
                  <p>{item.description}</p>
                  {item.link_text && (
                    <a
                      className="position-relative text-body text-uppercase small d-flex justify-content-between"
                      href={item.link_url || "#"}
                    >
                      <b className="bg-white pe-3">{item.link_text}</b>
                      <i className="bi bi-arrow-right bg-white ps-3"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
          {features.length === 0 && (
            <div className="col-12 text-center py-5">
              <p>Loading features...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

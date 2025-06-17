import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function WhyChooseUs() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const { data: result, error } = await supabase
      .from("whychooseus")
      .select("*")
      .limit(1)
      .single();

    if (error) {
      console.error("Gagal mengambil data:", error);
    } else {
      setData(result);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <div className="text-center py-10 text-white">Loading...</div>;

  return (
    <div className="container-fluid feature mt-6 mb-6 wow fadeIn" data-wow-delay="0.1s">
      <div className="container">
        <div className="row g-0 justify-content-end">
          <div className="col-lg-6 pt-5">
            <div className="mt-5">
              <h1 className="display-6 text-white text-uppercase mb-4 wow fadeIn" data-wow-delay="0.3s">
                {data.title}
              </h1>
              <p className="text-light mb-4 wow fadeIn" data-wow-delay="0.4s">
                {data.description}
              </p>
              <div className="row g-4 pt-2 mb-4">
                <div className="col-sm-6 wow fadeIn" data-wow-delay="0.4s">
                  <div className="flex-column text-center border border-primary p-5">
                    <h1 className="text-white" data-toggle="counter-up">{data.satisfiedClients}</h1>
                    <p className="text-white text-uppercase mb-0">Satisfied Clients</p>
                  </div>
                </div>
                <div className="col-sm-6 wow fadeIn" data-wow-delay="0.5s">
                  <div className="flex-column text-center border border-primary p-5">
                    <h1 className="text-white" data-toggle="counter-up">{data.completeProjects}</h1>
                    <p className="text-white text-uppercase mb-0">Complete Projects</p>
                  </div>
                </div>
              </div>
              <div className="border border-primary border-bottom-0 p-5">
                <div className="experience mb-4 wow fadeIn" data-wow-delay="0.6s">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-white text-uppercase">Experience</span>
                    <span className="text-white">{data.experience}%</span>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: `${data.experience}%` }}
                      aria-valuenow={data.experience}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <div className="experience wow fadeIn" data-wow-delay="0.7s">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-white text-uppercase">Work Done</span>
                    <span className="text-white">{data.workDone}%</span>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: `${data.workDone}%` }}
                      aria-valuenow={data.workDone}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

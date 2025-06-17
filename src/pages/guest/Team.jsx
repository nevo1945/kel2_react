import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function GuestTeam() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      const { data, error } = await supabase.from("team").select("*");

      if (!error) {
        setTeams(data);
      } else {
        alert("Gagal mengambil data tim.");
      }
    };

    fetchTeam();
  }, []);

  return (
    <div className="container-fluid team pt-6 pb-6">
      <div className="container">
        <div
          className="text-center mx-auto wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: "600px" }}
        >
          <h1 className="display-6 text-uppercase mb-5">
            Meet Our Professional and Experience Welder
          </h1>
        </div>
        <div className="row g-4">
          {teams.map((member, index) => (
            <div
              key={member.id}
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay={`${0.3 + index * 0.1}s`}
            >
              <div className="team-item">
                <div className="position-relative overflow-hidden">
                  <img
                    className="img-fluid w-100"
                    src={member.image}
                    alt={member.name}
                  />
                  <div className="team-social">
                    {member.facebook && (
                      <a
                        className="btn btn-square btn-dark mx-1"
                        href={member.facebook}
                        target="_blank"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        className="btn btn-square btn-dark mx-1"
                        href={member.twitter}
                        target="_blank"
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        className="btn btn-square btn-dark mx-1"
                        href={member.linkedin}
                        target="_blank"
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    )}
                    {member.youtube && (
                      <a
                        className="btn btn-square btn-dark mx-1"
                        href={member.youtube}
                        target="_blank"
                      >
                        <i className="fab fa-youtube"></i>
                      </a>
                    )}
                  </div>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-1">{member.name}</h5>
                  <span>{member.position}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

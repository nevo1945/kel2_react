import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ServiceModal from "../../components/admin/ServiceModal";

export default function Services() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase.from("services").select("*");
      if (error) {
        console.error("Gagal mengambil data layanan:", error);
      } else {
        setServices(data);
      }
    };

    fetchServices();
  }, []);

  const openModal = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="container-fluid service pt-6 pb-6">
      <div className="container">
        <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "600px" }}>
          <h1 className="display-6 text-uppercase mb-5">
            Reliable & High-Quality Welding Services
          </h1>
        </div>
        <div className="row g-4">
          {services.length > 0 ? (
            services.map((service, index) => (
              <div
                key={service.id}
                className="col-lg-3 col-md-6 wow fadeInUp"
                data-wow-delay={`${0.1 + (index % 4) * 0.1}s`}
              >
                <div className="service-item">
                  <div className="service-inner pb-5">
                    <img
                      className="img-fluid w-100"
                      src={service.image_url}
                      alt={service.title}
                    />
                    <div className="service-text px-5 pt-4">
                      <h5 className="text-uppercase">{service.title}</h5>
                    </div>
                    <button
                      className="btn btn-light px-3"
                      onClick={() => openModal(service)}
                    >
                      Read More
                      <i className="bi bi-chevron-double-right ms-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Loading services...</p>
          )}
        </div>
      </div>

      {/* Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={modalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

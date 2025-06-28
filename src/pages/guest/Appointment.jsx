import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Appointment() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        service: "Steel Welding",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        const { error } = await supabase.from("appointments").insert([formData]);

        setLoading(false);

        if (error) {
            alert("Gagal mengirim data. Coba lagi.");
            console.error("Insert error:", error.message);
        } else {
            setSuccess(true);
            setFormData({
                name: "",
                email: "",
                mobile: "",
                service: "Steel Welding",
                message: "",
            });
        }
    };

    return (
        <div className="container-fluid appoinment mt-6 mb-6 py-5 wow fadeIn" data-wow-delay="0.1s">
            <div className="container pt-5">
                <div className="row gy-5 gx-0">
                    <div className="col-lg-6 pe-lg-5 wow fadeIn" data-wow-delay="0.3s">
                        <h1 className="display-6 text-uppercase text-white mb-4">
                            Schedule Your Welding & Metal Service Appointment Today
                        </h1>
                        <p className="text-white mb-5 wow fadeIn" data-wow-delay="0.4s">
                            Make your welding service appointment quickly and easily. Choose your service,
                            fill in your details, and we’ll handle the rest. Quality metal work done on time.
                        </p>
                        <div className="d-flex align-items-start wow fadeIn" data-wow-delay="0.5s">
                            <div className="btn-lg-square bg-white">
                                <i className="bi bi-geo-alt text-dark fs-3"></i>
                            </div>
                            <div className="ms-3">
                                <h6 className="text-white text-uppercase">Office Address</h6>
                                <span className="text-white">umban sari Street, Rumbai, USA (umban sari atas)</span>
                            </div>
                        </div>
                        <hr className="bg-body" />
                        <div className="d-flex align-items-start wow fadeIn" data-wow-delay="0.6s">
                            <div className="btn-lg-square bg-white">
                                <i className="bi bi-clock text-dark fs-3"></i>
                            </div>
                            <div className="ms-3">
                                <h6 className="text-white text-uppercase">Office Time</h6>
                                <span className="text-white">Mon-Sat 09am-5pm, Sun Closed</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 mb-n5 wow fadeIn" data-wow-delay="0.7s">
                        <form onSubmit={handleSubmit}>
                            <div className="bg-white p-5">
                                <h2 className="text-uppercase mb-4">Online Appointment</h2>
                                {success && (
                                    <div className="alert alert-success" role="alert">
                                        Appointment berhasil dikirim!
                                    </div>
                                )}
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control border-0 bg-light"
                                                id="name"
                                                placeholder="Your Name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label htmlFor="name">Your Name</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input
                                                type="email"
                                                className="form-control border-0 bg-light"
                                                id="email"
                                                placeholder="Your Email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label htmlFor="email">Your Email</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control border-0 bg-light"
                                                id="mobile"
                                                placeholder="Your Mobile"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label htmlFor="mobile">Your Mobile</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <select
                                                className="form-select border-0 bg-light"
                                                id="service"
                                                value={formData.service}
                                                onChange={handleChange}
                                            >
                                                <option value="Steel Welding">Steel Welding</option>
                                                <option value="Pipe Welding">Pipe Welding</option>
                                                <option value="Custom Welding">Custom Welding</option>
                                                <option value="Metal Works">Metal Works</option>
                                            </select>
                                            <label htmlFor="service">Choose A Service</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea
                                                className="form-control border-0 bg-light"
                                                placeholder="Leave a message here"
                                                id="message"
                                                style={{ height: "130px" }}
                                                value={formData.message}
                                                onChange={handleChange}
                                            ></textarea>
                                            <label htmlFor="message">Message</label>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center">
                                        <button
                                            className="btn btn-primary w-100 py-3"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {loading ? "Mengirim..." : "Submit Now"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

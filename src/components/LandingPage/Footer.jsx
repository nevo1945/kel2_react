export default function Footer() {
    return (
        <div className="container-fluid bg-dark footer py-5 wow fadeIn" data-wow-delay="0.1s">
            <div className="container py-5">
                <div className="row g-5">
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-uppercase text-light mb-4">Our Office</h5>
                        <p className="mb-2"><i className="fa fa-map-marker-alt text-primary me-3"></i>123 Street, New York, USA</p>
                        <p className="mb-2"><i className="fa fa-phone-alt text-primary me-3"></i>+012 345 67890</p>
                        <p className="mb-2"><i className="fa fa-envelope text-primary me-3"></i>info@example.com</p>
                        <div className="d-flex pt-3">
                            <a className="btn btn-square btn-light me-2" href=""><i
                                className="fab fa-twitter"></i></a>
                            <a className="btn btn-square btn-light me-2" href=""><i
                                className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-square btn-light me-2" href=""><i
                                className="fab fa-youtube"></i></a>
                            <a className="btn btn-square btn-light me-2" href=""><i
                                className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-uppercase text-light mb-4">Quick Links</h5>
                        <a className="btn btn-link" href="">About Us</a>
                        <a className="btn btn-link" href="">Contact Us</a>
                        <a className="btn btn-link" href="">Our Services</a>
                        <a className="btn btn-link" href="">Terms & Condition</a>
                        <a className="btn btn-link" href="">Support</a>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-uppercase text-light mb-4">Business Hours</h5>
                        <p className="text-uppercase mb-0">Monday - Friday</p>
                        <p>09:00 am - 07:00 pm</p>
                        <p className="text-uppercase mb-0">Saturday</p>
                        <p>09:00 am - 12:00 pm</p>
                        <p className="text-uppercase mb-0">Sunday</p>
                        <p>Closed</p>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-uppercase text-light mb-4">Gallery</h5>
                        <div className="row g-1">
                            <div className="col-4">
                                <img className="img-fluid" src="/assets/Weldork-1.0.0/img/service-1.jpg" alt="" />
                            </div>
                            <div className="col-4">
                                <img className="img-fluid" src="/assets/Weldork-1.0.0/img/service-2.jpg" alt="" />
                            </div>
                            <div className="col-4">
                                <img className="img-fluid" src="/assets/Weldork-1.0.0/img/service-3.jpg" alt="" />
                            </div>
                            <div className="col-4">
                                <img className="img-fluid" src="/assets/Weldork-1.0.0/img/service-4.jpg" alt="" />
                            </div>
                            <div className="col-4">
                                <img className="img-fluid" src="/assets/Weldork-1.0.0/img/service-5.jpg" alt="" />
                            </div>
                            <div className="col-4">
                                <img className="img-fluid" src="/assets/Weldork-1.0.0/img/service-6.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
import React, { useEffect } from "react";

import Spinner from "../components/LandingPage/Spinner";
import Topbar from "../components/LandingPage/Topbar";
import Navbar from "../components/LandingPage/Navbar";
import Carousel from "../pages/guest/Carousel";
import About from "../pages/guest/About";
import Features from "../pages/guest/Features";
import WhyChooseUs from "../pages/guest/WhyChooseUs";
import Services from "../pages/guest/Services";
import Appointment from "../pages/guest/Appointment";
import Team from "../pages/guest/Team";
import Testimonials from "../pages/guest/Testimonials";
import Newsletter from "../pages/guest/Newsletter";
import Footer from "../components/LandingPage/Footer";
import Copyright from "../pages/guest/Copyright";
import BackToTop from "../components/LandingPage/BackToTop";

const Guest = () => {
    useEffect(() => {
        const cssLinks = [
            "/assets/Weldork-1.0.0/css/style.css",
            "/assets/Weldork-1.0.0/css/bootstrap.min.css",
            "/assets/Weldork-1.0.0/lib/animate/animate.min.css",
            "/assets/Weldork-1.0.0/lib/owlcarousel/assets/owl.carousel.min.css",
            "img/favicon.ico",
            "https://fonts.googleapis.com",
            "https://fonts.gstatic.com",
            "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Roboto:wght@700;800&display=swap",
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css",
            "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.4/font/bootstrap-icons.css",
            "/assets/lib/bootstrap-icons/bootstrap-icons.css",
            "/assets/lib/fontawesome/css/all.min.css",
            "/assets/Weldork-1.0.0/scss/style.css"
        ];

        cssLinks.forEach((href) => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            document.head.appendChild(link);
        });

        const jsScripts = [
            "/assets/Weldork-1.0.0/lib/wow/wow.min.js",
            "/assets/Weldork-1.0.0/lib/easing/easing.min.js",
            "/assets/Weldork-1.0.0/lib/waypoints/waypoints.min.js",
            "/assets/Weldork-1.0.0/lib/owlcarousel/owl.carousel.min.js",
            "/assets/Weldork-1.0.0/lib/counterup/counterup.min.js",
            "/assets/Weldork-1.0.0/js/main.js",
            "https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js",
            "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"
            
        ];

        jsScripts.forEach((src) => {
            const script = document.createElement("script");
            script.src = src;
            script.async = true;
            document.body.appendChild(script);
        });
    }, []);

    return (
        <>
            <Spinner />
            <Topbar />
            <Navbar />
            <Carousel />
            <About />
            <Features />
            <WhyChooseUs />
            <Services />
            <Appointment />
            <Team />
            <Testimonials />
            <Newsletter />
            <Footer />
            <Copyright />
            <BackToTop />
        </>
    );
};

export default Guest;

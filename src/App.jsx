import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./layouts/Guest";
import Dashboard from "./pages/admin/Dashboard";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import CarouselManager from "./pages/admin/CarouselManager";
import AboutManager from "./pages/admin/AdminAboutManager";
import FeatureManager from "./pages/admin/FeatureManager";
import ServicesList from "./pages/admin/services/ServicesList";
import CreateService from "./pages/admin/services/CreateService";
import EditService from "./pages/admin/services/EditService";
import AdminAppointment from "./pages/admin/AdminAppointment";
import AdminWhyChooseUs from "./pages/admin/AdminWhyChooseUs";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminNewsletter from "./pages/admin/AdminNewsletter";
import AdminLogin from "./pages/admin/auth/AdminLogin";
import AdminNotFound from "./pages/admin/auth/AdminNotFound";

import ProtectedAdminRoute from "./pages/admin/auth/ProtectedAdminRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* PROTECTED ADMIN ROUTES */}
        <Route path="/admin" element={
          <Dashboard />
        } />
        <Route path="/admin/testimonials" element={
          <AdminTestimonials />
        } />
        <Route path="/admin/carousel" element={
          <CarouselManager />
        } />
        <Route path="/admin/About" element={
          <AboutManager />
        } />
        <Route path="/admin/Features" element={
          <FeatureManager />
        } />
        <Route path="/admin/WhyChooseUs" element={
          <AdminWhyChooseUs />
        } />
        <Route path="/admin/services" element={
          <ServicesList />
        } />
        <Route path="/admin/services/create" element={
          <CreateService />
        } />
        <Route path="/admin/services/edit/:id" element={
          <EditService />
        } />
        <Route path="/admin/appointment" element={
          <AdminAppointment />
        } />
        <Route path="/admin/Team" element={
          <AdminTeam />
        } />
        <Route path="/admin/Newsletter" element={
          <AdminNewsletter />
        } />

        {/* AUTH ROUTES */}
        <Route path="/admin/auth/login" element={<AdminLogin />} />
        <Route path="/admin/auth/not-found" element={<AdminNotFound />} />

        {/* CATCH-ALL */}
        <Route path="*" element={<AdminNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

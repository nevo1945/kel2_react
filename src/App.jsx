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

        {/* AUTH ROUTES */}
        <Route path="/admin/auth/login" element={<AdminLogin />} />
        <Route path="/admin/auth/not-found" element={<AdminNotFound />} />

        {/* PROTECTED ADMIN ROUTES */}
        <Route
          path="/admin"
          element={<ProtectedAdminRoute><Dashboard /></ProtectedAdminRoute>}
        />
        <Route
          path="/admin/testimonials"
          element={<ProtectedAdminRoute><AdminTestimonials /></ProtectedAdminRoute>}
        />
        <Route
          path="/admin/carousel"
          element={<ProtectedAdminRoute><CarouselManager /></ProtectedAdminRoute>}
        />
        <Route
          path="/admin/About"
          element={<ProtectedAdminRoute><AboutManager /></ProtectedAdminRoute>}
        />
        <Route
          path="/admin/Features"
          element={<ProtectedAdminRoute><FeatureManager /></ProtectedAdminRoute>}
        />
        <Route
          path="/admin/WhyChooseUs"
          element={<ProtectedAdminRoute><AdminWhyChooseUs /></ProtectedAdminRoute>}
        />
        <Route
          path="/admin/services"
          element={<ProtectedAdminRoute><ServicesList /></ProtectedAdminRoute>}
        />
        <Route
          path="/admin/services/create"
          element={<ProtectedAdminRoute><CreateService /></ProtectedAdminRoute>}
        />
        <Route
          path="/admin/services/edit/:id"
          element={<ProtectedAdminRoute><EditService /></ProtectedAdminRoute>}
        />
        <Route
          path="/admin/appointment"
          element={<ProtectedAdminRoute><AdminAppointment /></ProtectedAdminRoute>}
        />
        <Route
          path="/admin/Team"
          element={<ProtectedAdminRoute><AdminTeam /></ProtectedAdminRoute>}
        />
        <Route
          path="/admin/Newsletter"
          element={<ProtectedAdminRoute><AdminNewsletter /></ProtectedAdminRoute>}
        />

        {/* CATCH-ALL */}
        <Route path="*" element={<AdminNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/admin/auth/not-found" />;
}

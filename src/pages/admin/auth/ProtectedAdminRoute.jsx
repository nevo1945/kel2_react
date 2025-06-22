import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const isAuthenticated = localStorage.getItem("adminLoggedIn") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/admin/auth/not-found" />;
  }

  return children;
}

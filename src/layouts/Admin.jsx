import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1">
        <Header />
        
        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

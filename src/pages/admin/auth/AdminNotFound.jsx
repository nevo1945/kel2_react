import { Link } from "react-router-dom";

export default function AdminNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff8e6]">
      <div className="text-center p-8">
        <h1 className="text-5xl font-extrabold text-[#d3932d]">404</h1>
        <p className="text-xl text-gray-700 mt-2">Admin Not Found</p>
        <p className="text-sm text-gray-500 mt-1">You are not authorized to access this page.</p>
        <Link
          to="/admin/auth/login"
          className="inline-block mt-4 px-6 py-2 bg-[#d3932d] text-white rounded-lg shadow hover:bg-[#b97d1c]"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}

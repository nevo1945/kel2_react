import React from "react";
import { Link } from "react-router-dom";

export default function ServiceCard({ service, onDelete }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow bg-white">
      <img
        src={service.image_url}
        alt={service.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h5 className="text-lg font-semibold text-uppercase mb-2">
          {service.title}
        </h5>
        <p className="text-gray-600 text-sm mb-3">
          {service.description.length > 100
            ? service.description.slice(0, 100) + "..."
            : service.description}
        </p>
        <div className="flex justify-between items-center text-sm">
          <Link
            to={`/admin/services/edit/${service.id}`}
            className="text-blue-600 hover:underline font-medium"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(service.id)}
            className="text-red-500 hover:underline font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
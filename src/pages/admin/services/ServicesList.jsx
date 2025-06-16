import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";
import AdminLayout from "../../../layouts/Admin";
import ServiceCard from "../../../components/admin/ServiceCard";

export default function ServicesList() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    const { data, error } = await supabase.from("services").select("*");
    if (!error) setServices(data);
    else console.error("Error fetching services:", error);
  }

  async function handleDelete(id) {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (!error) {
      setServices(services.filter((s) => s.id !== id));
    } else {
      alert("Failed to delete service");
      console.error(error);
    }
  }

  return (
    <AdminLayout>
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Services</h2>
        <Link
          to="/admin/services/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Service
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} onDelete={handleDelete} />
        ))}
      </div>
    </div>
    </AdminLayout>
  );
}
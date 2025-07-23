import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import AdminLayout from "../../layouts/Admin";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);

  // Ambil data dari supabase
  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setTestimonials(data);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id) => {
    await supabase.from("testimonials").delete().eq("id", id);
    fetchTestimonials();
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Manage Testimonials</h2>

        {/* Data List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="border p-4 rounded shadow">
              <img
                src={t.avatar_url || "https://via.placeholder.com/80"}
                alt={t.name}
                className="w-20 h-20 rounded-full mx-auto mb-2"
              />
              <h3 className="text-lg font-bold text-center">{t.name}</h3>
              <p className="text-sm text-center text-gray-600">{t.role}</p>
              <p className="mt-2 text-center italic">"{t.content}"</p>

              <div className="mt-3 flex justify-center">
                <button
                  onClick={() => handleDelete(t.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

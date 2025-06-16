import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import AdminLayout from "../../layouts/Admin";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: "", role: "", content: "", avatar_url: "" });
  const [editingId, setEditingId] = useState(null);

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

  // Handle input perubahan form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Tambah atau update testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // UPDATE
      await supabase.from("testimonials").update(form).eq("id", editingId);
    } else {
      // INSERT
      await supabase.from("testimonials").insert([form]);
    }

    setForm({ name: "", role: "", content: "", avatar_url: "" });
    setEditingId(null);
    fetchTestimonials();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    await supabase.from("testimonials").delete().eq("id", id);
    fetchTestimonials();
  };

  return (
    <AdminLayout>
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Testimonials</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Testimonial"
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <input
          type="text"
          name="avatar_url"
          value={form.avatar_url}
          onChange={handleChange}
          placeholder="Avatar URL"
          className="w-full p-2 border rounded"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingId ? "Update" : "Add"} Testimonial
        </button>
      </form>

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

            <div className="mt-3 flex justify-between">
              <button
                onClick={() => handleEdit(t)}
                className="bg-yellow-400 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
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

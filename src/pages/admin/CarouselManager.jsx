import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/Admin";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://mniwbtlawknevocoljyw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uaXdidGxhd2tuZXZvY29sanl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTgwNTIsImV4cCI6MjA2NTU3NDA1Mn0.J3lXY83_HMclM5yknFx-jM-zZiUWiwgR21nve8zIG0Q"
);

export default function CarouselManager() {
  const [slides, setSlides] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", image_url: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchSlides = async () => {
    const { data, error } = await supabase.from("carousel").select("*");
    if (!error) setSlides(data);
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from("carousel").update(form).eq("id", editingId);
    } else {
      await supabase.from("carousel").insert([form]);
    }
    setForm({ title: "", description: "", image_url: "" });
    setEditingId(null);
    fetchSlides();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    await supabase.from("carousel").delete().eq("id", id);
    fetchSlides();
  };

  return (
    <AdminLayout>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Kelola Carousel</h2>

      <form onSubmit={handleSubmit} className="mb-10 bg-white p-6 rounded shadow-md space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Judul</label>
          <input
            type="text"
            placeholder="Judul"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Deskripsi</label>
          <textarea
            placeholder="Deskripsi"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded"
          ></textarea>
        </div>
        <div>
          <label className="block mb-1 font-semibold">URL Gambar</label>
          <input
            type="text"
            placeholder="URL Gambar"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update" : "Tambah"} Slide
        </button>
      </form>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-3 py-1 text-yellow-600 border border-yellow-400 rounded hover:bg-yellow-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1 text-red-600 border border-red-400 rounded hover:bg-red-50"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </AdminLayout>
  );
}

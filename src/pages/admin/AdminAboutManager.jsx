import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/Admin";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://mniwbtlawknevocoljyw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uaXdidGxhd2tuZXZvY29sanl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTgwNTIsImV4cCI6MjA2NTU3NDA1Mn0.J3lXY83_HMclM5yknFx-jM-zZiUWiwgR21nve8zIG0Q"
);

export default function AboutManager() {
  const [about, setAbout] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "",
    highlight_1: "",
    highlight_2: "",
    highlight_3: "",
    footer_message: "",
  });

  const fetchAbout = async () => {
    const { data, error } = await supabase.from("about").select("*").single();
    if (!error) {
      setAbout(data);
      setForm(data); // set form value juga
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (about?.id) {
      await supabase.from("about").update(form).eq("id", about.id);
    } else {
      await supabase.from("about").insert([form]);
    }
    fetchAbout();
  };

  return (
    <AdminLayout>
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">Kelola Konten About</h2>

      {/* Preview Card */}
      {about && (
        <div className="bg-white border rounded-lg shadow p-6 grid md:grid-cols-2 gap-6">
          <img
            src={about.image_url}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg border"
          />
          <div>
            <h3 className="text-xl font-semibold mb-2">{about.title}</h3>
            <p className="mb-4 text-gray-700">{about.description}</p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1 mb-4">
              <li>{about.highlight_1}</li>
              <li>{about.highlight_2}</li>
              <li>{about.highlight_3}</li>
            </ul>
            <div className="bg-blue-100 text-blue-700 p-4 border-l-4 border-blue-500 rounded">
              {about.footer_message}
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 border rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Judul"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="URL Gambar"
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Deskripsi"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="col-span-2 border p-2 rounded"
          rows={4}
        />
        <input
          type="text"
          placeholder="Highlight 1"
          value={form.highlight_1}
          onChange={(e) => setForm({ ...form, highlight_1: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Highlight 2"
          value={form.highlight_2}
          onChange={(e) => setForm({ ...form, highlight_2: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Highlight 3"
          value={form.highlight_3}
          onChange={(e) => setForm({ ...form, highlight_3: e.target.value })}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Pesan Penutup (Footer)"
          value={form.footer_message}
          onChange={(e) => setForm({ ...form, footer_message: e.target.value })}
          className="col-span-2 border p-2 rounded"
          rows={3}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 col-span-2"
        >
          Simpan
        </button>
      </form>
    </div>
    </AdminLayout>
  );
}

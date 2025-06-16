import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/Admin";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://mniwbtlawknevocoljyw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uaXdidGxhd2tuZXZvY29sanl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTgwNTIsImV4cCI6MjA2NTU3NDA1Mn0.J3lXY83_HMclM5yknFx-jM-zZiUWiwgR21nve8zIG0Q"
);

export default function FeatureManager() {
  const [features, setFeatures] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    icon_class: "",
    link_text: "",
    link_url: ""
  });

  const [editingId, setEditingId] = useState(null);

  const fetchFeatures = async () => {
    const { data } = await supabase.from("features").select("*").order("id");
    setFeatures(data || []);
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from("features").update(form).eq("id", editingId);
    } else {
      await supabase.from("features").insert([form]);
    }
    setForm({ title: "", description: "", icon_class: "", link_text: "", link_url: "" });
    setEditingId(null);
    fetchFeatures();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    await supabase.from("features").delete().eq("id", id);
    fetchFeatures();
  };

  return (
    <AdminLayout>
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Kelola Features</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input type="text" placeholder="Judul" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded" required />
        <input type="text" placeholder="Ikon FontAwesome (cth: fa-hammer)"
          value={form.icon_class}
          onChange={(e) => setForm({ ...form, icon_class: e.target.value })}
          className="border p-2 rounded" required />
        <input type="text" placeholder="Teks Link" value={form.link_text}
          onChange={(e) => setForm({ ...form, link_text: e.target.value })}
          className="border p-2 rounded" />
        <input type="text" placeholder="URL Link" value={form.link_url}
          onChange={(e) => setForm({ ...form, link_url: e.target.value })}
          className="border p-2 rounded" />
        <textarea placeholder="Deskripsi" value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="col-span-2 border p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 col-span-2">
          {editingId ? "Update Feature" : "Tambah Feature"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <i className={`fa ${item.icon_class} text-xl text-primary`}></i>
              <h4 className="font-bold">{item.title}</h4>
            </div>
            <p className="text-sm mb-2">{item.description}</p>
            {item.link_text && (
              <a href={item.link_url || "#"} className="text-blue-600 text-sm hover:underline" target="_blank" rel="noreferrer">
                {item.link_text}
              </a>
            )}
            <div className="flex gap-2 mt-3">
              <button onClick={() => handleEdit(item)} className="text-sm bg-yellow-400 px-2 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="text-sm bg-red-500 text-white px-2 py-1 rounded">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </AdminLayout>
  );
}

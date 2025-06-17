import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/Admin";
import { supabase } from "../../lib/supabaseClient";

export default function AdminWhyChooseUs() {
  const [data, setData] = useState({
    id: null,
    title: "",
    description: "",
    satisfiedClients: 0,
    completeProjects: 0,
    experience: 0,
    workDone: 0,
  });

  const fetchData = async () => {
    const { data: rows, error } = await supabase
      .from("whychooseus")
      .select("*")
      .limit(1); // ambil satu baris tanpa .single()

    if (error) {
      alert("Gagal mengambil data.");
      console.error(error);
      return;
    }

    if (rows.length === 0) {
      // Jika kosong → tambahkan 1 baris default
      const { data: inserted, error: insertError } = await supabase
        .from("whychooseus")
        .insert([
          {
            title: "",
            description: "",
            satisfiedClients: 0,
            completeProjects: 0,
            experience: 0,
            workDone: 0,
          },
        ])
        .select()
        .single(); // ambil kembali hasil insert

      if (insertError) {
        alert("Gagal membuat data awal.");
        console.error(insertError);
        return;
      }

      setData(inserted);
    } else {
      setData(rows[0]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.id) {
      alert("Gagal menyimpan: ID tidak ditemukan.");
      return;
    }

    const { error } = await supabase
      .from("whychooseus")
      .update({
        title: data.title,
        description: data.description,
        satisfiedClients: Number(data.satisfiedClients),
        completeProjects: Number(data.completeProjects),
        experience: Number(data.experience),
        workDone: Number(data.workDone),
      })
      .eq("id", data.id);

    if (error) {
      alert("Gagal menyimpan: " + error.message);
      console.error(error);
    } else {
      alert("Data berhasil disimpan!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Manage Why Choose Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 p-2 rounded"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Satisfied Clients</label>
              <input
                type="number"
                name="satisfiedClients"
                value={data.satisfiedClients}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Complete Projects</label>
              <input
                type="number"
                name="completeProjects"
                value={data.completeProjects}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Experience (%)</label>
              <input
                type="number"
                name="experience"
                value={data.experience}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Work Done (%)</label>
              <input
                type="number"
                name="workDone"
                value={data.workDone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

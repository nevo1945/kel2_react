import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/Admin";
import { supabase } from "../../lib/supabaseClient";

export default function AdminTeam() {
  const [teamList, setTeamList] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    position: "",
    image: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    youtube: "",
  });

  const fetchTeam = async () => {
    const { data, error } = await supabase
      .from("team")
      .select("*")
      .order("id", { ascending: true });
    if (!error) {
      setTeamList(data);
    } else {
      console.error("Fetch error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!form.name.trim() || !form.position.trim()) {
      alert("Name and position are required.");
      return;
    }

    if (form.id) {
      // UPDATE
      const { error } = await supabase
        .from("team")
        .update(form)
        .eq("id", form.id);
      if (!error) {
        alert("Team member updated successfully!");
      } else {
        alert("Update error: " + error.message);
      }
    } else {
      // INSERT (tanpa mengirim id)
      const { id, ...formWithoutId } = form;
      const { error } = await supabase.from("team").insert([formWithoutId]);
      if (!error) {
        alert("Team member added successfully!");
      } else {
        alert("Insert error: " + error.message);
      }
    }

    resetForm();
    fetchTeam();
  };

  const handleEdit = (member) => {
    setForm(member);
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this member?");
    if (confirmDelete) {
      const { error } = await supabase.from("team").delete().eq("id", id);
      if (!error) {
        alert("Deleted successfully!");
        fetchTeam();
      } else {
        alert("Delete error: " + error.message);
      }
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      position: "",
      image: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      youtube: "",
    });
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Manage Team</h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Name"
            />
            <input
              name="position"
              value={form.position}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Position"
            />
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Image URL"
            />
            <input
              name="facebook"
              value={form.facebook}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Facebook URL"
            />
            <input
              name="twitter"
              value={form.twitter}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Twitter URL"
            />
            <input
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="LinkedIn URL"
            />
            <input
              name="youtube"
              value={form.youtube}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="YouTube URL"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {form.id ? "Update" : "Add"} Team Member
            </button>
            {form.id && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Team List</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamList.map((member) => (
              <div key={member.id} className="border p-4 rounded bg-white shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h4 className="text-lg font-semibold">{member.name}</h4>
                <p className="mb-2">{member.position}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

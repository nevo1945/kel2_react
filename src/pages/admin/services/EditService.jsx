import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../../layouts/Admin";
import { supabase } from "../../../lib/supabaseClient";

export default function EditService() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchService();
  }, []);

  async function fetchService() {
    const { data, error } = await supabase.from("services").select("*").eq("id", id).single();
    if (!error && data) {
      setTitle(data.title);
      setDescription(data.description);
      setImageUrl(data.image_url);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const { error } = await supabase.from("services").update({
      title,
      description,
      image_url: imageUrl,
    }).eq("id", id);
    if (!error) navigate("/admin/services");
    else alert("Failed to update service");
  }

  return (
    <AdminLayout>
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Service</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          rows="4"
          required
        ></textarea>
        <input
          type="url"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </div>
    </AdminLayout>
  );
}

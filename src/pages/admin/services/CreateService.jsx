import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/Admin";
import { supabase } from "../../../lib/supabaseClient";

export default function CreateService() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("services").insert({
      title,
      description,
      image_url: imageUrl,
    });
    if (!error) navigate("/admin/services");
    else alert("Failed to create service");
  };

  return (
    <AdminLayout>
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>
      </form>
    </div>
    </AdminLayout>
  );
}
import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/Admin";
import { supabase } from "../../lib/supabaseClient";

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([]);

  // Ambil data newsletter dari Supabase
  const fetchSubscribers = async () => {
    const { data, error } = await supabase
      .from("newsletter")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setSubscribers(data);
    } else {
      console.error("Fetch failed:", error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus subscriber ini?");
    if (!confirm) return;

    const { error } = await supabase
      .from("newsletter")
      .delete()
      .eq("id", id);

    if (!error) {
      setSubscribers((prev) => prev.filter((item) => item.id !== id));
    } else {
      console.error("Delete failed:", error.message);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Manage Newsletter Subscribers</h2>
        {subscribers.length === 0 ? (
          <p className="text-gray-500">Belum ada subscriber.</p>
        ) : (
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2 border-b">Email</th>
                <th className="text-left p-2 border-b">Tanggal Daftar</th>
                <th className="text-left p-2 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((item) => (
                <tr key={item.id}>
                  <td className="p-2 border-b">{item.email}</td>
                  <td className="p-2 border-b">{new Date(item.created_at).toLocaleString()}</td>
                  <td className="p-2 border-b">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}

import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/Admin";
import { supabase } from "../../lib/supabaseClient";

export default function AdminAppointment() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        const { data, error } = await supabase.from("appointments").select("*").order("created_at", { ascending: false });
        if (error) {
            console.error("Error fetching appointments:", error.message);
        } else {
            setAppointments(data);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this appointment?")) {
            await supabase.from("appointments").delete().eq("id", id);
            fetchAppointments();
        }
    };

    return (
        <AdminLayout>
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Daftar Appointment</h2>
            {loading ? (
                <p>Loading...</p>
            ) : appointments.length === 0 ? (
                <p>Tidak ada data appointment.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="py-3 px-4 border-b">Name</th>
                                <th className="py-3 px-4 border-b">Email</th>
                                <th className="py-3 px-4 border-b">Mobile</th>
                                <th className="py-3 px-4 border-b">Service</th>
                                <th className="py-3 px-4 border-b">Message</th>
                                <th className="py-3 px-4 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((item) => (
                                <tr key={item.id}>
                                    <td className="py-2 px-4 border-b">{item.name}</td>
                                    <td className="py-2 px-4 border-b">{item.email}</td>
                                    <td className="py-2 px-4 border-b">{item.mobile}</td>
                                    <td className="py-2 px-4 border-b">{item.service}</td>
                                    <td className="py-2 px-4 border-b">{item.message}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
        </AdminLayout>
    );
}

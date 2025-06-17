import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import AdminLayout from "../../layouts/Admin";
import PageHeader from "../../components/admin/PageHeader";
import { supabase } from "../../lib/supabaseClient";

const TrainingHubIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mr-4">
    <circle cx="20" cy="20" r="18" fill="#d3932d" />
    <text x="20" y="27" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold" fontFamily="Arial">TH</text>
  </svg>
);

export default function Dashboard() {
  const [tableStats, setTableStats] = useState([]);

  useEffect(() => {
    const fetchCounts = async () => {
      const tables = [
        "about",
        "appointments",
        "carousel",
        "features",
        "newsletter",
        "services",
        "team",
        "testimonials",
        "whychooseus",
      ];

      const stats = await Promise.all(
        tables.map(async (table) => {
          const { count, error } = await supabase
            .from(table)
            .select("id", { count: "exact", head: true });

          return {
            name: table,
            count: error ? 0 : count,
          };
        })
      );

      setTableStats(stats);
    };

    fetchCounts();
  }, []);

  return (
    <AdminLayout>
      <section className="mb-8 flex items-center">
        <TrainingHubIcon />
        <PageHeader
          title={
            <span className="text-[2rem] font-extrabold tracking-tight text-[#d3932d] drop-shadow-lg">
              Training<span className="text-gray-800">Hub</span>
            </span>
          }
          subtitle={<span className="text-gray-500">Overview of database content summary</span>}
        />
      </section>

      <section className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Table Data Overview</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={tableStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#d3932d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </AdminLayout>
  );
}

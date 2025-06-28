import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import AdminLayout from "../../layouts/Admin";
import { supabase } from "../../lib/supabaseClient";

// Warna untuk pie chart (bisa disesuaikan)
const COLORS = [
  "#d3932d",
  "#f4a261",
  "#2a9d8f",
  "#264653",
  "#e76f51",
  "#6a994e",
  "#b5838d",
  "#3d405b",
  "#81b29a"
];

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
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Bar Chart */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Bar Chart - Table Data Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tableStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#d3932d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Pie Chart - Data Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie
                data={tableStats}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {tableStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white shadow-lg rounded-xl p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Line Chart - Data Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tableStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#d3932d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </section>
    </AdminLayout>
  );
}

// src/pages/admin/Dashboard.jsx
import AdminLayout from "../../layouts/Admin";
import PageHeader from "../../components/admin/PageHeader";

// You can add this SVG icon to your PageHeader, or use your logo if available
const TrainingHubIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mr-4">
    <circle cx="20" cy="20" r="18" fill="#d3932d" />
    <text x="20" y="27" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold" fontFamily="Arial">TH</text>
  </svg>
);

export default function Dashboard() {
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
          subtitle={
            <span className="text-gray-500">
              Overview of the training management system
            </span>
          }
        />
      </section>

      {/* Dashboard Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-1 sm:px-0">
        <DashboardCard
          title="Total Trainings"
          value="12"
          icon={
            <svg className="w-10 h-10 text-[#d3932d]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l7.5-15 7.5 15M12 17.5v-6" />
            </svg>
          }
        />
        <DashboardCard
          title="Registered Participants"
          value="138"
          icon={
            <svg className="w-10 h-10 text-[#d3932d]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.5V17a3 3 0 00-6 0v2.5M12 11.5a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
          }
        />
        <DashboardCard
          title="Upcoming Sessions"
          value="5"
          icon={
            <svg className="w-10 h-10 text-[#d3932d]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            </svg>
          }
        />
      </section>
    </AdminLayout>
  );
}

// DashboardCard component
function DashboardCard({ title, value, icon }) {
  return (
    <div className="
      group relative p-6 rounded-2xl bg-white/70
      shadow-[0_4px_20px_0_rgba(211,147,45,0.08),_0_1.5px_8px_0_rgba(21,21,21,0.04)]
      border border-[#f2e7d4] hover:shadow-[0_8px_32px_0_rgba(211,147,45,0.13),_0_2px_8px_0_rgba(21,21,21,0.08)]
      transition-all duration-300
      flex flex-col items-center text-center
      before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-[#fff8e6] before:to-[#fff] before:opacity-70 before:pointer-events-none
      hover:scale-[1.035]
    ">
      <div className="relative z-10 flex items-center justify-center mb-3">
        <span className="inline-block rounded-full bg-[#fff7ea] shadow-inner p-3 border border-[#f8e1b8] group-hover:scale-110 transition-transform">
          {icon}
        </span>
      </div>
      <h3 className="relative z-10 text-lg font-bold text-[#d3932d] mb-1 tracking-tight">{title}</h3>
      <p className="relative z-10 text-3xl font-black text-gray-800 group-hover:text-[#d3932d] transition-colors">{value}</p>
    </div>
  );
}
import { NavLink } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const menuItems = [
  { name: "Dashboard", path: "/admin" },
  { name: "Kelola Carousel", path: "/admin/carousel" },
  { name: "Tentang Kami (About)", path: "/admin/about" },
  { name: "Kenapa Memilih Kami", path: "/admin/why-choose-us" },
  { name: "Layanan (Services)", path: "/admin/services" },
  { name: "Fitur Unggulan", path: "/admin/features" },
  { name: "Tim Kami", path: "/admin/team" },
  { name: "Testimoni Peserta", path: "/admin/testimonials" },
  { name: "Formulir Jadwal Training", path: "/admin/appointment" },
  { name: "Newsletter & Kontak", path: "/admin/newsletter" },
  { name: "Footer & Copyright", path: "/admin/footer" },
  { name: "Pengaturan", path: "/admin/settings" },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col min-h-screen w-72 bg-white/50 dark:bg-zinc-900/70 backdrop-blur-lg shadow-2xl border-r border-[#d3932d]/30 py-7 px-6 transition-all duration-300 animate-fadeIn">
      {/* Logo */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="inline-block w-12 h-12 rounded-xl text-white flex items-center justify-center text-3xl font-black select-none neumorphism"
            style={{
              background: "linear-gradient(135deg, #d3932d 70%, #e9b664 100%)",
            }}
          >
            TH
          </span>
          <span
            className="text-3xl font-extrabold drop-shadow-glow"
            style={{ color: "#d3932d" }}
          >
            TrainingHub
          </span>
        </div>
        <p className="text-xs text-zinc-700 dark:text-zinc-200 font-medium ml-1 select-none">Admin Panel</p>
      </div>
      {/* Nav */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  [
                    "flex items-center justify-between gap-2 px-4 py-2 rounded-lg group font-semibold text-base transition-all duration-150",
                    isActive
                      ? "shadow-lg scale-105"
                      : "text-zinc-700 dark:text-zinc-200 hover:scale-105",
                  ].join(" ")
                }
                style={({ isActive }) =>
                  isActive
                    ? {
                        background:
                          "linear-gradient(90deg, #d3932d 90%, #e9b664 100%)",
                        color: "#fff",
                      }
                    : {
                        color: "#343434",
                        background: "rgba(211,147,45,0.07)",
                      }
                }
                tabIndex={0}
              >
                <span>{item.name}</span>
                <FiChevronRight className="opacity-0 group-hover:opacity-70 group-hover:translate-x-1 transition" />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {/* Footer */}
      <div className="mt-12 pt-5 border-t border-[#d3932d]/20 text-center text-xs text-zinc-500 dark:text-zinc-300 select-none">
        <p className="font-semibold" style={{ color: "#d3932d" }}>
          &copy; 2025 TrainingHub
        </p>
        <p>Admin Dashboard</p>
      </div>
    </aside>
  );
}
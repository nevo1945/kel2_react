export default function PageHeader({ title, subtitle }) {
  return (
    <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded shadow-md mb-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
    </div>
  );
}

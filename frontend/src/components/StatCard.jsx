
"use client";

export default function StatCard({ title, value, icon, color }) {
  const colors = {
    indigo: "bg-gradient-to-br from-indigo-500 to-indigo-700",
    orange: "bg-gradient-to-br from-orange-400 to-orange-600",
    green: "bg-gradient-to-br from-emerald-500 to-emerald-700",
  };

  return (
    <div
      className={`${colors[color] || colors.indigo} rounded-2xl p-6 shadow-lg text-white hover:-translate-y-1 transition-all duration-300`}
    >

      <div className="flex items-center justify-between">
        <p className="text-white/80 text-sm font-medium">
          {title}
        </p>

        <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-xl">
          {icon}
        </div>
      </div>

      <h3 className="text-4xl font-bold mt-5">
        {value}
      </h3>

      <p className="text-white/70 text-xs mt-2">
        Tasks overview
      </p>

    </div>
  );
}

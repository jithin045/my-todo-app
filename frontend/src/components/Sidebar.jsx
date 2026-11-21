
"use client";

export default function Sidebar({ filter, setFilter }) {
  const menuItems = [
    { label: "All Tasks", value: "all", icon: "▤" },
    { label: "Pending", value: "pending", icon: "◷" },
    { label: "Completed", value: "completed", icon: "✓" },
  ];

  return (
    <aside className="hidden md:flex w-64 bg-white border-r border-gray-100 p-7 flex-col">

      <h1 className="text-2xl font-bold text-indigo-600 mb-12">
        My Todo<span className="text-gray-800">.</span>
      </h1>

      <p className="text-xs font-semibold text-gray-400 mb-4">
        MENU
      </p>

      <div className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition ${
              filter === item.value
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            {item.icon} &nbsp; {item.label}
          </button>
        ))}
      </div>

      <div className="mt-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white">
        <p className="font-semibold">
          Stay productive!
        </p>

        <p className="text-sm text-white/80 mt-2">
          Small steps every day lead to big results.
        </p>
      </div>

    </aside>
  );
}

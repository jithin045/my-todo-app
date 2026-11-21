
"use client";

export default function DashboardHeader({ onAdd }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">

      <div>
        <p className="text-gray-400 text-sm mb-2">
          WORKSPACE / OVERVIEW
        </p>

        <h2 className="text-3xl font-bold text-gray-800">
          My Tasks
        </h2>

        <p className="text-gray-400 mt-2">
          Organize your day and get things done.
        </p>
      </div>

      <button
        onClick={onAdd}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-100 transition"
      >
        + Add New Task
      </button>

    </header>
  );
}

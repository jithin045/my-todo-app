
"use client";

export default function TodoList({
  todos,
  onDelete,
  onUpdate,
  onEdit,
}) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-3xl mb-4">
          📝
        </div>

        <h3 className="text-lg font-semibold text-gray-800">
          No tasks found
        </h3>

        <p className="text-sm text-gray-400 mt-2">
          Add a new task to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {todos.map((todo) => (
        <div
          key={todo._id}
          className={`group border rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
            todo.completed
              ? "bg-gradient-to-r from-green-50 to-white border-green-100 hover:border-green-300"
              : "bg-gradient-to-r from-orange-50/50 to-white border-gray-100 hover:border-indigo-200"
          }`}
        >

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            {/* Task Details */}
            <div className="flex-1 min-w-0">

              <div className="flex items-center gap-2 flex-wrap">

                <h3
                  className={`font-bold text-base break-words ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {todo.title}
                </h3>

                {todo.completed && (
                  <span className="text-green-600 text-sm">
                    ✓
                  </span>
                )}

              </div>

              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {todo.description || "No description provided"}
              </p>

              {/* Status and Date */}
              <div className="flex items-center flex-wrap gap-3 mt-4">

                <span
                  className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                    todo.completed
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                      : "bg-gradient-to-r from-orange-400 to-orange-500 text-white"
                  }`}
                >
                  {todo.completed ? "✓ Completed" : "◷ Pending"}
                </span>

                <span className="text-xs text-gray-400 flex items-center gap-1">
                  📅
                  {todo.createdAt
                    ? new Date(todo.createdAt).toLocaleDateString()
                    : ""}
                </span>

              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">

              {/* Complete / Pending */}
              <button
                type="button"
                onClick={() =>
                  onUpdate(todo._id, {
                    completed: !todo.completed,
                  })
                }
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 hover:scale-105 shadow-sm ${
                  todo.completed
                    ? "bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700"
                    : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-green-100"
                }`}
              >
                {todo.completed
                  ? "↩ Mark as Pending"
                  : "✓ Mark as Completed"}
              </button>

              {/* Edit */}
              <button
                type="button"
                onClick={() => onEdit(todo)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-sm shadow-indigo-100"
              >
                ✎ Edit
              </button>

              {/* Delete */}
              <button
                type="button"
                onClick={() => onDelete(todo._id)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold hover:from-red-600 hover:to-rose-700 transition-all duration-200 hover:scale-105 shadow-sm shadow-red-100"
              >
                🗑 Delete
              </button>

            </div>

          </div>

        </div>
      ))}

    </div>
  );
}

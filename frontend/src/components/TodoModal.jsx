
"use client";

import TodoForm from "./TodoForm";

export default function TodoModal({
  show,
  editingTodo,
  onClose,
  onAdd,
  onUpdate,
}) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-7">

        <div className="flex justify-between items-center mb-6">

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {editingTodo ? "Edit Task" : "Create New Task"}
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              {editingTodo
                ? "Update your task details"
                : "Add a new task to your list"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-2xl"
            aria-label="Close modal"
          >
            ×
          </button>

        </div>

        <TodoForm
          onAddTodo={onAdd}
          onUpdateTodo={onUpdate}
          editingTodo={editingTodo}
          onClose={onClose}
        />

      </div>
    </div>
  );
}

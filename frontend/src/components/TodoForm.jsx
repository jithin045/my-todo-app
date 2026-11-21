
"use client";

import { useEffect, useState } from "react";

export default function TodoForm({
  onAddTodo,
  onUpdateTodo,
  editingTodo,
  onClose,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isEditing = Boolean(editingTodo);

  useEffect(() => {
    setTitle(editingTodo?.title || "");
    setDescription(editingTodo?.description || "");
  }, [editingTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setSubmitting(true);

      const todoData = {
        title: title.trim(),
        description: description.trim(),
      };

      if (isEditing) {
        await onUpdateTodo(editingTodo._id, todoData);
      } else {
        await onAddTodo(todoData);
      }

      onClose();
    } catch (error) {
      console.error("Failed to save task:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Task Title
        </label>

        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description
        </label>

        <textarea
          placeholder="Add task details..."
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none resize-none"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">

        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
        >
          {submitting
            ? "Saving..."
            : isEditing
              ? "Save Changes"
              : "Create Task"}
        </button>

      </div>

    </form>
  );
}

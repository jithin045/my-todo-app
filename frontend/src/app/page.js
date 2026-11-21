
"use client";

import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatCard";
import ProgressBar from "../components/ProgressBar";
import TodoList from "../components/TodoList";
import TodoModal from "../components/TodoModal";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoService";

export default function Home() {
  // States
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  // Fetch Todos
  const fetchTodos = async () => {
    try {
      setError("");

      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setError("Unable to load tasks. Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  // Initial API call
  useEffect(() => {
    fetchTodos();
  }, []);

  // Open Add Modal
  const handleAddClick = () => {
    setEditingTodo(null);
    setShowForm(true);
  };

  // Open Edit Modal
  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  // Close Modal
  const closeModal = () => {
    setShowForm(false);
    setEditingTodo(null);
  };

  // Create Todo
  const handleAddTodo = async (todoData) => {
    await createTodo(todoData);
    await fetchTodos();
  };

  // Update Todo
  const handleUpdateTodo = async (id, todoData) => {
    await updateTodo(id, todoData);
    await fetchTodos();
  };

  // Delete Todo
  const handleDeleteTodo = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      await deleteTodo(id);
      await fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Failed to delete task.");
    }
  };

  // Task Statistics
  const completed = todos.filter(
    (todo) => todo.completed
  ).length;

  const pending = todos.length - completed;

  const progress = todos.length
    ? Math.round((completed / todos.length) * 100)
    : 0;

  // Search and Filter
  const filteredTodos = todos.filter((todo) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      todo.title.toLowerCase().includes(searchTerm) ||
      (todo.description || "").toLowerCase().includes(searchTerm);

    const matchesFilter =
      filter === "all" ||
      (filter === "pending" && !todo.completed) ||
      (filter === "completed" && todo.completed);

    return matchesSearch && matchesFilter;
  });

  // UI
  return (
    <main className="min-h-screen bg-[#f8f9fc] flex">

      {/* Sidebar */}
      <Sidebar
        filter={filter}
        setFilter={setFilter}
      />

      {/* Main Dashboard */}
      <section className="flex-1 p-5 md:p-10 max-w-7xl mx-auto w-full">

        {/* Header */}
        <DashboardHeader
          onAdd={handleAddClick}
        />

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-9">

          <StatCard
            title="Total Tasks"
            value={todos.length}
            icon="▤"
            color="indigo"
          />

          <StatCard
            title="Pending Tasks"
            value={pending}
            icon="◷"
            color="orange"
          />

          <StatCard
            title="Completed Tasks"
            value={completed}
            icon="✓"
            color="green"
          />

        </div>

        {/* Progress */}
        <ProgressBar
          progress={progress}
        />

        {/* Task Listing */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Listing Header */}
          <div className="p-6 border-b border-gray-100">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Your Tasks
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Manage and track your daily activities
                </p>
              </div>

              <span className="text-sm text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg font-medium">
                {filteredTodos.length} Tasks
              </span>

            </div>

          </div>

          {/* Search and Filter */}
          <div className="p-5 flex flex-col md:flex-row gap-3 justify-between">

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:max-w-sm px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none"
            />

            <div className="flex gap-2 overflow-x-auto">

              {["all", "pending", "completed"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition ${
                    filter === item
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {item}
                </button>
              ))}

            </div>

          </div>

          {/* Todo List */}
          <div className="px-5 pb-6">

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-4 text-sm">
                {error}
              </div>
            )}

            {loading ? (
              <div className="py-12 text-center text-gray-400">
                Loading your tasks...
              </div>
            ) : (
              <TodoList
                todos={filteredTodos}
                onDelete={handleDeleteTodo}
                onUpdate={handleUpdateTodo}
                onEdit={handleEditTodo}
              />
            )}

          </div>

        </div>

      </section>

      {/* Add / Edit Modal */}
      <TodoModal
        show={showForm}
        editingTodo={editingTodo}
        onClose={closeModal}
        onAdd={handleAddTodo}
        onUpdate={handleUpdateTodo}
      />

    </main>
  );
}

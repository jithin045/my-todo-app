
import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/todos",
});

// Get all todos
export const getTodos = async () => {
  const response = await API.get("/");
  return response.data.todos;
};

// Create todo
export const createTodo = async (todoData) => {
  const response = await API.post("/", todoData);
  return response.data.todo;
};

// Update todo
export const updateTodo = async (id, todoData) => {
  const response = await API.put(`/${id}`, todoData);
  return response.data.todo;
};

// Delete todo
export const deleteTodo = async (id) => {
  const response = await API.delete(`/${id}`);
  return response.data;
};

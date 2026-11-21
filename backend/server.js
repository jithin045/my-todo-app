
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Todo API is running"
  });
});

// Todo API routes
app.use("/api/todos", todoRoutes);

// Server port
const PORT = process.env.PORT || 5000;

// Connect database and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Server startup failed:", error);
  });

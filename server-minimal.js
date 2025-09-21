require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://tripwise-nr4n.onrender.com"
        : "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve the built React app
app.use(express.static(path.join(__dirname, "Frontend/dist")));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// API placeholder - will be added back once we confirm server starts
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

// Catch all handler: send back React's index.html file for any non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend/dist/index.html"));
});

const port = process.env.PORT || 3000;

console.log(`🔍 Starting server on port ${port}`);
console.log(`🌍 NODE_ENV: ${process.env.NODE_ENV}`);

app.listen(port, "0.0.0.0", () => {
  console.log(`🎉 Server running on port ${port}`);
  console.log(`🌐 Server listening on all interfaces (0.0.0.0:${port})`);
});

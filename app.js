require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

// Try to import database, but don't fail if it doesn't work
let db;
try {
  db = require("./BackEnd/db/models/index.js");
} catch (error) {
  console.log("⚠️  Could not load database models:", error.message);
}

const authRouter = require("./BackEnd/routes/authRouter.js");
const geminiRouter = require("./BackEnd/routes/geminiRouter.js");

const app = express();

app.use(cookieParser());
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

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));

// Serve the built React app
app.use(express.static(path.join(__dirname, "Frontend/dist")));

app.use("/auth", authRouter);
app.use("/api/gemini", geminiRouter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Catch all handler: send back React's index.html file for any non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend/dist/index.html"));
});

async function testConnection() {
  const port = process.env.PORT || 3000;

  console.log(`🔍 Attempting to start server on port ${port}`);
  console.log(`🌍 NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(
    `🗄️  SUPABASE_DB_URL available: ${!!process.env.SUPABASE_DB_URL}`
  );
  console.log(`📊 Database models loaded: ${!!db}`);

  if (db && process.env.SUPABASE_DB_URL) {
    try {
      await db.sequelize.authenticate();
      console.log("✅ Database connection established successfully.");
    } catch (error) {
      console.error("❌ Unable to connect to database:", error);
      console.log("🚀 Starting server anyway...");
    }
  } else {
    console.log(
      "⚠️  Database not available, starting server without database..."
    );
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`🎉 Server running on port ${port}`);
    console.log(`🌐 Server listening on all interfaces (0.0.0.0:${port})`);
  });
}

testConnection();

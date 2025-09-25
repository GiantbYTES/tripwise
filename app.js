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

// Try to import routes, but don't fail if they don't work
let authRouter, geminiRouter;
try {
  authRouter = require("./BackEnd/routes/authRouter.js");
  console.log("✅ Auth router loaded successfully");
} catch (error) {
  console.log("⚠️  Could not load auth router:", error.message);
}

try {
  geminiRouter = require("./BackEnd/routes/geminiRouter.js");
  console.log("✅ Gemini router loaded successfully");
} catch (error) {
  console.log("⚠️  Could not load gemini router:", error.message);
}

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
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

// Conditionally use routes if they loaded successfully
if (authRouter) {
  app.use("/auth", authRouter);
  console.log("✅ Auth routes mounted");
} else {
  console.log("⚠️  Auth routes not available");
}

if (geminiRouter) {
  app.use("/api/gemini", geminiRouter);
  console.log("✅ Gemini routes mounted");
} else {
  console.log("⚠️  Gemini routes not available");
}

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

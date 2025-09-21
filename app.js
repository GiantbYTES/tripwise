require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./BackEnd/db/models/index.js");
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

// Catch all handler: send back React's index.html file for any non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend/dist/index.html"));
});

async function testConnection() {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
    const port = process.env.PORT || 3000;
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
  }
}

testConnection();

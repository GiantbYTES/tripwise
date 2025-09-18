require("dotenv").config();
const express = require("express");
const cors = require("cors"); 
const path = require("path");
const db = require("./BackEnd/db/models/index.js");
const authRouter = require("./BackEnd/routes/authRouter.js");
const geminiRouter = require("./BackEnd/routes/geminiRouter.js");

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true          
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));

app.use("/auth", authRouter);
app.use("/api/gemini", geminiRouter);

async function testConnection() {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
  }
}

testConnection();

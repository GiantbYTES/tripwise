const express = require("express");
require("dotenv").config();
const path = require("path");
const db = require("./BackEnd/db/models/index.js")
//const { sequelize } = require("./db/models/index.js");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const geminiRouter = require("./BackEnd/routes/geminiRouter");
app.use("/api/gemini", geminiRouter);

async function testConnection() {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
  }
}
testConnection()


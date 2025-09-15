const express = require("express");
require("dotenv").config({ path: "./BackEnd/.env" });
const path = require("path");
//const { sequelize } = require("./db/models/index.js");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const geminiRouter = require("./BackEnd/routes/geminiRouter");
app.use("/api/gemini", geminiRouter);

app.get("/sanity", (req, res) => {
  res.send("Server is running");
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
  }
}

const port = 3000;
app.listen(port, async function () {
  console.log(`Server running on ${port}`);
  //await testConnection();
});

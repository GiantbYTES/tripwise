const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config()

const sequelize = new Sequelize(process.env.SUPABASE_DB_URL,{
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Supabase requires relaxed SSL
    },
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect:", error.message);
  } finally {
    await sequelize.close();
  }
})();

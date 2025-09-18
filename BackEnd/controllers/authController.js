const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../db/models");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ error: "Invalid credentials" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ error: "Invalid credentials" });

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        sameSite: "lax",
        maxAge: 3600000,
      });
      res
        .status(201)
        .json({
          message: "Login successful",
          user: { id: user.id, email: user.email },
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Login failed" });
    }
  },
  signup: async (req, res) => {
    try {
      const { email, password } = req.body;

      const existing = await User.findOne({ where: { email } });
      if (existing)
        return res.status(400).json({ error: "Email already exists" });

      const passwordHash = await bcrypt.hash(password, 10);

      const user = await User.create({ email, password: passwordHash });

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3600000,
      });

      res.status(201).json({
        message: "Signup successful",
        user: { id: user.id, email: user.email },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Signup failed" });
    }
  },
};

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ error: "Invalid credentials" });

      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) return res.status(400).json({ error: "Invalid credentials" });

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token, user: { id: user.id, email: user.email } });
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

      res.status(201).json({ token, user: { id: user.id, email: user.email } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Signup failed" });
    }
  },
};

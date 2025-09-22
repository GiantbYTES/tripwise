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
      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        sameSite: "strict",
        maxAge: 3600000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        sameSite: "strict",
      });
      res.status(201).json({
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

      const { accessToken, refreshToken } = generateTokens(user);
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
  logout: async (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfuly" });
  },
  refresh: async(req,res)=>{
    const refreshToken = req.cookie.refreshToken
    if(!refreshToken) return res.status(401).json({message:"No refresh token!"})

      try{
        const decode = jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET)
        const user = await User.findByPk(decode.id)
        const {accessToken} = generateTokens(user)

        res.cookie("token",accessToken,{httpOnly:true,sameSite:"strict"})
        res.json({message:"Token refreshed"})
      }catch(err){
        console.error(err)
        res.status(403).json({message:"Invalid refresh token"})
      }
  }
};

function generateTokens(user) {
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return { accessToken, refreshToken };
}

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
require("../config/passportConfig");

// Helper function to hash passwords
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

module.exports = {
  // User Registration
  register: async (req, res) => {
    const { username, email, password, role } = req.body;

    // Ensure required fields are present
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    try {
      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role: role || "VISITOR",
        },
      });

      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  },

  // User Login
  login: (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        return res.status(500).json({ error: "Authentication error" });
      }
      if (!user) {
        return res.status(401).json({ error: info.message }); // message from passport
      }

      // If authentication is successful, create a JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ message: "Login successful", token });
    })(req, res, next);
  },

  // JWT Authentication
  authenticateJwt: (req, res, next) => {
    passport.authenticate("jwt", { session: false })(req, res, next);
  },

  // Check user role
  roleCheck: (role) => {
    return (req, res, next) => {
      if (req.user && req.user.role === role) {
        return next(); // User is authorized, proceed to the next middleware/route handler
      }
      return res.status(403).json({
        error: "Forbidden: You do not have permission to perform this action.",
      });
    };
  },

  userProfileGet: async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ error: "Failed to fetch user profile" });
    }
  },
};

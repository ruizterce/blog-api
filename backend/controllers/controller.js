const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  get: (req, res) => {
    res.json({
      message: " Welcome to the API",
    });
  },

  // Get all posts
  postsGet: async (req, res) => {
    try {
      const posts = await prisma.post.findMany();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  },
};

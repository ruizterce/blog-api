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
      const posts = await prisma.post.findMany({
        include: {
          author: {
            select: {
              username: true,
            },
          },
          comments: true,
        },
      });

      // Map through posts to add the count of comments
      const formattedPosts = posts.map((post) => ({
        id: post.id,
        title: post.title,
        image: post.image,
        text: post.text,
        status: post.status,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        author: post.author.username,
        commentCount: post.comments.length,
      }));

      res.json(formattedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  },
};

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

  // Get post by id including author and comments
  postByIdGet: async (req, res) => {
    const { id } = req.params;
    try {
      const post = await prisma.post.findUnique({
        where: { id: parseInt(id) },
        include: {
          author: {
            // Include author information
            select: {
              username: true,
            },
          },
          comments: {
            // Include comments and user information
            include: {
              user: {
                select: {
                  username: true,
                  role: true,
                },
              },
            },
          },
        },
      });

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      const formattedPost = {
        id: post.id,
        title: post.title,
        image: post.image,
        text: post.text,
        status: post.status,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        author: {
          username: post.author.username,
        },
        comments: post.comments.map((comment) => ({
          id: comment.id,
          text: comment.text,
          createdAt: comment.createdAt,
          user: {
            username: comment.user.username,
            role: comment.user.role,
          },
        })),
      };

      res.json(formattedPost);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ error: "Failed to fetch post" });
    }
  },
};

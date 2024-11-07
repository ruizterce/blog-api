const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const path = require("path");

// Configure multer for storing images in the 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with timestamp for uniqueness
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
  // CREATE METHODS

  // Create Post
  postPost: async (req, res) => {
    const { title, text, status, authorId } = req.body;
    const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null;

    if (!title || !text || !status || !authorId) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled." });
    }

    try {
      const newPost = await prisma.post.create({
        data: {
          title,
          image: imageUrl,
          text,
          status,
          author: {
            connect: { id: parseInt(authorId) },
          },
        },
      });

      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Failed to create post" });
    }
  },

  // Create Comment
  commentPost: async (req, res) => {
    const { postId } = req.params;
    const { text, userId } = req.body;

    if (!postId || !text || !userId) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled." });
    }

    try {
      const newComment = await prisma.comment.create({
        data: {
          text,
          user: {
            connect: { id: userId },
          },
          post: {
            connect: { id: parseInt(postId) },
          },
        },
      });

      res.status(201).json(newComment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ error: "Failed to comment post" });
    }
  },

  // READ METHODS
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

  // UPDATE METHODS

  // Update a specific post
  postUpdate: async (req, res) => {
    console.log(req.file);
    const { id } = req.params;
    const { title, text, status } = req.body;
    const image = req.file ? `/uploads/images/${req.file.filename}` : null;

    if (!title && !image && !text && !status) {
      return res
        .status(400)
        .json({ error: "At least one field is required to update." });
    }

    try {
      const updatedPost = await prisma.post.update({
        where: { id: parseInt(id) },
        data: {
          ...(title && { title }),
          ...(image && { image }),
          ...(text && { text }),
          ...(status && { status }),
        },
      });

      res.json(updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Failed to update post" });
    }
  },

  // Update a specific comment
  commentUpdate: async (req, res) => {
    const { postId, id } = req.params;
    const { text } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({ error: "Text is required to update the comment." });
    }

    try {
      const existingComment = await prisma.comment.findFirst({
        where: {
          id: parseInt(id),
          postId: parseInt(postId),
        },
      });

      if (!existingComment) {
        return res
          .status(404)
          .json({ error: "Comment not found for this post." });
      }

      const updatedComment = await prisma.comment.update({
        where: { id: parseInt(id) },
        data: { text },
      });

      res.json(updatedComment);
    } catch (error) {
      console.error("Error updating comment:", error);
      res.status(500).json({ error: "Failed to update comment" });
    }
  },

  // DELETE METHODS

  // Delete a specific post
  postDelete: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedPost = await prisma.post.delete({
        where: { id: parseInt(id) },
      });

      res.json({ message: "Post deleted successfully", post: deletedPost });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Failed to delete post" });
    }
  },

  // Delete a specific comment within a specific post
  commentDelete: async (req, res) => {
    const { postId, id } = req.params;

    try {
      const existingComment = await prisma.comment.findFirst({
        where: {
          id: parseInt(id),
          postId: parseInt(postId),
        },
      });

      if (!existingComment) {
        return res
          .status(404)
          .json({ error: "Comment not found for this post." });
      }

      const deletedComment = await prisma.comment.delete({
        where: { id: parseInt(id) },
      });

      res.json({
        message: "Comment deleted successfully",
        comment: deletedComment,
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ error: "Failed to delete comment" });
    }
  },
};

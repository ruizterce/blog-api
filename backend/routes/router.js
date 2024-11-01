const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller");

// GET ROUTES
router.get("/", controller.get);
router.get("/posts", controller.postsGet);
router.get("/posts/:id", controller.postByIdGet);

// POST ROUTES
router.post("/posts", controller.postPost);
router.post("/posts/:postId/comments", controller.commentPost);

module.exports = router;

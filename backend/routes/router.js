const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller");
const usersController = require("../controllers/usersController");

// GET ROUTES
router.get("/", controller.get);
router.get("/posts", controller.postsGet);
router.get("/posts/:id", controller.postByIdGet);

// POST ROUTES
router.post(
  "/posts",
  usersController.authenticateJwt,
  usersController.roleCheck("AUTHOR"),
  controller.postPost
);
router.post("/posts/:postId/comments", controller.commentPost);
router.post("/register", usersController.register);
router.post("/login", usersController.login);

// PUT ROUTES
router.put(
  "/posts/:id",
  usersController.authenticateJwt,
  usersController.roleCheck("AUTHOR"),
  controller.postUpdate
);
router.put(
  "/posts/:postId/comments/:id",
  usersController.authenticateJwt,
  usersController.roleCheck("AUTHOR"),
  controller.commentUpdate
);

// DELETE ROUTES
router.delete(
  "/posts/:id",
  usersController.authenticateJwt,
  usersController.roleCheck("AUTHOR"),
  controller.postDelete
);
router.delete(
  "/posts/:postId/comments/:id",
  usersController.authenticateJwt,
  usersController.roleCheck("AUTHOR"),
  controller.commentDelete
);

module.exports = router;

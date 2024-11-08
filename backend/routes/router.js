const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller");
const usersController = require("../controllers/usersController");

// GET ROUTES
router.get("/", controller.get);
router.get("/posts", controller.postsGet);
router.get("/posts/published", controller.postsGetPublished);
router.get("/posts/:id", controller.postByIdGet);
router.get(
  "/user/profile",
  usersController.authenticateJwt,
  usersController.userProfileGet
);

// POST ROUTES
router.post(
  "/posts",
  usersController.authenticateJwt,
  usersController.roleCheck("AUTHOR"),
  controller.upload.single("image"),
  controller.postPost
);
router.post(
  "/posts/:postId/comments",
  usersController.authenticateJwt,
  controller.commentPost
);
router.post("/register", usersController.register);
router.post("/login", usersController.login);

// PUT ROUTES
router.put(
  "/posts/:id",
  usersController.authenticateJwt,
  usersController.roleCheck("AUTHOR"),
  controller.upload.single("image"),
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

const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller");

// GET ROUTES
router.get("/", controller.get);
router.get("/posts", controller.postsGet);
router.get("/posts/:id", controller.postByIdGet);

module.exports = router;

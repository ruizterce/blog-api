const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller");

router.get("/", controller.get);
router.get("/posts", controller.postsGet);

module.exports = router;

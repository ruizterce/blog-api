const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller");

router.get("/", controller.get);

module.exports = router;

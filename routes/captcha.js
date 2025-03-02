const express = require("express");
const { getCaptcha } = require("../controllers/captcha.controller");

const router = express.Router();

router.get("/", getCaptcha);

module.exports = router;

const express = require("express");
const router = express.Router();

const citiesRoutes = require("./cities.js");
const basketRoutes = require("./basket.js");
const productsRoutes = require("./products.js");
const walletRoutes = require("./wallet.js");
const orderRoutes = require("./orders.js");
const authRoutes = require('./auth.js');
const captchaRoutes = require("./captcha.js");



router.use("/cities", citiesRoutes);
router.use("/basket", basketRoutes);
router.use("/product", productsRoutes);
router.use("/wallet", walletRoutes);
router.use("/orders", orderRoutes);
router.use("/auth", authRoutes);
router.use("/captcha", captchaRoutes);




module.exports = router;

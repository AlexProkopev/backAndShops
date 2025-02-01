const express = require("express");
const router = express.Router();

const citiesRoutes = require("./cities.js");
const basketRoutes = require("./basket.js");
const productsRoutes = require("./products.js");
const walletRoutes = require("./wallet.js");
const orderRoutes = require("./orders.js");

router.use("/cities", citiesRoutes);
router.use("/basket", basketRoutes);
router.use("/product", productsRoutes);
router.use("/wallet", walletRoutes);
router.use("/orders", orderRoutes);

module.exports = router;

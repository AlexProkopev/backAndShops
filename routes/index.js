const express = require("express");
const router = express.Router();

const citiesRoutes = require("./cities.js");
const basketRoutes = require("./basket.js");
const productsRoutes = require("./products.js");

router.use("/cities", citiesRoutes);
router.use("/basket", basketRoutes);
router.use("/product", productsRoutes);

module.exports = router;

const express = require("express");

const ProducsController = require("../controllers/product.controllers");

const router = express.Router();

router.get("/", ProducsController.getProducts);
router.get("/:artkl", ProducsController.getProductByArtkl);

module.exports = router;

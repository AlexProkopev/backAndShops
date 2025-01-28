const express = require("express");

const router = express.Router();

const BasketControllers = require("../controllers/basket.controllers.js");

router.get("/", BasketControllers.getBasket);

router.patch("/add_to_basket", BasketControllers.addToBasket);

router.delete("/:productId", BasketControllers.deletedFromBasket);

module.exports = router;

const express = require("express");
const router = express.Router();
const OrdersControllers= require("../controllers/order.controllers");

router.post("/", OrdersControllers.createOrder);           // Создать заявку
router.post("/:id/extend", OrdersControllers.extendOrder); // Продлить заявку
router.get("/:id/time-left", OrdersControllers.getRemainingTime); // Проверить оставшееся время

module.exports = router;
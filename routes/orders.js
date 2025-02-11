const express = require("express");
const router = express.Router();
const OrdersControllers= require("../controllers/order.controllers");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, OrdersControllers.createOrder);           // Создать заявку
router.post("/:id/extend", OrdersControllers.extendOrder); // Продлить заявку
router.get("/:id/time-left", OrdersControllers.getRemainingTime); // Проверить оставшееся время
router.get("/:id", OrdersControllers.getOrderById); // Получить заявку
router.delete("/delete-order/:idOrder", OrdersControllers.deleteOrder); // Удалить заявку

module.exports = router;
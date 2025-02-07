const orderService = require("../services/orderService");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const createOrder = async (req, res) => {
  const { productName, weight, district, paymentMethod, wallet } = req.body;

  if (!productName || !weight || !district || !paymentMethod || !wallet) {
    return res.status(400).json({ message: "Все поля обязательны" });
  }

  try {
    const order = await orderService.createOrder(req.body);

    if (req.user) {
      // Если пользователь авторизован, привязываем заказ
      await User.findByIdAndUpdate(
        req.user.userId,
        {
          $push: { orders: order._id, orderHistory: order },
        },
        { new: true }
      );
    }

    res.status(201).json(order);
  } catch (error) {
    console.error("Ошибка создания заказа:", error);
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    order.error
      ? res.status(404).json({ message: order.error })
      : res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

const extendOrder = async (req, res) => {
  try {
    const result = await orderService.extendOrder(req.params.id);
    result.error
      ? res.status(400).json({ message: result.error })
      : res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

const getRemainingTime = async (req, res) => {
  try {
    const result = await orderService.getRemainingTime(req.params.id);
    result.error
      ? res.status(404).json({ message: result.error })
      : res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

module.exports = { createOrder, getOrderById, extendOrder, getRemainingTime };

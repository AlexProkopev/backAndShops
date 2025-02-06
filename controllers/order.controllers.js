const orderService = require("../services/orderService");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject("Неверный токен");
      } else {
        resolve(decoded);
      }
    });
  });
};

const createOrder = async (req, res) => {
  const { productName, weight, district, paymentMethod, wallet } = req.body;

  if (!productName || !weight || !district || !paymentMethod || !wallet)
    return res.status(400).json({ message: "Все поля обязательны" });

  try {
    const order = await orderService.createOrder(req.body);

    const token = req.headers["authorization"]?.split(" ")[1];
    console.log("Токен из заголовков:", token);

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          console.error("Ошибка при проверке токена:", err);
          return res.status(403).json({ message: "Неверный токен" });
        }

        console.log("Декодированный пользователь:", decoded);

        const userId = decoded.userId;

        const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            $push: { orders: order._id },
            $push: { orderHistory: order },
          },
          { new: true }
        );
      });
    } else {
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

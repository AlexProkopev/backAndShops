const orderService = require("../services/orderService");

// 🔹 Создание заявки
const createOrder = async (req, res) => {
  const { productName, weight, district, paymentMethod, wallet } = req.body;

  if (!req.body)
    return res.status(400).json({ message: "Тело запроса пустое!" });

  // Проверка обязательных полей
  if (!productName || !weight || !district || !paymentMethod || !wallet)
    return res.status(400).json({ message: "Все поля обязательны" });

  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};

// 🔹 Продление заявки
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

// 🔹 Получение оставшегося времени
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

module.exports = { createOrder, extendOrder, getRemainingTime };

const orderService = require("../services/orderService");
const User = require("../models/user");

// 🔹 Создание заявки
const createOrder = async (req, res) => {
  const { productName, weight, district, paymentMethod, wallet } = req.body;

  if (!productName || !weight || !district || !paymentMethod || !wallet) 
    return res.status(400).json({ message: "Все поля обязательны" });

  try {
    const order = await orderService.createOrder(req.body);
  
    // ✅ Проверяем, есть ли пользователь (токен передан и декодирован)
    if (req.user) {
      console.log("🧐 req.user:", req.user);

      console.log("🛠 ID пользователя из токена:", req.user?.userId);
      const updatedUser = await User.findByIdAndUpdate(
        req.user.userId,  // Используем userId, а не _id
        { $push: { orders: order._id },
        $push: { orderHistory: order }, }, 
        { new: true }  // 🔹 Вернем обновленный объект
      )
      console.log("📌 Обновленный пользователь:", updatedUser);
    }
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};



// 🔹 Поиск заявки по ID
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

module.exports = { createOrder, getOrderById, extendOrder, getRemainingTime };

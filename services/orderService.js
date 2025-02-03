const Order = require("../models/order.js");

// 🔹 Создание заявки (живет 30 минут)
const createOrder = async (data) => {
  console.log("📩 Данные, полученные для создания заявки:", data); 
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
  return await new Order({ ...data, expiresAt }).save();
};

// 🔹 Поиск заявки по ID
const getOrderById = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) return { error: "Заявка не найдена" };
  return order;
};

// 🔹 Продление заявки (+10 минут, но не более 1 часа)
const extendOrder = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) return { error: "Заявка не найдена" };

  const now = new Date();
  const maxExtendTime = new Date(order.createdAt.getTime() + 60 * 60 * 1000);

  if (now > order.expiresAt) return { error: "Заявка уже истекла" };
  if (now - order.lastExtendAt < 30 * 1000) return { error: "Продлевать можно раз в 30 секунд" };
  if (order.expiresAt >= maxExtendTime) return { error: "Заявка не может быть продлена более 1 часа" };

  order.expiresAt = new Date(order.expiresAt.getTime() + 10 * 60 * 1000);
  order.lastExtendAt = now;
  await order.save();

  return { success: "Заявка продлена", expiresAt: order.expiresAt };
};

// 🔹 Получение оставшегося времени
const getRemainingTime = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) return { error: "Заявка не найдена" };

  return { remainingTime: Math.max(0, order.expiresAt - new Date()) };
};

// 🔹 Удаление истекших заявок
const cleanExpiredOrders = async () => {
  await Order.deleteMany({ expiresAt: { $lt: new Date() } });
};

module.exports = {
  createOrder,
  getOrderById,
  extendOrder,
  getRemainingTime,
  cleanExpiredOrders,
};

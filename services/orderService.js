const User = require("../models/user");
const Order = require("../models/order");

const createOrder = async (data) => {
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
  const order = new Order({ ...data, expiresAt });

  return await order.save();
};

const addOrderToUserHistory = async (orderId, userId, order) => {
  try {
    await User.findByIdAndUpdate(
      userId,
      { 
        $push: { orders: orderId },
        $push: { orderHistory: order }
      },
      { new: true }
    );
  } catch (error) {
    throw new Error("Ошибка при обновлении истории пользователя: " + error.message);
  }
};

const createOrderAndUpdateUser = async (orderData, userId) => {
  try {
    const order = await createOrder(orderData);

    if (userId) {
      await addOrderToUserHistory(order._id, userId);
    }

    return order;
  } catch (error) {
    throw new Error("Ошибка при создании заказа и обновлении пользователя: " + error.message);
  }
};


const getOrderById = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) return { error: "Заявка не найдена" };
  return order;
};

const extendOrder = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) return { error: "Заявка не найдена" };

  const now = new Date();
  const maxExtendTime = new Date(order.createdAt.getTime() + 60 * 60 * 1000);

  if (now > order.expiresAt) return { error: "Заявка уже истекла" };
  if (now - order.lastExtendAt < 30 * 1000) return { error: "Продлевать можно раз в 30 секунд" };
  if (order.expiresAt >= maxExtendTime) return { error: "Заявка не может быть продлена более 1 часа" };


  order.expiresAt = new Date(order.expiresAt.getTime() + 30 * 60 * 1000);
  order.lastExtendAt = now;
  await order.save();

  return { success: "Заявка продлена", expiresAt: order.expiresAt };
};


const getRemainingTime = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) return { error: "Заявка не найдена" };

  return { remainingTime: Math.max(0, order.expiresAt - new Date()) };
};

const cleanExpiredOrders = async () => {
  await Order.deleteMany({ expiresAt: { $lt: new Date() } });
};


const deleteOrder = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) return { error: "Заявка не найдена" };

  await Order.findByIdAndDelete(orderId);
  return { success: true };
};

module.exports = {
  createOrderAndUpdateUser,
  getOrderById,
  extendOrder,
  getRemainingTime,
  cleanExpiredOrders,
  addOrderToUserHistory,
  createOrder,
  deleteOrder
};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

// Функция для генерации токенов
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

  return { accessToken, refreshToken };
};

// Регистрация пользователя
const registerUser = async (username, email, password) => {
  if (await User.findOne({ email })) throw new Error('Пользователь с таким email уже существует');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();

  const { accessToken, refreshToken } = generateTokens(newUser._id);

  newUser.refreshToken = refreshToken;
  newUser.accessToken = accessToken;
  await newUser.save();

  return { id: newUser._id, username: newUser.username, email: newUser.email, accessToken, refreshToken };
};

// Логин пользователя
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) throw new Error('Неверный email или пароль');

  const { accessToken, refreshToken } = generateTokens(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

// Логика для обновления access token через refresh token
const refreshAccessToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findOne({ _id: decoded.userId, refreshToken });

    if (!user) {
      throw new Error('Invalid or expired refresh token');
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);

    user.refreshToken = newRefreshToken;
    await user.save();

    return { accessToken, refreshToken: newRefreshToken };
  } catch (err) {
    console.log('Error occurred:', err.message);
    throw new Error('Invalid or expired refresh token');
  }
};

// Логика для получения текущего пользователя
const getCurrentUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (err) {
    console.log('Error occurred:', err.message);
    throw new Error('User not found');
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  getCurrentUser,
};

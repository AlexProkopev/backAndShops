const bcrypt = require('bcrypt'); // Используй bcryptjs для кросс-платформенности
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const generateToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });


const registerUser = async (username, email, password) => {
  if (await User.findOne({ email })) throw new Error('Пользователь с таким email уже существует');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();
  const token = generateToken(newUser._id);

  return { id: newUser._id, username: newUser.username, email: newUser.email, token };
};

// Логин пользователя
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) throw new Error('Неверный email или пароль');

  return generateToken(user._id);
};

const logoutUser = (res) => {
    res.status(200).json({ message: 'Вы успешно вышли' });
  };
  

module.exports = {
  registerUser,
  loginUser,
  logoutUser
};

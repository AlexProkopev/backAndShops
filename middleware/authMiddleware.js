const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Требуется авторизация" });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;  // Добавляем информацию о пользователе в запрос
    next();
  } catch (e) {
    res.status(401).json({ message: "Неверный токен" });
  }
};

module.exports = authenticate;

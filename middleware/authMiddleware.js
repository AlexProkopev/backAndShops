const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    req.user = null; // Если токена нет, просто передаем дальше без пользователя
    console.error("токена нет");
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.error(decoded);
  } catch (err) {
    console.error("Ошибка при проверке токена:", err);
    req.user = null; // Если токен невалиден, продолжаем без него
  }

  next();
};

module.exports = authMiddleware;
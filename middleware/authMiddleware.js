const jwt = require("jsonwebtoken");
require('dotenv').config();
// const authenticate = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   if (!token) {
//     return res.status(401).json({ message: "Требуется авторизация" });
//   }

//   try {
//     const decoded = jwt.verify(token, "your_jwt_secret");
//     req.user = decoded;  // Добавляем информацию о пользователе в запрос
//     console.log("✅ Декодированные данные из токена:", decoded); // Проверяем, что в токене
//     next();
//   } catch (e) {
//     res.status(401).json({ message: "Неверный токен" });
//   }
// };

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log("Токен из заголовков:", token);  // Логируем токен
  if (!token) return res.status(401).json({ message: 'Нет токена' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Ошибка при проверке токена:", err);  // Логируем ошибку
      return res.status(403).json({ message: 'Неверный токен' });
    }

    console.log("Декодированный пользователь:", decoded);  // Логируем декодированные данные
    req.user = decoded;
    next();
  });
};


module.exports = authenticate;

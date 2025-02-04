const authService = require("../services/authService");

// 🔹 Регистрация нового пользователя
const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Проверка на обязательные поля
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Все поля обязательны" });
  }

  try {
    // Регистрация нового пользователя и генерация токена
    const userWithToken = await authService.registerUser(username, email, password);

    // Возвращаем данные пользователя и токен
    res.status(201).json({
      message: "Пользователь успешно зарегистрирован",
      user: {
        id: userWithToken.id,
        username: userWithToken.username,
        email: userWithToken.email,
      },
      token: userWithToken.token, // Токен для автовхода
    });
  } catch (error) {
    // Ошибка с уже существующим пользователем
    if (error.message.includes("email")) {
      return res.status(409).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
};

// 🔹 Логин пользователя
const login = async (req, res) => {
  const { email, password } = req.body;

  // Проверка на обязательные поля
  if (!email || !password) {
    return res.status(400).json({ message: "Все поля обязательны" });
  }

  try {
    const token = await authService.loginUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};

const authService = require("../services/authService");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userWithToken = await authService.registerUser(
      username,
      email,
      password
    );


    res.cookie("refreshToken", userWithToken.refreshToken, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Пользователь успешно зарегистрирован",
      user: {
        id: userWithToken.id,
        username: userWithToken.username,
        email: userWithToken.email,
      },
      accessToken: userWithToken.accessToken,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { accessToken, refreshToken, user } = await authService.loginUser(
      email,
      password
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken, refreshToken, user }); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const currentUser = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await authService.getCurrentUser(userId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  try {
    const { accessToken, refreshToken: newRefreshToken } =
      await authService.refreshAccessToken(refreshToken);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

const logOut = async (req, res) => {
  try {
    // Просто отправляем успешный ответ
    res.json({ message: "Вы успешно вышли из системы" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
  register,
  login,
  currentUser,
  refresh,
  logOut
};

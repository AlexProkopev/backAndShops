const svgCaptcha = require("svg-captcha");

const getCaptcha = (req, res) => {
  const captcha = svgCaptcha.create({
    size: 6,
    noise: 3,
    color: true,
    background: "#f0f0f0",
  });

  res.json({ image: captcha.data, text: captcha.text });
};

module.exports = { getCaptcha };

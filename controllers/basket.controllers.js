const getBasket = (req, res, next) => {
  res.send("get basket");
};

const addToBasket = (req, res, next) => {
  res.send("add to basket");
};

const deletedFromBasket = (req, res, next) => {
  res.send(`delete from basket product `);
};

module.exports = { getBasket, addToBasket, deletedFromBasket };

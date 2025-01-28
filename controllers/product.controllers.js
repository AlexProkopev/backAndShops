const { Product } = require("../models/product");

const getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.send(products);
    })
    .catch(next);
};

const getProductByArtkl = (req, res, next) => {
  const { artkl } = req.params;

  Product.findOne({ artkl })
    .then((product) =>
      product
        ? res.send(product)
        : res.status(404).send({ error: "Product not found" })
    )
    .catch(next);
};

module.exports = { getProducts, getProductByArtkl };

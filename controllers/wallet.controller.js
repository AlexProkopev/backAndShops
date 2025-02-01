const Wallets = require("../models/wallet.js");

const getWallets = (req, res, next) => {
    Wallets.find()
    .then((wallet) => {
      res.send(wallet);
    })
    .catch(next);
};

const getWalletById = (req, res, next) => {
  const { walletId } = req.params;

  Wallets.findById(walletId)
    .then((wallet) =>
        wallet ? res.send(wallet) : res.status(404).send({ error: "City not found" })
    )
    .catch(next);
};
module.exports = { getWallets, getWalletById };
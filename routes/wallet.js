const express = require("express");

 const WalletsController = require("../controllers/wallet.controller");

const router = express.Router();

router.get("/",WalletsController.getWallets);
router.get("/:walletId",WalletsController.getWalletById);

module.exports = router;

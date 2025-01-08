const express = require('express');
const router = express.Router();

const citiesRoutes = require('./cities.js');
const basketRoutes = require('./basket.js');

router.use('/cities', citiesRoutes);
router.use('/basket', basketRoutes);

module.exports = router;
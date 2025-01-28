const express = require("express");

const CitiesController = require("../controllers/cities.controller");

const router = express.Router();

router.get("/", CitiesController.getCities);

router.get("/:cityId", CitiesController.getCurrentCities);

module.exports = router;

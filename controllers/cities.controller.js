const City = require("../models/cities.js");

const getCities = (req, res, next) => {
  City.find()
    .then(cities => {
      const uniqueCities = [...new Map(cities.map(city => [city.city, city])).values()]
        .map(city => ({ city: city.city, _id: city._id, name: city.name }));
      res.send(uniqueCities);
    })
    .catch(next);
}; // Запрос на данные о городах

const getCurrentCities = (req, res, next) => {
  const { cityId } = req.params;

  City.findById(cityId)
    .then(city => city ? res.send(city) : res.status(404).send({ error: "City not found" }))
    .catch(next);
}; // Выбираем город по id


module.exports = { getCities, getCurrentCities };

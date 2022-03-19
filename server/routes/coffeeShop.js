const express = require('express');
const { append } = require('express/lib/response');
const coffeeShopController = require('../controllers/coffeeShopController.js');

const router = express();

router.get('/', coffeeShopController.getCoffeeShop, (req, res) => {
  res.status(200).json(res.locals.coffeeShop);
});

router.post('/userInput', coffeeShopController.postCoffeeShop, (req, res) => {
  res.sendStatus(200);
})

module.exports = router;
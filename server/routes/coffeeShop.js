const express = require('express');
const { append } = require('express/lib/response');
const coffeeShopController = require('../controllers/coffeeShopController.js');

const router = express();

app.get('/', coffeeShopController.getCoffeeShop, (req, res) => {
  res.status(200).json(res.locals.coffeeShop);
});


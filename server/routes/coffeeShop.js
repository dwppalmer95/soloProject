const express = require('express');
const { append } = require('express/lib/response');
const coffeeShopController = require('../controllers/coffeeShopController.js');

const router = express();

router.get('/', coffeeShopController.getCoffeeShop, (req, res) => {
  res.status(200).json(res.locals.coffeeShop);
});

router.post('/', coffeeShopController.postCoffeeShopInfo, (req, res) => {
  res.status(200).json(res.locals.coffeeShop);
});

router.post('/newCustomer', coffeeShopController.postNewCustomerInfo, (req, res) => {
  res.status(200).json(res.locals.newCustomer);
})

module.exports = router;
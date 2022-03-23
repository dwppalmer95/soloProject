const path = require('path');
const fs = require('fs');
const db = require('../model/coffeeShopModels');
const queries = require('./queries');
const { join } = require('path');
const mockDataPath = path.resolve(__dirname, '../data/mockData.json');

const coffeeShopController = {};

coffeeShopController.getCoffeeShop = (req, res, next) => {
  const params = [req.body.coffeeShopName];
  db.query(queries.getCoffeeShopInfo, params, (queryErr, queryRes) => {
    if (queryErr) {
      const err = {
        log: `Query error in getCoffeeShop: ${queryErr}`,
        status: 400,
        message: 'A query error occured. See console.', 
      }
      return next(err);
    }

    const coffeeShop = queryRes.rows[0];
    res.locals.coffeeShop = coffeeShop;
    return next();
  });
}

coffeeShopController.postCoffeeShopInfo = (req, res, next) => {
  const newCoffeeShop = req.body;
  const params = [
    newCoffeeShop.name,
    newCoffeeShop.wifiDownload,
    newCoffeeShop.wifiUpload,
    newCoffeeShop.streetAddress,
    newCoffeeShop.zipCode
  ];

  db.query(queries.postCoffeeShopInfo, params, (queryErr, queryRes) => {
    if (queryErr) {
      const err = {
        log: `Query error in postCoffeeShop: ${queryErr}`,
        status: 400,
        message: 'A query error occured. See console.', 
      }
      return next(err);
    }

    console.log(queryRes);
    res.locals.coffeeShop = params;
    return next();
  });
}
  
coffeeShopController.postNewCustomerInfo = (req, res, next) => {
  const dateString = req.body.dateString;
  const departureTimeUtc = req.body.departureTimeUtc;
  const {seatId, outletId} = req.body;
  const departureTime = Date.parse(`${dateString} ${departureTimeUtc}`)

  const params = [
    seatId,
    outletId,
    departureTime
  ];

  db.query(queries.postNewCustomerInfo, params, (queryErr, queryRes) => {
    if (queryErr) {
      const err = {
        log: `Query error in postNewCustomerData: ${queryErr}`,
        status: 400,
        message: 'A query error occured. See console.', 
      }
      return next(err);
    }

    const output = {
      seatId,
      outletId,
      departureTime
    };

    res.locals.newCustomer = output;
    return next();
  });
}



module.exports = coffeeShopController;
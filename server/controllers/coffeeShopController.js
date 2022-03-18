const path = require('path');
const fs = require('fs');
const mockDataPath = path.resolve(__dirname, '../data/mockData.json');

const coffeeShopController = {};

coffeeShopController.getCoffeeShop = (req, res, next) => {
  fs.readFile(mockDataPath, 'utf-8', (err, data) => {
    if (err) {
      const errObj = {
        log: `Error in coffeeShopController.getCoffeeShop. ${err}`,
        message: 'Error getting coffee shop data. See console'
      };
      return next(errObj);
    } else {
      const parsedData = JSON.parse(data);
      res.locals.coffeeShop = parsedData;
      console.log(parsedData);
      return next();
    }
  })
}

module.exports = coffeeShopController;
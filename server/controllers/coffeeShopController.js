const path = require('path');
const fs = require('fs');
const { join } = require('path');
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

coffeeShopController.postCoffeeShop = (req, res, next) => {
  
  const dataStructure = {
    "user": null,
    "timeOfArrival": null,
    "timeOfDeparture": null,
    "currentSeat": null,
    "currentOutlets": null
  };

  const newData = {
    ...req.body
  };

  fs.appendFile(mockDataPath, JSON.stringify(newData), (err) => {
    if (err) {
      const errObj = {
        log: `Error in coffeeShopController.postCoffeeShop. ${err}`,
        message: 'Error posting coffee shop data. See console'
      };
      return next(errObj);
    }
    return next();
  })
}



module.exports = coffeeShopController;
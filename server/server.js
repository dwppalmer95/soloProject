const path = require('path');
const express = require('express');
const coffeeShopRouter = require('./routes/coffeeShop.js');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res, next) => {

  const fileName = path.resolve(__dirname, '../client/index.html');
  res.sendFile(fileName, (err) => {
    if (err) {
      const errObj = {
        log: 'error in sending html file\n' + err,
        message: 'An error occured sending index.html. See console.'
      };
      return next(errObj);
    } else {
      console.log('sent');
    }
  });
  
});

app.use('/coffeeShop', coffeeShopRouter);

app.use((req, res, next) => {
  const err = {
    log: `Unhandled route request to endpoint: ${req.url}`,
    status: 404,
    message: 'An unhandled route occured. See console.'
  };
  next(err);
});

app.use((err, req, res, next) => {
  const defaultError = {
    log: `Express error handler caught unknown middleware error: ${err}`,
    status: 400,
    message: 'An error occured', 
  };
  const errObj = {
    ...defaultError,
    ...err
  }
  console.log(errObj.log);
  res.status(errObj.status).send(errObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})
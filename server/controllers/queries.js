const queries = {};

queries.getCoffeeShopInfo = `SELECT * FROM coffee_shops 
WHERE business_name=$1`;

queries.postCoffeeShopInfo = `INSERT INTO coffee_shops 
(business_name, avg_wifi_download_mbps, avg_wifi_upload_mbps, 
  street_address, zip_code) 
VALUES ($1, $2, $3, $4, $5);`;

queries.postNewCustomerInfo = `INSERT INTO customers 
(seat_id, outlet_id, departure_time) 
VALUES ($1, $2, $3);`;

module.exports = queries;
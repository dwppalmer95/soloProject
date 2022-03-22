-- psql -d "postgres://oajtkeke:IM0p_J6QPp4xCEXeL8VCATYNGgM4JQ6A@salt.db.elephantsql.com/oajtkeke" -f ./server/data/coffee_shop_create.sql

CREATE TABLE coffee_shops (
  _id SERIAL PRIMARY KEY,
  business_name TEXT,
  avg_wifi_download_mbps DECIMAL,
  avg_wifi_upload_mbps DECIMAL,
  street_address TEXT NOT NULL,
  zip_code INT NOT NULL
);

CREATE TABLE tables (
  _id SERIAL PRIMARY KEY,
  coffee_shop_id INT NOT NULL,
  FOREIGN KEY (coffee_shop_id) REFERENCES coffee_shops(_id)
);

CREATE TABLE seats (
  _id SERIAL PRIMARY KEY,
  table_id INT NOT NULL,
  FOREIGN KEY (table_id) REFERENCES tables(_id)
);

CREATE TABLE outlets (
  _id SERIAL PRIMARY KEY,
  table_id INT,
  FOREIGN KEY (table_id) REFERENCES tables(_id)
);

CREATE TABLE customers (
  _id SERIAL PRIMARY KEY,
  seat_id INT NOT NULL UNIQUE,
  outlet_id INT NOT NULL UNIQUE,
  departure_time BIGINT NOT NULL,
  FOREIGN KEY (seat_id) REFERENCES seats(_id),
  FOREIGN KEY (outlet_id) REFERENCES outlets(_id)
);

INSERT INTO coffee_shops 
  (_id, business_name, avg_wifi_download_mbps, avg_wifi_upload_mbps, 
    street_address, zip_code) 
  VALUES (1, 'The Bean', 1.55, 11.7, 
    '54 2nd Ave', 10003);

INSERT INTO tables (_id, coffee_shop_id) VALUES (1, 1);

INSERT INTO seats (_id, table_id) VALUES (1, 1);
INSERT INTO seats (_id, table_id) VALUES (2, 1);
INSERT INTO seats (_id, table_id) VALUES (3, 1);

INSERT INTO outlets (_id, table_id) VALUES (1, 1);
INSERT INTO outlets (_id, table_id) VALUES (2, 1);
INSERT INTO outlets (_id, table_id) VALUES (3, 1);
INSERT INTO outlets (_id) VALUES (4);
INSERT INTO outlets (_id) VALUES (5);

INSERT INTO customers (_id, seat_id, outlet_id, departure_time)
  VALUES (1, 2, 1, 1647915874572);
INSERT INTO customers (_id, seat_id, outlet_id, departure_time)
  VALUES (2, 3, 2, 1647923074572);

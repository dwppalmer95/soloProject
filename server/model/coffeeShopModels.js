const { Pool } = require('pg');

const PG_URI = 'postgres://oajtkeke:IM0p_J6QPp4xCEXeL8VCATYNGgM4JQ6A@salt.db.elephantsql.com/oajtkeke';

const pool = new Pool({
  connectionString: PG_URI
});

// Schema can be found here:
// https://app.dbdesigner.net/designer/schema/509748

module.exports = {
  query: (string, params, callback) => {
    console.log('executed query', string);
    return pool.query(string, params, callback);
  }
}
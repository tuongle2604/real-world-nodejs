const mysql = require('mysql');
const config = require(CONFIG_DIR + "/mysql");
const pool = mysql.createPool(config);

module.exports = pool;

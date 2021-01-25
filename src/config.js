import mysql from 'mysql';

var con = mysql.createConnection({
  host: "139.99.68.189",
  user: "velbase",
  password: "3XXa8d5It3Sfe8JlCvRHuojlvXLfiIwp",
  database: 'velbase'
});

export default con;

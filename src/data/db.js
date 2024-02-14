const { Pool } = require("pg");

// Buat koneksi pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dummy",
  password: "nanda",
  port: 5432,
});

module.exports = pool;

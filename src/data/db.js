const { Pool } = require("pg");

// Buat koneksi pool
const pool = new Pool({
  connectionString:
    "postgres://default:Krna0d3fWUNs@ep-red-water-94323878-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
  // host: "localhost",
  // user: "postgres",
  // password: "nanda",
  // database: "dummy",
  // port: 5432,
});

module.exports = pool;

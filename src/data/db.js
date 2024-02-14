const { Pool } = require("pg");

// Buat koneksi pool
const pool = new Pool({
  connectionString:
    "postgres://default:Krna0d3fWUNs@ep-red-water-94323878-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
});

module.exports = pool;

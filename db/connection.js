require('dotenv').config();

// Import of the pool object from the 'pg' library for managing Postgress connections.
const { Pool } = require("pg");

// Check if the PGDATABASE environment variable is set. If not, throw an error to ensure proper configuration.
if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set!");
}

// Create a new instance of the Pool object for handling PostgreSQL connection pools.
const pool = new Pool();


// Export the pool object to make it available for use in other modules.
module.exports = pool;
const pool = require('./connection');
const fs = require('fs');
const path = require('path');

// Read SQL files
const dbDir = path.join(__dirname);
const createUsersSQL = fs.readFileSync(path.join(dbDir, 'create_users.sql'), 'utf8');
const createCarsSQL = fs.readFileSync(path.join(dbDir, 'create_cars.sql'), 'utf8');
const createMotSQL = fs.readFileSync(path.join(dbDir, 'create_mot.sql'), 'utf8');
const createTaxSQL = fs.readFileSync(path.join(dbDir, 'create_tax.sql'), 'utf8');
const createServicesSQL = fs.readFileSync(path.join(dbDir, 'create_services.sql'), 'utf8');


// Function to initialise the database schema
async function initialiseDatabase() {
  const client = await pool.connect();
  try {
    await client.query(createUsersSQL);
    await client.query(createCarsSQL);
    await client.query(createMotSQL);
    await client.query(createTaxSQL);
    await client.query(createServicesSQL);
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

// Export the initialiseDatabase function
module.exports = initialiseDatabase;

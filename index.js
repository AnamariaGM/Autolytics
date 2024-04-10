require('dotenv').config();

const initialiseDatabase = require('./db/setupTables');

// Call the initialiseDatabase function to initialise the database schema
initialiseDatabase()
  .then(() => {
    console.log('Database setup completed successfully');
  })
  .catch(error => {
    console.error('Error setting up database:', error);
  });
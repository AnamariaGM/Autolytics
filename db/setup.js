require('dotenv').config(); 
const { execSync } = require('child_process');

const setupDatabase = () => {
  const username = process.env.DB_USERNAME;
  const adminDatabase = process.env.DB_DATABASE;
  const database = process.env.PGDATABASE;

  // Command to check if the database exists
  const checkDatabaseCommand = `psql -U ${username} -d ${adminDatabase} -tAc "SELECT 1 FROM pg_database WHERE datname='${database}';"`;

  // Command to create the database
  const createDatabaseCommand = `psql -U ${username} -d ${adminDatabase} -c "CREATE DATABASE ${database};"`;

  try {
    // Check if the database exists
    console.log('Checking if the database exists...');
    const databaseExists = execSync(checkDatabaseCommand).toString().trim() === '1';
  
    if (!databaseExists) {
      // Create the database
      console.log('Creating the database...');
      execSync(createDatabaseCommand);
    }
  
    console.log('Database setup completed successfully.');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
};

setupDatabase();

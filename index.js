const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const UserModel = require('./models/userModel');
const UserController = require('./controllers/userController');
require('dotenv').config();


const app = express();
const port = 3000;

// console.log(`${process.env.PGDATABASE}`)
if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set!");
}
// Replace connection string with your PostgreSQL connection string
const pool = new Pool(
    {
  // database: `${process.env.PGDATABASE}`,
//   connectionString: 'your_postgresql_connection_string_here',
}
);

// Middleware
app.use(bodyParser.json());

// Models
const userModel = new UserModel(pool);

// Controllers
const userController = new UserController(userModel);

// Routes
app.post('/api/signup', userController.signup.bind(userController));
app.post('/api/login', userController.login.bind(userController));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

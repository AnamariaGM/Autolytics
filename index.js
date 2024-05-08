const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const UserModel = require('./models/userModel');
const UserController = require('./controllers/userController');
require('dotenv').config();
const session = require('express-session')


const app = express();
const port = 3000;


if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set!");
}
// Replace connection string with your PostgreSQL connection string
const pool = new Pool();

// Middleware
app.use(bodyParser.json());

// Session middleware
app.use(session({
  secret: 'my_secret_key', // Secret used to sign the session ID cookie
  resave: false, // Whether to save the session data if it hasn't been modified
  saveUninitialized: false, // Whether to save a new but uninitialized session
  cookie: { secure: false } // Options for the session cookie
}))

// Models
const userModel = new UserModel(pool);

// Controllers
const userController = new UserController(userModel);

// Routes
app.post('/api/signup', userController.signup.bind(userController));
app.post('/api/login', userController.login.bind(userController));

app.post('/api/user/:userId/cars', userController.addCar.bind(userController))
app.post('/api/user/:userId/cars/dvla',userController.addCarFromDVLA.bind(userController))

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

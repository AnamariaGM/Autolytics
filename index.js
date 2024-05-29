const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const UserModel = require('./models/userModel');
const UserController = require('./controllers/userController');
const CarController=require('./controllers/carController')
const CarModel=require('./models/carModel')
const cors = require('cors');
require('dotenv').config();
const session = require('express-session');

const app = express();
const port = 3001;

if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set!");
}

// Replace connection string with your PostgreSQL connection string
const pool = new Pool();

// Middleware
app.use(bodyParser.json());

// CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Session middleware
app.use(session({
  secret: 'my_secret_key', // Secret used to sign the session ID cookie
  resave: false, // Whether to save the session data if it hasn't been modified
  saveUninitialized: false, // Whether to save a new but uninitialized session
  cookie: { secure: false } // Options for the session cookie
}));

// Models
const userModel = new UserModel(pool);
const carModel= new CarModel(pool)
// Controllers
const userController = new UserController(userModel);
const carController = new CarController(carModel);


const ensureAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
// Routes
app.post('/api/signup', userController.signup.bind(userController));
app.post('/api/login', userController.login.bind(userController));
app.post('/api/logout', userController.logout.bind(userController))
app.get('/api/user', ensureAuthenticated, userController.getUser.bind(userController));
app.post('/api/user/:userId/cars', userController.addCar.bind(userController));
app.post('/api/user/:userId/cars/dvla', userController.addCarFromDVLA.bind(userController));

app.get('/api/user/:userId/cars', ensureAuthenticated, carController.getCarsByUserId.bind(carController));
app.delete('/api/user/:userId/cars/:carId',ensureAuthenticated, carController.deleteCar.bind(carController))
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

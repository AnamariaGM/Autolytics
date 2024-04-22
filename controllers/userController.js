const UserModel = require('../models/userModel');

class UserController {
  constructor(userModel) {
    // Check if an instance of UserModel already exists
    if (UserController.instance) {
      return UserController.instance
      // If not, create a new instance and store it as a static property
    }
    this.userModel=userModel
    UserController.instance=this

    // Return the instance
    return this;
  }

  async createUser(req, res) {
    // Implementation for creating a new user
  }

  async getUser(req, res) {
    // Implementation for retrieving a user
  }

  async updateUser(req, res) {
    // Implementation for updating a user
  }

  async deleteUser(req, res) {
    // Implementation for deleting a user
  }

  async signup(req, res) {
    // Logic for user signup

    try {
      // Extract user data from request body
      const { username, email, password } = req.body;

      const existingUser = await this.userModel.getUserByUsername(username);

      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Validate user data (e.g., check if fields are not empty)

      // Create user in the database
      const newUser = await this.userModel.createUser(username, email, password);

      // Send back a success response
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await this.getUserByUsername(username);

      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

// Export a single instance of UserController
module.exports = UserController

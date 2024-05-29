const UserModel = require("../models/userModel");
const { fetchCarDetailsFromDVLA } = require("../services/dvlaService");

class UserController {
  constructor(userModel) {
    // Check if an instance of UserModel already exists
    if (UserController.instance) {
      return UserController.instance;
      // If not, create a new instance and store it as a static property
    }
    this.userModel = userModel;
    UserController.instance = this;

    // Return the instance
    return this;
  }

  async getUser(req, res) {
    try {
      const userId = req.session.userId; // Retrieve user ID from session

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await this.userModel.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error("Error retrieving user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateUser(req, res) {
    // Implementation for updating a user
  }

  async deleteUser(req, res) {
    // Implementation for deleting a user
  }

  async signup(req, res) {
    try {
      // Extract user data from request body
      const { username, email, password } = req.body;

      const existingUser = await this.userModel.getUserByUsername(username);

      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Validate user data (e.g., check if fields are not empty)

      // Create user in the database
      const newUser = await this.userModel.createUser(
        username,
        email,
        password
      );

      // Send back a success response
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });

      // res.redirect('/login')
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async logout(req,res){
    req.session.destroy(err=>{
      if(err){
        return res.status(500).json({message: 'Failed to log out'})
      }
      res.clearCookie('connect.sid')
      return res.status(200).json({message:'Logged out successfully'})
    })
  }


  async login(req, res) {
    console.log(req.body);
    try {
      const { username, password } = req.body;
      console.log(username, password);
      let user;
      if (username.includes("@")) {
        user = await this.userModel.getUserByEmail(username);
      } else {
        user = await this.userModel.getUserByUsername(username);
      }

      if (!user || user.password !== password) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      req.session.user = user;
      req.session.userId = user.id;

      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async addCar(req, res) {
    try {
      // Check if the user is logged in
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userId = req.session.userId; // Retrieve user ID from the session

      const carDetails = req.body;
      console.log(carDetails)
      const newCar = await this.userModel.addCarToUser(userId, carDetails);
      res
        .status(201)
        .json({ message: "Car added to user successfully", car: newCar });
    } catch (error) {
      console.error("Error adding car to user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async addCarFromDVLA(req, res) {
    try {
      // Check if the user is logged in
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const { registrationNumber } = req.body;

      const userId = req.session.userId; // Retrieve user ID from the session

      // Check if the car already exists for the user
      const existingCar = await this.userModel.getCarByRegistrationNumber(
        userId,
        registrationNumber
      );
      if (existingCar) {
        return res.status(400).json({
          message:
            "Car with the same registration number already exists for the user",
        });
      }

      const carDetails = await this.dvlaService.fetchCarDetailsFromDVLA(
        registrationNumber
      );
      const newCar = await this.userModel.addCarToUser(userId, carDetails);

      res
        .status(201)
        .json({ message: "Car added from DVLA successfully", car: newCar });
    } catch (error) {
      console.error("Error adding car from DVLA:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

// Export a single instance of UserController
module.exports = UserController;

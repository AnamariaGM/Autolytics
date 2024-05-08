const database = require("../db/connection");

class UserModel {
  constructor() {
    this.database = database;
  }

  // Methods for CRUD operations related to user records

  async getUser(id) {
    // Implementation for retrieving a user record from the database
  }

  async updateUser(id, newData) {
    // Implementation for updating a user record in the database
  }

  async deleteUser(id) {
    // Implementation for deleting a user record from the database
  }

  async createUser(username, email, password) {
    console.log(this.database);
    try {
      const query =
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";
      const newUser = await this.database.query(query, [
        username,
        email,
        password,
      ]);
      return newUser.rows[0];
    } catch (error) {
      throw new Error("Error creating user");
    }
  }

  async getUserByUsername(username) {
    try {
      const query = "SELECT * FROM users WHERE username = $1";
      const user = await this.database.query(query, [username]);
      return user.rows[0];
    } catch (error) {
      throw new Error("Error retrieving user");
    }
  }

  async addCarToUser(userId, carDetails) {
    console.log("##### in the addcaruser model");
    try {
      const {
        registration_number,
        make,
        year,
        fuel_type,
        colour,
        engine_capacity,
      } = carDetails;

      const query = `
            INSERT INTO cars (user_id, registration_number, make, year, fuel_type, colour, engine_capacity)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
          `;
      const result = await this.database.query(query, [
        userId,
        registration_number,
        make,
        year,
        fuel_type,
        colour,
        engine_capacity,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error("Error adding car to user");
    }
  }
  async getCarByRegistrationNumber(userId, registrationNumber) {
    try {
      const query =
        "SELECT * FROM cars WHERE user_id = $1 AND registration_number=$2";
      const result = await this.database.query(query, [
        userId,
        registrationNumber,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error("Error retrieving car by registration number");
    }
  }
}

module.exports = UserModel;

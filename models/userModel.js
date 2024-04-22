const database= require('../db/connection')

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
        console.log('inside createuser model')
        console.log(this.database)
        try {
          const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
          const newUser = await this.database.query(query, [username, email, password]);
          return newUser.rows[0];
      } catch (error) {
          throw new Error('Error creating user');
      }
      }
    
      async getUserByUsername(username) {
        try {
          const query = 'SELECT * FROM users WHERE username = $1';
          const user = await this.database.query(query, [username]);
          return user.rows[0];
        } catch (error) {
          throw new Error('Error retrieving user');
        }
      }
  }
  
  module.exports = UserModel;
  
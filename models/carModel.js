class CarModel {
  constructor(database) {
    this.database = database;
  }

  async getCarsByUserId(userId) {
    try {
      const result = await this.database.query(
        "SELECT * FROM cars WHERE user_id = $1",
        [userId]
      );
      return result.rows;
    } catch (error) {
      throw new Error("Error fetching cars");
    }
  }

  // Methods for CRUD operations related to car records
  createCar(data) {
    // Implementation for creating a new car record in the database
  }

  getCar(id) {
    // Implementation for retrieving a car record from the database
  }

  updateCar(id, newData) {
    // Implementation for updating a car record in the database
  }

  async deleteCar(user_id, id) {
    try {
        const result = await this.database.query(
            "DELETE FROM cars WHERE user_id = $1 AND id = $2 RETURNING *",
            [user_id, id]
        );

        if (result.rows.length === 0) {
            throw new Error("Car not found for the specified user");
        }

        return result.rows[0]; // Return the deleted car
    } catch (error) {
        throw new Error(`Error deleting car: ${error.message}`);
    }
}
}

module.exports = CarModel;

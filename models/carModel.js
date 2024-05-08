class CarModel {
    constructor(database) {
      this.database = database;
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
  
    deleteCar(id) {
      // Implementation for deleting a car record from the database
    }

    async createCar(registrationNumber, make, model, year, fuelType, colour, engineCapacity, username){
      try{
        const query = 'INSERT INTO cars'()
      }
    }
  }
  
  module.exports = CarModel;
  
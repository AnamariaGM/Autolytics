const carModel = require("../models/carModel");

class CarController {
    constructor(carModel) {
        this.carModel = carModel;
    }

    async getCarsByUserId(req, res) {
      try {
        const userId = req.params.userId;
        const carsData = await this.carModel.getCarsByUserId(userId);
        res.json(carsData);
      } catch (error) {
        console.error('Error fetching cars by user ID:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }

    async getCar(req, res) {
        try {
            // Implementation for retrieving a car
        } catch (error) {
            console.error('Error fetching car:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateCar(req, res) {
        try {
            // Implementation for updating a car
        } catch (error) {
            console.error('Error updating car:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteCar(req, res) {
        const { userId, carId } = req.params;

        try {
            const deletedCar = await this.carModel.deleteCar(userId, carId);

            res.status(200).json({
                message: 'Car successfully deleted',
                car: deletedCar
            });
        } catch (error) {
            console.error('Error deleting car:', error);
            res.status(500).json({ message: 'Internal server error' });
        }}
}

module.exports = CarController;

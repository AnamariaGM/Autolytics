const axios=require('axios')
require('dotenv').config();


async function fetchCarDetailsFromDVLA(registrationNumber){
    try{
      const response = await axios.post('https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles',{
        registrationNumber:registrationNumber
      },{
        headers:{
          'x-api-key': process.env.X_API_KEY, 
          'Content-Type': 'application/json'
        }
      }
      )
  
      const responseData = response.data
      const carDetails={registration_number:responseData.registrationNumber, make:responseData.make,year:responseData.yearOfManufacture, fuel_type:responseData.fuelType, colour:responseData.colour, engine_capacity:responseData.engineCapacity, mot_status:responseData.motStatus,
      tax_status:responseData.taxStatus,
      tax_due_date:responseData.taxDueDate
      }
      console.log(carDetails)
      return carDetails
    }catch(error){
      console.error('Error fetching car details from DVLA:', error)
      throw new Error('Failed to fetch car details from DVLA')
    }
    
  }

  module.exports  = {fetchCarDetailsFromDVLA}
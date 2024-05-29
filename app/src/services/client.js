import axios from 'axios';



const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true // Send cookies with each request
});


const getAuthConfig = () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const getCustomers = async () => {
  try {
    return await axiosInstance.get('/api/user', getAuthConfig());
  } catch (e) {
    throw e;
  }
};

export const saveCustomer = async (customer) => {
  try {
    return await axiosInstance.post('/api/user', customer);
  } catch (e) {
    throw e;
  }
};

export const updateCustomer = async (userId, update) => {
  try {
    return await axiosInstance.put(`/api/user/${userId}`, update, getAuthConfig());
  } catch (e) {
    throw e;
  }
};

export const deleteCustomer = async (userId) => {
  try {
    return await axiosInstance.delete(`/api/user/${userId}`, getAuthConfig());
  } catch (e) {
    throw e;
  }
};

export const login = async (usernameAndPassword) => {
  try {
    return await axiosInstance.post('/api/login', usernameAndPassword);
  } catch (e) {
    throw e;
  }
};

export const logout = async () => {
  try {
    return await axiosInstance.post('/api/logout');
  } catch (e) {
    throw e;
  }
};


export const uploadCustomerProfilePicture = async (userId, formData) => {
  try {
    return axiosInstance.post(`/api/user/${userId}/profile-image`, formData, {
      ...getAuthConfig(),
      'Content-Type': 'multipart/form-data'
    });
  } catch (e) {
    throw e;
  }
};

export const customerProfilePicture = (userId) =>
  `${import.meta.env.VITE_API_BASE_URL}/api/user/${userId}/profile-image`;

export const getCars = async (userId) => {

  try {
    return await axiosInstance.get(`/api/user/${userId}/cars`);
  } catch (e) {
    throw e;
  }
};

export const saveCar = async (userId, car) => {
  console.log(car)
  try {
    return await axiosInstance.post(`/api/user/${userId}/cars`, car);
  } catch (e) {
    throw e;
  }
};

export const deleteCar = async (userId, carId) => {
  try {
    return await axiosInstance.delete(`/api/user/${userId}/cars/${carId}`, getAuthConfig());
  } catch (e) {
    throw e;
  }
};

export const updateCar = async (userId, carId) => {
  try {
    return await axiosInstance.put(`/api/user/${userId}/cars/${carId}`, update, getAuthConfig());
  } catch (e) {
    throw e;
  }
};

export const carProfilePicture = (userId, carId) =>
  `${import.meta.env.VITE_API_BASE_URL}/api/${userId}/cars/${carId}/image`;

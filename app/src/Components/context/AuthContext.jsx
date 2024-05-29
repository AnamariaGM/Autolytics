import { createContext, useContext, useEffect, useState } from "react";
import { getCustomers, login as performLogin, logout as performLogout } from "../../services/client.js";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);


  const fetchCustomer = async () => {
    try {
      const response = await getCustomers(); // Adjust to get the current user endpoint
      setCustomer(response.data);
    } catch (error) {
      console.error("Failed to fetch customer", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchCustomer();
    }
  }, []);

  const login = async (usernameAndPassword) => {
    console.log("inside login function from AuthContext");
    try {
      const res = await performLogin(usernameAndPassword);
      const token = res.data.token;
      localStorage.setItem('access_token', token); // Store token in localStorage
      await fetchCustomer(); // Fetch customer data after successful login
      return res;
    } catch (err) {
      throw err;
    }
  };

  const logOut = async () => {
    try {
      await performLogout(); // Call the logout function from client.js
      localStorage.removeItem('access_token');
      setCustomer(null);
      // navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };


  const isCustomerAuthenticated = () => {
    return customer !== null;
  };

  return (
    <AuthContext.Provider
      value={{
        customer,
        login,
        logOut,
        isCustomerAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

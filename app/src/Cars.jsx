import { Wrap, WrapItem, Spinner, Text } from "@chakra-ui/react";
import SidebarWithHeader from "./Components/shared/SideBar.jsx";
import { useEffect, useState } from "react";
import { getCars } from "./services/client.js";
import CardWithImage from "../src/Components/customer/CarCard.jsx";
import CreateCarDrawer from "./Components/customer/CreateCarsDrawer.jsx";
import { errorNotification } from "./services/notification.js";
import { useAuth } from "./Components/context/AuthContext.jsx";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");
  const { customer } = useAuth();

  const userId = customer ? customer.user.id : null;

  const fetchCars = () => {
    setLoading(true);
    getCars(userId)
      .then((res) => {
        console.log('Response from getCars:', res.data);
        if (Array.isArray(res.data)) {
          setCars(res.data);
        } else if (res.data && typeof res.data === 'object') {
          setCars([res.data]);  // Wrap the single car object in an array
        } else {
          console.error('Unexpected response format:', res.data);
          setCars([]);  // Default to an empty array
        }
      })
      .catch((err) => {
        setError(err.response ? err.response.data.message : 'An error occurred');
        errorNotification(err.code, err.response ? err.response.data.message : 'An error occurred');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (userId) {
      fetchCars(userId);
    }
  }, [userId]);

  if (loading) {
    return (
      <SidebarWithHeader>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </SidebarWithHeader>
    );
  }

  if (err) {
    return (
      <SidebarWithHeader>
        <CreateCarDrawer fetchCars={fetchCars} />
        <Text mt={5}>Ooops there was an error</Text>
      </SidebarWithHeader>
    );
  }

  if (cars.length <= 0) {
    return (
      <SidebarWithHeader>
        <CreateCarDrawer fetchCars={fetchCars} />
        <Text mt={5}>No cars available</Text>
      </SidebarWithHeader>
    );
  }

  return (
    <SidebarWithHeader>
      <CreateCarDrawer fetchCars={fetchCars} />
      <Wrap justify={"center"} spacing={"30px"}>
        {cars.map((car, index) => (
          <WrapItem key={index}>
            <CardWithImage {...car} imageNumber={index} fetchCars={fetchCars} />
          </WrapItem>
        ))}
      </Wrap>
    </SidebarWithHeader>
  );
};

export default Cars;

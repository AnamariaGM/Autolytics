import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import CarAvatar from "./CarAvatar.jsx";

import { useRef } from "react";
import { carProfilePicture, deleteCar } from "../../services/client.js";
import {
  errorNotification,
  successNotification,
} from "../../services/notification.js";
import UpdateCarsDrawer from "./UpdateCarsDrawer.jsx";
import Dashboard from "../../Assets/dashboard.png";
import { useAuth } from "../context/AuthContext.jsx";

export default function CardWithImage({
  id,
  make,
  registration_number,
  imageNumber,
  fetchCars,
}) {

  const { customer } = useAuth()
  const userId = customer ? customer.user.id : null
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <Center py={6}>
      <Box
        maxW={"300px"}
        minW={"300px"}
        w={"full"}
        m={2}
        bg="rgba(255, 255, 255, 0.1)"
        boxShadow={"lg"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          filter="brightness(0.6) sepia(0.8) hue-rotate(140deg) saturate(2)"
          h={"200px"}
          w={"full"}
          src={Dashboard}
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <CarAvatar imageSrc={carProfilePicture(id)} />
        </Flex>

        <Box p={6}>
          <Stack spacing={2} align={"center"} mb={5}>
            {/* <Tag borderRadius={"full"}>{id}</Tag> */}
            <Heading
              color={"white"}
              fontSize={"2xl"}
              fontWeight={500}
              fontFamily={"body"}
            >
              {make}
            </Heading>
            <Text color={"gray.500"}>{registration_number}</Text>
          </Stack>
        </Box>
        <Stack direction={"row"} justify={"center"} spacing={6} p={4}>
          <Stack>
            <UpdateCarsDrawer
              initialValues={{ make, registration_number }}
              carId={id}
              fetchCars={fetchCars}
            />
          </Stack>
          <Stack>
            <Button
              bg={"red.400"}
              color={"white"}
              rounded={"full"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              _focus={{
                bg: "green.500",
              }}
              onClick={onOpen}
            >
              Delete
            </Button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Car
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure you want to delete {make}? You can't undo this
                    action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        deleteCar(userId, id)
                          .then((res) => {
                            console.log(res);
                            successNotification(
                              "Car deleted",
                              `${make} was successfully deleted`
                            );
                            fetchCars();
                          })
                          .catch((err) => {
                            console.log(err);
                            errorNotification(
                              err.code,
                              err.response.data.message
                            );
                          })
                          .finally(() => {
                            onClose();
                          });
                      }}
                      ml={3}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}

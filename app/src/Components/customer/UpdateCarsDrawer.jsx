import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import UpdateCarForm from "./UpdateCarForm";

const CloseIcon = () => "x";

const UpdateCarsDrawer = ({ fetchCars, initialValues, userId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        bg={"gray.200"}
        color={"black"}
        rounded={"full"}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
        }}
        onClick={onOpen}
      >
        Update
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Update car</DrawerHeader>

          <DrawerBody>
            <UpdateCarForm
              fetchCars={fetchCars}
              initialValues={initialValues}
              userId={userId}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button
              leftIcon={<CloseIcon />}
              colorScheme={"teal"}
              onClick={onClose}
            >
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UpdateCarsDrawer;

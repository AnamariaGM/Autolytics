import { Form, Formik, useField } from "formik";
import * as Yup from "yup";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormLabel,
  Image,
  Input,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { carProfilePicture, updateCar } from "../../services/client.js";
import {
  errorNotification,
  successNotification,
} from "../../services/notification.js";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <Box>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <Input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <Alert className="error" status={"error"} mt={2}>
          <AlertIcon />
          {meta.error}
        </Alert>
      ) : null}
    </Box>
  );
};

// And now we can use these
const UpdateCarForm = ({ fetchCars, initialValues, carId }) => {
  return (
    <>
      <VStack spacing={"5"} mb={"5"}>
        <Image
          borderRadius={"full"}
          boxSize={"150px"}
          objectFit={"cover"}
          src={carProfilePicture(carId)}
        />
      </VStack>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          make: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          model: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          year: Yup.number()
            .min(1886, "Must be a valid year")
            .max(new Date().getFullYear(), "Cannot be a future year")
            .required("Required"),
          registrationNumber: Yup.string()
            .max(10, "Must be 10 characters or less")
            .required("Required"),
        })}
        onSubmit={(updatedCar, { setSubmitting }) => {
          setSubmitting(true);
          updateCar(carId, updatedCar)
            .then((res) => {
              console.log(res);
              successNotification(
                "Car updated",
                `${updatedCar.make} was successfully updated`
              );
              fetchCars();
            })
            .catch((err) => {
              console.log(err);
              errorNotification(err.code, err.response.data.message);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isValid, isSubmitting, dirty }) => (
          <Form>
            <Stack spacing={"24px"}>
              <MyTextInput
                label="Make"
                name="make"
                type="text"
                placeholder="Toyota"
              />

              <MyTextInput
                label="Model"
                name="model"
                type="text"
                placeholder="Camry"
              />

              <MyTextInput
                label="Year"
                name="year"
                type="number"
                placeholder="2020"
              />

              <MyTextInput
                label="Registration Number"
                name="registrationNumber"
                type="text"
                placeholder="ABC123"
              />

              <Button
                disabled={!(isValid && dirty) || isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UpdateCarForm;

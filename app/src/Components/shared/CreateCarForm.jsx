import { Form, Formik, useField } from "formik";
import * as Yup from "yup";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { saveCar } from "../../services/client.js";
import {
  successNotification,
  errorNotification,
} from "../../services/notification.js";
import { useAuth } from "../context/AuthContext.jsx";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Box>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <Input
        id={props.id || props.name}
        className="text-input"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Alert className="error" status={"error"} mt={2}>
          <AlertIcon />
          {meta.error}
        </Alert>
      ) : null}
    </Box>
  );
};

const CreateCarForm = ({ onSuccess }) => {
  const { customer } = useAuth();

  const userId = customer ? customer.user.id : null;
  return (
    <>
      <Formik
        initialValues={{
          make: "",
          fuel_type: "",
          year: 0,
          registration_number: "",
          colour: "",
          engine_capacity: "",
          useDVLA: false,
        }}
        validationSchema={Yup.object({
          make: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          fuel_type: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          colour: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          engine_capacity: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          year: Yup.number()
            .min(1886, "Must be a valid year")
            .max(new Date().getFullYear(), "Cannot be a future year")
            .required("Required"),
          registration_number: Yup.string().test(
            "conditional-validation",
            "Invalid registration number",
            function (value) {
              const useDVLA = this.parent.useDVLA;
              if (!useDVLA) {
                return Yup.string()
                  .max(10, "Must be 10 characters or less")
                  .validateSync(value, { abortEarly: false });
              } else {
                return Yup.string()
                  .required("Required")
                  .validateSync(value, { abortEarly: false });
              }
            }
          ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          saveCar(userId, values)
            .then(() => {
              successNotification(
                "Car saved",
                "Car details saved successfully"
              );
              onSuccess();
            })
            .catch((error) => {
              console.error("Error saving car:", error);
              errorNotification(
                "Error saving car",
                "An error occurred while saving car details"
              );
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isValid, isSubmitting, values, setFieldValue }) => (
          <Form>
            <Stack spacing={"24px"}>
              <FormControl>
                <Checkbox
                  id="useDVLA"
                  name="useDVLA"
                  checked={values.useDVLA}
                  onChange={(e) => {
                    setFieldValue("useDVLA", e.target.checked);
                  }}
                >
                  Use DVLA API
                </Checkbox>
              </FormControl>

              {!values.useDVLA && (
                <>
                  <MyTextInput
                    label="Make"
                    name="make"
                    type="text"
                    placeholder="Toyota"
                  />

                  <MyTextInput
                    label="Fuel Type"
                    name="fuel_type"
                    type="text"
                    placeholder="Diesel"
                  />

                  <MyTextInput
                    label="Year"
                    name="year"
                    type="number"
                    placeholder="2020"
                  />

                  <MyTextInput
                    label="Color"
                    name="colour"
                    type="string"
                    placeholder="Black"
                  />

                  <MyTextInput
                    label="Engine Capacity"
                    name="engine_capacity"
                    type="number"
                    placeholder="2020"
                  />
                </>
              )}

              <MyTextInput
                label="Registration Number"
                name="registration_number"
                type="text"
                placeholder="ABC123"
              />

              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                mt="4"
                colorScheme="teal"
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

export default CreateCarForm;

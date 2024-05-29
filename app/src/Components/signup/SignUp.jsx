import { useAuth } from "../../Components/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Box,
  Input,
  Alert,
  AlertIcon,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import carHeadlights from "../../Assets/car-headlights.jpg";
import Logo from "../../Assets/Logo.png";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Box>
      <FormLabel htmlFor={props.id || props.name} color="white">
        {label}
      </FormLabel>
      <Input
        {...field}
        {...props}
        borderBottom="2px solid rgba(255, 255, 255, 0.6)"
        borderTop="none"
        borderLeft="none"
        borderRight="none"
        borderRadius={0}
        _focus={{ borderBottomColor: "white" }}
      />
      {meta.touched && meta.error ? (
        <Alert className="error" status="error" mt={2}>
          <AlertIcon />
          {meta.error}
        </Alert>
      ) : null}
    </Box>
  );
};

const CustomCreateCustomerForm = ({ onSuccess }) => {
  return (
<Formik
  initialValues={{
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  }}
  validationSchema={Yup.object({
    username: Yup.string()
      .email("Must be valid email")
      .required("Username is required"),
    email: Yup.string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: Yup.string()
      .max(20, "Password cannot be more than 20 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  })}
  onSubmit={(values, { setSubmitting }) => {
    setSubmitting(true);
    // Mocking the signup process
    setTimeout(() => {
      const token = "mockToken123"; // Mock token
      onSuccess(token);
      setSubmitting(false);
    }, 1000);
  }}
>
  {({ isValid, isSubmitting }) => (
    <Form>
      <Stack mt={15} spacing={15}>
        <MyTextInput
          label="Username"
          name="username"
          type="text"
          placeholder="Username"
        />
        <MyTextInput
          label="Email"
          name="email"
          type="email"
          placeholder="email@gmail.com"
        />
        <MyTextInput
          label="Password"
          name="password"
          type="password"
          placeholder="Type your password"
        />
        <MyTextInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
        />
        <Button
          type="submit"
          variant="outline"
          colorScheme="whiteAlpha"
          borderColor="white"
          color="whiteAlpha.800"
          disabled={!isValid || isSubmitting}
        >
          SIGN UP
        </Button>
      </Stack>
    </Form>
  )}
</Formik>
  );
};

const Signup = () => {
  const { customer, setCustomerFromToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (customer) {
      navigate("/dashboard/customers");
    }
  }, [customer, navigate]);

  return (
    <Flex
      minH="100vh"
      position="relative"
      align="center"
      justify="flex-end"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(${carHeadlights})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        filter: "brightness(0.5) sepia(0.7) hue-rotate(120deg) saturate(3)",
        zIndex: -1,
      }}
    >
      <Flex
        width={{ base: "100%", md: "50%", lg: "40%" }}
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(10px) hue-rotate(200deg)"
        p={55}
        borderRadius="md"
        boxShadow="lg"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        ml="auto"
        m={7}
      >
        <Stack spacing={3} w="full" maxW="md">
          <Image
            src={Logo}
            boxSize="200px"
            alt="Logo"
            alignSelf="center"
            filter="brightness(0.7) sepia(1) hue-rotate(130deg) saturate(4)"
          />
          <Heading fontSize="2xl" mb={4} color={"whiteAlpha.800"}>
            Register for an account
          </Heading>
          <CustomCreateCustomerForm
            onSuccess={(token) => {
              localStorage.setItem("access_token", token);
              setCustomerFromToken(token);
              navigate("/dashboard");
            }}
          />
          <Link
            color="rgb(60, 140, 155)"
            filter="saturate(2) brightness(0.9)"
            href="/"
          >
            Have an account? Login now.
          </Link>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Signup;

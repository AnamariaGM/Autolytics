import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import carHeadlights from "../../Assets/car-headlights.jpg";
import Logo from "../../Assets/Logo.png";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext.jsx";
import { errorNotification } from "../../services/notification.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <Box>
      <FormLabel htmlFor={props.id || props.name} color={"white"}>
        {label}
      </FormLabel>
      <Input
        className="text-input"
        {...field}
        {...props}
        borderBottom="2px solid rgba(255,255,255, 0.6)"
        borderTop="none"
        borderLeft="none"
        borderRight="none"
        borderRadius={0}
        _focus={{ borderBottomColor: "white" }}
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

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <Formik
      validateOnMount={true}
      validationSchema={Yup.object({
        username: Yup.string()
          // .email("Must be valid email")
          .required("Username or Email is required"),
        password: Yup.string()
          .max(20, "Password cannot be more than 20 characters")
          .required("Password is required"),
      })}
      initialValues={{ username: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        login(values)
          .then((res) => {
            navigate("/dashboard");
            console.log("Successfully logged in");
          })
          .catch((err) => {
            errorNotification(err.code, err.response.data.message);
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ isValid, isSubmitting }) => (
        <Form>
          <Stack mt={15} spacing={15}>
            <MyTextInput
              label={"Username or Email"}
              name={"username"}
              type={"email"}
              placeholder={"Username or email"}
              color={"white"}
            />
            <MyTextInput
              label={"Password"}
              name={"password"}
              type={"password"}
              color={"white"}
              placeholder={"Type your password"}
            />

            <Button
              type={"submit"}
              variant="outline"
              colorScheme="whiteAlpha"
              borderColor="white"
              color="whiteAlpha.800"
              disabled={!isValid || isSubmitting}
            >
              LOGIN
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

const Login = () => {
  const { customer } = useAuth();
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
        p={50}
        borderRadius="md"
        boxShadow="lg"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        ml="auto"
        m={7}
      >
        <Stack spacing={4} w="full" maxW="md">
          <Image
            src={Logo}
            boxSize="250px"
            alt=""
            alignSelf="center"
            filter="brightness(0.7) sepia(1) hue-rotate(130deg) saturate(4)"
          />
          <Heading fontSize="2xl" mb={4} color={"whiteAlpha.800"}>
            Sign in to your account
          </Heading>
          <LoginForm />
          <Link
            color="rgb(60, 140, 155)"
            filter="saturate(2) brightness(0.9)"
            href="/signup"
          >
            Don't have an account? Signup now.
          </Link>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Login;

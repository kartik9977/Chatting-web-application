import React, { useState } from "react";
import { InputRightElement, VStack } from "@chakra-ui/react";
import { Input, InputGroup } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Box, Link } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
// import { set } from "mongoose";

const Login = () => {
  const [show, setShow] = useState(false);
  // const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleClick = () => setShow(!show);

  const handlerForgotClick = () => {
    setShowForgotPassword(true);
  };
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        description: "Warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Login Successful",
        description: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing="5px" color="black">
      {showForgotPassword ? (
        <ForgotPassword />
      ) : (
        <>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter Your Email "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={show ? " text" : "password"}
                placeholder="Enter Your Password "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {/* <Flex textAlign="left" mt={2}> */}
          <Box padding="0 350px 0 0" mt={2}>
            <Link color="teal.500" onClick={handlerForgotClick}>
              Forgot Password?
            </Link>
          </Box>
          {/* </Flex> */}

          <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={loading}
          >
            Login
          </Button>

          <Button
            variant="solid"
            colorScheme="red"
            width="100%"
            // style={{ marginTop: 15 }}
            onClick={() => {
              setEmail("guest@gmail.com");
              setPassword("123456");
            }}
          >
            Get Guest Userr Credentials!
          </Button>
        </>
      )}
    </VStack>
  );
};

export default Login;

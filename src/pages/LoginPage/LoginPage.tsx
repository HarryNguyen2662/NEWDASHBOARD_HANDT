import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import styles from "./LoginPage.module.css";
import logo from "../../assets/CW3-logo-2.png";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

import {
  useToast,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  Text,
  Link,
  Box,
  IconButton,
} from "@chakra-ui/react";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const loginResult = await login(email, password);

      if (loginResult.success) {
        toast({
          title: "Login Sucessful",
          status: "success",
          position: "bottom-right",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
      } else {
        toast({
          title: "Login failed",
          description: loginResult.message,
          status: "error",
          position: "bottom-right",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Login failed.",
        description: (error as Error).message,
        status: "error",
        position: "bottom-right",
        duration: 5000,
        isClosable: true,
      });
    } 
  
  };

  const toast = useToast();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  

  return (
    <Box className={styles.pageContainer}>
      <div className={styles.mainContainer}>
        <img src={logo} alt="CW3 Logo" className={styles.logoImg} />
        <Heading paddingTop={"2%"}>Welcome back!</Heading>
        <form>
          <div className={styles.infoContainer}>
            <div>
              <Text
                as="label"
                htmlFor="email"
                marginTop={5}
                display="block"
                textAlign="left"
              >
                Email *
              </Text>
              <Input
                type="email"
                isRequired
                backgroundColor={"#121212"}
                focusBorderColor="#4900BC"
                placeholder="Enter email address"
                size="md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Text
                as="label"
                htmlFor="password"
                marginTop={6}
                display="block"
                textAlign="left"
              >
                Password *
              </Text>
              <InputGroup size="md" width="38rem" paddingBottom={4}>
                <Input
                  // pr="4.5rem"
                  type={show ? "text" : "password"}
                  isRequired
                  backgroundColor={"#121212"}
                  focusBorderColor="#4900BC"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    size="md"
                    aria-label={show ? "hide" : "show"}
                    icon={
                      show ? (
                        <ViewOffIcon w={5} h={5} />
                      ) : (
                        <ViewIcon w={5} h={5} />
                      )
                    }
                    onClick={handleClick}
                    variant="link"
                    colorScheme="gray"
                    position="absolute"
                    right="2"
                    top="50%"
                    transform="translateY(-50%)"
                    _hover={{ stroke: "#F7F7F7" }}
                  />
                </InputRightElement>
              </InputGroup>
            </div>
            <Box display={"block"} textAlign={"right"}>
              {/* TODO: link to password reset page */}
              <Link href={"/request-password-reset"} paddingRight={3}>
                Forgot password?
              </Link>
            </Box>
          </div>
          <div className={styles.buttons}>
            <Button
              type="button"
              marginTop={4}
              onClick={() => {
                handleLogin();
                
              }}
            >
              Log in
            </Button>
          </div>
          <div className={styles.subtext}>
            <Text>Don't have an account?</Text>
            <Link href={"/register"} paddingLeft={2}>
              Register here.
            </Link>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default LoginPage;

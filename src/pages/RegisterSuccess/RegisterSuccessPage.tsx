import React from "react";
import { Button, SimpleGrid, Text } from "@chakra-ui/react";
import styles from "./RegisterSuccessPage.module.css";
import logo from "../../assets/CW3-logo-2.png";
import { Link } from "react-router-dom";

export const RegisterSuccessPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.successCard}>
        <img src={logo} alt="CW3 Logo" className={styles.logoImg} />
        <Text fontSize="5xl">Congratulations.{"\n"}You're all set!</Text>
        <Text whiteSpace="pre-line" lineHeight={5}>
          Thank you for creating your account and providing your details. <br />
          Our team will review your information and authorize your access.
          <br />
          Please check your email for updates.
        </Text>
        <Link to={"/login"} className={styles.w100}>
          <SimpleGrid width={"100%"} margin={"36px 0 0 0"}>
            <Button size="lg" color={"black"}>
              Log in now
            </Button>
          </SimpleGrid>
        </Link>
      </div>
    </div>
  );
};

export default RegisterSuccessPage;

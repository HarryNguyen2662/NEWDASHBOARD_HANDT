import React from "react";
import {
  Box,
  Text,
  Heading,
  // Button,
  Badge,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";

interface MemberCardProps {
  name: string;
  title: string;
  location: string;
  interests: string[];
  memberId: string;
}

const MemberCard: React.FC<MemberCardProps> = ({
  name,
  title,
  location,
  interests,
  memberId,
}) => {
  const handleConnectClick = () => {
    window.location.href = `/members/${memberId}`;
  };

  return (
    <Box
      bg="#121212"
      p={4}
      borderRadius="8px"
      width="100%"
      height="100%"
      textAlign="left"
      display="flex"
      flexDirection="column"
      alignItems="start"
      border="1px solid #4C4C4C"
      _hover={{ cursor: "pointer" }}
      onClick={handleConnectClick}
    >
      <Heading size="md" mb={3} color="#F7F7F7">
        {name}
      </Heading>
      <Flex align="center" mb={1}>
        <Icon as={FaBriefcase} mr={2} color="#4C4C4C" />
        <Text color="#CBCBCB">{title}</Text>
      </Flex>
      <Flex align="center" mb="16px">
        <Icon as={FaMapMarkerAlt} mr={2} color="#4C4C4C" />
        <Text color="#CBCBCB">{location}</Text>
      </Flex>
      <Flex wrap="wrap" mb={4}>
        {interests.slice(0, 10).map((interest) => (
          <Badge
            key={interest}
            mr={2}
            mb={2}
            color="#A8D0FF"
            bg="#313F72"
            borderRadius="3xl"
            px="10px"
            py="4px"
            size="sm"
          >
            {interest}
          </Badge>
        ))}
      </Flex>
      {/* <Button
        mt="auto"
        width="100%"
        sx={{
          bg: "#FFA300",
          color: "black",
          fontSize: "14px",
          borderRadius: "10px",
          p: "12px 24px",
        }}
        onClick={handleConnectClick}
      >
        Connect
      </Button> */}
    </Box>
  );
};

export default MemberCard;

import React from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Badge,
  Button,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

const ProjectPage = () => {
  const { projectId } = useParams();
  const textColor = "#f7f7f7";
  const bgColor = "black";
  const dateColor = "#4c4c4c";

  // Simulating project data fetching
  const project = {
    id: "new-project",
    dateCreated: "July 19, 2024",
    name: "Project Name",
    company: "Company Name",
    type: "Project Type",
    serviceArea: "Tokencomics",
    advice: "One-Time Advice",
    revenue: "Cash",
    upToAmount: "$600",
    timeline: "6 weeks",
    provider: "Jane Doe",
    description:
      "Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut. Non, amet, aliquet scelerisque nullam sagittis, pulvinar. Fermentum scelerisque sit consectetur hac mi. Mollis leo eleifend ultricies purus iaculis.Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut. Non, amet, aliquet scelerisque nullam sagittis, pulvinar. Fermentum scelerisque sit consectetur hac mi. Mollis leo eleifend ultricies purus iaculis.Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut. Non, amet, aliquet scelerisque nullam sagittis, pulvinar. Fermentum scelerisque sit consectetur hac mi. ",
  };

  // Match the projectId to the simulated data
  if (projectId !== project.id) {
    return <Text>Project not found</Text>;
  }

  return (
    <Box p={4} minHeight="100vh" bg={bgColor} color={textColor}>
      <Box mb={4}>
        <Link to="/projects">
          <Button
            variant="link"
            color={dateColor}
            fontSize="18px"
            fontWeight="400"
          >
            Back
          </Button>
        </Link>
      </Box>
      <Box>
        <Text mb={2} color={dateColor}>
          {project.dateCreated}
        </Text>
        <Heading as="h1" mb={2}>
          {project.name}
        </Heading>
        <Text fontSize="24px" mb={4}>
          {project.company}
        </Text>
        <Flex alignItems="center" justifyContent="space-between" pb={3}>
          <Flex gap={2}>
            <Badge
              colorScheme="blue"
              py={3}
              px={4}
              borderRadius="full"
              fontSize="14px"
            >
              {project.type}
            </Badge>
            <Badge
              colorScheme="purple"
              py={3}
              px={4}
              borderRadius="full"
              fontSize="14px"
            >
              {project.serviceArea}
            </Badge>
            <Badge
              colorScheme="pink"
              py={3}
              px={4}
              borderRadius="full"
              fontSize="14px"
            >
              {project.advice}
            </Badge>
            <Badge
              colorScheme="yellow"
              py={3}
              px={4}
              borderRadius="full"
              fontSize="14px"
            >
              {project.revenue}
            </Badge>
          </Flex>
          <Button
            bgColor="#ffa300"
            color="black"
            fontSize="18px"
            fontWeight="400"
            width="354px"
            pl={4}
            pr={4}
            pt={7}
            pb={7}
            borderRadius="10px"
          >
            In Progress
          </Button>
        </Flex>
        <Box borderBottom="1px" borderColor={dateColor} py={2} />
        <Box mb={4}>
          <Heading
            as="h2"
            size="md"
            mt={5}
            mb={4}
            fontSize="24px"
            fontWeight="700"
          >
            About Business
          </Heading>
          <Text mb={4} fontSize={16}>
            {project.description}
          </Text>
        </Box>
        <Button
          mb={6}
          borderRadius="10px"
          p={9}
          bg={dateColor}
          width="300px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontWeight={4}>Whitepaper.pdf</Text>
          <IconButton
            icon={<FiDownload />}
            aria-label="Download Whitepaper"
            colorScheme="transparent"
          />
        </Button>
        <Box>
          <Heading as="h2" size="md" mb={4} fontSize="24px" fontWeight="700">
            Project Details
          </Heading>
          <Text mb={4} fontSize={16}>
            {project.description}
          </Text>
          <Box p={4} borderRadius="10px" bg="#121212">
            <Flex justify="space-between" mb={4}>
              <Box width="30%">
                <Text fontSize={16}>Service Area</Text>
                <Text fontSize={16} fontWeight="bold">
                  {project.serviceArea}
                </Text>
              </Box>
              <Box width="30%">
                <Text fontSize={16}>Timeline</Text>
                <Text fontSize={16} fontWeight="bold">
                  {project.timeline}
                </Text>
              </Box>
              <Box width="30%">
                <Text fontSize={16}>Need</Text>
                <Text fontSize={16} fontWeight="bold">
                  {project.advice}
                </Text>
              </Box>
            </Flex>
            <Flex justify="space-between">
              <Box width="30%">
                <Text fontSize={16}>Revenue type</Text>
                <Text fontSize={16} fontWeight="bold">
                  {project.revenue}
                </Text>
              </Box>
              <Box width="30%">
                <Text fontSize={16}>Up to amount</Text>
                <Text fontSize={16} fontWeight="bold">
                  {project.upToAmount}
                </Text>
              </Box>
              <Box width="30%">
                <Text fontSize={16}>Provider</Text>
                <Text fontSize={16} fontWeight="bold">
                  {project.provider}
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectPage;

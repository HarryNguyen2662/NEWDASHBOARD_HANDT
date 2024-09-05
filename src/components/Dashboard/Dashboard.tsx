import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
// import * as dashIcons from "../../assets/userMainPage";
// import styles from "./Dashboard.module.css";
// import ProjectCard from "../ProjectCard/ProjectCard";
// import projectCardStyles from "../ProjectCard/ProjectCard.module.css";
// import ProjectTable from "../ProjectTable/ProjectTable";
import { NumberChart } from "../OverviewChart/NumberChart";
import NotificationBoard from "../NotificationBoard/NotificationBoard";
import ConnectionDashboard, {
  PeopleToConnect,
} from "../ConnectionDashboard/ConnectionDashboard";

// Define the type for project data
// interface ProjectData {
//   name: string;
//   provider: string;
//   date: string;
//   description: string;
//   type: string;
//   serviceArea: string;
//   status: string;
// }

const generateMemberId = (name: string) => {
  return name.replace(/\s+/g, "");
};

const peopleToConnect: PeopleToConnect[] = [
  {
    name: "Jane Doe",
    title: "Software Engineer at CW3",
    tags: ["Mentorship", "NFTs", "Web3"],
    memberId: generateMemberId("Jane Doe"),
  },
  {
    name: "John Smith",
    title: "Software Engineer at CW3",
    tags: ["Mentorship", "NFTs", "Web3"],
    memberId: generateMemberId("John Smith"),
  },
  {
    name: "Thomas Ray",
    title: "Software Engineer at CW3",
    tags: ["Mentorship", "NFTs", "Web3"],
    memberId: generateMemberId("Thomas Ray"),
  },
  {
    name: "Warren Doe",
    title: "Software Engineer at CW3",
    tags: ["Mentorship", "NFTs", "Web3"],
    memberId: generateMemberId("Warren Doe"),
  },
  {
    name: "Hope Park",
    title: "Software Engineer at CW3",
    tags: ["Mentorship", "NFTs", "Web3"],
    memberId: generateMemberId("Hope Park"),
  },
];

const Dashboard: React.FC = () => {
  return (
    <Flex direction="column" p={5} bg="black">
      <Heading fontSize="3xl" color="white" mx={8} mt={6}>
        Welcome back!
      </Heading>
      <HStack direction="row" spacing={6} mx={8} mt={6}>
        <NumberChart title="số lượng giáo viên" value="1000" />
        <NumberChart title="số lượng học viên" value="1000" />
        <NumberChart title="số lượng học viên chưa kích hoạt" value="1000" />
      </HStack>
      <NotificationBoard></NotificationBoard>
    </Flex>
  );
};

//<ConnectionDashboard peopleToConnect={peopleToConnect} />
export default Dashboard;

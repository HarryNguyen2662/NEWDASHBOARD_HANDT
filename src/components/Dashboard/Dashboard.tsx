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

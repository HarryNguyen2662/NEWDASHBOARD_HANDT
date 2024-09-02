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

// TEMPORARILY COMMENTED OUT AS WE FOCUS ON PEOPLE CONNECTIONS
// const projectDummyDataFull: ProjectData[] = [
//   {
//     name: "Web Designer for E-Commerce Website",
//     provider: "Jane Doe",
//     description: "Need a web designer to create a modern e-commerce website",
//     date: "22 June 2024",
//     type: "Website",
//     serviceArea: "Website",
//     status: "Completed",
//   },
//   {
//     name: "Mobile App Development",
//     provider: "John Smith",
//     description:
//       "Looking for a mobile app developer to create an app for iOS and Android",
//     date: "15 July 2024",
//     type: "Mobile App",
//     serviceArea: "Development",
//     status: "In Progress",
//   },
//   {
//     name: "SEO Optimization",
//     provider: "Alice Johnson",
//     description:
//       "Need an SEO expert to optimize our website for search engines",
//     date: "05 August 2024",
//     type: "SEO",
//     serviceArea: "Marketing",
//     status: "In Review",
//   },
//   {
//     name: "Social Media Campaign",
//     provider: "Bob Brown",
//     description:
//       "Looking for a social media expert to run a marketing campaign",
//     date: "20 June 2024",
//     type: "Social Media",
//     serviceArea: "Marketing",
//     status: "Completed",
//   },
//   {
//     name: "Content Creation",
//     provider: "Charlie Davis",
//     description: "Need a content writer to create blog posts and articles",
//     date: "10 July 2024",
//     type: "Content",
//     serviceArea: "Writing",
//     status: "In Progress",
//   },
//   {
//     name: "Graphic Design",
//     provider: "Emily White",
//     description: "Looking for a graphic designer to create marketing materials",
//     date: "18 May 2024",
//     type: "Design",
//     serviceArea: "Creative",
//     status: "In Review",
//   },
//   {
//     name: "Email Marketing",
//     provider: "Michael Green",
//     description: "Need an email marketing expert to create email campaigns",
//     date: "30 June 2024",
//     type: "Email",
//     serviceArea: "Marketing",
//     status: "Completed",
//   },
//   {
//     name: "Database Management",
//     provider: "Olivia Brown",
//     description: "Looking for a database administrator to manage our database",
//     date: "12 July 2024",
//     type: "Database",
//     serviceArea: "IT",
//     status: "In Progress",
//   },
//   {
//     name: "UX Research",
//     provider: "Daniel Lee",
//     description: "Need a UX researcher to conduct user research",
//     date: "25 June 2024",
//     type: "Research",
//     serviceArea: "Design",
//     status: "In Review",
//   },
//   {
//     name: "System Integration",
//     provider: "Sophia Wilson",
//     description: "Looking for a system integrator to integrate our systems",
//     date: "03 August 2024",
//     type: "Integration",
//     serviceArea: "IT",
//     status: "Completed",
//   },
// ];

// const projectDummyDataEmpty: ProjectData[] = [];

const Dashboard: React.FC = () => {
  // const [projects] = useState<ProjectData[]>([]); // No project data for now

  // const handleFindProjClick = () => {
  //   console.log("Find A Project clicked");
  // };

  // const handleCreateProjClick = () => {
  //   console.log("Create A Project clicked");
  // };

  // const renderNoProjectsLayout = () => (
  //   <div className={styles.dashboardContainer}>
  //     <div className={styles.dashboardHeader}>
  //       <h1>Build a Dashboard</h1>
  //     </div>
  //     <div className={styles.dashboardContent}>
  //       <img src={dashIcons.default1} alt="projects" />
  //       <img src={dashIcons.default2} alt="offerings" />
  //       <img src={dashIcons.default3} alt="posts" />
  //     </div>
  //     <div className={styles.buttonContainer}>
  //       <button
  //         className={styles.findProjectButton}
  //         onClick={handleFindProjClick}
  //       >
  //         Find A Project
  //       </button>
  //       <button
  //         className={styles.createProjectButton}
  //         onClick={handleCreateProjClick}
  //       >
  //         Create A Project
  //       </button>
  //     </div>
  //   </div>
  // );

  // const renderProjectsLayout = () => {
  //   const inProgressProjects = projects.filter(
  //     (project) => project.status === "In Progress"
  //   );

  //   return (
  //     <div className={styles.dashboardContainer}>
  //       <div className={styles.currentProjects}>
  //         <h1>Current Projects</h1>
  //         <div className={styles.projectCards}>
  //           {inProgressProjects.map((project, index) => (
  //             <ProjectCard
  //               key={index}
  //               className={projectCardStyles.projectCard}
  //               projectData={project}
  //             />
  //           ))}
  //         </div>
  //       </div>
  //       <div className={styles.allProjects}>
  //         <h1>All Projects</h1>
  //         <ProjectTable data={projects} />
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <Flex direction="column" p={5} bg="black">
      <Heading fontSize="3xl" color="white" mx={8} mt={6}>
        Welcome back!
      </Heading>
      <ConnectionDashboard peopleToConnect={peopleToConnect} />
    </Flex>
  );
};

export default Dashboard;

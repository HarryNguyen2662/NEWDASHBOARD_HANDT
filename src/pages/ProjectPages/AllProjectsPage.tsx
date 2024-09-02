import React, { useState } from "react";
import styles from "../../components/Dashboard/Dashboard.module.css";
import * as dashIcons from "../../assets/userMainPage";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import projectCardStyles from "../../components/ProjectCard/ProjectCard.module.css";
import ProjectTable from "../../components/ProjectTable/ProjectTable";

// Define the type for project data
interface ProjectData {
  name: string;
  provider: string;
  date: string;
  description: string;
  type: string;
  serviceArea: string;
  status: string;
}

const projectDummyDataFull: ProjectData[] = [
  {
    name: "Web Designer for E-Commerce Website",
    provider: "Jane Doe",
    description: "Need a web designer to create a modern e-commerce website",
    date: "22 June 2024",
    type: "Website",
    serviceArea: "Website",
    status: "Completed",
  },
  {
    name: "Mobile App Development",
    provider: "John Smith",
    description:
      "Looking for a mobile app developer to create an app for iOS and Android",
    date: "15 July 2024",
    type: "Mobile App",
    serviceArea: "Development",
    status: "In Progress",
  },
  {
    name: "SEO Optimization",
    provider: "Alice Johnson",
    description:
      "Need an SEO expert to optimize our website for search engines",
    date: "05 August 2024",
    type: "SEO",
    serviceArea: "Marketing",
    status: "In Review",
  },
  {
    name: "Social Media Campaign",
    provider: "Bob Brown",
    description:
      "Looking for a social media expert to run a marketing campaign",
    date: "20 June 2024",
    type: "Social Media",
    serviceArea: "Marketing",
    status: "Completed",
  },
  {
    name: "Content Creation",
    provider: "Charlie Davis",
    description: "Need a content writer to create blog posts and articles",
    date: "10 July 2024",
    type: "Content",
    serviceArea: "Writing",
    status: "In Progress",
  },
  {
    name: "Graphic Design",
    provider: "Emily White",
    description: "Looking for a graphic designer to create marketing materials",
    date: "18 May 2024",
    type: "Design",
    serviceArea: "Creative",
    status: "In Review",
  },
  {
    name: "Email Marketing",
    provider: "Michael Green",
    description: "Need an email marketing expert to create email campaigns",
    date: "30 June 2024",
    type: "Email",
    serviceArea: "Marketing",
    status: "Completed",
  },
  {
    name: "Database Management",
    provider: "Olivia Brown",
    description: "Looking for a database administrator to manage our database",
    date: "12 July 2024",
    type: "Database",
    serviceArea: "IT",
    status: "In Progress",
  },
  {
    name: "UX Research",
    provider: "Daniel Lee",
    description: "Need a UX researcher to conduct user research",
    date: "25 June 2024",
    type: "Research",
    serviceArea: "Design",
    status: "In Review",
  },
  {
    name: "System Integration",
    provider: "Sophia Wilson",
    description: "Looking for a system integrator to integrate our systems",
    date: "03 August 2024",
    type: "Integration",
    serviceArea: "IT",
    status: "Completed",
  },
];

const projectDummyDataEmpty: ProjectData[] = [];

const AllProjectsPage: React.FC = () => {
  // Use state to manage project data
  const [projects, setProjects] = useState<ProjectData[]>(projectDummyDataFull);
  // THE BELOW CODE IS A PLACEHOLDER STILL NEED TO IMPLEMENT THE FUNCTIONALITY
  // WHEN CONNECTED TO THE DATABASE

  const renderProjectsLayout = () => {
    const inProgressProjects = projects.filter(
      (project) => project.status === "In Progress"
    );

    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.currentProjects}>
          <h1>Best Projects for You!</h1>
          <div className={styles.projectCards}>
            {inProgressProjects.map((project, index) => (
              <ProjectCard
                key={index}
                className={projectCardStyles.projectCard}
                projectData={project}
              />
            ))}
          </div>
        </div>
        <div className={styles.allProjects}>
          <h1>All Projects</h1>
          <ProjectTable data={projects} />
        </div>
      </div>
    );
  };

  return <div>{renderProjectsLayout()}</div>;
};

export default AllProjectsPage;

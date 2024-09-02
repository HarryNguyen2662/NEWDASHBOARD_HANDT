import React from "react";
import styles from "./ProjectTable.module.css";
import { completedIcon, inProgressIcon, inReviewIcon } from "../../assets/navbar";


interface Project {
  name: string;
  provider: string;
  date: string;
  type: string;
  serviceArea: string;
  status: string;
}

interface ProjectTableProps {
  data: Project[];
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <img src={completedIcon} alt="Completed" className={styles.statusIcon} />;
    case "In Progress":
      return <img src={inProgressIcon} alt="In Progress" className={styles.statusIcon} />;
    case "In Review":
      return <img src={inReviewIcon} alt="In Review" className={styles.statusIcon} />;
    default:
      return <img src={completedIcon} alt="Completed" className={styles.statusIcon} />;
  }
}

const ProjectTable: React.FC<ProjectTableProps> = ({ data }) => {
  const handleProjectsClick = (project: Project) => {
    console.log("Project clicked:", project.name);
    alert(`Project clicked: ${project.name}`);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Provider</th>
            <th>Date</th>
            <th>Type</th>
            <th>Service Area</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((project, index) => (
            <tr key={index} onClick={() => handleProjectsClick(project)}>
              <td>{project.name}</td>
              <td>{project.provider}</td>
              <td>{project.date}</td>
              <td>{project.type}</td>
              <td>{project.serviceArea}</td>
              <td>{getStatusIcon(project.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;

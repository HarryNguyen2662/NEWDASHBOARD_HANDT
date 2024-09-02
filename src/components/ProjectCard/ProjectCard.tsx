import React from "react";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  className?: string; // Make className optional if it's not always required
  projectData: {
    name: string;
    provider: string;
    date: string;
    type: string;
    serviceArea: string;
    status: string;
    description?: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projectData }) => {
  const handleDetailsClick = () => {
    // TODO
    console.log("See Details clicked");
    alert(`See Details clicked for project: ${projectData.name}`);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.badgeContainer}>
        <div className={`${styles.badge} ${styles.badgeBlue}`}>
          {projectData.type}
        </div>
        <div className={`${styles.badge} ${styles.badgePurple}`}>
          {projectData.serviceArea}
        </div>
      </div>
      <h2 className={styles.projectName}>{projectData.name}</h2>
      <p className={styles.description}>{projectData.description}</p>
      <div className={styles.divider}></div>
      <div className={styles.footer}>
        <span className={styles.userName}>{projectData.provider}</span>
        <button className={styles.button} onClick={handleDetailsClick}>
          See Details
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import * as navbarIcons from "../../assets/navbar";
import { useAuth } from "../../hooks/useAuth";

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const handleSignoutClick = async () => {
    await logout();
  };

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebar}>
        <Link to="/">
          <img
            src={
              location.pathname === "/"
                ? navbarIcons.dashboardSelected
                : navbarIcons.dashboardUnselected
            }
            alt="Dashboard"
          />
        </Link>
        <Link to="/members">
          <img
            src={
              location.pathname === "/members"
                ? navbarIcons.membersSelected
                : navbarIcons.membersUnselected
            }
            alt="Members"
          />
        </Link>
        {/* <Link to="/projects">
          <img
            src={
              location.pathname === "/projects"
                ? navbarIcons.projectsSelected
                : navbarIcons.projectsUnselected
            }
            alt="Projects"
          />
        </Link> */}
        {/* <Link to="/services">
          <img
            src={
              location.pathname === "/services"
                ? navbarIcons.servicesSelected
                : navbarIcons.servicesUnselected
            }
            alt="Services"
          />
        </Link>
        <Link to="/my-posts">
          <img
            src={
              location.pathname === "/my-posts"
                ? navbarIcons.postSelected
                : navbarIcons.postUnselected
            }
            alt="Posts"
          />
        </Link> */}
      </div>
      <div className={styles.sidebarFooter}>
        <button onClick={handleSignoutClick} className={styles.signoutButton}>
          <img
            src={navbarIcons.signoutUnselected}
            alt="Signout"
            className={styles.signoutImage}
          />
          <img
            src={navbarIcons.signoutSelected}
            alt="Signout"
            className={styles.signoutImageHover}
          />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaFileAlt,
  FaThLarge,
} from "react-icons/fa";
import styles from "./Sidebar.module.css";
import { useAuth } from "../../hooks/useAuth";
import * as navbarIcons from "../../assets/navbar";

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const handleSignoutClick = async () => {
    await logout();
  };

  const links = [
    {
      to: "/",
      icon: (
        <FaThLarge className={styles.icon} style={{ marginLeft: "10px" }} />
      ), // Home icon for "Trung tâm điều khiển"
      label: "Trung tâm điều khiển",
    },
    {
      to: "/members",
      icon: (
        <FaChalkboardTeacher
          className={styles.icon}
          style={{ marginLeft: "10px" }}
        />
      ), // Teacher icon for "Danh sách giáo viên"
      label: "Danh sách giáo viên",
    },
    {
      to: "/projects",
      icon: (
        <FaUserGraduate
          className={styles.icon}
          style={{ marginLeft: "10px" }}
        />
      ), // Graduate icon for "Danh sách học viên"
      label: "Danh sách học viên",
    },
    {
      to: "/services",
      icon: (
        <FaFileAlt className={styles.icon} style={{ marginLeft: "10px" }} />
      ), // File icon for "Hồ sơ trung tâm"
      label: "Hồ sơ trung tâm",
    },
  ];

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebar}>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`${styles.link} ${
              location.pathname === link.to ? styles.active : ""
            }`}
          >
            {link.icon}
            <span style={{ marginLeft: "10px" }}>{link.label}</span>
          </Link>
        ))}
      </div>
      <div className={styles.sidebarFooter}>
        <button
          type="button"
          onClick={handleSignoutClick}
          className={styles.signoutButton}
        >
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

/*
const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const handleSignoutClick = async () => {
    await logout();
  };

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebar}>
        <Link to="/" className={location.pathname === "/" ? styles.active : ""}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/members"
          className={location.pathname === "/members" ? styles.active : ""}
        >
          <FaUsers />
          <span>Members</span>
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
        </Link> */

/* <Link to="/services">
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
        </Link> */

/*
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
*/

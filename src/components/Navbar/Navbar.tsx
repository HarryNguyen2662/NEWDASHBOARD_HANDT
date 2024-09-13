import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/handtailogo.png";
import styles from "./Navbar.module.css";
import * as navbarIcons from "../../assets/navbar";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const { loggedInUser } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  const handleNewProjectClick = () => {
    setShowPopup(!showPopup);
    alert("New Project clicked");
  };

  const handleNotificationClick = () => {
    alert("Notification clicked");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <ScrollLink
          to={"/"}
          smooth={true}
          duration={2000}
          className={styles.scrollLink}
        >
          <img src={logo} alt="Logo" className={styles.logo} />
          <span className={styles.logoText}>H&T AI TECH</span>
        </ScrollLink>
      </div>
      <div className={styles.navbarRight}>
        {loggedInUser ? (
          <div className={styles.loggedInUser}>
            {/* <div
              className={styles.navButtonContainer}
              onMouseEnter={() => setShowPopup(true)}
              onMouseLeave={() => setShowPopup(false)}
            >
              <div className={styles.navButton}>
                <img
                  className={styles.newIcon}
                  src={navbarIcons.newProject}
                  alt="New Project"
                />
              </div>
              {showPopup && (
                <div className={styles.popupMenu}>
                  <Link to="/create-project">
                    <img
                      className={styles.createProject}
                      src={navbarIcons.projectWhite}
                      alt="Create Project"
                    />
                    Create project
                  </Link>
                  <hr />
                  <Link to="/create-service">
                    <img
                      className={styles.createService}
                      src={navbarIcons.serviceWhite}
                      alt="Create Service"
                    />
                    Create service
                  </Link>
                </div>
              )}
            </div> */}
            {/* <button
              className={styles.navButton}
              onClick={handleNotificationClick}
            >
              <img src={navbarIcons.notifications} alt="Notifications" />
            </button> */}
            <Link to="/trungtam/hoso" className={styles.navButton}>
              <CgProfile size={26} />
            </Link>
          </div>
        ) : (
          <div> </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

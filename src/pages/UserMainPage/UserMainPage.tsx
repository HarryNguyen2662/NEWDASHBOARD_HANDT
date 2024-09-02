import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./UserMainPage.module.css";

const UserMainPage = () => {
  return (
    <div className={styles.mainContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default UserMainPage;

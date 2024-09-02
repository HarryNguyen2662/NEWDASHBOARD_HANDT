import React from "react";
import styles from "./ProfileIntroCard.module.css";
import { FaLocationDot, FaBriefcase } from "react-icons/fa6";
import { Icon } from "@chakra-ui/icons";

interface ProfileIntroCardProps {
  className?: string; // Make className optional if it's not always required
  profileData: {
    name: string;
    location: string;
    role: string;
  };
}

const ProfileIntroCard: React.FC<ProfileIntroCardProps> = ({
  profileData: profileData,
}) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.horizontal}>
        <h2 className={styles.userName}>{profileData.name}</h2>
        {/* commenting out the Connect button as we will not be implementing that feature for now */}
        {/* <button className={styles.button}>
            Connect
            </button> */}
      </div>

      <div className={styles.horizontal}>
        <Icon as={FaBriefcase} color="#CBCBCB" />
        <p className={styles.fieldValue}>{profileData.role}</p>
      </div>

      <div className={styles.horizontal}>
        <Icon as={FaLocationDot} color="#CBCBCB" />
        <p className={styles.fieldValue}>{profileData.location}</p>
      </div>
    </div>
  );
};

export default ProfileIntroCard;

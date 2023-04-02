import React from "react";
import styles from "../assets/css/Header.module.css";
import Navheader from "./Navheader";
const Header = () => {
  return (
    <div className={styles.headerbody}>
      <Navheader />
    </div>
  );
};

export default Header;

import React from 'react'
import styles from "../assets/css/Header.module.css";
import Navdashboard from './Navdashboard';
const Headerdashboard = () => {
  return (
    <div className={styles.headerbody}>
      <Navdashboard />
    </div>
  )
}

export default Headerdashboard
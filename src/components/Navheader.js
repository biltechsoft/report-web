import React from "react";
import { Link } from "react-router-dom";
import styles from "../assets/css/Header.module.css";
import Logo from "../assets/img/logo.png";
import {
  Container,
  Nav,
  Navbar,
} from "react-bootstrap";
const Navheader = () => {
  return (
    <Navbar className={styles.Navbar} expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <div className={styles.logo}>
            <span>
              <img src={Logo} alt={"Logo"} style={{width: "200px"}} />
            </span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            className="me-auto my-2 my-lg-0"
            
          >
            <Link className="Link" style={{fontSize:"16px"}} to="/">Home</Link>
            <Link className="Link" style={{fontSize:"16px"}} to="/dailyreport">Daily Report</Link>
            <Link className="Link" style={{fontSize:"16px"}} to="/monthlysummary">Monthly Summary</Link>

            <Link className="Link" style={{fontSize:"16px"}} to="/monthlyplan">Monthly Plan</Link>

            <Link className="Link" style={{fontSize:"16px"}} to="/syllabus">syllabus</Link>
            <Link className="Link" style={{fontSize:"16px"}} to="/contactus">Contact us</Link>

            
                   
          </Nav>
          <Link className="loginbtn" to="/login">Login</Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
};

export default Navheader;

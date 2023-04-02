import React from "react";
import { Link, Navigate } from "react-router-dom";
import { ExternalLink } from "react-external-link";
import { useEffect, useState } from "react";
import styles from "../assets/css/Header.module.css";
import Logo from "../assets/img/logo.png";
import { FaArrowRight } from "react-icons/fa";
import LoginUserView from "./Items/LoginUserView";
import { BiWorld } from "react-icons/bi";
import { MdNotifications } from "react-icons/md";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import axios from "axios";
import config from "../config";
import { style } from "@mui/system";

const Navdashboard = () => {
  const user = localStorage.getItem("user_id");

  ///==================================
  const [filterCon, setFilterCon] = useState([]);
  const [globalDataCon, setglobalDataCon] = useState([]);
  const [globalfilterCon, setglobalfilterCon] = useState([]);

  const fetchAdvice = async () => {
    const response = await fetch(`${config.apiUrl}advice/`)
      .then((Response) => Response.json())
      .then((res) => {
        const filterRes = res.filter(
          (item) => item.reviewee == user && !item.seen == 1
        );
        setFilterCon(filterRes);
      });
  };

  useEffect(() => {
    fetchAdvice();
  }, []);
  ///=======================================
  function checkAdult(age) {
    return age >= user;
  }
  const globalfetchAdvice = async () => {
    const response = await fetch(`${config.apiUrl}notification/`)
      .then((Response) => Response.json())
      .then((result) => {
        setglobalDataCon(result);

       

        const filterRes = result.reduce(
          (prev, item) => prev + !item.seenList.includes(parseInt(user)),
          0
        );
        setglobalfilterCon(filterRes);
      });
  };
 
  useEffect(() => {
    globalfetchAdvice();
  }, []);
  ///=======================================
  const userLogout = () => {
    const userLogout = 0;
    const userLogoutdata = { userLogout };
    axios
      .patch(`${config.apiUrl}userInfo/` + user + "/", userLogoutdata)
      .then((Response) => Response.json())
      .then(() => {})
      .catch((error) => {});

    localStorage.clear();
    return <Navigate replace to="/Homepage" />;
  };

  ///=======================================
  const notificNum = filterCon.length;
  const notificnumber = filterCon.length > 0 ? notificNum : null;
  const notificcolor = filterCon.length > 0 ? "red" : null;
  ///=======================================
  const globalnotificnumber =globalfilterCon > 0 ? globalfilterCon : null;
  const globalnotificcolor = globalfilterCon > 0 ? "red" : null;
  ///=======================================

  return (
    <Navbar className={styles.Navbar} expand="lg">
      <Container>
        <Navbar.Brand href="#">
          <div className={styles.logo}>
            <Link to="/dashboard">
              <span>
                <img src={Logo} style={{ width: "200px" }} alt={"Logo"} />
              </span>
            </Link>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            className="me-auto my-2 my-lg-0"
            
          >
            <Link className="Link" style={{ fontSize: "16px" }} to="/dashboard">
              Dashboard
            </Link>
            <NavDropdown className={styles.Linkdropdown} title="Report">
              <Link
                className={styles.subLink}
                style={{ fontSize: "15px" }}
                to="/dailyreport"
              >
                Daily Report
              </Link>
              <br></br>
              <Link
                className={styles.subLink}
                style={{ fontSize: "14px" }}
                to="/monthlysummary"
              >
                Monthly Summary
              </Link>
              <br></br>

              <Link
                className={styles.subLink}
                style={{ fontSize: "15px" }}
                to="/monthlyplan"
              >
                Monthly Plan
              </Link>
              <br></br>
              <Link
                className={styles.subLink}
                style={{ fontSize: "15px" }}
                to="/syllabus"
              >
                Syllabus
              </Link>
              <br></br>
              <Link
                className={styles.subLink}
                style={{ fontSize: "15px" }}
                to="/accomplishment"
              >
                Plan VS Accomp
              </Link>
            </NavDropdown>

            <Link className="Link" style={{ fontSize: "16px" }} to="/counselor">
              Counselor
            </Link>
            <Link className="Link" style={{ fontSize: "16px" }} to="/reviewee">
              Reviewee
            </Link>
            <Link className="Link" style={{ fontSize: "16px" }} to="/contactus">
              Contact us
            </Link>
          </Nav>
          <div style={{ padding: "0px 10px" }}>
            <Link to="/counselor" style={{ color: "gray" }}>
              <span
                style={{
                  float: "left",
                  margin: "11px",
                  background: "#d8d8d8",
                  padding: "0px",
                  width: "35px",
                  height: "35px",
                  textAlign: "center",
                  borderRadius: "50px",
                  fontSize: "21px",
                  color: notificcolor,
                }}
              >
                <MdNotifications />
              </span>
              <span
                style={{
                  float: "left",
                  marginLeft: "-20px",
                  fontWeight: "700",
                  color: notificcolor,
                }}
              >
                {notificnumber}
              </span>
            </Link>
          </div>

          <div style={{ padding: "0px 10px" }}>
            <Link to="/notification" style={{ color: "gray" }}>
              <span
                style={{
                  float: "left",
                  margin: "11px",
                  background: "#d8d8d8",
                  padding: "0px",
                  width: "35px",
                  height: "35px",
                  textAlign: "center",
                  borderRadius: "50px",
                  fontSize: "21px",
                  color: globalnotificcolor,
                }}
              >
                <BiWorld />
              </span>
              <span
                style={{
                  float: "left",
                  marginLeft: "-20px",
                  fontWeight: "700",
                  color: globalnotificcolor,
                }}
              >
                {globalnotificnumber}
              </span>
            </Link>
          </div>

          <Dropdown as={ButtonGroup} style={{ padding: "10px" }}>
            <Button disabled>{<LoginUserView user={user} />}</Button>

            <Dropdown.Toggle split id="dropdown-split-basic" />

            <Dropdown.Menu>
              <Link className={styles.subLink} to="/account">
                Account
              </Link>
              <br></br>
              <Link className={styles.subLink} to="/setting">
                Change Password
              </Link>
              <br></br>
              <Link className={styles.subLink} to="/contactus">
                Help
              </Link>
              <br></br>
              <ExternalLink
                className={styles.subLink}
                target="_blank"
                href="https://smsamfund.se/about-sms/"
              >
                About
              </ExternalLink>
              <br></br>
              <Link className={styles.subLink} onClick={userLogout} to="/">
                Logout
              </Link>
              <FaArrowRight />
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navdashboard;

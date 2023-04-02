import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../assets/css/body.module.css";

import { FaUserCircle } from "react-icons/fa";
import { Label } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import config from "../config";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [status, setStatus] = useState(undefined); // For message
  const [old_password, setUserId] = useState("");
  const [new_password1, setPassword1] = useState("");
  const [new_password2, setPassword2] = useState("");
  const [new_password, setPassword] = useState("");
  const token = localStorage.getItem("token");

  var myColor = "green";
  var retypeMessage = '';
  var passMatched = false;


const authorised = axios.create({
  baseURL: config.apiUrlChangepass,
  //timeout: 1000,
  headers: {'Authorization': 'Token '+token}
});

  const userChangePassword = (e) => {
    e.preventDefault();
    if(new_password == new_password2){ 
      //setPassword(new_password1);
      const data = {
        old_password,
        new_password
      };
      //console.log(old_password);
      //console.log(new_password);
      const res =  authorised.put(`${config.apiUrlChangepass}`,data)
        .then((res) => {
          //console.log(res);
          setStatus({ type: "success" });
          swal("Success!", "Your Password successfully Changed", "success");
        })
        .catch((error) => {
          // console.log(err);
          setStatus({ type: "error", error });
          swal("Error", "Check Old & New Password,Password at least 8 characters.", "warning");
        });
    }
    else {
      swal("Error", "Retype new password correctly", "warning");
    }
  };

  const matchPassword = (pass2) => evt => {
    if(pass2 == '') {
      passMatched = false;
      retypeMessage = '';
    } else if (pass2 != new_password1) {
      passMatched = false;
      retypeMessage = 'Retype new password correctly';
      myColor = "red";
    } else {
      setPassword(pass2);
      passMatched = true;
      retypeMessage = 'Password matched!';
      myColor = "green";
    }
  };
  
//console.log(token);
  return (
    <div className={styles.loginbody}>
      <Container className="">
        <Row className="justify-content-md-center">
          <Col xs lg="2"></Col>
          <Col lg="8" className="gradient100">
            <div className={styles.usericonarea}>
              <span className={styles.usericon}>
                <FaUserCircle />
              </span>
            </div>
            <Row>
              <Col lg="6" md={{ span: 3, offset: 3 }}>
                <span className={styles.loginsignuptitle}>Change Password</span>
                <form onSubmit={userChangePassword}>
                  <div className={styles.inputitmdiv}>
                    <input
                      required="required"
                      type="Password"
                      className={styles.inputitm}
                      placeholder="Old Password"
                      onChange={(e) => setUserId(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputitmdiv}>
                    <input
                      required="required"
                      type="Password"
                      className={styles.inputitm}
                      placeholder="New Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputitmdiv}>
                    <input
                      required="required"
                      type="Password"
                      className={styles.inputitm}
                      placeholder="Confirm New Password"
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                    <p style={{color: myColor}}>{retypeMessage}</p>
                  </div>
                  

                  <div className={styles.inputitmdiv}>
                    <input
                      type="submit"
                      className={styles.feedbackbtn}
                      value="Change Password"
                    />
                    <div className={styles.loginbuttomarea}></div>
                  </div>
                </form>
              </Col>
            </Row>
          </Col>
          <Col xs lg="2"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChangePassword;

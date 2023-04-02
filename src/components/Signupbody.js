import React from "react";
import styles from "../assets/css/body.module.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
const signupbody = () => {
  return (
    <div className={styles.signupbody}>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="2"></Col>
          <Col lg="8" className="gradient100">
            <form>
              <h3>Sign Up</h3>
              <div className="form-group">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Sign Up
              </button>
              <Link className="nav-link" to={"/login"}>
                <p className="textcolorwhite">Already registered please Sign</p>
              </Link>
            </form>
          </Col>
          <Col xs lg="2"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default signupbody;

import React from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../components/Header";
import Signupbody from "../components/Signupbody";
import Footer from "../components/Footer";
const Signup = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Header />
        </Row>
      </Container>
      <Container>
        <Row>
          <Signupbody />
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Footer />
        </Row>
      </Container>
    </div>
  );
};

export default Signup;

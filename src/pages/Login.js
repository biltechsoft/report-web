import React from "react";
import { Navigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import Header from "../components/Header";
import Loginbody from "../components/Loginbody";
import Footer from "../components/Footer";

const Login = () => {
if(localStorage.getItem("user_id")===null){
  return (
    <div>
      <Container fluid>
        <Row>
          <Header />
        </Row>
      </Container>
      <Container>
        <Row>
          <Loginbody />
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Footer />
        </Row>
      </Container>
    </div>
  );

}else{
  return <Navigate replace to="/dashboard" />
}

  
};

export default Login;

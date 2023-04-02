import React from "react";
import {Navigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import Header from "../components/Header";
import Footer from "../components/Footer";
import homepage from "../assets/img/homepage.jpg";

const Homepage = () => {

  if(localStorage.getItem("user_id")===null){
    return (
      <div>
        <Container fluid>
          <Row>
            <Header />
          </Row>
        </Container>
        <Container fluid>
          <Row>
          <img style={{height:'auto',width:'100%',padding:'10px 0px'}} src={homepage} alt={"homepage"} />
  
          </Row>
        </Container>
        <Container fluid>
          <Row><Footer /></Row>
        </Container>
      </div>
    );
   
   }
   else{
    return <Navigate replace to="/dashboard" />
   }
};

export default Homepage;

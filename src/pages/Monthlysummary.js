import React from 'react'
import { Navigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import Headerdashboard from "../components/Headerdashboard";
import Footer from "../components/Footer";
import Monthlyreportbody from "../components/Monthlyreportbody"

const Monthlysummary = () => {

  if(localStorage.getItem("user_id")===null){
    return <Navigate replace to="/Login" />
   }else{

  return (
    <div>
      <Container fluid>
        <Row>
        <Headerdashboard />
        </Row>
      </Container>
      <Container>
        <Row> <Monthlyreportbody /></Row>
      </Container>
      <Container fluid>
        <Row><Footer /></Row>
      </Container>
    </div>
  )
   }
}

export default Monthlysummary
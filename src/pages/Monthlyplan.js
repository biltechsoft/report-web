import React from 'react'
import { Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import Headerdashboard from "../components/Headerdashboard";
import Footer from "../components/Footer";
import Monthlyplanbody from '../components/Monthlyplanbody';
import Plan from '../components/plan';
import PlanBody from '../components/planbody';
const Monthlyplan = () => {

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
        <Row> <PlanBody /></Row>
      </Container>
      <Container fluid>
        <Row><Footer /></Row>
      </Container>
    </div>
  )
   }
}

export default Monthlyplan
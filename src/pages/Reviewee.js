import React from 'react'
import { Navigate } from "react-router-dom";
import { Container, Row} from "react-bootstrap";

import Headerdashboard from "../components/Headerdashboard";
import Revieweebody from "../components/Revieweebody";
import Footer from "../components/Footer";
const Reviewee = () => {
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
        <Row><Revieweebody /></Row>
      </Container>
      <Container fluid>
        <Row><Footer /></Row>
      </Container>
    </div>
  )
   }
}

export default Reviewee
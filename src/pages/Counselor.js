import React from 'react'
import {  Navigate } from "react-router-dom";
import { Container, Row, } from "react-bootstrap";


import Headerdashboard from "../components/Headerdashboard";
import Footer from "../components/Footer";
import Counselorbody from '../components/Counselorbody';
const Counselor = () => {

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
        <Row><Counselorbody /></Row>
      </Container>
      <Container fluid>
        <Row><Footer /></Row>
      </Container>
    </div>
  )
   }
}

export default Counselor
import React from 'react'
import { Container, Row } from "react-bootstrap";
import {  Navigate } from "react-router-dom";
import Headerdashboard from "../components/Headerdashboard";
import Footer from "../components/Footer";
import Contactusbody from '../components/Contactusbody';
const Contactus = () => {

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
        <Row><Contactusbody /></Row>
      </Container>
      <Container fluid>
        <Row><Footer /></Row>
      </Container>
    </div>
  )
}
}

export default Contactus
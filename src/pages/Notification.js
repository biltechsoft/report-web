import React from 'react'
import {  Navigate } from "react-router-dom";
import { Container, Row, } from "react-bootstrap";
import Headerdashboard from "../components/Headerdashboard";
import Footer from "../components/Footer";
import NotificationBody from '../components/NotificationBody';

const Notification = () => {
  return (
    <div>
      <Container fluid>
        <Row>
        <Headerdashboard />
        </Row>
      </Container>
      <Container>
        <Row><NotificationBody /></Row>
      </Container>
      <Container fluid>
        <Row><Footer /></Row>
      </Container>
    </div>
  )
}

export default Notification
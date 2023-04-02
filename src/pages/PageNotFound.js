import React from 'react';
import { Container, Row } from "react-bootstrap";
import styles from "../assets/css/body.module.css";
import Headerdashboard from "../components/Headerdashboard";
import Footer from "../components/Footer";
const PageNotFound = () => {
  return (
   
    <div>
      <Container fluid>
        <Row>
        <Headerdashboard />
        </Row>
      </Container>
      <Container>
        <Row>
            <div  className={styles.PageNotFound}>Page Not Found</div>
        </Row>
      </Container>
      <Container fluid>
        <Row><Footer /></Row>
      </Container>
    </div>
  )
}

export default PageNotFound
import React from 'react'
import { Link } from "react-router-dom";
import { CardGroup,Card } from "react-bootstrap";
import styles from "../assets/css/body.module.css";
import { FcBusinessContact } from "react-icons/fc";
import { FcAlarmClock } from "react-icons/fc";
import { FcReadingEbook } from "react-icons/fc";
import { FcTodoList } from "react-icons/fc";
import { FcList } from "react-icons/fc";
import { FcPlanner } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import { FcManager } from "react-icons/fc";



const Deshbordbody = () => {
  return (
    <div className={styles.loginbody}>
   <CardGroup>
  
    

    <Card>
    <Link className="Link" to="/dailyreport">
    <FcAlarmClock className={styles.cardIcon} /> 
      <Card.Body>
        <Card.Title className={styles.cardTitle} >Daily Report</Card.Title>
        <Card.Text className={styles.cardbody}>
          {/* This is a wider card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer. */}
        </Card.Text>
      </Card.Body>
      {/* <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer> */}
      </Link>
    </Card>

    <Card>
    <Link className="Link" to="/monthlysummary">
    <FcList className={styles.cardIcon} /> 
      <Card.Body>
        <Card.Title className={styles.cardTitle} >Monthly Summary</Card.Title>
        <Card.Text className={styles.cardbody}>
          {/* This is a wider card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer. */}
        </Card.Text>
      </Card.Body>
      {/* <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer> */}
      </Link>
    </Card>

    <Card>
    <Link className="Link" to="/monthlyplan">
    <FcTodoList className={styles.cardIcon} /> 
      <Card.Body>
        <Card.Title className={styles.cardTitle} >Monthly Plan</Card.Title>
        <Card.Text className={styles.cardbody}>
          {/* This is a wider card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer. */}
        </Card.Text>
      </Card.Body>
      {/* <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer> */}
      </Link>
    </Card>
    <Card>
    <Link className="Link" to="/syllabus">
    <FcReadingEbook className={styles.cardIcon} /> 
      <Card.Body>
        <Card.Title className={styles.cardTitle} >Book Reading(Syllabus)</Card.Title>
        <Card.Text className={styles.cardbody}>
          {/* This is a wider card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer. */}
        </Card.Text>
      </Card.Body>
      {/* <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer> */}
      </Link>
    </Card>
    
  </CardGroup>


  <CardGroup>
    

   
    <Card>
    <Link className="Link" to="/accomplishment">
    <FcPlanner className={styles.cardIcon} /> 
      <Card.Body>
        <Card.Title className={styles.cardTitle} >Plan VS Accomplishment</Card.Title>
        <Card.Text className={styles.cardbody}>
          {/* This is a wider card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer. */}
        </Card.Text>
      </Card.Body>
      {/* <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer> */}
      </Link>
    </Card>

    <Card>
    <Link className="Link" to="/counselor">
    <FcManager className={styles.cardIcon} /> 
      <Card.Body>
        <Card.Title className={styles.cardTitle} >Counselor</Card.Title>
        <Card.Text className={styles.cardbody}>
          {/* This is a wider card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer. */}
        </Card.Text>
      </Card.Body>
      {/* <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer> */}
      </Link>
    </Card>

    <Card>
    <Link className="Link" to="/reviewee">
    <FcComments className={styles.cardIcon} /> 
      <Card.Body>
        <Card.Title className={styles.cardTitle} >Reviewee</Card.Title>
        <Card.Text className={styles.cardbody}>
          {/* This is a wider card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer. */}
        </Card.Text>
      </Card.Body>
      {/* <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer> */}
      </Link>
    </Card>
    <Card>
    <Link className="Link" to="/contactus">
    <FcBusinessContact className={styles.cardIcon} /> 
      <Card.Body>
        <Card.Title className={styles.cardTitle} >Contact Us</Card.Title>
        <Card.Text className={styles.cardbody}>
          {/* This is a wider card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer. */}
        </Card.Text>
      </Card.Body>
      {/* <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer> */}
      </Link>
    </Card>
    
    
  </CardGroup>
  </div>
  )
}

export default Deshbordbody
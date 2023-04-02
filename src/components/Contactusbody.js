import React, { useState, useEffect } from "react";
import swal from 'sweetalert';
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { ExternalLink } from 'react-external-link';
import { Container, Row, Col } from "react-bootstrap";
import styles from "../assets/css/body.module.css";
import {
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import config from "../config";

const Contactusbody = () => {


   
    const [status, setStatus] = useState(undefined);// For message

  const [name,setName]=useState('');
  const [phone,setPhone]=useState(null);
  const [email,setEmail]=useState('');
  const [message,setMessage]=useState('');

  const [w, setWidth] = useState(window.innerWidth); //width
  const bp = 620; //breakpoint

  useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
    the "width" state variable when the window size changes */
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    /* passing an empty array as the dependencies of the effect will cause this
    effect to only run when the component mounts, and not each time it updates.
    We only want the listener to be added once */
  }, []);


const sendDataToApi= async (e)=>{
  e.preventDefault();
 
const res= axios.post(`${config.apiUrl}feedback/`,{
  name,
  phone,
  email,
  message
})
.then((res) => {
setStatus({ type: 'success' });
swal("Success!", "Feedback successfully added", "success");
e.target.reset();
})
.catch((error) => {
setStatus({ type: 'error', error });
swal("Error", "Feedback Not Added", "warning");
});

}

  return (
    <div className={styles.bodysection}>
      <Container className="">
        <Row className="justify-content-md-center ">
          <Col lg="12" className={styles.bodybg}>
            <Row>
              <Col lg="12">
                <div className={styles.bodyheaderleft}  style={w<bp ? {width:'100%'} : {width:'50%'}}>
                  <FaClock /> Contact Us
                </div>
                <div className={styles.bodyheaderright}></div>
              </Col>
            </Row>
            <Row>
              <Col lg="4">
                <div className={styles.contuctarea}>
                  <h2 style={{ color: "green" }}>Contact</h2>
                  <span>
                   Call Us : 073-656 97 22
                   
                   
                  </span>
                </div>
              </Col>
              <Col lg="4">
                <div className={styles.contuctarea}>
                  <h2 style={{ color: "green" }}>Address</h2>
                  <span>
                  Sätra torg 3, 127 38 Skärholmen
                   
                  </span>
                </div>
              </Col>
              <Col lg="4">
                <div className={styles.contuctarea}>
                  <h2 style={{ color: "green" }}>Follow Us on</h2>
                  <ExternalLink className={styles.socialmedia1} target="_blank" href="https://www.facebook.com/smsamfund">
                    <p>
                      <FaFacebook />{" "}
                    </p>
                  </ExternalLink>
                  <ExternalLink className={styles.socialmedia2} target="_blank" href="#">
                    {" "}
                    <p>
                      <FaTwitter />{" "}
                    </p>
                  </ExternalLink>
                  <ExternalLink className={styles.socialmedia3} target="_blank" href="https://www.instagram.com/smsamfund/">
                    {" "}
                    <p>
                      <FaInstagram />{" "}
                    </p>
                  </ExternalLink>
                  <ExternalLink className={styles.socialmedia4} target="_blank" href="#">
                    {" "}
                    <p>
                      <FaYoutube />{" "}
                    </p>
                  </ExternalLink>
                </div>
              </Col>
            </Row>

            <Row>
              <Col lg="3">

              </Col>

              <Col lg="6"> 
              <form onSubmit={sendDataToApi}>
                <h2 className={styles.feedbackarea}>Give Feedback</h2>
               
                  <div className={styles.inputitmdivsignup}>
                    <input
                      type="text"
                        name="name"
                      className={styles.inputitmfeedback}
                      placeholder="Your name *"
                     //  value={name}
                     required="required"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
              
                <div className={styles.inputitmdivsignup}>
                  <input
                    type="number"
                    name="phone"
                    className={styles.inputitmfeedback}
                    placeholder="Your Phone"
                   // value={phone}
               
                   onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className={styles.inputitmdivsignup}>
                  <input
                    type="email"
                    name="email"
                    className={styles.inputitmfeedback}
                    placeholder="Your Email *"
                    //  value={email}
                     required="required"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={styles.inputitmdivsignup}>
                  <input
                    name="message"
                    type="textarea"
                    className={styles.inputitmfeedback}
                    placeholder="Your Message *"
                     //value={message}
                     required="required"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className={styles.inputitmdivsignup}>
                  <button className={styles.feedbackbtn} type="submit">Submit</button>
                </div>
              
                </form>
                </Col>
              <Col lg="3"></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contactusbody;

import React from "react";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import ModalDialog from "react-bootstrap/ModalDialog";
import styles from "../assets/css/body.module.css";
import { FaUserAlt, FaBell } from "react-icons/fa";
import UserItem from "./Items/UserItem";
import ReviweeUser from "./Items/ReviweeUser";
import MonthReportSummary from "./Items/MonthReportSummary";
import Monthlyreportbody from "./Monthlyreportbody";

import Table from "react-bootstrap/Table";
import axios from "axios";
import swal from "sweetalert";
import { margin } from "@mui/system";
import { PublicTwoTone } from "@mui/icons-material";
import config from "../config";
import CcomplishmentbodyCopy from "./AccomplishmentbodyCopy";

const Revieweebody = () => {
  ////axios Request--------------------
  const makeRequest = async (config) => {
    return await axios(config);
  };

  const [status, setStatus] = useState(undefined); // For message

  const [user, setUser] = useState(localStorage.getItem("user_id"));

  const [data, setData] = useState([]);
  const [adviceData, setAdviceData] = useState([]);
  const [filterVal, seFilterVal] = useState([]);
  const [filterCon, setFilterCon] = useState([]);

  // const [time, setTime] = useState("");
  const [reviewee, setReviewee] = useState(null);
  const [counsellor, setCounsellor] = useState(user);
  const [advice, setAdvice] = useState("");
  const [reviweeUser, setReviweeData] = useState([]);

  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [disable, setDisable] = useState('disabled');

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

  ///======================================================================

  const fetchAdvice = async () => {
    const response = await fetch(`${config.apiUrl}advice/`)
      .then((Response) => Response.json())
      .then((res) => {
        const filterRes = res.filter((item) => item.counsellor == user);
        const descending = filterRes.sort(
          (a, b) => Number(b.id) - Number(a.id)
        );
        setFilterCon(descending);
      });
  };
  useEffect(() => {
    fetchAdvice();
  }, [filterCon]);

  //-------------------------------------
  const fetchData = async () => {
    makeRequest(`${config.apiUrl}userInfo/` + user + "/").then((res) => [
      setReviweeData(res.data.reviewee),
    ]);
    // .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  ///-----------------------------------

  const sendDataToApi = async (event) => {
    event.preventDefault();

    const addreviweeUser = {
      reviewee,
      counsellor,
      advice,
    };
    const res = axios
      .post(`${config.apiUrl}advice/`, addreviweeUser)
      .then(() => {
        setStatus({ type: "success" });
        swal("Success!", "Successfully added", "success");
       // setReviweeData([addreviweeUser, ...reviweeUser]);
        event.target.reset();
      })
      .catch((error) => {
        setStatus({ type: "error", error });
        swal("Error", "Not added", "warning");
      });
  };
 
  ///====================================
  const [show, setShow] = useState(false);
  const [model, setModel] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    const response = fetch(`${config.apiUrl}advice/` + e + "/")
      .then((Response) => Response.json())
      .then((res) => {
        setModel(res);
        setShow(true);

      });
  };
  

  //=========================================
  
  ///=========================================

  return (
    <div className={styles.loginbody}>
      <Container className="">
        <Row className="justify-content-md-center">
          <Col xs lg="1"></Col>
          <Col lg="10">
            <div className="allbodybg">
              {/* from header */}
              <Row>
                <div>
                  <form onSubmit={(event) => sendDataToApi(event)}>
                    <Col lg="12">
                      <div>
                        <div className={styles.bodyheaderleft} style={w<bp ? {width:'100%'} : {width:'50%'}}>
                          <FaUserAlt /> Reviewee
                        </div>
                        <div className={styles.bodyheaderright} style={w<bp ? {width:'100%'} : {width:'50%'}}>
                          <select
                            className={styles.inputmonthlydate}
                            type="select"
                            required="required"
                            onChange={(e) => setReviewee(e.target.value)}
                          >
                            <option selected disabled>
                              Select Reveiwee
                            </option>
                            {reviweeUser.map((item, index) => {
                              return <ReviweeUser item={item} index={index} />;
                            })}
                          </select>
                          <input
                            type="submit"
                            className={styles.inputmonthlydate}
                            value="Submit"
                          />
                        </div>
                      </div>
                    </Col>

                    <Col lg="12">
                      <div className={styles.counselor}>
                        {reviewee != null ? (
                          <textarea  style={w<bp ? {padding: "10px 5%"} : {width:'100%'}}
                          className={styles.inputdate}
                          type="textarea"
                          required="required"
                          rows="3"
                          placeholder="Type your review here"
                          onChange={(e) => setAdvice(e.target.value)}
                        ></textarea>
                        ) : (
                        <p></p>
                        )}
                        {" "}
                      </div>
                    </Col>
                  </form>
                </div>
              </Row>

              <Row>
                <Col lg="7" style={{ paddingRight: "0px" }}>
                  <div>
                    <CcomplishmentbodyCopy
                      user={reviewee}
                    />
                  </div>
                </Col>
                <Col lg="5" style={{ paddingLeft: "0px" }}>
                  <h3 className={styles.lastadviser}>
                    <FaBell /> Last Review to Reviewees
                  </h3>
                  <div className={styles.scrollable}>
                    {filterCon.map((item, index) => {
                      return (
                        <div className={styles.lastadviserlist}>
                          <div>
                            <UserItem
                              time={item.time}
                              counsellor={item.counsellor}
                              review={item.reviewee}
                              seen={item.seen}
                            />
                            <div onClick={() => handleShow(item.id)}>
                              <p style={{ cursor: "pointer" }}>
                                {item.advice.length >= 90
                                  ? item.advice.substring(0, 90) +
                                    "....See More"
                                  : item.advice}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Col>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ width: "90%" }}>
                      <UserItem
                        time={model.time}
                        counsellor={model.counsellor}
                        review={model.reviewee}
                      />
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{model.advice}</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Row>

              {/* from body */}

              {/* from body End */}
            </div>
          </Col>
          <Col xs lg="1"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Revieweebody;

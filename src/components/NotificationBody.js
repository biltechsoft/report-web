import React from "react";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import styles from "../assets/css/body.module.css";
import UserItenCounselor from "./Items/UserItenCounselor";
import CounselorList from "./Items/CounselorList";
import NotificationSeen from "./Items/NotificationSeen";

import { FaUserAlt, FaBell } from "react-icons/fa";
import Table from "react-bootstrap/Table";
import axios from "axios";
import config from "../config";

const NotificationBody = () => {
  ////axios Request--------------------
  const makeRequest = async (configr) => {
    return await axios(configr);
  };

  const user = localStorage.getItem("user_id");
  const myString = user;
  const seenId = parseInt(myString);
  const [allseenList, setAllseenList] = useState([]);
  const [nallseenList, setNAllseenList] = useState([]);

  const [adviceData, setAdviceData] = useState([]);
  const [advice, setAdvice] = useState("");
  const [data, setData] = useState([]);
  const [searchApiData, setsearchApiData] = useState([]);
  const [filterVal, seFilterVal] = useState("");
  const [filterCon, setFilterCon] = useState([]);

  const [counsellor, setCounsellor] = useState([]);

  ///=======================================
  const [globalDataCon, setglobalDataCon] = useState([]);
  const [globalfilterCon, setglobalfilterCon] = useState([]);

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

  const globalfetchNotification = async () => {
    const response = await fetch(`${config.apiUrl}notification/`)
      .then((Response) => Response.json())
      .then((result) => {
        const descendingglobalDataCon = result.sort(
          (a, b) => Number(b.id) - Number(a.id)
        );
        setglobalDataCon(descendingglobalDataCon);
        const filterRes = result.filter((item) => item.seenList == user);
        const descending = filterRes.sort(
          (a, b) => Number(b.id) - Number(a.id)
        );
        setglobalfilterCon(descending);
      });
  };
  useEffect(() => {
    globalfetchNotification();
  }, []);

  ///=================================================

  const [show, setShow] = useState(false);
  const [model, setModel] = useState([]);
  const [postId, setPostId] = useState([]);

  const handleClose = () => setShow(false);

  const handleCloseSeen = () => {
    const data = {
      id: model.id,
      time: model.time,
      title: model.title,
      details: model.details,
      seenList: [...model.seenList, user],
    };

    console.log(data);

    axios
      .put(`${config.apiUrl}notification/` + postId + "/", data)
      .then(() => {
        console.log("::");
      })
      .catch((error) => {
        console.log(error.message);
      });

    setShow(false);
  };
  const handleShow = (e) => {
    const response = fetch(`${config.apiUrl}notification/` + e + "/")
      .then((Response) => Response.json())
      .then((res) => {
        setModel(res);
        setShow(true);
      });
  };

  const handleShowSeen = (id) => {
    const response = fetch(`${config.apiUrl}notification/` + id + "/")
      .then((Response) => Response.json())
      .then((res) => {
        setModel(res);
        setPostId(id);
        setAllseenList(res.seenList);
        setShow(true);
      });

    // const arr = allseenList;

    // if (!arr.includes(seenId)) {
    //   //checking weather array contain the id
    //   arr.push(seenId); //adding to array because value doesnt exists
    // } else {
    //   arr.splice(arr.indexOf(seenId), 1); //deleting
    // }
    // setNAllseenList(arr);
  };

  return (
    <div className={styles.loginbody}>
      <Container className="">
        <Row className="justify-content-md-center">
          <Col xs lg="1"></Col>
          <Col lg="10">
            <div className="allbodybg">
              {/* from header */}
              <Row>
                <Col lg="12">
                  <div>
                    <div className={styles.bodyheaderleft} style={w<bp ? {width:'100%'} : {width:'50%'}}>
                      <FaUserAlt /> Notification
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg="12">
                  <h3 className={styles.lastadviser}>
                    <FaBell /> Last Notification
                  </h3>
                  <div className={styles.scrollable}>
                    {globalDataCon.map((item, index) => {
                      return (
                        <div className={styles.lastadviserlist}>
                          <div>
                            <h6 style={{ widht: "100%" }}>
                              <NotificationSeen seenList={item.seenList} />{" "}
                              {item.title}
                            </h6>

                            <div onClick={() => handleShowSeen(item.id)}>
                              <p style={{ cursor: "pointer" }}>
                                {item.details.length >= 150
                                  ? item.details.substring(0, 150) +
                                    "....See More"
                                  : item.details}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Col>
                <Modal show={show} onHide={handleCloseSeen}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ width: "90%" }}>
                      {model.title}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{model.details}</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSeen}>
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

export default NotificationBody;

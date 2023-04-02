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

import { FaUserAlt, FaBell } from "react-icons/fa";
import Table from "react-bootstrap/Table";
import axios from "axios";
import config from "../config";

const Counselorbody = () => {
  ////axios Request--------------------
  const makeRequest = async (configr) => {
    return await axios(configr);
  };

  const [user, setUser] = useState(localStorage.getItem("user_id"));
  const [adviceData, setAdviceData] = useState([]);
  const [advice, setAdvice] = useState("");
  const [data, setData] = useState([]);
  const [searchApiData, setsearchApiData] = useState([]);
  const [filterVal, seFilterVal] = useState("");
  const [filterCon, setFilterCon] = useState([]);

  const [counsellor, setCounsellor] = useState([]);

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

  ///=================================================
  const getData = () => {
    makeRequest(`${config.apiUrl}userInfo/` + user + "/").then((res) => [
      setCounsellor(res.data.counsellor),
    ]);
    // .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, [counsellor]);
  //==================================================
  const fetchAdvice = async () => {
    const response = await fetch(`${config.apiUrl}advice/`)
      .then((Response) => Response.json())
      .then((res) => {
        const filterRes = res.filter((item) => item.reviewee == user);
        const descending = filterRes.sort(
          (a, b) => Number(b.id) - Number(a.id)
        );
        setFilterCon(descending);
      });
  };
  useEffect(() => {
    fetchAdvice();
  }, []);

  ///=================================================
  useEffect(() => {
    const fetchData = async () => {
      fetch(`${config.apiUrl}userInfo/`)
        .then((Response) => Response.json())
        .then((json) => {
          setData(json);
          setsearchApiData(json);
        });
    };
    fetchData();
  }, []);

  const handleFilter = (e) => {
    if (e.target.value == "") {
      setData(searchApiData);
    } else {
      const filterResult = searchApiData.filter(
        (item) =>
          item.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.lastName.toLowerCase().includes(e.target.value.toLowerCase())
      );

      setData(filterResult);
    }
    seFilterVal(e.target.value);
  };

  const [show, setShow] = useState(false);
  const [model, setModel] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    const response = fetch(`${config.apiUrl}advice/` + e + "/")
      .then((Response) => Response.json())
      .then((res) => {
        setModel(res);
        setShow(true);

        const seen = 1;
        const data = { seen };

        axios
          .patch(`${config.apiUrl}advice/` + e + "/", data)
          .then((Response) => Response.json())
          .then(() => {})
          .catch((error) => {});

      });
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
                      <FaUserAlt /> Counselor
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg="6">
                  
                  <div className={styles.counselor}>
                    {counsellor.map((item, index) => {
                      return (
                        <h4 className={styles.counselorlist} key={item}>
                          <CounselorList useid={item} index={index} />
                        </h4>
                      );
                    })}
                  </div>
                </Col>

                <Col lg="6">
                  <h3 className={styles.lastadviser}>
                    <FaBell /> Last Review from Counsellors
                  </h3>
                  <div className={styles.scrollable}>
                    {filterCon.map((item, index) => {
                      return (
                        <div className={styles.lastadviserlist}>
                          <div>
                            <UserItenCounselor
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
                      <UserItenCounselor
                        time={model.time}
                        counsellor={model.counsellor}
                        review={model.reviewee}
                        seen={model.seen}
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

export default Counselorbody;

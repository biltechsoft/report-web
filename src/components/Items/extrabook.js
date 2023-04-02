import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../assets/css/body.module.css";
import { FaBook } from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import config from "../../config"
const Syllabusbody = () => {
  const apiurl = "http://127.0.0.1:8000/api/userInfo/";

  const user = localStorage.getItem("user_id");

  const [bookStudy, setBookStudy] = useState("");
  const [bookRead, setbookRead] = useState([]);
  const [users, setTBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookList, setBookList] = useState([]);

  ///---------------------------------------------------

  const getFetchData = () => {
    return axios.get("http://127.0.0.1:8000/api/book/");
  };

  const getUserBookData = () => {
    return axios.get(apiurl + user + "/");
  };

  const getData = async () => {
    const [fetchBookData, userBookData] = await Promise.all([
      getFetchData(),
      getUserBookData(),
    ]);

    setTBook(fetchBookData.data);
    setBookList(userBookData.data.bookRead);
    setbookRead(userBookData.data.bookRead);
    setBookStudy(userBookData.data.bookRead.length);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  //----------------------------------------------------
  const totalbook = users.length;

  ///--------------------------------------------------------
  const Progress = (bookStudy / totalbook) * 100;
  ///---------------------------------------------------------
  const toggleHandler = (newId) => () => {
    const arr = bookRead;

    if (!arr.includes(newId)) {
      //checking weather array contain the id
      arr.push(newId); //adding to array because value doesnt exists
    } else {
      arr.splice(arr.indexOf(newId), 1); //deleting
    }

    setbookRead(arr);
  };

  const updateBookData = async (e) => {
    e.preventDefault();
    const data = {
      bookRead,
    };

    await axios
      .patch(apiurl + user + "/", data)
      .then(() => {
        swal("Success!", "Book Reading successfully add", "success");
      })
      .catch((error) => {
        swal("Error", "Book Reading Not add", "warning");
      });
  };

  //-----------------------------------------

  ///-----------------------------------------

  return loading ? (
    <h1>Loaidng...</h1>
  ) : (
    <div className={styles.loginbody}>
      <form onSubmit={updateBookData}>
        {users.length > 0 && (
          <Container className="">
            <Row className="justify-content-md-center">
              <Col xs lg="2"></Col>
              <Col lg="8">
                <div className="allbodybg">
                  {/* from header */}
                  <Row>
                    <Col lg="12">
                      <div>
                        <div className={styles.bodyheaderleft}>
                          <FaBook /> Syllabus
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="12">
                      <h2 className={styles.totalprogress}>Total Completed </h2>
                      <div className={styles.totalprogressbar}>
                        <ProgressBar
                          variant="success"
                          now={Progress}
                          label={parseFloat(Progress).toFixed(2) + " %"}
                        />{" "}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <div className={styles.totalprogressbar}>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>SL</th>
                              <th>Book Name</th>
                              <th>Completed</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((item, index) => (
                              <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.bookName} </td>

                                <td>
                                  <input
                                    type="checkbox"
                                    onChange={toggleHandler(item.id)}
                                    value={bookList.includes(item.id)}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </Row>
                  <Row></Row>
                  {/* from body */}

                  {/* from body End */}
                  <div className={styles.inputitmbtnsavearea}>
                    <input
                      type="submit"
                      className={styles.inputitmbtnsave}
                      value="Save"
                    />
                  </div>
                </div>
              </Col>
              <Col xs lg="2"></Col>
            </Row>
          </Container>
        )}
      </form>
    </div>
  );
};

export default Syllabusbody;

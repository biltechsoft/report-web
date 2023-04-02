import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../assets/css/body.module.css";
import { FaBook } from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import config from "../config";
import { ExternalLink } from "react-external-link";
const Syllabusbody = () => {


  const user = localStorage.getItem("user_id");
  const [book, setTBook] = useState([]);
  const [bookStudy, setBookStudy] = useState("");
  const [bookRead, setbookRead] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookList, setBookList] = useState([]);
 
  
  ///---------------------------------------------------

  const fetchData = () => {
    fetch(`${config.apiUrl}book/`)
      .then((Response) => Response.json())
      .then((result) => {
        setTBook(result);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
//====================================================

const userbookData = () => {
  fetch(`${config.apiUrl}userInfo/` + user + "/")
    .then((Response) => Response.json())
    .then((result) => {
      setBookList(result.bookRead);
      setbookRead(result.bookRead);
      setBookStudy(result.bookRead.length);
    })
    .then(() => setLoading(false));
};

useEffect(() => {
  userbookData();
}, []);


  //----------------------------------------------------
  const totalbook = book.length;

  ///--------------------------------------------------------
  const Progress = (bookStudy / totalbook) * 100;
  const pbgcolor=Progress<=25?"danger":Progress<=50?"warning":Progress<=75?"info":"success";

  ///---------------------------------------------------------
  const toggleHandler = (item) => () => {
    const arr = bookRead;
    const newId = item.id;

    if (!arr.includes(newId)) {
      //checking weather array contain the id
      arr.push(newId); //adding to array because value doesnt exists
    } else {
      arr.splice(arr.indexOf(newId), 1); //deleting
    }

    setbookRead(arr);
  };

  // useEffect(() => {
  //   toggleHandler();
  // }, [bookRead]);

  //----------------------------------------------------------

  const updateBookData = async (e) => {
    e.preventDefault();
    const data = {
      bookRead,
    };

    await axios
      .patch(`${config.apiUrl}userInfo/` + user + "/", data)
      .then(() => {
        swal("Success!", "Book Reading successfully add", "success");
      })
      .catch((error) => {
        swal("Error", "Book Reading Not add", "warning");
      });
  };

  
  ///-----------------------------------------

  return loading ? (
    <h1>Loaidng...</h1>
  ) : 
  (
    <div className={styles.loginbody}>
      <form onSubmit={updateBookData}>
        {book.length > 0 && (
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
                      <p className={styles.totalprogressbar}>
                        <ProgressBar
                          variant={pbgcolor}
                          now={Progress}
                          label={parseFloat(Progress).toFixed(2) + " %"}
                        />{" "}
                      </p>
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
                            {book.map((item, index) => (
                              <tr key={item.id}>
                                <td>{item.id}</td>
                                <ExternalLink
                
                target="_blank"
                style={{textDecoration:"none",color:"black"}}
                href={item.downloadLink}
              ><td> {item.bookName} </td></ExternalLink>

                                <td>
                                  <input
                                    type="checkbox"
                                    onChange={toggleHandler(item)}
                                    value={bookList.includes(item.id)}
                                    defaultChecked={bookList.includes(item.id)}
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

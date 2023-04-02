import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../assets/css/body.module.css";
import { FaUserAlt, FaBell } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import Table from "react-bootstrap/Table";
import config from "../config";

const Monthlysummarybody = () => {
  const [user,setUser]=sessionStorage.getItem("user");
  const [data, setData] = useState([]);
  const [searchApiData, setsearchApiData] = useState([]);
  const [filterVal, setFilterVal] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      fetch(`${config.apiUrl}monthly/`)
        .then((Response) => Response.json())
        .then((json) => {
          setData(json);
          setsearchApiData(json);
        });
    };
    fetchData();
  }, []);

  const handleFilter = (e) => {

      const filterResult = searchApiData.filter((item) =>
        item.month ==e.target.value && item.user==user
      );
      setData(filterResult);
   console.log(filterResult);
   
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
                <div className={styles.bodytopheight}>
                  <div className={styles.bodyheaderleft}>
                    <FaClipboardList /> Monthly summary
                  </div>
                  <div className={styles.bodyheaderright}>
                    <select
                      className={styles.counselorrightinput}
                      type="text"
                      placeholder="Search Counselor"
                      onInput={(e) => handleFilter(e)}
                    ><option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option></select>
                  </div>
                </div>
              </Row>

              <Row>
                <Col lg="12">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">#1</th>
                        <th scope="col">#2</th>
                        <th scope="col">#3</th>
                        <th scope="col">#4</th>
                        <th scope="col">#5</th>
                        <th scope="col">#6</th>
                        <th scope="col">#7</th>
                        <th scope="col">#8</th>
                        <th scope="col">#9</th>
                        <th scope="col">#10</th>
                        <th scope="col">#11</th>
                        <th scope="col">#12</th>
                        <th scope="col">#13</th>
                        <th scope="col">#14</th>
                        <th scope="col">#15</th>
                        <th scope="col">#16</th>
                        <th scope="col">#17</th>
                        <th scope="col">#18</th>
                       
                      </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => {
                      return (
                      <tr>
                     
                        <th scope="row">{item.month} </th>
                        <td>{item.quranStudy} </td>
                        <td>{item.hadithStudy} </td>
                        <td>{item.bookStudy} </td>
                        <td>{item.lectureListening} </td>
                        <td>{item.salat} </td>
                        <td>{item.dawahProgram} </td>
                        <td>{item.memberContact} </td>
                        <td>{item.socialWork} </td>
                        <td>{item.dawahMaterial} </td>
                        <td>{item.distribution} </td>
                        <td>{item.familyMeeting} </td>
                        <td>{item.orgProgram} </td>
                        <td>{item.orgTime} </td>
                        <td>{item.selfCriticism} </td>
                        <td>{item.eyanatPaid} </td>
                        <td>{item.supporterIncrease} </td>
                        <td>{item.studyCircle} </td>
                        <td>{item.monthlyComment} </td>  
                        
                      </tr>
                      );
                    })}
                    </tbody>
                  </table>

                </Col>
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

export default Monthlysummarybody;

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
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import styles from "../assets/css/body.module.css";
import { FaUserAlt, FaBell } from "react-icons/fa";
import config from "../config";
import axios from "axios";
import swal from "sweetalert";
import { API } from "../api-service";

const AccountBody = () => {

////axios Request--------------------
const makeRequest = async (config) => {
  return await axios(config);
};

const [status, setStatus] = useState(undefined); // For message

const user = localStorage.getItem("user_id");
const token = localStorage.getItem("token");

const [accountInfo, setAccountInfo] = useState([]);

const [firstName, setFirstName] = useState();
const [lastName, setLastName] = useState();
const [phone, setPhone] = useState();
const [region, setRegion] = useState();
const [branch, setBranch] = useState();
const [zone, setZone] = useState();
const [unit, setUnit] = useState();
const [responsibility, setResponsibility] = useState();

const [branches, setBranches] = useState([]);
const [zones, setZones] = useState([]);
const [units, setUnits] = useState([]);
const [responsibilities, setResponsibilities] = useState([]);

const [start, setStart] = useState(false);
const [update, setUpdate] = useState(false);

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



useEffect(() => {
  API.getBranches(token)
  .then( resp =>  setBranches(resp))
  .catch (error => console.log(error));

  API.getUnits(token)
  .then( resp =>  setUnits(resp))
  .catch (error => console.log(error));

  API.getZones(token)
  .then( resp =>  setZones(resp))
  .catch (error => console.log(error));

  API.getResponsibilities(token)
  .then( resp =>  setResponsibilities(resp))
  .catch (error => console.log(error));

  API.getUser(user, token)
  .then( resp =>  setAccountInfo(resp))
  .catch (error => console.log(error));
}, [start]);

useEffect(() => {
  getUserInfo();
}, [accountInfo, update]);

const getUserInfo = () => {
  setFirstName(accountInfo.firstName);
  setLastName(accountInfo.lastName);
  setPhone(accountInfo.phone);
  setBranch(accountInfo.branch);
  setZone(accountInfo.zone);
  setUnit(accountInfo.unit);
  setResponsibility(accountInfo.responsibility);
}
const hendleSubmit = (e) => {
  const data = { 
    user, 
    firstName,
    lastName,
    phone 
  };
  API.updateUser(user, data, token)
  .then( resp => {
    console.log(resp);
      if(resp.user == user) {
          swal("Success!", "User Info Updated", "success");
          setUpdate(!update);
      }
      else {
          swal("Error", "User Info Not Updated", "warning");
      }
  })
  .catch(error => {
      swal("Error", "User Info Not Updated", "warning");
  });
}

  /*/-------------------------------------
  const fetchData = async () => {
    makeRequest(`${config.apiUrl}userInfo/` + user + "/")
    .then((res) => [
      setAccountInfo(res.data),
    ]);
    // .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);


  ///=====================================
  

const hendleSubmit1=(e)=>{
  e.preventDefault();
  const data = {  
    firstName,
    lastName,
    region,
    responsibility,
    phone 
  }; 
  axios
  .patch(`${config.apiUrl}userInfo/` + user + "/", data)
  .then((res) => {
    setStatus({ type: "success" });
    swal("Success!", "Successfully Updated", "success");
  })
  .catch((error) => {
    setStatus({ type: "error", error });
    swal("Error", "Not added", "warning");  
  
  });

}
console.log(firstName);*/
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
                      <FaUserAlt /> Account Info
                    </div>
                    {/*<div className={styles.bodyheaderright} style={w<bp ? {width:'100%'} : {width:'50%'}}>
                   
                          <button
                          style={w<bp ? {align: 'center'} : {marginLeft:"50%"}}
                            type="button"
                            className={styles.inputmonthlydate}
                            onClick={hendleSubmit}
                          >Submit</button>
                     </div>*/}
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg="12">
                     <div class="container text-center">
                        <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>
                              First Name
                            </div>
                            <div className={styles.frombodyright}>
                                <input
                                type="text"
                                className={styles.inputitem}
                                placeholder="First Name"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                />
                            </div>
                        </div>
                        <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>
                              Last Name
                            </div>
                            <div className={styles.frombodyright}>
                                <input
                                type="text"
                                className={styles.inputitem}
                                placeholder="Last Name"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                />
                            </div>
                        </div>
                        <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>
                              Phone Number
                            </div>
                            <div className={styles.frombodyright}>
                                <input
                                type="number"
                                className={styles.inputitem}
                                placeholder="Phone Number"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                />
                            </div>
                        </div>

                        <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>
                              Branch
                            </div>
                            <div className={styles.frombodyright}>
                                <input
                                type="text"
                                className={styles.inputitem}
                                placeholder="Admin will add Branch"
                                value={branch && branches.length>=Number(branch) ? branches[Number(branch)-1].branchName : ''}
                                disabled
                                />
                            </div>
                        </div>

                        <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>
                              Zone
                            </div>
                            <div className={styles.frombodyright}>
                                <input
                                type="text"
                                className={styles.inputitem}
                                placeholder="Admin will add Zone"
                                value={zone && zones.length>=Number(zone) ? zones[Number(zone)-1].zoneName : ''}
                                disabled
                                />
                            </div>
                        </div>

                        <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>
                              Unit
                            </div>
                            <div className={styles.frombodyright}>
                                <input
                                type="text"
                                className={styles.inputitem}
                                placeholder="Admin will add Unit"
                                value={unit && units.length>=Number(unit) ? units[Number(unit)-1].unitName : ''}
                                disabled
                                />
                            </div>
                        </div>

                        <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>
                            Responsibility
                            </div>
                            <div className={styles.frombodyright}>
                                <input
                                type="text"
                                className={styles.inputitem}
                                placeholder="Admin will add Responsibility"
                                value={responsibility && responsibilities.length>=Number(responsibility) ? responsibilities[Number(responsibility)-1].responsibilityName : ''}
                                disabled
                                />
                            </div>
                        </div>

                        <div className={styles.fromarea}> {/*submit button */}
                            <button
                            className={styles.inputitmbtnsave}
                            onClick={hendleSubmit}
                            >
                                Update Info</button>
                        </div>
                        <br></br>
                        
                      </div>
                </Col>     
              </Row>
            </div>
          </Col>
          <Col xs lg="1"></Col>
        </Row>
      
      </Container>
    </div>
  )
}

export default AccountBody
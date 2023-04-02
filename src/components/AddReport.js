import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../assets/css/body.module.css";
import { FaClipboardList } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FcList } from "react-icons/fc";
import axios from "axios";
import swal from "sweetalert";

const AddReport = () => {

    const apiurl = `${config.apiUrl}input/`;

    const [status, setStatus] = useState(undefined); // For message
  
    const [user, setUser] = sessionStorage.getItem("user");
  
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
  
    const [quranStudy, setQuranStudy] = useState(null);
    const [hadithStudy, setHadithStudy] = useState(null);
    const [bookStudy, setBookStudy] = useState(null);
    const [lectureListening, setLectureListening] = useState(null);
    const [salat, setSalat] = useState(null);
    const [dawahProgram, setDawahProgram] = useState(null);
    const [memberContact, setMemberContact] = useState(null);
    const [socialWork, setSocialWork] = useState(null);
    const [dawahMaterial, setDawahMaterial] = useState(null);
    const [distribution, setDistribution] = useState(null);
    const [familyMeeting, setFamilyMeeting] = useState(null);
    const [orgProgram, setOrgProgram] = useState(null);
    const [orgTime, setOrgTime] = useState(null);
    const [selfCriticism, setSelfCriticism] = useState(0);
    const [comment, setComment] = useState(null);
  
  
    const [supporterName, setSupporterName] = useState(null);
    const [studyCircleDate, setStudyCircleDate] = useState(null);
    const [qiamulLailDate, setQiamulLailDate] = useState(null);
    const [eyanatDate, setEyanatDate] = useState(null);
    const [supporterIncrease, setSupporterIncrease] = useState(null);
    const [monthlyComment, setmonthlyComment] = useState(null);
  
    const [date, setDate] = useState([]);
    const [postId, setPostId] = useState(null);
    const [searchApiData, setsearchApiData] = useState([]);
    const [filterVal, setFilterVal] = useState([]);

  //------------------------------
  //------------------------------------------------------

  const handleFilter = async (e) => {
    // setDate(e.target.value);
     fetch(`${config.apiUrl}input/`)
       .then((Response) => Response.json())
       .then((json) => {
         setsearchApiData(json);
 
         const filterResult = searchApiData.filter(
           (item) => item.date == e.target.value && item.user == user
         );
 
         const postIdresult = filterResult.map((item) => item.inputId);
         setPostId(postIdresult);
         setFilterVal(filterResult);
       //  setFiltVal(filterResult);
       });
   };
   
   useEffect(() => {
     handleFilter();
   }, [month]);
 
 
 ///-----------------------------------
 
const sendDataToApi = async (e) => {
    e.preventDefault();
    const res = axios
      .post(`${config.apiUrl}input/`, {
        user,
        date,
        quranStudy,
        hadithStudy,
        bookStudy,
        lectureListening,
        salat,
        dawahProgram,
        memberContact,
        socialWork,
        dawahMaterial,
        distribution,
        familyMeeting,
        orgProgram,
        orgTime,
        selfCriticism,
        comment,
      })
      .then(() => {
        setStatus({ type: "success" });
        swal("Success!", "Report successfully added", "success");
  
        e.target.reset();
        setDate(null);
      })
      .catch((error) => {
        setStatus({ type: "error", error });
        swal("Error", "Report Not added", "warning");
      });
  };  
  return (
    <div className={styles.loginbody}>
       <form onSubmit={sendDataToApi}>
        <Container className="">
          <Row className="justify-content-md-center">
            <Col xs lg="2"></Col>
            <Col lg="8">
              <div className="allbodybg">
                {/* from header */}
                <div className={styles.bodytopheight}>
                  <div className={styles.bodyheaderleft}>
                  <FaClock /> Daily Report
                  </div>
                  <div className={styles.bodyheaderright}>
                    <input
                      type="date"
                      required="required"
                      className={styles.inputdate}
                      placeholder="Last Name"
                      onInput={(e) => handleFilter(e)}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
                {/* from body */}
                {filterVal.length >= 1 ? (
                  filterVal.map((item, index) => {
                    return (
                      <div>
                      
                        <div>
                          <div className={styles.fromarea}>
                            <span className={styles.bodyleft}>
                              Daily Fields{" "}
                            </span>
                            <span className={styles.bodyright}>Amount</span>
                          </div>
                          <div className={styles.fromarea}>
                            <div className={styles.frombodyleftfirst}>
                              Quran Study
                            </div>
                            <div className={styles.frombodyrightfirst}>
                              <input
                                type="number"
                                className={styles.inputitemfirst}
                                placeholder="Ayats"
                                onChange={(e) => setQuranStudy(e.target.value)}
                                defaultValue={user.quranStudy}
                              />
                            </div>
                          </div>
                          <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>
                              Hadith Study
                            </div>
                            <div className={styles.frombodyright}>
                              <input
                                type="number"
                                className={styles.inputitem}
                                placeholder="Hadiths"
                                onChange={(e) => setHadithStudy(e.target.value)}
                                defaultValue={user.hadithStudy}
                              />
                            </div>
                          </div>
                          <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>
                              Islamic Book Study
                            </div>
                            <div className={styles.frombodyright}>
                              <input
                                type="number"
                                className={styles.inputitem}
                                placeholder="Hours"
                                min="0"
                                max="24"
                                onChange={(e) => setBookStudy(e.target.value)}
                                defaultValue={user.bookStudy}
                              />
                            </div>
                          </div>
                          <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>
                              Islamic Lecture Listening
                            </div>
                            <div className={styles.frombodyright}>
                              <input
                                type="number"
                                className={styles.inputitem}
                                placeholder="Hours"
                                onChange={(e) =>
                                  setLectureListening(e.target.value)
                                }
                                defaultValue={user.lectureListening}
                              />
                            </div>
                          </div>

                          <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>
                              Salat in Jamayat
                            </div>
                            <div className={styles.frombodyright}>
                              <input
                                type="number"
                                min="1"
                                max="5"
                                className={styles.inputitem}
                                placeholder="Waqta"
                                onChange={(e) => setSalat(e.target.value)}
                                defaultValue={user.salat}
                              />
                            </div>
                          </div>
                          <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>
                              Dawah Program
                            </div>
                            <div className={styles.frombodyright}>
                              <input
                                type="number"
                                className={styles.inputitem}
                                placeholder="Number"
                                onChange={(e) =>
                                  setDawahProgram(e.target.value)
                                }
                                defaultValue={user.familyMeeting}
                              />
                            </div>
                          </div>
                          <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>
                              Member Contact
                            </div>
                            <div className={styles.frombodyright}>
                              <input
                                type="number"
                                className={styles.inputitem}
                                placeholder="Number"
                                onChange={(e) =>
                                  setMemberContact(e.target.value)
                                }
                                defaultValue={user.memberContact}
                              />
                            </div>
                          </div>
                          <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>
                              Social Work
                            </div>
                            <div className={styles.frombodyright}>
                              <input
                                type="number"
                                min="0"
                                max="24"
                                className={styles.inputitem}
                                placeholder="Hours"
                                onChange={(e) => setSocialWork(e.target.value)}
                                defaultValue={user.socialWork}
                              />
                            </div>
                          </div>
                          <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>
                              Dawah Materials Disribution
                            </div>
                            <div className={styles.frombodyright}>
                              <input
                                type="number"
                                className={styles.inputitem}
                                placeholder="Number"
                                onChange={(e) =>
                                  setDawahMaterial(e.target.value)
                                }
                                defaultValue={user.dawahMaterial}
                              />
                            </div>
                          </div>
                          <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>
                              Disribution
                            </div>
                            <div className={styles.frombodyright}>
                              <input
                                type="number"
                                className={styles.inputitem}
                                placeholder="Number"
                                onChange={(e) =>
                                  setDistribution(e.target.value)
                                }
                                defaultValue={user.distribution}
                              />
                            </div>
                          </div>
                          <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>
                              Family Meeting
                            </div>
                            <div className={styles.frombodyright}>
                              <input
                                type="number"
                                className={styles.inputitem}
                                placeholder="Number"
                                onChange={(e) =>
                                  setFamilyMeeting(e.target.value)
                                }
                                defaultValue={user.familyMeeting}
                              />
                            </div>
                          </div>
                          <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>
                              Org. Program
                            </div>
                            <div className={styles.frombodyright}>
                              <input
                                type="number"
                                className={styles.inputitem}
                                
                                placeholder="Number"
                                onChange={(e) => setOrgProgram(e.target.value)}
                                defaultValue={user.orgProgram}
                              />
                            </div>
                          </div>
                          <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>Qrg. Time</div>
                            <div className={styles.frombodyright}>
                              <input
                                type="number"
                                className={styles.inputitem}
                                min="0"
                                max="24"
                                placeholder="Hours"
                                onChange={(e) => setOrgTime(e.target.value)}
                                defaultValue={user.orgTime}
                              />
                            </div>
                          </div>
                          <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>
                              Self-Criticism
                              

                              {/* {user.selfCriticism == '1'? 'checked': null } */}
                            </div>
                            <div className={styles.frombodyright}>
                              
                              <input
                                type="checkbox"
                               
                                className={styles.inputitemcheckbox}
                                value="1"
                                onChange={(e) =>
                                  setSelfCriticism(e.target.checked)
                                }
                              />
                            </div>
                          </div>
                          <div className={styles.fromarea}>
                            <div className={styles.fromtextarea}>
                              <input
                                type="textarea"
                                className={styles.inputitemtextarea}
                                placeholder="Comment (Optional)"
                                onChange={(e) => setComment(e.target.value)}
                                defaultValue={user.comment}
                              />
                            </div>
                          </div>

                          {/* from body End */}
                        </div>

                        <div className={styles.inputitmbtnsavearea}>
                          <input
                            type="submit"
                            className={styles.inputitmbtnsave}
                            value="Update Report"
                          />
                        </div>
                            
                        </div>
                    );
                  })
                ) : (
                  <div><div>
                  <div className={styles.fromarea}>
                    <span className={styles.bodyleft}>Daily Fields </span>
                    <span className={styles.bodyright}>Amount</span>
                  </div>
                  <div className={styles.fromarea}>
                    <div className={styles.frombodyleftfirst}>
                      Quran Study
                    </div>
                    <div className={styles.frombodyrightfirst}>
                      <input
                        type="number"
                        className={styles.inputitemfirst}
                        placeholder="Ayats"
                        onChange={(e) => setQuranStudy(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.fromarea}>
                    <div className={styles.frombodyleft}>Hadith Study</div>
                    <div className={styles.frombodyright}>
                      <input
                        type="number"
                        className={styles.inputitem}
                        placeholder="Hadiths"
                        onChange={(e) => setHadithStudy(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.fromarea}>
                    <div className={styles.frombodyleft}>
                      Islamic Book Study
                    </div>
                    <div className={styles.frombodyright}>
                      <input
                        type="number"
                        className={styles.inputitem}
                        placeholder="Pages"
                        onChange={(e) => setBookStudy(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.fromarea}>
                    <div className={styles.frombodyleft}>
                      Islamic Lecture Listening
                    </div>
                    <div className={styles.frombodyright}>
                      <input
                        type="number"
                        className={styles.inputitem}
                        placeholder="Hours"
                        min="0"
                        max="24"
                        onChange={(e) =>
                          setLectureListening(e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.fromarea}>
                    <div className={styles.frombodyleft}>
                      Salat in Jamayat
                    </div>
                    <div className={styles.frombodyright}>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        className={styles.inputitem}
                        placeholder="Waqta"
                        onChange={(e) => setSalat(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.fromarea}>
                    <div className={styles.frombodyleft}>Dawah Program</div>
                    <div className={styles.frombodyright}>
                      <input
                        type="number"
                        className={styles.inputitem}
                        placeholder="Number"
                        onChange={(e) => setDawahProgram(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.fromarea}>
                    <div className={styles.frombodyleft}>
                      Member Contact
                    </div>
                    <div className={styles.frombodyright}>
                      <input
                        type="number"
                        className={styles.inputitem}
                        placeholder="Number"
                        onChange={(e) => setMemberContact(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.fromarea}>
                    <div className={styles.frombodyleft}>Social Work</div>
                    <div className={styles.frombodyright}>
                      <input
                        type="number"
                        className={styles.inputitem}
                        placeholder="Hours"
                        min="0"
                        max="24"
                        onChange={(e) => setSocialWork(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.fromarea}>
                    <div className={styles.frombodyleft}>
                      Dawah Materials Disribution
                    </div>
                    <div className={styles.frombodyright}>
                      <input
                        type="number"
                        className={styles.inputitem}
                        placeholder="Number"
                        onChange={(e) => setDawahMaterial(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.fromarea}>
                    <div className={styles.frombodyleft}>Disribution</div>
                    <div className={styles.frombodyright}>
                      <input
                        type="number"
                        className={styles.inputitem}
                        placeholder="Number"
                        onChange={(e) => setDistribution(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.fromarea}>
                    <div className={styles.frombodyleft}>
                      Family Meeting
                    </div>
                    <div className={styles.frombodyright}>
                      <input
                        type="number"
                        className={styles.inputitem}
                        placeholder="Number"
                        onChange={(e) => setFamilyMeeting(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.fromarea}>
                    <div className={styles.frombodyleft}>Org. Program</div>
                    <div className={styles.frombodyright}>
                      <input
                        type="number"
                        className={styles.inputitem}
                        placeholder="Number"
                        onChange={(e) => setOrgProgram(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.fromarea}>
                    <div className={styles.frombodyleft}>Qrg. Time</div>
                    <div className={styles.frombodyright}>
                      <input
                        type="number"
                        className={styles.inputitem}
                        placeholder="Hours"
                        min="0"
                        max="24"
                        onChange={(e) => setOrgTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.fromarea}>
                    <div className={styles.frombodyleft}>
                      Self-Criticism
                    </div>
                    <div className={styles.frombodyright}>
                      <input
                        type="checkbox"
                        className={styles.inputitemcheckbox}
                        value="1"
                        onChange={(e) => setSelfCriticism(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.fromarea}>
                    <div className={styles.fromtextarea}>
                      <input
                        type="textarea"
                        className={styles.inputitemtextarea}
                        placeholder="Comment (Optional)"
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* from body End */}
                </div>

                <div className={styles.inputitmbtnsavearea}>
                  <input
                    type="submit"
                    className={styles.inputitmbtnsave}
                    value="Add New Report"
                  />
                </div></div>
                )}
              </div>
            </Col>
            <Col xs lg="2"></Col> 
          </Row>
        </Container>
    </form>
    </div>
  )
}

export default AddReport
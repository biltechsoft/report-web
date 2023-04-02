import React, { useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import styles from "../assets/css/body.module.css";

import { FaClock } from "react-icons/fa";


import axios from "axios";
import swal from "sweetalert";
import config from "../config";
const Dailyreportbody = () => {


  const [status, setStatus] = useState(undefined); // For message

  const user = localStorage.getItem("user_id");

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

  const [quranStudyPost, setQuranStudyPost] = useState('');
  const [hadithStudyPost, setHadithStudyPost] = useState('');
  const [bookStudyPost, setBookStudyPost] = useState('');
  const [lectureListeningPost, setLectureListeningPost] = useState('');
  const [salatPost, setSalatPost] = useState('');
  const [dawahProgramPost, setDawahProgramPost] = useState('');
  const [memberContactPost, setMemberContactPost] = useState('');
  const [socialWorkPost, setSocialWorkPost] = useState('');
  const [dawahMaterialPost, setDawahMaterialPost] = useState('');
  const [distributionPost, setDistributionPost] = useState('');
  const [familyMeetingPost, setFamilyMeetingPost] = useState('');
  const [orgProgramPost, setOrgProgramPost] = useState('');
  const [orgTimePost, setOrgTimePost] = useState('');
  const [selfCriticismPost, setSelfCriticismPost] = useState(0);
  const [commentPost, setCommentPost] = useState('');

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
  //------------------------------------------------------

  const handleFilter = async (e) => {
    // setDate(e.target.value);
    fetch(`${config.apiUrl}input/`)
      .then((Response) => Response.json())
      .then((json) => {
        setsearchApiData(json);

        const filterResult = searchApiData.filter(
          (item) => item.date === e.target.value && item.user === user
        );

        const postIdresult = filterResult.map((item) => item.id);
        setPostId(postIdresult);
        setFilterVal(filterResult);
        //  setFiltVal(filterResult);
      });
  };

  // useEffect(() => {
  //   handleFilter();
  // }, [date]);

  //------------------------------
  const sendDataToApi = async (e) => {
    e.preventDefault();
    const res = axios
      .post(`${config.apiUrl}input/`, {
        user,
        date,
        quranStudy: quranStudyPost,
        hadithStudy:hadithStudyPost,
        bookStudy:bookStudyPost,
        lectureListening:lectureListeningPost,
        salat: salatPost,
        dawahProgram: dawahProgramPost,
        memberContact:memberContactPost,
        socialWork : socialWorkPost,
        dawahMaterial : dawahMaterialPost,
        distribution : distributionPost,
        familyMeeting :  familyMeetingPost,
        orgProgram : orgProgramPost,
        orgTime : orgTimePost,
        selfCriticism : selfCriticismPost,
        comment:commentPost,
      })
      .then(() => {
        setStatus({ type: "success" });
        swal("Success!", "Report successfully added", "success");

        e.target.reset();
        // setDate(null);
      })
      .catch((error) => {
        setStatus({ type: "error", error });
        swal("Error", "Report Not added", "warning");
      });
  };
  ///-----------------------------------

 

  //----------------------------
  const fil1 = filterVal.map((items) => items.selfCriticism);
  const tf1 = fil1 === 1 ? true : false;
  const [checkData, setCheckData] = useState({
    selfCriticism: tf1,
  });
  const chData1 = checkData.selfCriticism === true ? "1" : "0";
  


  //-----------------------------------------
  const addReport = async (e) => {
    e.preventDefault();
    const data = {
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
      selfCriticism: chData1,
      comment,
    };

    await axios
      .put(`${config.apiUrl}input/` + postId + "/", data)
      .then(() => {
        setStatus({ type: "success" });
        swal("Success!", "Report successfully Updated", "success");
      })
      .catch((error) => {
        setStatus({ type: "error", error });
        swal("Error", "Report Not Updated", "warning");
      
      });
  };
//===================================


const hendleChange = (event) => {
  const target = event.target;
  const name = target.name;
  const value = target.type === "checkbox" ? target.checked : target.value;
  setCheckData({
    ...checkData,
    [name]: value,
  });
};
  //----------------------------
  const sbbutton = (e) => {
    filterVal.length >= 1 ? addReport(e) : sendDataToApi(e);
  };

  return (
    <div className={styles.loginbody}>
      <form onSubmit={sbbutton}>
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
                      <div key={item.id}>
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
                              
                                max="1000"
                                className={styles.inputitemfirst}
                                placeholder="Ayats(Number)"
                                onChange={(e) => setQuranStudy(e.target.value)}
                                defaultValue={item.quranStudy}
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
                               
                                max="1000"
                                className={styles.inputitem}
                                placeholder="Hadiths(Number)"
                                onChange={(e) => setHadithStudy(e.target.value)}
                                defaultValue={item.hadithStudy}
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
                                placeholder="Page"
                              
                                max="1000"
                                onChange={(e) => setBookStudy(e.target.value)}
                                defaultValue={item.bookStudy}
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
                               
                                max="24"
                                className={styles.inputitem}
                                placeholder="Hours(0-24)"
                                onChange={(e) =>
                                  setLectureListening(e.target.value)
                                }
                                defaultValue={item.lectureListening}
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
                               
                                max="5"
                                className={styles.inputitem}
                                placeholder="Waqta(0-5)"
                                onChange={(e) => setSalat(e.target.value)}
                                defaultValue={item.salat}
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
                               
                                max="1000"
                                className={styles.inputitem}
                                placeholder="Number"
                                onChange={(e) =>
                                  setDawahProgram(e.target.value)
                                }
                                defaultValue={item.familyMeeting}
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
                              
                                max="1000"
                                className={styles.inputitem}
                                placeholder="Number"
                                onChange={(e) =>
                                  setMemberContact(e.target.value)
                                }
                                defaultValue={item.memberContact}
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
                              
                                max="24"
                                className={styles.inputitem}
                                placeholder="Hours(0-24)"
                                onChange={(e) => setSocialWork(e.target.value)}
                                defaultValue={item.socialWork}
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
                             
                                max="1000"
                                onChange={(e) =>
                                  setDawahMaterial(e.target.value)
                                }
                                defaultValue={item.dawahMaterial}
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
                               
                                max="1000"
                                className={styles.inputitem}
                                placeholder="Number"
                                onChange={(e) =>
                                  setDistribution(e.target.value)
                                }
                                defaultValue={item.distribution}
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
                              
                                max="1000"
                                onChange={(e) =>
                                  setFamilyMeeting(e.target.value)
                                }
                                defaultValue={item.familyMeeting}
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
                               
                                max="24"
                                className={styles.inputitem}
                                placeholder="Hours(0-24)"
                                onChange={(e) => setOrgProgram(e.target.value)}
                                defaultValue={item.orgProgram}
                              />
                            </div>
                          </div>
                          <div className={styles.fromarea}>
                            <div className={styles.frombodyleft}>Qrg. Time</div>
                            <div className={styles.frombodyright}>
                              <input
                                type="number"
                                className={styles.inputitem}
                               
                                max="24"
                                placeholder="Hours(0-24)"
                                onChange={(e) => setOrgTime(e.target.value)}
                                defaultValue={item.orgTime}
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
                                name="selfCriticism"
                              onChange={hendleChange}
                              defaultChecked={tf1}
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
                                defaultValue={item.comment}
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
                  <div>
                    <div>
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
                          
                            max="1000"
                            className={styles.inputitemfirst}
                            placeholder="Ayats(Number)"
                            onChange={(e) => setQuranStudyPost(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className={styles.fromarea}>
                        <div className={styles.frombodyleft}>Hadith Study</div>
                        <div className={styles.frombodyright}>
                          <input
                            type="number"
                           
                                max="1000"
                            className={styles.inputitem}
                            placeholder="Hadiths(Number)"
                            onChange={(e) => setHadithStudyPost(e.target.value)}
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
                          
                                max="1000"
                            className={styles.inputitem}
                            placeholder="Pages"
                            onChange={(e) => setBookStudyPost(e.target.value)}
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
                            placeholder="Hours(0-24)"
                          
                            max="24"
                            onChange={(e) =>
                              setLectureListeningPost(e.target.value)
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
                           
                            max="5"
                            className={styles.inputitem}
                            placeholder="Waqta(0-5)"
                            onChange={(e) => setSalatPost(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className={styles.fromarea}>
                        <div className={styles.frombodyleft}>Dawah Program</div>
                        <div className={styles.frombodyright}>
                          <input
                            type="number"
                           
                                max="1000"
                            className={styles.inputitem}
                            placeholder="Number"
                            onChange={(e) => setDawahProgramPost(e.target.value)}
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
                           
                                max="1000"
                            className={styles.inputitem}
                            placeholder="Number"
                            onChange={(e) => setMemberContactPost(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className={styles.fromarea}>
                        <div className={styles.frombodyleft}>Social Work</div>
                        <div className={styles.frombodyright}>
                          <input
                            type="number"
                            className={styles.inputitem}
                            placeholder="Hours(0-24)"
                           
                            max="24"
                            onChange={(e) => setSocialWorkPost(e.target.value)}
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
                           
                                max="1000"
                            className={styles.inputitem}
                            placeholder="Number"
                            onChange={(e) => setDawahMaterialPost(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className={styles.fromarea}>
                        <div className={styles.frombodyleft}>Disribution</div>
                        <div className={styles.frombodyright}>
                          <input
                            type="number"
                           
                                max="1000"
                            className={styles.inputitem}
                            placeholder="Number"
                            onChange={(e) => setDistributionPost(e.target.value)}
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
                           
                                max="1000"
                            className={styles.inputitem}
                            placeholder="Number"
                            onChange={(e) => setFamilyMeetingPost(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className={styles.fromarea}>
                        <div className={styles.frombodyleft}>Org. Program</div>
                        <div className={styles.frombodyright}>
                          <input
                            type="number"
                           
                                max="24"
                            className={styles.inputitem}
                            placeholder="Hours(0-24)"
                            onChange={(e) => setOrgProgramPost(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className={styles.fromarea}>
                        <div className={styles.frombodyleft}>Qrg. Time</div>
                        <div className={styles.frombodyright}>
                          <input
                            type="number"
                           
                                max="24"
                            className={styles.inputitem}
                            placeholder="Hours(0-24)"
                            onChange={(e) => setOrgTimePost(e.target.value)}
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
                            value="1"
                            className={styles.inputitemcheckbox}
                            onChange={(e) => setSelfCriticismPost(e.target.value)}
                            // defaultValue={user.selfCriticism ? true : false}
                          />
                        </div>
                      </div>
                      <div className={styles.fromarea}>
                        <div className={styles.fromtextarea}>
                          <input
                            type="textarea"
                            className={styles.inputitemtextarea}
                            placeholder="Comment (Optional)"
                            onChange={(e) => setCommentPost(e.target.value)}
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
                    </div>
                  </div>
                )}
              </div>
            </Col>
            <Col xs lg="2"></Col>
          </Row>
        </Container>
      </form>
    </div>
  );
};

export default Dailyreportbody;

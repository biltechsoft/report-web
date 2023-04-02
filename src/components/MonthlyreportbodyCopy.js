import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import styles from "../assets/css/body.module.css";
import { FaClipboardList } from "react-icons/fa";
import { FcList } from "react-icons/fc";
import config from "../config";
import axios from "axios";
import swal from "sweetalert";

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import moment from "moment";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Monthlyreportbody = () => {

  const [status, setStatus] = useState(undefined); // For message

  const user = localStorage.getItem("user_id");

  /*const [month, setMonth] = useState(new Date());
  const [year, setYear] = useState(new Date());*/

  const [date, setDate] = useState(new Date());
  const month=moment(date).format('MM');
  const year=moment(date).format('YYYY');
  const cY = Number(moment(Date()).format('YYYY'));  //currentYear

  const [supporterName, setSupporterName] = useState(null);
  const [studyCircleDate, setStudyCircleDate] = useState(null);
  const [qiamulLailDate, setQiamulLailDate] = useState(null);
  const [eyanatDate, setEyanatDate] = useState(null);
  const [supporterIncrease, setSupporterIncrease] = useState(null);
  const [monthlyComment, setmonthlyComment] = useState(null);

  const [postId, setPostId] = useState(null);
  const [searchApiData, setsearchApiData] = useState([]);
  const [filterVal, setFilterVal] = useState([]);
  //------------------------------------------------------

  const handleFilter = async (e) => {
    fetch(`${config.apiUrl}monthly/`)
      .then((Response) => Response.json())
      .then((json) => {
        setsearchApiData(json);

        const filterResult = searchApiData.filter(
          (item) =>
            item.month == month && item.year == year && item.user == user
        );
        const postIdresult = filterResult.map((res) => res.id);
        setFilterVal(filterResult);
        setPostId(postIdresult);
      });
  };

  useEffect(() => {
    handleFilter();
  }, [month, year]);

  //----------------------------

  const fil1 = filterVal.map((items) => items.selfCriticism);
  const fil2 = filterVal.map((items) => items.studyCircle);
  const fil3 = filterVal.map((items) => items.qiamulLail);
  const fil4 = filterVal.map((items) => items.eyanatPaid);

  const tf1 = fil1 === 1 ? true : false;
  const tf2 = fil2 === 1 ? true : false;
  const tf3 = fil3 === 1 ? true : false;
  const tf4 = fil4 === 1 ? true : false;

  const [checkData, setCheckData] = useState({
    selfCriticism: tf1,
    studyCircle: tf2,
    qiamulLail: tf3,
    eyanatPaid: tf4,
  });
  const chData1 = checkData.selfCriticism === true ? "1" : "0";
  const chData2 = checkData.studyCircle === true ? "1" : "0";
  const chData3 = checkData.qiamulLail === true ? "1" : "0";
  const chData4 = checkData.eyanatPaid === true ? "1" : "0";

  const hendleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setCheckData({
      ...checkData,
      [name]: value,
    });
  };

  //-----------------------------------------
  const updateBookData = async (e) => {
    e.preventDefault();
    const data = {
      selfCriticism: chData1,
      eyanatPaid: chData4,
      eyanatDate,
      supporterIncrease,
      supporterName,
      studyCircle: chData2,
      studyCircleDate,
      qiamulLail: chData3,
      qiamulLailDate,
      monthlyComment,
    };

    await axios
      .patch(`${config.apiUrl}monthly/` + postId + "/", data)
      .then(() => {
        setStatus({ type: "success" });
        swal("Success!", "Book Reading successfully add", "success");
      })
      .catch((error) => {
        setStatus({ type: "error", error });
        swal("Error", "Book Reading Not add", "warning");
        console.log(error);
      });
  };

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber-1);
  
    // Using the browser's default locale.
    return date.toLocaleString([], { month: 'long' });
  }


  // useEffect(() => {
  //   updateBookData();
  // }, []);

  //----------------------------
  return (
    <div className={styles.loginbody}>
      <form onSubmit={updateBookData}>
        <Container className="">
          <Row className="justify-content-md-center">
            <Col xs lg="2"></Col>
            <Col lg="8">
              <div className="allbodybg">
                {/* from header */}
                <div className={styles.bodytopheight}>
                  <div className={styles.bodyheaderleft}>
                    <FaClipboardList /> Monthly Summary
                  </div>
                  <div className={styles.bodyheaderright}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <DatePicker
                                views={['month', 'year']}
                                label="Year and Month"
                                minDate={new Date((cY-5).toString()+'-01-01')}
                                maxDate={new Date((cY+5).toString()+'-12-31')}
                                value={date}
                                onChange={(newValue) => {
                                    setDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} helperText={null} />}
                            />
                        </Stack>
                      </LocalizationProvider>
                  </div>
                </div>
                {/* from body */}
                {filterVal.length >= 1 ? (
                  filterVal.map((item, index) => {
                    return (
                      <div>
                        <div className={styles.fromarea}>
                          <span className={styles.bodyMreportLeft}>
                            Daily Fields{" "}
                          </span>
                          <span className={styles.bodyMreportMid}>Amount</span>
                          <span className={styles.bodyMreportRight}>Avg</span>
                        </div>
                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleftfirst}>
                            Quran Study
                          </div>
                          <div className={styles.frombodyrightfirst}>
                            <p className={styles.MReportbodyLeft}>
                              {item.quranStudy}
                            </p>
                            <p className={styles.MReportbodyRight}>
                              {parseFloat(item.quranStudy / 30).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft}>
                            Hadith Study
                          </div>
                          <div className={styles.frombodyright}>
                            <p className={styles.MReportbodyLeft}>
                              {item.hadithStudy}
                            </p>
                            <p className={styles.MReportbodyRight}>
                              {parseFloat(item.hadithStudy / 30).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft}>
                            Islamic Book Study
                          </div>
                          <div className={styles.frombodyright}>
                            <p className={styles.MReportbodyLeft}>
                              {item.bookStudy}
                            </p>
                            <p className={styles.MReportbodyRight}>
                              {parseFloat(item.bookStudy / 30).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft}>
                            Islamic Lecture Listening
                          </div>
                          <div className={styles.frombodyright}>
                            <p className={styles.MReportbodyLeft}>
                              {item.lectureListening}
                            </p>
                            <p className={styles.MReportbodyRight}>
                              {parseFloat(item.lectureListening / 30).toFixed(
                                2
                              )}
                            </p>
                          </div>
                        </div>

                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft}>
                            Salat in Jamayat
                          </div>
                          <div className={styles.frombodyright}>
                            <p className={styles.MReportbodyLeft}>
                              {item.salat}
                            </p>
                            <p className={styles.MReportbodyRight}>
                              {parseFloat(item.salat / 30).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft30}>
                            Dawah Program
                          </div>
                          <p className={styles.MReportbodyLeft20}>
                            {item.dawahProgram}
                          </p>
                          <div className={styles.frombodyleft30}>
                            Member Contact
                          </div>
                          <p className={styles.MReportbodyLeft20}>
                            {item.memberContact}
                          </p>
                        </div>
                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft30}>
                            Social Work
                          </div>
                          <p className={styles.MReportbodyLeft20}>
                            {item.socialWork}
                          </p>
                          <div className={styles.frombodyleft30}>
                            Dawah Mat. Dis.
                          </div>
                          <p className={styles.MReportbodyLeft20}>
                            {item.dawahMaterial}
                          </p>
                        </div>

                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft30}>
                            Distribution
                          </div>
                          <p className={styles.MReportbodyLeft20}>
                            {item.distribution}
                          </p>
                          <div className={styles.frombodyleft30}>
                            Family Meeting
                          </div>
                          <p className={styles.MReportbodyLeft20}>
                            {item.familyMeeting}
                          </p>
                        </div>

                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft30}>
                            Org. Program
                          </div>
                          <p className={styles.MReportbodyLeft20}>
                            {item.orgProgram}
                          </p>
                          <div className={styles.frombodyleft30}>Org.Time</div>
                          <p className={styles.MReportbodyLeft20}>
                            {item.orgTime}
                          </p>
                        </div>

                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft30}>
                            Study Circle
                          </div>
                          <p className={styles.MReportbodyLeft20}>
                            <input
                              type="checkbox"
                              name="studyCircle"
                              onChange={hendleChange}
                              defaultChecked={item.studyCircle}
                            />
                          </p>
                          <div className={styles.frombodyleft30}>
                            St. Circle Date.
                          </div>
                          <p className={styles.MReportbodyLeft20}>
                            <input
                              type="date"
                              defaultValue={item.studyCircleDate}
                              className={styles.inputitem20}
                              placeholder="Date"
                              onChange={(e) =>
                                setStudyCircleDate(e.target.value)
                              }
                            />
                          </p>
                        </div>

                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft30}>
                            Qiamul Lail
                          </div>
                          <p className={styles.MReportbodyLeft20}>
                            <input
                              type="checkbox"
                              name="qiamulLail"
                              onChange={hendleChange}
                              defaultChecked={item.qiamulLail}
                            />
                          </p>
                          <div className={styles.frombodyleft30}>
                            Qia. Lail Date.
                          </div>
                          <p className={styles.MReportbodyLeft20}>
                            <input
                              type="date"
                              defaultValue={item.qiamulLailDate}
                              className={styles.inputitem20}
                              placeholder="Date"
                              onChange={(e) =>
                                setQiamulLailDate(e.target.value)
                              }
                            />
                          </p>
                        </div>

                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft30}>
                            EyanatPaid
                          </div>
                          <p className={styles.MReportbodyLeft20}>
                            <input
                              type="checkbox"
                              // checked={eyaPaid}
                              name="eyanatPaid"
                              onChange={hendleChange}
                              defaultChecked={item.eyanatPaid}
                            />
                          </p>
                          <div className={styles.frombodyleft30}>
                            Eyanat Paid Date.
                          </div>
                          <p className={styles.MReportbodyLeft20}>
                            <input
                              type="date"
                              defaultValue={item.eyanatDate}
                              className={styles.inputitem20}
                              placeholder="Date"
                              onChange={(e) => setEyanatDate(e.target.value)}
                            />
                          </p>
                        </div>

                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft30}>
                            Self-Criticism
                          </div>
                          <p className={styles.MReportbodyLeft20}>
                            <input
                              type="checkbox"
                              name="selfCriticism"
                              onChange={hendleChange}
                              defaultChecked={item.selfCriticism}
                            />
                          </p>
                          <div className={styles.frombodyleft30}>
                            Supporter Incre.
                          </div>
                          <p className={styles.MReportbodyLeft20}>
                            <input
                              type="number"
                              className={styles.inputitem25}
                              placeholder="Number"
                              defaultValue={item.supporterIncrease}
                              min="0"
                              max="1000"
                              onChange={(e) =>
                                setSupporterIncrease(e.target.value)
                              }
                            />
                          </p>
                        </div>

                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft}>
                            Supporter Name
                          </div>
                          <div className={styles.frombodyright}>
                            <input
                              defaultValue={item.supporterName}
                              type="text"
                              className={styles.inputitem}
                              placeholder="Name"
                              onChange={(e) => setSupporterName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className={styles.fromarea}>
                          <div className={styles.fromtextarea}>
                            <input
                              type="textarea"
                              className={styles.inputitemtextarea}
                              defaultValue={item.monthlyComment}
                              placeholder="Comment (Optional)"
                              onChange={(e) =>
                                setmonthlyComment(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        {/* from body End */}

                        <div className={styles.inputitmbtnsavearea}>
                          <input
                            type="submit"
                            className={styles.inputitmbtnsave}
                            value="Save"
                          />
                        </div>
                      </div>
                    );
                  })
                ) : ( 
                  <div>
                    {" "}
                    <FcList className={styles.cardIcon} />
                    {Object.keys(month).length === 0 || Object.keys(year).length === 0 ? (
                      <h2 style={{ textAlign: "center", paddingBottom: "50px" }}>
                      Please Select <span style={{ color: "red" }}>Year</span> &{" "}
                      <span style={{ color: "red" }}>Month</span>
                      </h2>
                    ) : (
                      <h2 style={{ textAlign: "center", paddingBottom: "50px", color: "red" }}>
                      Monthly Report not Available for <span style={{ color: "red" }}>
                        {getMonthName(month)}</span> {" "}
                      <span style={{ color: "red" }}>{Object.values(year)}</span>
                      </h2>
                    )}
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

export default Monthlyreportbody;

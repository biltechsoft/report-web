import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";

import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
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
import { API } from "../api-service";

const Monthlyreportbody = () => {

  const [status, setStatus] = useState(undefined); // For message

  const user = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  /*const [month, setMonth] = useState(new Date());
  const [year, setYear] = useState(new Date());*/

  const [date, setDate] = useState(new Date());
  const month=moment(date).format('MM');
  const year=moment(date).format('YYYY');
  const cY = moment(Date()).format('YYYY');  //currentYear
  const cM = moment(Date()).format('MM');  //currentMonth
  const cD = moment(Date()).format('DD');  //currentDateOnly
  const days = new Date(year, month, 0).getDate();
  const d = year+'-'+month+'-';
  const minD = d+'01';
  const maxD = (cY > year ? d+days : (cM > month ? d+days : d+cD));

  const [supporterName, setSupporterName] = useState(null);
  const [studyCircleDate, setStudyCircleDate] = useState(null);
  const [qiamulLailDate, setQiamulLailDate] = useState(null);
  const [eyanatDate, setEyanatDate] = useState(null);
  const [studyCircle, setStudyCircle] = useState(null);
  const [qiamulLail, setQiamulLail] = useState(null);
  const [eyanatPaid, setEyanatPaid] = useState(null);
  const [supporterIncrease, setSupporterIncrease] = useState(null);
  const [monthlyComment, setmonthlyComment] = useState(null);

  const [postId, setPostId] = useState(null);
  const [searchApiData, setsearchApiData] = useState([]);
  const [filterVal, setFilterVal] = useState([]);

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
  const [physicalExercise, setPhysicalExercise] = useState(null);
  const [selfCriticism, setSelfCriticism] = useState(null);

  const [allsummarys, setAllsummarys] = useState([]);
  const [summaryid, setSummaryid] = useState(0);

  const [w, setWidth] = useState(window.innerWidth); //width
  const bp = 620; //breakpoint

  const [gotsummary, setGotsummary] = useState(false);
  const [summarylength, setP] = useState(100);

  useEffect(() => {
      /* Inside of a "useEffect" hook add an event listener that updates
      the "width" state variable when the window size changes */
      window.addEventListener("resize", () => setWidth(window.innerWidth));

      /* passing an empty array as the dependencies of the effect will cause this
      effect to only run when the component mounts, and not each time it updates.
      We only want the listener to be added once */
  }, []);

  const getSummary = () => {
      const summary = allsummarys.filter((item) => item.month == month && item.year == year && item.user == user);
      setP(summary.length);
      if(summary.length != 0) {
          setSummaryid(summary[0].id);
          //setQuranStudy(summary.map((item) => item.quranStudy));
          setQuranStudy(summary[0].quranStudy == null ? null : summary[0].quranStudy);
          setHadithStudy(summary[0].hadithStudy == null ? null : summary[0].hadithStudy);
          setBookStudy(summary[0].bookStudy == null ? null : summary[0].bookStudy);
          setLectureListening(summary[0].lectureListening == null ? null : summary[0].lectureListening);
          setSalat(summary[0].salat == null ? null : summary[0].salat);
          setDawahProgram(summary[0].dawahProgram == null ? null : summary[0].dawahProgram);
          setMemberContact(summary[0].memberContact == null ? null : summary[0].memberContact);
          setSocialWork(summary[0].socialWork == null ? null : summary[0].socialWork);
          setDawahMaterial(summary[0].dawahMaterial == null ? null : summary[0].dawahMaterial);
          setDistribution(summary[0].distribution == null ? null : summary[0].distribution);
          setFamilyMeeting(summary[0].familyMeeting == null ? null : summary[0].familyMeeting);
          setOrgProgram(summary[0].orgProgram == null ? null : summary[0].orgProgram);
          setOrgTime(summary[0].orgTime == null ? null : summary[0].orgTime);
          setPhysicalExercise(summary[0].physicalExercise == null ? null : summary[0].physicalExercise);
          setSelfCriticism(summary[0].selfCriticism == null ? null : summary[0].selfCriticism);
          setSupporterIncrease(summary[0].supporterIncrease == null ? NaN : summary[0].supporterIncrease);

          setSupporterName(summary[0].supporterName == null ? '' : summary[0].supporterName);
          setStudyCircle(summary[0].studyCircle == null ? 0 : summary[0].studyCircle);
          setQiamulLail(summary[0].qiamulLail == null ? 0 : summary[0].qiamulLail);
          setEyanatPaid(summary[0].eyanatPaid == null ? 0 : summary[0].eyanatPaid);
          setStudyCircleDate(summary[0].studyCircleDate == null ? '' : summary[0].studyCircleDate);
          setQiamulLailDate(summary[0].qiamulLailDate == null ? '' : summary[0].qiamulLailDate);
          setEyanatDate(summary[0].eyanatDate == null ? '' : summary[0].eyanatDate);
          setmonthlyComment(summary[0].monthlyComment == null ? '' : summary[0].monthlyComment);
      }
      else {
          setSummaryid(0);
          setQuranStudy(null);
          setHadithStudy(null);
          setBookStudy(null);
          setLectureListening(null);
          setSalat(null);
          setDawahProgram(null);
          setMemberContact(null);
          setSocialWork(null);
          setDawahMaterial(null);
          setDistribution(null);
          setFamilyMeeting(null);
          setOrgProgram(null);
          setOrgTime(null);
          setPhysicalExercise(null);
          setSelfCriticism(null);
          setSupporterIncrease(NaN);
          setSupporterName('');
          setStudyCircle(0);
          setQiamulLail(0);
          setEyanatPaid(0);
          setStudyCircleDate('');
          setQiamulLailDate('');
          setEyanatDate('');
          setmonthlyComment('');
      }
  }

  useEffect(() => {
      API.getSummarys(token)
      .then( resp =>  setAllsummarys(resp))
      .catch (error => console.log(error))
  }, [gotsummary]);

  useEffect(() => {
      getSummary();
      //setDays(new Date(year, month, 0).getDate());
  }, [allsummarys, month, year]);

  function float2time(fnum) {
    var t0 = Math.trunc(fnum);
    var t1 = twoDigit(Math.round((fnum-t0)*60));
    return t0 + ":" + t1;
  }
  function twoDigit(num) {
    return num<10 ? "0"+num : num;
  }

  const sbbutton = () => {
      const data = {
          user,
          month,
          year,
          selfCriticism,
          eyanatPaid,
          eyanatDate: (eyanatDate=='' ? null : eyanatDate),
          supporterIncrease,
          supporterName,
          studyCircle,
          studyCircleDate: (studyCircleDate=='' ? null : studyCircleDate),
          qiamulLail,
          qiamulLailDate: (qiamulLailDate=='' ? null : qiamulLailDate),
          monthlyComment
        };
      
        API.updateSummary(summaryid, data, token)
        .then( resp => {
            console.log(resp);
            console.log(data);
            if(resp.user == user) {
                swal("Success!", "Monthly Summary successfully Updated", "success");
                setGotsummary(!gotsummary);
            }
            else {
                swal("Error", "Monthly Summary Not Updated", "warning");
            }
        })
        .catch(error => {
            console.log(error);
            swal("Error", "Monthly Summary Not Updated", "warning");
        });   
  } 

  //------------------------------------------------------

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
      
        <Container className="">
          <Row className="justify-content-md-center">
            <Col xs lg="1"></Col>
            <Col lg={10}>
              <div className="allbodybg">
                {/* from header */}
                <div className={styles.bodytopheight}>
                  <div className={styles.bodyheaderleft} style={w<bp ? {width:'100%'} : {width:'50%'}}>
                    <FaClipboardList /> Monthly Summary
                  </div>
                  <div className={styles.bodyheaderright} style={w<bp ? {width:'100%'} : {width:'50%'}}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <DatePicker
                                views={['month', 'year']}
                                label="Year and Month"
                                minDate={new Date((Number(cY)-5).toString()+'-01-01')}
                                maxDate={new Date()}
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
                {summarylength < 1 ? (
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
                </div> ) : (
                  <div>
                     <div>
                        <div className={styles.fromarea}>
                          <MDBCol size='4' className={styles.bodyMreportLeft}>Fields</MDBCol>
                          <MDBCol size='4' className={styles.bodyMreportMid}>Total</MDBCol>
                          <MDBCol size='4' className={styles.bodyMreportRight}>Avg</MDBCol>
                        </div>
                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleftfirst40}>
                            Quran Study
                          </div>
                          <div className={styles.frombodyrightfirst60} >
                            <p className={styles.MReportbodyLeft}>
                              {quranStudy}
                            </p>
                            <p className={styles.MReportbodyRight}>
                              {parseFloat(quranStudy / days).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft40}>
                            Hadith Study
                          </div>
                          <div className={styles.frombodyright60}>
                            <p className={styles.MReportbodyLeft}>
                              {hadithStudy}
                            </p>
                            <p className={styles.MReportbodyRight}>
                              {parseFloat(hadithStudy / days).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft40}>
                            Islamic Book Study
                          </div>
                          <div className={styles.frombodyright60}>
                            <p className={styles.MReportbodyLeft}>
                              {bookStudy}
                            </p>
                            <p className={styles.MReportbodyRight}>
                              {parseFloat(bookStudy / days).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft40}>
                            Islamic Lecture Listening
                          </div>
                          <div className={styles.frombodyright60}>
                            <p className={styles.MReportbodyLeft}>
                              {float2time(lectureListening)}
                            </p>
                            <p className={styles.MReportbodyRight}>
                              {float2time(lectureListening / days)}
                            </p>
                          </div>
                        </div>

                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft40}>
                            Salat in Jamayat
                          </div>
                          <div className={styles.frombodyright60}>
                            <p className={styles.MReportbodyLeft}>
                              {salat}
                            </p>
                            <p className={styles.MReportbodyRight}>
                              {parseFloat(salat / days).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft40}>
                          Social Work
                          </div>
                          <div className={styles.frombodyright60}>
                            <p className={styles.MReportbodyLeft}>
                              {float2time(socialWork)}
                            </p>
                            <p className={styles.MReportbodyRight}>
                              {float2time(socialWork / days)}
                            </p>
                          </div>
                        </div>
                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft40}>
                          Org Time
                          </div>
                          <div className={styles.frombodyright60}>
                            <p className={styles.MReportbodyLeft}>
                              {float2time(orgTime)}
                            </p>
                            <p className={styles.MReportbodyRight}>
                              {float2time(orgTime / days)}
                            </p>
                          </div>
                        </div>
                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft40}>
                          Physical Exercise
                          </div>
                          <div className={styles.frombodyright60}>
                            <p className={styles.MReportbodyLeft}>
                              {float2time(physicalExercise)}
                            </p>
                            <p className={styles.MReportbodyRight}>
                              {float2time(physicalExercise / days)}
                            </p>
                          </div>
                        </div>

                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft30} style={w<bp ? {width:'40%'} : {width:'30%'}}>
                            Dawah Program
                          </div>
                          <p className={styles.MReportbodyLeft20} style={w<bp ? {width:'60%'} : {width:'20%'}}>
                            {dawahProgram}
                          </p>
                          <div className={styles.frombodyleft30} style={w<bp ? {width:'40%'} : {width:'30%'}}>
                            Org. Program
                          </div>
                          <p className={styles.MReportbodyLeft20} style={w<bp ? {width:'60%'} : {width:'20%'}}>
                            {orgProgram}
                          </p>

                          
                        </div>

                        

                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft30} style={w<bp ? {width:'40%'} : {width:'30%'}}>
                            Dawah Mat. Dis.
                          </div>
                          <p className={styles.MReportbodyLeft20} style={w<bp ? {width:'60%'} : {width:'20%'}}>
                            {dawahMaterial}
                          </p>
                          <div className={styles.frombodyleft30} style={w<bp ? {width:'40%'} : {width:'30%'}}>
                            Distribution
                          </div>
                          <p className={styles.MReportbodyLeft20} style={w<bp ? {width:'60%'} : {width:'20%'}}>
                            {distribution}
                          </p>
                        </div>

                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft30} style={w<bp ? {width:'40%'} : {width:'30%'}}>
                            Family Meeting
                          </div>
                          <p className={styles.MReportbodyLeft20} style={w<bp ? {width:'60%'} : {width:'20%'}}>
                            {familyMeeting}
                          </p>
                          <div className={styles.frombodyleft30} style={w<bp ? {width:'40%'} : {width:'30%'}}>
                            Self-Criticism
                          </div>
                          <p className={styles.MReportbodyLeft20} style={w<bp ? {width:'60%'} : {width:'20%'}}>
                            {selfCriticism}
                          </p>
                        </div>

                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft30} style={w<bp ? {width:'40%'} : {width:'30%'}}>
                            Member Contact
                          </div>
                          <p className={styles.MReportbodyLeft20} style={w<bp ? {width:'60%'} : {width:'20%'}}>
                            {memberContact}
                          </p>
                          <div className={styles.frombodyleft30} style={w<bp ? {width:'40%'} : {width:'30%'}}>
                            Supporter Increase
                          </div>
                          <p className={styles.MReportbodyLeft20} style={w<bp ? {width:'60%'} : {width:'20%'}}>
                            <input
                              type="number"
                              className={styles.inputitem20}
                              placeholder="Number"
                              value={supporterIncrease}
                              min="0"
                              max="1000"
                              onChange={(e) =>
                                setSupporterIncrease(e.target.value)
                              }
                            />
                          </p>
                        </div>

                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft} style={w<bp ? {width:'40%'} : {width:'50%'}}>
                            Supporter Name
                          </div>
                          <div className={styles.frombodyright} style={w<bp ? {width:'60%', textAlign:'center'} : {width:'50%'}}>
                            <input
                              value={supporterName}
                              type="text"
                              className={styles.inputitem} style={w<bp ? {textAlign:'center'} : {textAlign:'left'}}
                              placeholder="Name"
                              onChange={(e) => setSupporterName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft30} style={w<bp ? {width:'40%'} : {width:'30%'}}>
                            Study Circle
                          </div>
                          <p className={styles.MReportbodyLeft20} style={w<bp ? {width:'60%'} : {width:'20%'}}>
                            <input
                              type="checkbox"
                              name="studyCircle"
                              onChange={(e) => setStudyCircle((studyCircle+1)%2)}
                              checked={studyCircle==1 ? true : false}
                            />
                          </p>
                          <div className={styles.frombodyleft30} style={w<bp ? {width:'40%'} : {width:'30%'}}>
                            Study Circle Date
                          </div>
                          <p className={styles.MReportbodyLeft20} style={w<bp ? {width:'60%'} : {width:'20%'}}>
                            <input
                              type="date"
                              min={minD} max={maxD}
                              value={studyCircleDate}
                              className={styles.inputitem20}
                              placeholder="Date"
                              onChange={(e) =>
                                setStudyCircleDate(e.target.value)
                              }
                            />
                          </p>
                        </div>

                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft30} style={w<bp ? {width:'40%'} : {width:'30%'}}>
                            Qiamul Lail
                          </div>
                          <p className={styles.MReportbodyLeft20} style={w<bp ? {width:'60%'} : {width:'20%'}}>
                            <input
                              type="checkbox"
                              name="qiamulLail"
                              onChange={(e) => setQiamulLail((qiamulLail+1)%2)}
                              checked={qiamulLail==1 ? true : false}
                            />
                          </p>
                          <div className={styles.frombodyleft30} style={w<bp ? {width:'40%'} : {width:'30%'}}>
                            Qiamul Lail Date
                          </div>
                          <p className={styles.MReportbodyLeft20} style={w<bp ? {width:'60%'} : {width:'20%'}}>
                            <input
                              type="date"
                              min={minD} max={maxD}
                              value={qiamulLailDate}
                              className={styles.inputitem20}
                              placeholder="Date"
                              onChange={(e) =>
                                setQiamulLailDate(e.target.value)
                              }
                            />
                          </p>
                        </div>

                        <div className={styles.fromarea}>
                          <div className={styles.frombodyleft30} style={w<bp ? {width:'40%'} : {width:'30%'}}>
                            Eyanat Paid
                          </div>
                          <p className={styles.MReportbodyLeft20} style={w<bp ? {width:'60%'} : {width:'20%'}}>
                            <input
                              type="checkbox"
                              // checked={eyaPaid}
                              name="eyanatPaid"
                              onChange={(e) => setEyanatPaid((eyanatPaid+1)%2)}
                              checked={eyanatPaid==1 ? true : false}
                            />
                          </p>
                          <div className={styles.frombodyleft30} style={w<bp ? {width:'40%'} : {width:'30%'}}>
                            Eyanat Paid Date
                          </div>
                          <p className={styles.MReportbodyLeft20} style={w<bp ? {width:'60%'} : {width:'20%'}}>
                            <input
                              type="date"
                              min={minD} max={maxD}
                              value={eyanatDate}
                              className={styles.inputitem20}
                              placeholder="Date"
                              onChange={(e) => setEyanatDate(e.target.value)}
                            />
                          </p>
                        </div>

                        <div className={styles.fromarea}>
                          
                          <div className={styles.frombodyright} style={{width:'100%'}}>
                            <input
                              value={monthlyComment}
                              type="text"
                              className={styles.inputitem}
                              placeholder="Comment (Optional)"
                              onChange={(e) => setmonthlyComment(e.target.value)}
                            />
                          </div>
                        </div>

                        
                        {/*<div className={styles.fromarea}>
                          <div className={styles.fromtextarea}>
                            <input
                              type="textarea"
                              className={styles.inputitemtextarea}
                              value={monthlyComment}
                              placeholder="Comment (Optional)"
                              onChange={(e) =>
                                setmonthlyComment(e.target.value)
                              }
                            />
                          </div>
                            </div>*/}
                      </div>

                        {/* from body End */}
                        

                        <div className={styles.inputitmbtnsavearea}> {/*submit button */}
                                    <button
                                    className={styles.inputitmbtnsave}
                                    onClick={sbbutton}
                                    >
                                        Save</button>
                                </div>
                                <br></br>

                  </div>
                )}
                  
                     
                      
                   
              </div>
            </Col>
            <Col xs lg="1"></Col>
          </Row>
        </Container>
      
    </div>
  );
};

export default Monthlyreportbody;

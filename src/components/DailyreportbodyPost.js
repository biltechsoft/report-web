import React from 'react'
import { useState,useEffect } from "react";
import {  Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../assets/css/body.module.css";

import { FaClock } from "react-icons/fa";
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import moment from "moment";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DateRangeTwoTone } from '@mui/icons-material';
import config from "../config";

const DailyreportbodyPost = ({btnText,hendleSubmitData,hendleData,newDate}) => {


  const user = localStorage.getItem("user_id");
 // const [formatDate, setDate] = useState(new Date());
  const [formatDate, setDate] =  useState(null);

  const date=moment(formatDate).format('YYYY-MM-DD');
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

  useEffect(() => {
    if(newDate==null){
       setDate(new Date());
    }else
    {
      setDate(newDate);
    }
   
    }, []);
 

///check Data---------------------
  const [checkData, setCheckData,] = useState({
    selfCriticism
  });

  const hendleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setCheckData({
      ...checkData,
      [name]: value,
    });
  };
   const chData1 = checkData.selfCriticism === true ? 1 : 0;
  
///----- End Check Data


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
    selfCriticism:chData1,
    comment
  };

const hendleSubmit=(e)=>{
    e.preventDefault();
    hendleSubmitData(data);
    e.target.reset();

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
    setCheckData(0);
    setComment(null);
    setDate(null);
}

////########----------------------------------------------
const [postId, setPostId] = useState([]);

const handleFilter = async (e) => {

  hendleData(date);

};

 useEffect(() => {
  handleFilter();
  }, [date]);


  ///####------------POST SECTION -------------
  return (
    <div className={styles.loginbody}>
    <form onSubmit={hendleSubmit}>
      <Container className="">
        <Row className="justify-content-md-center">
          <Col xs lg="1"></Col>
          <Col lg="10">
            <div className="allbodybg">
              {/* from header */}
              <div className={styles.bodytopheight}>
                <div className={styles.bodyheaderleft}>
                  <FaClock /> Daily Report
                </div>
                <div className={styles.bodyheaderright}>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Selected Date"
                      value={date}
                      name="date"
                      minDate={new Date('2022-01-01')}
                      maxDate={new Date()}
                      onInput={(e) => handleFilter(e)}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                     
                  </Stack>
                </LocalizationProvider>

                     {/* <input
                      type="date"
                      required="required"
                      className={styles.inputdate}
                      placeholder="Last Name"
                      onInput={(e) => handleFilter(e)}
                      onChange={(e) => setDate(e.target.value)}
                    />

      */}
                  
                </div>
              </div>
              {/* from body */}
             
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
                        name="quranStudy"
                          type="number"
                          max="1000"
                          className={styles.inputitemfirst}
                          onChange={(e) => setQuranStudy(e.target.value)}
                          placeholder="Ayats(Number)"
                        />
                      </div>
                    </div>
                    <div className={styles.fromarea}>
                      <div className={styles.frombodyleft}>Hadith Study</div>
                      <div className={styles.frombodyright}>
                        <input
                        name="hadithStudy"
                          type="number"
                          max="1000"
                          className={styles.inputitem}
                          placeholder="Hadiths(Number)"
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
                         max="1000"
                          className={styles.inputitem}
                          placeholder="Pages"
                          name="bookStudy"
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
                          placeholder="Hours(0-24)"
                          max="24"
                          name="lectureListening"
                          onChange={(e) => setLectureListening(e.target.value)}
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
                          name="salat"
                          onChange={(e) => setSalat(e.target.value)}
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
                          name="dawahProgram"
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
                         
                              max="1000"
                          className={styles.inputitem}
                          placeholder="Number"
                          name="memberContact"
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
                          placeholder="Hours(0-24)"
                        
                          max="24"
                          name="socialWork"
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
                         
                              max="1000"
                          className={styles.inputitem}
                          placeholder="Number"
                          name="dawahMaterial"
                          onChange={(e) => setDawahMaterial(e.target.value)}
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
                          name="distribution"
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
                         
                              max="1000"
                          className={styles.inputitem}
                          placeholder="Number"
                          name="familyMeeting"
                          onChange={(e) => setFamilyMeeting(e.target.value)}
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
                          name="orgProgram"
                          onChange={(e) => setOrgProgram(e.target.value)}
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
                          name="orgTime"
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
                        //  value="1"
                          className={styles.inputitemcheckbox}
                          name="selfCriticism"
                          onChange={hendleChange}
                         // defaultChecked={tf1}
                         
                        />
                      </div>
                    </div>
                    <div className={styles.fromarea}>
                      <div className={styles.fromtextarea}>
                        <input
                          type="textarea"
                          className={styles.inputitemtextarea}
                          placeholder="Comment (Optional)"
                          name="comment"
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>
                    </div>

                  
                  </div>

                  <div className={styles.inputitmbtnsavearea}>
                    <button
                      type="submit"
                      className={styles.inputitmbtnsave}
                    >{btnText}</button>
                  </div>
                </div>
             </div>
          </Col>
          <Col xs lg="1"></Col>
        </Row>
      </Container>
    </form>
  </div>
  )
 
}

DailyreportbodyPost.propTypes = {}

export default DailyreportbodyPost
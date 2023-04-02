import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import styles from "../assets/css/body.module.css";
import { FaClock } from "react-icons/fa";

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import moment from "moment";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { TimePicker } from 'react-ios-time-picker';

import { API } from "../api-service";
//import axios from "axios";
import swal from "sweetalert";

function DailyBody() {

    const user = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    /*const [date, setDate] = useState(new Date());
    const month=moment(date).format('MM');
    const year=moment(date).format('YYYY');*/

    const [formatDate, setDate] =  useState(new Date());
    const date=moment(formatDate).format('YYYY-MM-DD');
    const cY = Number(moment(Date()).format('YYYY'));  //currentYear

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
    const [comment, setComment] = useState(null);

    const tm = "02:48";

    const [allreports, setAllreports] = useState([]);
    const [reportid, setReportid] = useState(0);

    const [w, setWidth] = useState(window.innerWidth); //width
    const bp = 620; //breakpoint

    const [gotreport, setGotreport] = useState(false);
    const [gotVal, setGotVal] = useState(false);
    const [TP, setTP] = useState(false);
    const [socialWorkTP, setSocialWorkTP] = useState(false);
    const [orgTimeTP, setOrgTimeTP] = useState(false);
    const [physicalExerciseTP, setPhysicalExerciseTP] = useState(false);
    const [reportlength, setP] = useState(100);
    const hm="";

    useEffect(() => {
        /* Inside of a "useEffect" hook add an event listener that updates
        the "width" state variable when the window size changes */
        window.addEventListener("resize", () => setWidth(window.innerWidth));

        /* passing an empty array as the dependencies of the effect will cause this
        effect to only run when the component mounts, and not each time it updates.
        We only want the listener to be added once */
    }, []);

    const getReport = () => {
        setGotVal(false);
        const report = allreports.filter((item) => item.date == date && item.user == user);
        setP(report.length);
        if(report.length != 0) {
            setReportid(report[0].id);
            //setQuranStudy(report.map((item) => item.quranStudy));
            setQuranStudy(report[0].quranStudy == null ? NaN : report[0].quranStudy);
            setHadithStudy(report[0].hadithStudy == null ? NaN : report[0].hadithStudy);
            setBookStudy(report[0].bookStudy == null ? NaN : report[0].bookStudy);
            setLectureListening(report[0].lectureListening == null ? NaN : report[0].lectureListening);
            setSalat(report[0].salat == null ? NaN : report[0].salat);
            setDawahProgram(report[0].dawahProgram == null ? NaN : report[0].dawahProgram);
            setMemberContact(report[0].memberContact == null ? NaN : report[0].memberContact);
            setSocialWork(report[0].socialWork == null ? NaN : report[0].socialWork);
            setDawahMaterial(report[0].dawahMaterial == null ? NaN : report[0].dawahMaterial);
            setDistribution(report[0].distribution == null ? NaN : report[0].distribution);
            setFamilyMeeting(report[0].familyMeeting == null ? NaN : report[0].familyMeeting);
            setOrgProgram(report[0].orgProgram == null ? NaN : report[0].orgProgram);
            setOrgTime(report[0].orgTime == null ? NaN : report[0].orgTime);
            setPhysicalExercise(report[0].physicalExercise == null ? 0 : report[0].physicalExercise);
            setSelfCriticism(report[0].selfCriticism == null ? 0 : report[0].selfCriticism);
            setComment(report[0].comment == null ? '' : report[0].comment);
        }
        else {
            setReportid(0);
            setQuranStudy(NaN);
            setHadithStudy(NaN);
            setBookStudy(NaN);
            setLectureListening(NaN);
            setSalat(NaN);
            setDawahProgram(NaN);
            setMemberContact(NaN);
            setSocialWork(NaN);
            setDawahMaterial(NaN);
            setDistribution(NaN);
            setFamilyMeeting(NaN);
            setOrgProgram(NaN);
            setOrgTime(NaN);
            setPhysicalExercise(NaN);
            setSelfCriticism(0);
            setComment('');
        }
        setGotVal(true);
    }

    useEffect(() => {
        API.getReports(token)
        .then( resp =>  setAllreports(resp))
        .catch (error => console.log(error))
    }, [gotreport]);

    useEffect(() => {
        getReport();
    }, [allreports, date]);

    function twoDigit(num) {
        return num<10 ? "0"+num : num;
    }
    function time2float(time) {
        var t = time.split(":");
        var fnum = Number(t[0]) + Number(t[1])/60;
        return fnum;
    }
    function float2time(fnum) {
        var t0 = Math.trunc(fnum);
        var t1 = twoDigit(Math.round((fnum-t0)*60));
        return t0 + ":" + t1;
    }

    const changeLectureListening = (e) => {
        setLectureListening(time2float(e));
        setTP(false);
    }
    const changeSocialWork = (e) => {
        setSocialWork(time2float(e));
        setSocialWorkTP(false);
    }
    const changeOrgTime = (e) => {
        setOrgTime(time2float(e));
        setOrgTimeTP(false);
    }
    const changePhysicalExercise = (e) => {
        setPhysicalExercise(time2float(e));
        setPhysicalExerciseTP(false);
    }

    

    const sbbutton = () => {
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
            physicalExercise,
            selfCriticism,
            comment
          };
        if(reportid == 0) {
            API.createReport(data, token)
            .then( resp => {
                //console.log(resp);
                if(resp.user == user) {
                    swal("Success!", "Report successfully Added", "success");
                    setGotreport(!gotreport);
                }
                else {
                    swal("Error", "Report Not Added", "warning");
                }
            })
            .catch(error => {
                //console.log(error);
                swal("Error", "Report Not Added", "warning");
            });
        }
        else {
            API.updateReport(reportid, data, token)
            .then( resp => {
                //console.log(resp);
                //console.log(data);
                if(resp.user == user) {
                    swal("Success!", "Report successfully Updated", "success");
                    setGotreport(!gotreport);
                }
                else {
                    swal("Error", "Report Not Updated", "warning");
                }
            })
            .catch(error => {
                //console.log(error);
                swal("Error", "Report Not Updated", "warning");
            });
        }
        
    } 

    return (
        <div className={styles.loginbody}>
            
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs lg="1"></Col>
                        <Col lg={10}>
                            <div className="allbodybg">
                                
                                <div className={styles.bodytopheight}>
                                    <div className={styles.bodyheaderleft} style={w<bp ? {width:'100%'} : {width:'50%'}}>
                                        <FaClock /> Daily Report
                                    </div>
                                    <div className={styles.bodyheaderright} style={w<bp ? {width:'100%'} : {width:'50%'}}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <Stack spacing={3}>
                                            <DesktopDatePicker
                                            label="Selected Date"
                                            value={date}
                                            name="date"
                                            minDate={new Date('2022-01-01')}
                                            maxDate={new Date()}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                            />
                                            
                                        </Stack>
                                    </LocalizationProvider>
                                    </div>
                                </div>

                                <div> {/*form div */}
                                    <div className={styles.fromarea}>
                                        <MDBCol size='6' className={styles.bodyleft}>Daily Fields</MDBCol>
                                        <MDBCol size='6' className={styles.bodyright}>Amount</MDBCol>
                                    </div>
                                    <div className={styles.fromarea}>
                                        <div className={styles.frombodyleftfirst}>
                                            Quran Study
                                        </div>
                                        <div className={styles.frombodyrightfirst}>
                                            <input
                                            type="number"
                                            className={styles.inputitemfirst}
                                            min="0"
                                            max="10000"
                                            placeholder="Ayats (Number)"
                                            onChange={(e) => setQuranStudy(e.target.value)}
                                            value={quranStudy}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.fromarea}>
                                        <div className={styles.frombodyleft}>Hadith Study</div>
                                        <div className={styles.frombodyright}>
                                            <input
                                            type="number"
                                            className={styles.inputitem}
                                            placeholder="Hadiths (Number)"
                                            min="0"
                                            max="10000"
                                            onChange={(e) => setHadithStudy(e.target.value)}
                                            value={hadithStudy}
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
                                            placeholder="Pages Number"
                                            min="0"
                                            max="10000"
                                            onChange={(e) => setBookStudy(e.target.value)}
                                            value={bookStudy}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.fromarea} style={w<bp && TP ? {height:'150px'} : {height:'75px'}}>
                                        <div className={styles.frombodyleft}  style={w<bp && TP ? {width:'100%'} : {width:'50%'}}>
                                            Islamic Lecture Listening
                                        </div>
                                        <div className={styles.frombodyright}  style={w<bp && TP ? {width:'100%'} : {width:'50%'}}>
                                            {TP ? (
                                                <div>
                                                    <TimePicker 
                                                        onChange={changeLectureListening}/>
                                                    <span><button onClick={(e) => setTP(false)}>Close</button></span>
                                                </div>
                                            ) : (
                                                <input
                                                    type="text"
                                                    className={styles.inputitem}
                                                    placeholder="hh:mm"
                                                    onClick={(e) => setTP(true)}
                                                    value={lectureListening ? float2time(lectureListening)+hm : ""}
                                                />
                                                
                                            )}
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
                                            max="155"
                                            className={styles.inputitem}
                                            placeholder="Waqta (0-5)"
                                            onChange={(e) => setSalat(e.target.value)}
                                            value={salat}
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
                                            min="0"
                                            max="10000"
                                            onChange={(e) => setDawahProgram(e.target.value)}
                                            value={dawahProgram}
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
                                            min="0"
                                            max="10000"
                                            className={styles.inputitem}
                                            placeholder="Number"
                                            onChange={(e) => setMemberContact(e.target.value)}
                                            value={memberContact}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.fromarea} style={w<bp && socialWorkTP ? {height:'150px'} : {height:'75px'}}>
                                        <div className={styles.frombodyleft} style={w<bp && socialWorkTP ? {width:'100%'} : {width:'50%'}}>
                                            Social Work</div>
                                        <div className={styles.frombodyright} style={w<bp && socialWorkTP ? {width:'100%'} : {width:'50%'}}>
                                            {socialWorkTP ? (
                                                <div>
                                                    <TimePicker 
                                                        onChange={changeSocialWork}/>
                                                    <span><button onClick={(e) => setSocialWorkTP(false)}>Close</button></span>
                                                </div>
                                            ) : (
                                                <input
                                                    type="text"
                                                    className={styles.inputitem}
                                                    placeholder="hh:mm"
                                                    onClick={(e) => setSocialWorkTP(true)}
                                                    value={socialWork ? float2time(socialWork)+hm : ""}
                                                />
                                                
                                            )}
                                        </div>
                                    </div>
                                    <div className={styles.fromarea}>
                                        <div className={styles.frombodyleft}>
                                            Dawah Materials Disribution
                                        </div>
                                        <div className={styles.frombodyright}>
                                            <input
                                            type="number"
                                            min="0"
                                            max="10000"
                                            className={styles.inputitem}
                                            placeholder="Number"
                                            onChange={(e) => setDawahMaterial(e.target.value)}
                                            value={dawahMaterial}
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
                                            min="0"
                                            max="10000"
                                            onChange={(e) => setDistribution(e.target.value)}
                                            value={distribution}
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
                                            min="0"
                                            max="10000"
                                            className={styles.inputitem}
                                            placeholder="Number"
                                            onChange={(e) => setFamilyMeeting(e.target.value)}
                                            value={familyMeeting}
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
                                            min="0"
                                            max="10000"
                                            onChange={(e) => setOrgProgram(e.target.value)}
                                            value={orgProgram}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.fromarea} style={w<bp && orgTimeTP ? {height:'150px'} : {height:'75px'}}>
                                        <div className={styles.frombodyleft} style={w<bp && orgTimeTP ? {width:'100%'} : {width:'50%'}}>
                                            Org. Time</div>
                                        <div className={styles.frombodyright} style={w<bp && orgTimeTP ? {width:'100%'} : {width:'50%'}}>
                                            {orgTimeTP ? (
                                                <div>
                                                    <TimePicker 
                                                        onChange={changeOrgTime}/>
                                                    <span><button onClick={(e) => setOrgTimeTP(false)}>Close</button></span>
                                                </div>
                                            ) : (
                                                <input
                                                    type="text"
                                                    className={styles.inputitem}
                                                    placeholder="hh:mm"
                                                    onClick={(e) => setOrgTimeTP(true)}
                                                    value={orgTime ? float2time(orgTime)+hm : ""}
                                                />
                                                
                                            )}
                                        </div>
                                    </div>
                                    <div className={styles.fromarea} style={w<bp && physicalExerciseTP ? {height:'150px'} : {height:'75px'}}>
                                        <div className={styles.frombodyleft} style={w<bp && physicalExerciseTP ? {width:'100%'} : {width:'50%'}}>
                                            Physical Exercise</div>
                                        <div className={styles.frombodyright} style={w<bp && physicalExerciseTP ? {width:'100%'} : {width:'50%'}}>
                                            {physicalExerciseTP ? (
                                                <div>
                                                    <TimePicker 
                                                        onChange={changePhysicalExercise}/>
                                                    <span><button onClick={(e) => setPhysicalExerciseTP(false)}>Close</button></span>
                                                </div>
                                            ) : (
                                                <input
                                                    type="text"
                                                    className={styles.inputitem}
                                                    placeholder="hh:mm"
                                                    onClick={(e) => setPhysicalExerciseTP(true)}
                                                    value={physicalExercise ? float2time(physicalExercise)+hm : ""}
                                                />
                                                
                                            )}
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
                                            onChange={(e) => setSelfCriticism((selfCriticism+1)%2)}
                                            value={selfCriticism}
                                            checked={selfCriticism==1 ? true : false}
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
                                            value={comment}
                                            />
                                        </div>
                                    </div>
                                </div>
                                

                                <div className={styles.fromarea}> {/*submit button */}
                                    <button
                                    className={styles.inputitmbtnsave}
                                    onClick={sbbutton}
                                    >
                                        {reportid == 0 ? "Add " : "Update "}
                                        Report</button>
                                </div>
                                <br></br>

                            </div>
                        </Col>
                        <Col xs lg="1"></Col>
                    </Row>
                </Container>
            
        </div>
    )

}

export default DailyBody;
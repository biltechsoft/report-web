import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import styles from "../assets/css/body.module.css";
import { FaClipboardList } from "react-icons/fa";

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import moment from "moment";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from 'react-ios-time-picker';


import { API } from "../api-service";
//import axios from "axios";
import swal from "sweetalert";

function PlanBody() {

    const user = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const [date, setDate] = useState(new Date());
    const month=moment(date).format('MM');
    const year=moment(date).format('YYYY');
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
    const [supporterIncrease, setSupporterIncrease] = useState(null);
    const [planComment, setPlanComment] = useState(null);

    const [allplans, setAllplans] = useState([]);
    const [planid, setPlanid] = useState(0);

    const [w, setWidth] = useState(window.innerWidth); //width
    const bp = 620; //breakpoint

    const [gotplan, setGotplan] = useState(false);
    const [planlength, setP] = useState(100);

    useEffect(() => {
        /* Inside of a "useEffect" hook add an event listener that updates
        the "width" state variable when the window size changes */
        window.addEventListener("resize", () => setWidth(window.innerWidth));

        /* passing an empty array as the dependencies of the effect will cause this
        effect to only run when the component mounts, and not each time it updates.
        We only want the listener to be added once */
    }, []);

    const getPlan = () => {
        const plan = allplans.filter((item) => item.month == month && item.year == year && item.user == user);
        setP(plan.length);
        if(plan.length != 0) {
            setPlanid(plan[0].id);
            //setQuranStudy(plan.map((item) => item.quranStudy));
            setQuranStudy(plan[0].quranStudy == null ? NaN : plan[0].quranStudy);
            setHadithStudy(plan[0].hadithStudy == null ? NaN : plan[0].hadithStudy);
            setBookStudy(plan[0].bookStudy == null ? NaN : plan[0].bookStudy);
            setLectureListening(plan[0].lectureListening == null ? NaN : plan[0].lectureListening);
            setSalat(plan[0].salat == null ? NaN : plan[0].salat);
            setDawahProgram(plan[0].dawahProgram == null ? NaN : plan[0].dawahProgram);
            setMemberContact(plan[0].memberContact == null ? NaN : plan[0].memberContact);
            setSocialWork(plan[0].socialWork == null ? NaN : plan[0].socialWork);
            setDawahMaterial(plan[0].dawahMaterial == null ? NaN : plan[0].dawahMaterial);
            setDistribution(plan[0].distribution == null ? NaN : plan[0].distribution);
            setFamilyMeeting(plan[0].familyMeeting == null ? NaN : plan[0].familyMeeting);
            setOrgProgram(plan[0].orgProgram == null ? NaN : plan[0].orgProgram);
            setOrgTime(plan[0].orgTime == null ? NaN : plan[0].orgTime);
            setPhysicalExercise(plan[0].physicalExercise == null ? NaN : plan[0].physicalExercise);
            setSelfCriticism(plan[0].selfCriticism == null ? NaN : plan[0].selfCriticism);
            setSupporterIncrease(plan[0].supporterIncrease == null ? NaN : plan[0].supporterIncrease);
            setPlanComment(plan[0].planComment == null ? '' : plan[0].planComment);
        }
        else {
            setPlanid(0);
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
            setSelfCriticism(NaN);
            setSupporterIncrease(NaN);
            setPlanComment('');
        }
    }

    useEffect(() => {
        API.getPlans(token)
        .then( resp =>  setAllplans(resp))
        .catch (error => console.log(error))
    }, [gotplan]);

    useEffect(() => {
        getPlan();
    }, [allplans, month, year]);

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
    function twoDigit(num) {
        return num<10 ? "0"+num : num;
    }

    const sbbutton = () => {
        const data = {
            user,
            month,
            year,
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
            supporterIncrease,
            planComment
          };
        if(planid == 0) {
            API.createPlan(data, token)
            .then( resp => {
                //console.log(resp);
                if(resp.user == user) {
                    swal("Success!", "Plan successfully Added", "success");
                    setGotplan(!gotplan);
                }
                else {
                    swal("Error", "Plan Not Added", "warning");
                }
            })
            .catch(error => {
                //console.log(error);
                swal("Error", "Plan Not Added", "warning");
            });
        }
        else {
            API.updatePlan(planid, data, token)
            .then( resp => {
                //console.log(resp);
                //console.log(data);
                if(resp.user == user) {
                    swal("Success!", "Plan successfully Updated", "success");
                    setGotplan(!gotplan);
                }
                else {
                    swal("Error", "Plan Not Updated", "warning");
                }
            })
            .catch(error => {
                //console.log(error);
                swal("Error", "Plan Not Updated", "warning");
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
                                        <FaClipboardList /> Monthly Plan
                                    </div>
                                    <div className={styles.bodyheaderright} style={w<bp ? {width:'100%'} : {width:'50%'}}>
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

                                <div> {/*form div */}
                                    <div className={styles.fromarea}>
                                        <MDBCol size='6' className={styles.bodyleft}>Fields</MDBCol>
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
                                            placeholder="Ayats"
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
                                            placeholder="Hadiths"
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
                                            max="744"
                                            step="0.01"
                                            onChange={(e) =>
                                                setLectureListening(e.target.value)
                                            }
                                            value={lectureListening}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.fromarea}>
                                        <div className={styles.frombodyleft}>
                                            Islamic Lecture Listening
                                        </div>
                                        <div className={styles.frombodyright}>
                                            <input
                                            type="text"
                                            className={styles.inputitem}
                                            placeholder="hh:mm"
                                            onChange={(e) =>
                                                setLectureListening(lectureListening ? time2float(e.target.value) : e.target.value)
                                            }
                                            value={lectureListening ? (lectureListening.length>1 ? lectureListening : float2time(lectureListening)) : ""}
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
                                            max="155"
                                            className={styles.inputitem}
                                            placeholder="Waqta"
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
                                    <div className={styles.fromarea}>
                                        <div className={styles.frombodyleft}>Social Work</div>
                                        <div className={styles.frombodyright}>
                                            <input
                                            type="text"
                                            className={styles.inputitem}
                                            placeholder="hh:mm"
                                            onChange={(e) => setSocialWork(socialWork ? time2float(e.target.value) : e.target.value)}
                                            value={socialWork ? (socialWork.length>1 ? socialWork : float2time(socialWork)) : ""}
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
                                    <div className={styles.fromarea}>
                                        <div className={styles.frombodyleft}>Org. Time</div>
                                        <div className={styles.frombodyright}>
                                            <input
                                            type="text"
                                            className={styles.inputitem}
                                            placeholder="hh:mm"
                                            onChange={(e) => setOrgTime(orgTime ? time2float(e.target.value) : e.target.value)}
                                            value={orgTime ? (orgTime.length>1 ? orgTime : float2time(orgTime)) : ""}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.fromarea}>
                                        <div className={styles.frombodyleft}>Physical Exercise</div>
                                        <div className={styles.frombodyright}>
                                            <input
                                            type="text"
                                            className={styles.inputitem}
                                            placeholder="hh:mm"
                                            onChange={(e) => setPhysicalExercise(physicalExercise ? time2float(e.target.value) : e.target.value)}
                                            value={physicalExercise ? (physicalExercise.length>1 ? physicalExercise : float2time(physicalExercise)) : ""}
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
                                            type="number"
                                            className={styles.inputitem}
                                            min="0"
                                            max="31"
                                            placeholder="Number(0-31)"
                                            onChange={(e) => setSelfCriticism(e.target.value)}
                                            value={selfCriticism}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.fromarea}>
                                        <div className={styles.frombodyleft}>
                                        Supporter Increase 
                                            {/* {user.selfCriticism == '1'? 'checked': null } */}
                                        </div>
                                        <div className={styles.frombodyright}>
                                            <input
                                            type="number"
                                            placeholder="Number"
                                            className={styles.inputitem}
                                            min="0"
                                            max="10000"
                                            onChange={(e) =>setSupporterIncrease(e.target.value)}
                                            value={supporterIncrease}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.fromarea}>
                                        <div className={styles.fromtextarea}>
                                            <input
                                            type="textarea"
                                            className={styles.inputitemtextarea}
                                            placeholder="Comment (Optional)"
                                            onChange={(e) => setPlanComment(e.target.value)}
                                            value={planComment}
                                            />
                                        </div>
                                    </div>
                                </div>
                                

                                <div className={styles.fromarea}> {/*submit button */}
                                    <button
                                    className={styles.inputitmbtnsave}
                                    onClick={sbbutton}
                                    >
                                        {planid == 0 ? "Add " : "Update "}
                                        Monthly Plan</button>
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

export default PlanBody;
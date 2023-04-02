import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../assets/css/body.module.css";
import { FaClipboardList } from "react-icons/fa";

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import moment from "moment";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import config from "../config";
import axios from "axios";
import swal from "sweetalert";
const Monthlyplanbody = () => {
  const [status, setStatus] = useState(undefined); // For message

  const user = localStorage.getItem("user_id");


  const [date, setDate] = useState(new Date());
  const month=moment(date).format('MM');
  const year=moment(date).format('YYYY');

  const [quranStudy, setQuranStudy] = useState("");
  const [hadithStudy, setHadithStudy] = useState("");
  const [bookStudy, setBookStudy] = useState("");
  const [lectureListening, setLectureListening] = useState("");
  const [salat, setSalat] = useState("");
  const [dawahProgram, setDawahProgram] = useState("");
  const [memberContact, setMemberContact] = useState("");
  const [socialWork, setSocialWork] = useState("");
  const [dawahMaterial, setDawahMaterial] = useState("");
  const [distribution, setDistribution] = useState("");
  const [familyMeeting, setFamilyMeeting] = useState("");
  const [orgProgram, setOrgProgram] = useState("");
  const [orgTime, setOrgTime] = useState("");
  const [selfCriticism, setSelfCriticism] = useState("");
  const [supporterIncrease, setSupporterIncrease] = useState("");
  const [planComment, setPlanComment] = useState("");

  const [postId, setPostId] = useState(null);
  const [searchApiData, setsearchApiData] = useState([]);
  const [filterVal, setFilterVal] = useState([]);

  const handleFilter = async (e) => {
    fetch(`${config.apiUrl}plan/`)
      .then((Response) => Response.json())
      .then((json) => {
        setsearchApiData(json);

        const filterResult = searchApiData.filter(
          (item) =>
            item.month === month && item.year === year && item.user === user
        );
        setFilterVal(filterResult);
        const postIdresult = filterResult.map((item) => item.id);
        setPostId(postIdresult);
      });
  };
  useEffect(() => {
    handleFilter();
  }, [month, year]);



  const sendDataToApi = async (e) => {
    e.preventDefault();
    const res = axios
      .post(`${config.apiUrl}plan/`, {
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
        selfCriticism,
        supporterIncrease,
        planComment
      })
      .then(() => {
        setStatus({ type: "success" });
        swal("Success!", "Report successfully added", "success");
        // setMonth(null);
        // setYear(null);
      })
      .catch((error) => {
        setStatus({ type: "error", error });
        swal("Error", "Report Not Added", "warning");
      });
  };

  // useEffect(() => {
  //   sendDataToApi();
  // }, []);

///-----------------------------------

const addReport = async (e) => {
  e.preventDefault();
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
    selfCriticism,
    supporterIncrease,
    planComment
  };

  await axios
    .patch(`${config.apiUrl}plan/` + postId + "/", data)
    .then(() => {
      setStatus({ type: "success" });
      swal("Success!", "Report successfully Updated", "success");
      
    })
    .catch((error) => {
      setStatus({ type: "error", error });
      swal("Error", "Report Not Updated", "warning");
    });
};

//----------------------------
const sbbutton =(e)=>{
  filterVal.length >= 1 ? addReport(e) : sendDataToApi(e);
} 

console.log(month);
console.log(year);

  return (
    <div className={styles.loginbody}>
      <form onSubmit={sbbutton}>
        <Container className="">
          <Row className="justify-content-md-center">
            <Col xs lg="1"></Col>
            <Col lg="10">
              <div className="allbodybg">
                {/* from header */}
                <div className={styles.bodytopheight}>
                  <div className={styles.bodyheaderleft}>
                    <FaClipboardList /> Monthly Planss
                  </div>
                  <div className={styles.bodyheaderright}>

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        
        <DatePicker
          views={['year', 'month']}
          label="Year and Month"
          minDate={new Date('2022-01-01')}
          maxDate={new Date('2030-12-01')}
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
        
      </Stack>
    </LocalizationProvider>

                    {/* <select
                      type="select"
                      required="required"
                      className={styles.inputmonthlydate}
                      placeholder="Last Name"
                      onInput={(e) => handleFilter(e)}
                      onChange={(e) => setMonth(e.target.value)}
                    >
                      <option disabled selected="selected">
                        Select Month
                      </option>
                      <option value="1">January</option>
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
                      <option value="12">December</option>
                    </select>
                    <select
                      type="select"
                      required="required"
                      className={styles.inputmonthlydate}
                      onInput={(e) => handleFilter(e)}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="Last Name"
                    >
                      <option disabled selected="selected">
                        Select Year
                      </option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                    </select> */}
                  </div>
                </div>

                {/* from body */}
                {filterVal.length >= 1 ? (
filterVal.map((item, index) => {
  return (
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
                          className={styles.inputitemfirst}
                          min="0"
                          max="10000"
                          placeholder="Ayats"
                          onChange={(e) => setQuranStudy(e.target.value)}
                          defaultValue={item.quranStudy}
                          
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
                          placeholder="Pages Number"
                          min="0"
                          max="10000"
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
                          className={styles.inputitem}
                          placeholder="Hours"
                          min="0"
                          max="744"
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
                          min="0"
                          max="155"
                          className={styles.inputitem}
                          placeholder="Waqta"
                          onChange={(e) => setSalat(e.target.value)}
                          defaultValue={item.salat}
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
                          min="0"
                          max="10000"
                          className={styles.inputitem}
                          placeholder="Number"
                          onChange={(e) => setMemberContact(e.target.value)}
                          defaultValue={item.memberContact}
                        />
                      </div>
                    </div>
                    <div className={styles.fromarea}>
                      <div className={styles.frombodyleft}>Social Work</div>
                      <div className={styles.frombodyright}>
                        <input
                          type="number"
                          min="0"
                          max="744"
                          className={styles.inputitem}
                          placeholder="Hours"
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
                          min="0"
                          max="10000"
                          className={styles.inputitem}
                          placeholder="Number"
                          onChange={(e) => setDawahMaterial(e.target.value)}
                          defaultValue={item.dawahMaterial}
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
                          min="0"
                          max="10000"
                          className={styles.inputitem}
                          placeholder="Number"
                          onChange={(e) => setFamilyMeeting(e.target.value)}
                          defaultValue={item.familyMeeting}
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
                          min="0"
                          max="744"
                          placeholder="Hours"
                          onChange={(e) => setOrgTime(e.target.value)}
                          defaultValue={item.orgTime}
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
                          defaultValue={item.selfCriticism}
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
                          defaultValue={item.supporterIncrease}
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
                          defaultValue={item.planComment}
                        />
                      </div>
                    </div>

                    {/* from body End */}
                  </div>

                  <div className={styles.inputitmbtnsavearea}>
                    <input
                      type="submit"
                      className={styles.inputitmbtnsave}
                      value="Update Monthly Plan"
                    />
                  </div>
                </div>
   )}) )

                 : (
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
                            className={styles.inputitemfirst}
                            min="0"
                            max="10000"
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
                            min="0"
                            max="10000"
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
                            placeholder="Pages Number"
                            min="0"
                            max="10000"
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
                            max="744"
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
                            max="155"
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
                            min="0"
                            max="10000"
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
                            min="0"
                            max="10000"
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
                            min="0"
                            max="744"
                            className={styles.inputitem}
                            placeholder="Hours"
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
                            min="0"
                            max="10000"
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
                            min="0"
                            max="10000"
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
                            min="0"
                            max="10000"
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
                            min="0"
                            max="10000"
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
                            min="0"
                            max="744"
                            placeholder="Hours"
                            onChange={(e) => setOrgTime(e.target.value)}
                           
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
                            placeholder="Number(0-31)"
                            className={styles.inputitem}
                            min="0"
                            max="31"
                            onChange={(e) => setSelfCriticism(e.target.value)}
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
                            className={styles.inputitem}
                            placeholder="Number"
                            min="0"
                            max="10000"
                            onChange={(e) =>setSupporterIncrease(e.target.value)}
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
                           
                          />
                        </div>
                      </div>

                      {/* from body End */}
                    </div>

                    <div className={styles.inputitmbtnsavearea}>
                      <input
                        type="submit"
                        className={styles.inputitmbtnsave}
                        value="Add Monthly Plan"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Col>
            <Col xs lg="1"></Col>
          </Row>
        </Container>
      </form>
    </div>
  );
};

export default Monthlyplanbody;

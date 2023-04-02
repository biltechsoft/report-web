import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import styles from "../assets/css/body.module.css";
import { FaClipboardList } from "react-icons/fa";
import { FcList } from "react-icons/fc";
import ProgressBar from "react-bootstrap/ProgressBar";
import config from "../config";

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import moment from "moment";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { API } from "../api-service";

import { FiCornerUpLeft } from "react-icons/fi";
import { FiCornerUpRight } from "react-icons/fi";

const CcomplishmentbodyCopy = ({ user }) => {


  //const user = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  const [date, setDate] = useState(new Date());
  const month=moment(date).format('MM');
  const year=moment(date).format('YYYY');
  const cY = moment(Date()).format('YYYY');  //currentYear

  const [filterVal, setFilterVal] = useState([]);
  const [filterValPlan, setFilterValPlan] = useState([]);

  const [allsummarys, setAllsummarys] = useState([]);
  const [allplans, setAllplans] = useState([]);

  const [gotsummary, setGotsummary] = useState(false);
  const [gettingData, setGettingData] = useState(false);

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

  
  ///==================STYLE=============
  const alignLeft40 = {
    width: "40%",
    float: "left",
    textAlign: "center",
    fontSize: "15px",
  };
  const alignLeft30 = {
    width: w<bp ? "60%" : "30%",
    float: "left",
    textAlign: "center",
    fontSize: "15px",
  };
  const titleBackground = {
    background: "rgb(11, 0, 213)",
    fontSize: "13px",
    padding: "11px",
    color: "white",
    height: "50px",
    fontWeight: "bold",
  };
  const itemBackground1 = {
    background: "rgb(0, 149, 255)",
    fontSize: "19px",
    padding: "11px",
    color: "white",
    border: "2px solid rgb(0 113 193)",
    borderRight: "none",
    height: "50px",
  };
  const itemBackground2 = {
    background: "#e9ecef",
    fontSize: "18px",
    padding: "11px",
    border: "2px solid rgb(0 113 193)",
    borderRight: "none",
    height: "50px",
  };
  const itemBackground3 = {
    background: "white",
    fontSize: "15px",
    padding: "11px",
    border: "2px solid rgb(0 113 193)",
    height: "50px",
  };
  // const pdfDownload = {
  //   fontSize: "1rem",
  //   textAlign: "right",
  //   marginRight: "20px",
  //   color: "gray",
  //   cursor: "pointer",
  // };
  //=============================


  const getSummary = () => {
    const summary = allsummarys.filter((item) => item.month == month && item.year == year && item.user == user);
    const plan = allplans.filter((item) => item.month == month && item.year == year && item.user == user);

    setFilterVal(summary);
    setFilterValPlan(plan);
  }

useEffect(() => {
  setGettingData(true);
    API.getSummarys(token)
      .then( resp =>  setAllsummarys(resp))
      .then(() => setGettingData(false))
      .catch (error => console.log(error));
    API.getPlans(token)
        .then( resp =>  setAllplans(resp))
        .then(() => setGettingData(false))
        .catch (error => console.log(error));
}, [gotsummary]);

useEffect(() => {
  getSummary();
}, [allplans, month, year, user]);


  /*const handleFilter = async (e) => {
    fetch(`${config.apiUrl}monthly/`)
      .then((Response) => Response.json())
      .then((json) => {
        setsearchApiData(json);

        const filterResult = searchApiData.filter(
          (item) =>
            item.month == month && item.year == year && item.user == user
        );
       
        setFilterVal(filterResult);
        
      });
      fetch(`${config.apiUrl}plan/`)
      .then((Res) => Res.json())
      .then((json) => {
        setsearchApiDataPlan(json);

        const filterResultPlan = searchApiDataPlan.filter(
          (item) =>
            item.month == month && item.year == year && item.user == user
        );
       
        setFilterValPlan(filterResultPlan);
       
      });
  };
  
  useEffect(() => {
    handleFilter();
  }, [month, year]); 
  
  
                      onInput={(e) => handleFilter(e)}*/

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    // Using the browser's default locale.
    return date.toLocaleString([], { month: 'long' });
  }
  function float2time(fnum) {
    var t0 = Math.trunc(fnum);
    var t1 = twoDigit(Math.round((fnum-t0)*60));
    return t0 + ":" + t1;
  }
  function twoDigit(num) {
    return num<10 ? "0"+num : num;
  }


//  const ddate=new Date();

//   useEffect(() => {
//      setMonth(moment(ddate).format('MM'));
//     setYear(moment(ddate).format('YYYY'));
   
//   }, []);

//   console.log(month);
//   console.log(year);

//   console.log(filterVal);
//   console.log(filterValPlan);
  
  return (
    
      <Container className="">
        <Row className="justify-content-md-center">
          <Col lg="12">
            <div className="allbodybg">
              {/* from header */}
              

                <div className={styles.bodytopheight}>
                  
                  <div className={styles.bodyheaderright} style={{width:'100%', padding: "10px 5%"}}>
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

              {filterVal.length >= 1  & filterValPlan.length>=1 ? (
                  filterVal.map((item, index) => {
                    return (
              <div>

                  <h3
                    style={{
                      width: "100%",
                      padding: "0px",
                      textAlign: "center",
                      fontFamily: "fantasy",
                      color: "darkslateblue",
                    }}
                  >
                    Monthly Report Summary
                  </h3>
               
              {/* Report Item Header */}
              <div style={{ width: "100%", padding: "0px 5%" }}>
                  <div style={{ margin: "10px 0px" }}>
                    <div style={alignLeft40}>
                      <div style={titleBackground}>Fields</div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={titleBackground}>
                        {" "}
                        Plan{" "}
                        <span>
                          <FiCornerUpLeft />
                          <FiCornerUpRight />
                        </span>{" "}
                        Achi.
                      </div>
                    </div>
                    { w <bp ? "" : (
                      <div style={alignLeft30}>
                        <div style={titleBackground}>Progress %</div>
                      </div>)
                    }
                  </div>
                </div>
                <br></br>
                <div className={styles.fromarea} style={w<bp ? {height:'150px'} : {height:'75px'}}>
                  <div className={styles.frombodyleftprogress}>Quran Study</div>
                  <div className={styles.frombodycenterprogress} style={w<bp ? {width:'60%'} : {width:'30%'}}>
                  {filterValPlan.map((res) => res.quranStudy)} | {item.quranStudy}</div>
                  <div className={styles.frombodyrightprogress} style={w<bp ? {width:'100%', height:'50px'} : {width:'30%'}}>
                    <span>{filterValPlan[0].quranStudy>0 ? parseFloat(item.quranStudy / filterValPlan.map((res) => res.quranStudy)*100).toFixed(2) : 'No Plan'} %</span>
                    <ProgressBar variant="success" 
                    now={filterValPlan[0].quranStudy>0 ? parseFloat(item.quranStudy / filterValPlan[0].quranStudy*100).toFixed(2) : 0}  />
                  </div>
                </div>
                
                <div className={styles.fromarea} style={w<bp ? {height:'150px'} : {height:'75px'}}>
                  <div className={styles.frombodyleftprogress}>
                    Hadith Study
                  </div>
                  <div className={styles.frombodycenterprogress} style={w<bp ? {width:'60%'} : {width:'30%'}}> 
                  {filterValPlan.map((res) => res.hadithStudy)} | {item.hadithStudy}</div>
                  <div className={styles.frombodyrightprogress} style={w<bp ? {width:'100%', height:'50px'} : {width:'30%'}}>
                    <span>{filterValPlan[0].hadithStudy>0 ? parseFloat(item.hadithStudy / filterValPlan.map((res) => res.hadithStudy)*100).toFixed(2) : 'No Plan'}%</span>
                    <ProgressBar variant="success" 
                    now={filterValPlan[0].hadithStudy>0 ? parseFloat(item.hadithStudy / filterValPlan.map((res) => res.hadithStudy)*100).toFixed(2) : 0}  />
                  </div>
                </div>
                <div className={styles.fromarea} style={w<bp ? {height:'150px'} : {height:'75px'}}>
                  <div className={styles.frombodyleftprogress}>
                    Islamic Book Study
                  </div>
                  <div className={styles.frombodycenterprogress} style={w<bp ? {width:'60%'} : {width:'30%'}}> 
                  {filterValPlan.map((res) => res.bookStudy)} | {item.bookStudy}</div>
                  <div className={styles.frombodyrightprogress}  style={w<bp ? {width:'100%', height:'50px'} : {width:'30%'}}>
                    <span>{filterValPlan[0].bookStudy>0 ? parseFloat(item.bookStudy / filterValPlan.map((res) => res.bookStudy)*100).toFixed(2) : 'No Plan'}%</span>
                    <ProgressBar variant="success" 
                    now={filterValPlan[0].bookStudy>0 ? parseFloat(item.bookStudy / filterValPlan.map((res) => res.bookStudy)*100).toFixed(2) : 0}  />
                  </div>
                </div>
                <div className={styles.fromarea} style={w<bp ? {height:'150px'} : {height:'75px'}}>
                  <div className={styles.frombodyleftprogress}>
                    Islamic Lecture Listening
                  </div>
                  <div className={styles.frombodycenterprogress} style={w<bp ? {width:'60%'} : {width:'30%'}}> 
                  {filterValPlan.map((res) => float2time(res.lectureListening))} | {float2time(item.lectureListening)}</div>
                  <div className={styles.frombodyrightprogress}  style={w<bp ? {width:'100%', height:'50px'} : {width:'30%'}}>
                    <span>{filterValPlan[0].lectureListening>0 ? parseFloat(item.lectureListening / filterValPlan.map((res) => res.lectureListening)*100).toFixed(2) : 'No Plan'}%</span>
                    <ProgressBar variant="success" 
                    now={filterValPlan[0].lectureListening>0 ? parseFloat(item.lectureListening / filterValPlan.map((res) => res.lectureListening)*100).toFixed(2) : 0} />
                  </div>
                </div>
                
                <div className={styles.fromarea} style={w<bp ? {height:'150px'} : {height:'75px'}}>
                  <div className={styles.frombodyleftprogress}>
                    Salat in Jamayat
                  </div>
                  <div className={styles.frombodycenterprogress} style={w<bp ? {width:'60%'} : {width:'30%'}}> 
                  {filterValPlan.map((res) => res.salat)} | {item.salat}</div>
                  <div className={styles.frombodyrightprogress}  style={w<bp ? {width:'100%', height:'50px'} : {width:'30%'}}>
                    <span> {filterValPlan[0].salat>0 ? (item.salat / filterValPlan.map((res) => res.salat)*100).toFixed(2) : 'No Plan'} %</span>
                    <ProgressBar variant="success" 
                    now={filterValPlan[0].salat>0 ? parseFloat(item.salat / filterValPlan.map((res) => res.salat)*100).toFixed(2) : 0} />
                  </div>
                </div>
                <div className={styles.fromarea} style={w<bp ? {height:'150px'} : {height:'75px'}}>
                  <div className={styles.frombodyleftprogress}>
                    Dawah Program
                  </div>
                  <div className={styles.frombodycenterprogress} style={w<bp ? {width:'60%'} : {width:'30%'}}>
                     {filterValPlan.map((res) => res.dawahProgram)} | {item.dawahProgram}</div>
                  <div className={styles.frombodyrightprogress}  style={w<bp ? {width:'100%', height:'50px'} : {width:'30%'}}>
                    <span>{filterValPlan[0].dawahProgram>0 ? (item.dawahProgram / filterValPlan.map((res) => res.dawahProgram)*100).toFixed(2) : 'No Plan'} %</span>
                    <ProgressBar variant="success" 
                    now={filterValPlan[0].dawahProgram>0 ? parseFloat(item.dawahProgram / filterValPlan.map((res) => res.dawahProgram)*100).toFixed(2) : 0}  />
                  </div>
                </div>
                <div className={styles.fromarea} style={w<bp ? {height:'150px'} : {height:'75px'}}>
                  <div className={styles.frombodyleftprogress}>
                    Member Contact
                  </div>
                  <div className={styles.frombodycenterprogress} style={w<bp ? {width:'60%'} : {width:'30%'}}> 
                  {filterValPlan.map((res) => res.memberContact)} | {item.memberContact}</div>
                  <div className={styles.frombodyrightprogress}  style={w<bp ? {width:'100%', height:'50px'} : {width:'30%'}}>
                    <span>{filterValPlan[0].memberContact>0 ? (item.memberContact / filterValPlan.map((res) => res.memberContact)*100).toFixed(2) : 'No Plan'} %</span>
                    <ProgressBar variant="success" 
                    now={filterValPlan[0].memberContact>0 ? parseFloat(item.memberContact / filterValPlan.map((res) => res.memberContact)*100).toFixed(2) : 0}  />
                  </div>
                </div>
                <div className={styles.fromarea} style={w<bp ? {height:'150px'} : {height:'75px'}}>
                <div className={styles.frombodyleftprogress}>Social Work</div>
                <div className={styles.frombodycenterprogress} style={w<bp ? {width:'60%'} : {width:'30%'}}> 
                {filterValPlan.map((res) => float2time(res.socialWork))} | {float2time(item.socialWork)}</div>
                <div className={styles.frombodyrightprogress}  style={w<bp ? {width:'100%', height:'50px'} : {width:'30%'}}>
                  <span>{filterValPlan[0].socialWork>0 ? (item.socialWork / filterValPlan.map((res) => res.socialWork)*100).toFixed(2) : 'No Plan'} %</span>
                  <ProgressBar variant="success" 
                  now={filterValPlan[0].socialWork>0 ? parseFloat(item.socialWork / filterValPlan.map((res) => res.socialWork)*100).toFixed(2) : 0} />
                </div>
              </div>
              <div className={styles.fromarea} style={w<bp ? {height:'150px'} : {height:'75px'}}>
                <div className={styles.frombodyleftprogress}>
                  Dawah Material Disribution
                </div>
                <div className={styles.frombodycenterprogress} style={w<bp ? {width:'60%'} : {width:'30%'}}> 
                {filterValPlan.map((res) => res.dawahMaterial)} | {item.dawahMaterial}</div>
                <div className={styles.frombodyrightprogress}  style={w<bp ? {width:'100%', height:'50px'} : {width:'30%'}}>
                  <span>{filterValPlan[0].dawahMaterial>0 ? (item.dawahMaterial / filterValPlan.map((res) => res.dawahMaterial)*100).toFixed(2) : 'No Plan'} %</span>
                  <ProgressBar variant="success" 
                  now={filterValPlan[0].dawahMaterial>0 ? parseFloat(item.dawahMaterial / filterValPlan.map((res) => res.dawahMaterial)*100).toFixed(2) : 0} />
                </div>
              </div>
              <div className={styles.fromarea} style={w<bp ? {height:'150px'} : {height:'75px'}}>
                <div className={styles.frombodyleftprogress}>
                  Disribution
                </div>
                <div className={styles.frombodycenterprogress} style={w<bp ? {width:'60%'} : {width:'30%'}}> 
                {filterValPlan.map((res) => res.distribution)} | {item.distribution}</div>
                <div className={styles.frombodyrightprogress}  style={w<bp ? {width:'100%', height:'50px'} : {width:'30%'}}>
                  <span>{filterValPlan[0].distribution>0 ? (item.distribution / filterValPlan.map((res) => res.distribution)*100).toFixed(2) : 'No Plan'} %</span>
                  <ProgressBar variant="success" 
                  now={filterValPlan[0].distribution>0 ? parseFloat(item.distribution / filterValPlan.map((res) => res.distribution)*100).toFixed(2) : 0} />
                </div>
              </div>
              <div className={styles.fromarea} style={w<bp ? {height:'150px'} : {height:'75px'}}>
                <div className={styles.frombodyleftprogress}>
                  Family Meeting
                </div>
                <div className={styles.frombodycenterprogress} style={w<bp ? {width:'60%'} : {width:'30%'}}>
                   {filterValPlan.map((res) => res.familyMeeting)} | {item.familyMeeting}</div>
                <div className={styles.frombodyrightprogress}  style={w<bp ? {width:'100%', height:'50px'} : {width:'30%'}}>
                  <span>{filterValPlan[0].familyMeeting>0 ? (item.familyMeeting / filterValPlan.map((res) => res.familyMeeting)*100).toFixed(2) : 'No Plan'} %</span>
                  <ProgressBar variant="success" 
                  now={filterValPlan[0].familyMeeting>0 ? parseFloat(item.familyMeeting / filterValPlan.map((res) => res.familyMeeting)*100).toFixed(2) : 0} />
                </div>
              </div>
              <div className={styles.fromarea} style={w<bp ? {height:'150px'} : {height:'75px'}}>
                <div className={styles.frombodyleftprogress}>
                  Org. Program
                </div>
                <div className={styles.frombodycenterprogress} style={w<bp ? {width:'60%'} : {width:'30%'}}> 
                {filterValPlan.map((res) => res.orgProgram)} | {item.orgProgram}</div>
                <div className={styles.frombodyrightprogress}  style={w<bp ? {width:'100%', height:'50px'} : {width:'30%'}}>
                  <span>{filterValPlan[0].orgProgram>0 ? (item.orgProgram / filterValPlan.map((res) => res.orgProgram)*100).toFixed(2) : 'No Plan'} %</span>
                  <ProgressBar variant="success" 
                  now={filterValPlan[0].orgProgram>0 ? parseFloat(item.orgProgram / filterValPlan.map((res) => res.orgProgram)*100).toFixed(2) : 0} />
                </div>
              </div>
              <div className={styles.fromarea} style={w<bp ? {height:'150px'} : {height:'75px'}}>
                <div className={styles.frombodyleftprogress}>
                  Org. Time
                </div>
                <div className={styles.frombodycenterprogress} style={w<bp ? {width:'60%'} : {width:'30%'}}> 
                {filterValPlan.map((res) => float2time(res.orgTime))} | {float2time(item.orgTime)}</div>
                <div className={styles.frombodyrightprogress}  style={w<bp ? {width:'100%', height:'50px'} : {width:'30%'}}>
                  <span>{filterValPlan[0].orgTime>0 ? (item.orgTime / filterValPlan.map((res) => res.orgTime)*100).toFixed(2) : 'No Plan'} %</span>
                  <ProgressBar variant="success" 
                  now={filterValPlan[0].orgTime>0 ? parseFloat(item.orgTime / filterValPlan.map((res) => res.orgTime)*100).toFixed(2) : 0} />
                </div>
              </div>
              <div className={styles.fromarea} style={w<bp ? {height:'150px'} : {height:'75px'}}>
                <div className={styles.frombodyleftprogress}>
                Physical Exercise
                </div>
                <div className={styles.frombodycenterprogress} style={w<bp ? {width:'60%'} : {width:'30%'}}> 
                {filterValPlan.map((res) => float2time(res.physicalExercise))} | {float2time(item.physicalExercise)}</div>
                <div className={styles.frombodyrightprogress}  style={w<bp ? {width:'100%', height:'50px'} : {width:'30%'}}>
                  <span>{filterValPlan[0].physicalExercise>0 ? (item.physicalExercise / filterValPlan.map((res) => res.physicalExercise)*100).toFixed(2) : 'No Plan'} %</span>
                  <ProgressBar variant="success" 
                  now={filterValPlan[0].physicalExercise>0 ? parseFloat(item.physicalExercise / filterValPlan.map((res) => res.physicalExercise)*100).toFixed(2) : 0} />
                </div>
              </div>
              <div className={styles.fromarea} style={w<bp ? {height:'150px'} : {height:'75px'}}>
                <div className={styles.frombodyleftprogress}>
                Self-Criticism
                </div>
                <div className={styles.frombodycenterprogress} style={w<bp ? {width:'60%'} : {width:'30%'}}> 
                {filterValPlan.map((res) => res.selfCriticism)} | {item.selfCriticism}</div>
                <div className={styles.frombodyrightprogress}  style={w<bp ? {width:'100%', height:'50px'} : {width:'30%'}}>
                  <span>{filterValPlan[0].selfCriticism>0 ? (item.selfCriticism / filterValPlan.map((res) => res.selfCriticism)*100).toFixed(2) : 'No Plan'} %</span>
                  <ProgressBar variant="success" 
                  now={filterValPlan[0].selfCriticism>0 ? parseFloat(item.selfCriticism / filterValPlan.map((res) => res.selfCriticism)*100).toFixed(2) : 0} />
                </div>
              </div>
              <div className={styles.fromarea} style={w<bp ? {height:'150px'} : {height:'75px'}}>
                <div className={styles.frombodyleftprogress}>
                Supporter Increase
                </div>
                <div className={styles.frombodycenterprogress} style={w<bp ? {width:'60%'} : {width:'30%'}}> 
                {filterValPlan.map((res) => res.supporterIncrease)} | {item.supporterIncrease}</div>
                <div className={styles.frombodyrightprogress}  style={w<bp ? {width:'100%', height:'50px'} : {width:'30%'}}>
                  <span>{filterValPlan[0].supporterIncrease>0 ? (item.supporterIncrease / filterValPlan.map((res) => res.supporterIncrease)*100).toFixed(2) : 'No Plan'} %</span>
                  <ProgressBar variant="success" 
                  now={filterValPlan[0].supporterIncrease>0 ? parseFloat(item.supporterIncrease / filterValPlan.map((res) => res.supporterIncrease)*100).toFixed(2) : 0} />
                </div>
              </div>

              <div className={styles.fromarea} >
                
              </div>


               
               
              </div>
               );
              })
            ) : (gettingData ? (
              <h2 style={{ textAlign: "center", paddingBottom: "50px" }}>
                      Loading ...
                      </h2>
            ) : (
              <div>
                    {" "}
                    <FcList className={styles.cardIcon} />
                    {month === null || year === null || user == null ? (
                      <h2 style={{ textAlign: "center", paddingBottom: "50px" }}>
                      Please Select <span style={{ color: "red" }}>Reveiwee</span>
                      </h2>
                    ) : (
                      <h2 style={{ textAlign: "center", paddingBottom: "50px", color: "red" }}>
                      Monthly Report not Available for <span style={{ color: "red" }}>
                        {getMonthName(month)}</span> {" "}
                      <span style={{ color: "red" }}>{year}</span>
                      </h2>
                    )}
                  </div>
            )
              
            )}
            </div>
          </Col>
        </Row>
      </Container>
    
  );
};

export default CcomplishmentbodyCopy;

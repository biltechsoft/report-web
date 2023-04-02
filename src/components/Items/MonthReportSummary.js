import React from "react";

import { useEffect, useState } from "react";
import { FiCornerUpLeft } from "react-icons/fi";
import { FiCornerUpRight } from "react-icons/fi";
import { FaRegListAlt } from "react-icons/fa";
import { BsXSquare } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import config from "../../config"
import ProgressBar from "react-bootstrap/ProgressBar";
const MonthReportSummary = ({ user, month, year }) => {


  
  ///==================STYLE=============
  const alignLeft40 = {
    width: "40%",
    float: "left",
    textAlign: "center",
    fontSize: "15px",
  };
  const alignLeft30 = {
    width: "30%",
    float: "left",
    textAlign: "center",
    fontSize: "15px",
  };
  const titleBackground = {
    background: "rgb(11, 0, 213)",
    fontSize: "16px",
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

  const [filterVal, setFilterVal] = useState([]);
  const [planVal, setPlanVal] = useState([]);
 

  

  const handleFilter = (e) => {
    fetch(`${config.apiUrl}monthly/`)
      .then((Response) => Response.json())
      .then((result) => {
        const filterResult = result.filter(
          (item) =>
            item.month == month && item.year == year && item.user == user
        );
        setFilterVal(filterResult);
      });

    fetch(`${config.apiUrl}plan/`)
      .then((Response) => Response.json())
      .then((res) => {
        const planResult = res.filter(
          (item) =>
            item.month == month && item.year == year && item.user == user
        );
        setPlanVal(planResult);
      });
  };
  useEffect(() => {
    handleFilter();
  }, [user, month, year]);

  return (
    <div>
      {filterVal.length >= 1 ? (
        <div>
          {filterVal.map((item, index) => {
            // progress Bar1
            const progressquranStudy = parseFloat(
              (item.quranStudy / planVal.map((pln) => pln.quranStudy)) * 100
            ).toFixed(2);
            const pro1 =
              progressquranStudy <= 25
                ? "danger"
                : progressquranStudy <= 50
                ? "warning"
                : progressquranStudy <= 75
                ? "info"
                : "success";

            const progresshadithStudy = parseFloat(
              (item.hadithStudy / planVal.map((pln) => pln.hadithStudy)) * 100
            ).toFixed(2);
            const pro2 =
              progresshadithStudy <= 25
                ? "danger"
                : progresshadithStudy <= 50
                ? "warning"
                : progresshadithStudy <= 75
                ? "info"
                : "success";

            const progressbookStudy = parseFloat(
              (item.bookStudy / planVal.map((pln) => pln.bookStudy)) * 100
            ).toFixed(2);
            const pro3 =
              progressbookStudy <= 25
                ? "danger"
                : progressbookStudy <= 50
                ? "warning"
                : progressbookStudy <= 75
                ? "info"
                : "success";

            const progresslectureListening = parseFloat(
              (item.lectureListening /
                planVal.map((pln) => pln.lectureListening)) *
                100
            ).toFixed(2);
            const pro4 =
              progresslectureListening <= 25
                ? "danger"
                : progresslectureListening <= 50
                ? "warning"
                : progresslectureListening <= 75
                ? "info"
                : "success";

            const progresssalat = parseFloat(
              (item.salat / planVal.map((pln) => pln.salat)) * 100
            ).toFixed(2);
            const pro5 =
              progresssalat <= 25
                ? "danger"
                : progresssalat <= 50
                ? "warning"
                : progresssalat <= 75
                ? "info"
                : "success";

            const progressdawahProgram = parseFloat(
              (item.dawahProgram / planVal.map((pln) => pln.dawahProgram)) * 100
            ).toFixed(2);
            const pro6 =
              progressdawahProgram <= 25
                ? "danger"
                : progressdawahProgram <= 50
                ? "warning"
                : progressdawahProgram <= 75
                ? "info"
                : "success";

            const progressmemberContact = parseFloat(
              (item.memberContact / planVal.map((pln) => pln.memberContact)) *
                100
            ).toFixed(2);
            const pro7 =
              progressmemberContact <= 25
                ? "danger"
                : progressmemberContact <= 50
                ? "warning"
                : progressmemberContact <= 75
                ? "info"
                : "success";

            const progresssocialWork = parseFloat(
              (item.socialWork / planVal.map((pln) => pln.socialWork)) * 100
            ).toFixed(2);
            const pro8 =
              progresssocialWork <= 25
                ? "danger"
                : progresssocialWork <= 50
                ? "warning"
                : progresssocialWork <= 75
                ? "info"
                : "success";

            const progressdawahMaterial = parseFloat(
              (item.dawahMaterial / planVal.map((pln) => pln.dawahMaterial)) *
                100
            ).toFixed(2);
            const pro9 =
              progressdawahMaterial <= 25
                ? "danger"
                : progressdawahMaterial <= 50
                ? "warning"
                : progressdawahMaterial <= 75
                ? "info"
                : "success";

            const progressdistribution = parseFloat(
              (item.distribution / planVal.map((pln) => pln.distribution)) * 100
            ).toFixed(2);
            const pro10 =
              progressdistribution <= 25
                ? "danger"
                : progressdistribution <= 50
                ? "warning"
                : progressdistribution <= 75
                ? "info"
                : "success";

            const progressfamilyMeeting = parseFloat(
              (item.familyMeeting / planVal.map((pln) => pln.familyMeeting)) *
                100
            ).toFixed(2);
            const pro11 =
              progressfamilyMeeting <= 25
                ? "danger"
                : progressfamilyMeeting <= 50
                ? "warning"
                : progressfamilyMeeting <= 75
                ? "info"
                : "success";

            const progressorgProgram = parseFloat(
              (item.orgProgram / planVal.map((pln) => pln.orgProgram)) * 100
            ).toFixed(2);
            const pro12 =
              progressorgProgram <= 25
                ? "danger"
                : progressorgProgram <= 50
                ? "warning"
                : progressorgProgram <= 75
                ? "info"
                : "success";

            const progressorgTime = parseFloat(
              (item.orgTime / planVal.map((pln) => pln.orgTime)) * 100
            ).toFixed(2);
            const pro13 =
              progressorgTime <= 25
                ? "danger"
                : progressorgTime <= 50
                ? "warning"
                : progressorgTime <= 75
                ? "info"
                : "success";

            const progresssupporterIncrease = parseFloat(
              (item.supporterIncrease /
                planVal.map((pln) => pln.supporterIncrease)) *
                100
            ).toFixed(2);
            const pro14 =
              progresssupporterIncrease <= 25
                ? "danger"
                : progresssupporterIncrease <= 50
                ? "warning"
                : progresssupporterIncrease <= 75
                ? "info"
                : "success";

            const progressselfCriticism = parseFloat(
              (item.selfCriticism / planVal.map((pln) => pln.selfCriticism)) *
                100
            ).toFixed(2);
            const pro15 =
              progressselfCriticism <= 25
                ? "danger"
                : progressselfCriticism <= 50
                ? "warning"
                : progressselfCriticism <= 75
                ? "info"
                : "success";

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
                <div style={{ width: "100%", padding: "0px 20px 16px 20px" }}>
                  <div style={{ margin: "0px 0px" }}>
                    <div style={alignLeft40}>
                      <div style={titleBackground}>Planned</div>
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
                    <div style={alignLeft30}>
                      <div style={titleBackground}>Progress %</div>
                    </div>
                  </div>
                </div>

                {/* Report Item 1 */}
                <div style={{ width: "100%", padding: "20px" }}>
                  <div style={{ margin: "20px 0px" }}>
                    <div style={alignLeft40}>
                      <div style={itemBackground1}>Quran Study</div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground2}>
                        {" "}
                        {planVal.map((pln) => pln.quranStudy)}{" "}
                        <span style={{ color: "rgb(0, 149, 255)" }}>| </span>{" "}
                        {item.quranStudy}
                      </div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground3}>
                        <ProgressBar
                          style={{ marginTop: "5px" }}
                          variant={pro1}
                          label={
                            parseFloat(
                              (item.quranStudy /
                                planVal.map((pln) => pln.quranStudy)) *
                                100
                            ).toFixed(2) + " %"
                          }
                          now={parseFloat(
                            (item.quranStudy /
                              planVal.map((pln) => pln.quranStudy)) *
                              100
                          ).toFixed(2)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Report Item 2 */}
                <div style={{ width: "100%", padding: "20px" }}>
                  <div style={{ margin: "20px 0px" }}>
                    <div style={alignLeft40}>
                      <div style={itemBackground1}>Hadith Study</div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground2}>
                        {" "}
                        {planVal.map((pln) => pln.hadithStudy)}{" "}
                        <span style={{ color: "rgb(0, 149, 255)" }}>| </span>{" "}
                        {item.hadithStudy}
                      </div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground3}>
                        <ProgressBar
                          style={{ marginTop: "5px" }}
                          variant={pro2}
                          label={
                            parseFloat(
                              (item.hadithStudy /
                                planVal.map((pln) => pln.hadithStudy)) *
                                100
                            ).toFixed(2) + " %"
                          }
                          now={parseFloat(
                            (item.hadithStudy /
                              planVal.map((pln) => pln.hadithStudy)) *
                              100
                          ).toFixed(2)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Report Item 3 */}
                <div style={{ width: "100%", padding: "20px" }}>
                  <div style={{ margin: "20px 0px" }}>
                    <div style={alignLeft40}>
                      <div style={itemBackground1}>Book Study</div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground2}>
                        {" "}
                        {planVal.map((pln) => pln.bookStudy)}{" "}
                        <span style={{ color: "rgb(0, 149, 255)" }}>| </span>{" "}
                        {item.bookStudy}
                      </div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground3}>
                        <ProgressBar
                          style={{ marginTop: "5px" }}
                          variant={pro3}
                          label={
                            parseFloat(
                              (item.bookStudy /
                                planVal.map((pln) => pln.bookStudy)) *
                                100
                            ).toFixed(2) + " %"
                          }
                          now={parseFloat(
                            (item.bookStudy /
                              planVal.map((pln) => pln.bookStudy)) *
                              100
                          ).toFixed(2)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Report Item 4 */}
                <div style={{ width: "100%", padding: "20px" }}>
                  <div style={{ margin: "20px 0px" }}>
                    <div style={alignLeft40}>
                      <div style={itemBackground1}>LectureListening</div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground2}>
                        {" "}
                        {planVal.map((pln) => pln.lectureListening)}{" "}
                        <span style={{ color: "rgb(0, 149, 255)" }}>| </span>{" "}
                        {item.lectureListening}
                      </div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground3}>
                        <ProgressBar
                          style={{ marginTop: "5px" }}
                          variant={pro4}
                          label={
                            parseFloat(
                              (item.lectureListening /
                                planVal.map((pln) => pln.lectureListening)) *
                                100
                            ).toFixed(2) + " %"
                          }
                          now={parseFloat(
                            (item.lectureListening /
                              planVal.map((pln) => pln.lectureListening)) *
                              100
                          ).toFixed(2)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Report Item 5 */}
                <div style={{ width: "100%", padding: "20px" }}>
                  <div style={{ margin: "20px 0px" }}>
                    <div style={alignLeft40}>
                      <div style={itemBackground1}>Salat</div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground2}>
                        {" "}
                        {planVal.map((pln) => pln.salat)}{" "}
                        <span style={{ color: "rgb(0, 149, 255)" }}>| </span>{" "}
                        {item.salat}
                      </div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground3}>
                        <ProgressBar
                          style={{ marginTop: "5px" }}
                          variant={pro5}
                          label={
                            parseFloat(
                              (item.salat / planVal.map((pln) => pln.salat)) *
                                100
                            ).toFixed(2) + " %"
                          }
                          now={parseFloat(
                            (item.salat / planVal.map((pln) => pln.salat)) * 100
                          ).toFixed(2)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Report Item 6 */}
                <div style={{ width: "100%", padding: "20px" }}>
                  <div style={{ margin: "20px 0px" }}>
                    <div style={alignLeft40}>
                      <div style={itemBackground1}>Dawah Program</div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground2}>
                        {" "}
                        {planVal.map((pln) => pln.dawahProgram)}{" "}
                        <span style={{ color: "rgb(0, 149, 255)" }}>| </span>{" "}
                        {item.dawahProgram}
                      </div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground3}>
                        <ProgressBar
                          style={{ marginTop: "5px" }}
                          variant={pro6}
                          label={
                            parseFloat(
                              (item.dawahProgram /
                                planVal.map((pln) => pln.dawahProgram)) *
                                100
                            ).toFixed(2) + " %"
                          }
                          now={parseFloat(
                            (item.dawahProgram /
                              planVal.map((pln) => pln.dawahProgram)) *
                              100
                          ).toFixed(2)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Report Item 7 */}
                <div style={{ width: "100%", padding: "20px" }}>
                  <div style={{ margin: "20px 0px" }}>
                    <div style={alignLeft40}>
                      <div style={itemBackground1}>Member Contact</div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground2}>
                        {" "}
                        {planVal.map((pln) => pln.memberContact)}{" "}
                        <span style={{ color: "rgb(0, 149, 255)" }}>| </span>{" "}
                        {item.memberContact}
                      </div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground3}>
                        <ProgressBar
                          style={{ marginTop: "5px" }}
                          variant={pro7}
                          label={
                            parseFloat(
                              (item.memberContact /
                                planVal.map((pln) => pln.memberContact)) *
                                100
                            ).toFixed(2) + " %"
                          }
                          now={parseFloat(
                            (item.memberContact /
                              planVal.map((pln) => pln.memberContact)) *
                              100
                          ).toFixed(2)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Report Item 8 */}
                <div style={{ width: "100%", padding: "20px" }}>
                  <div style={{ margin: "20px 0px" }}>
                    <div style={alignLeft40}>
                      <div style={itemBackground1}>Social Work</div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground2}>
                        {" "}
                        {planVal.map((pln) => pln.socialWork)}{" "}
                        <span style={{ color: "rgb(0, 149, 255)" }}>| </span>{" "}
                        {item.socialWork}
                      </div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground3}>
                        <ProgressBar
                          style={{ marginTop: "5px" }}
                          variant={pro8}
                          label={
                            parseFloat(
                              (item.socialWork /
                                planVal.map((pln) => pln.socialWork)) *
                                100
                            ).toFixed(2) + " %"
                          }
                          now={parseFloat(
                            (item.socialWork /
                              planVal.map((pln) => pln.socialWork)) *
                              100
                          ).toFixed(2)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Report Item 9 */}
                <div style={{ width: "100%", padding: "20px" }}>
                  <div style={{ margin: "20px 0px" }}>
                    <div style={alignLeft40}>
                      <div style={itemBackground1}>Dawah Material</div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground2}>
                        {" "}
                        {planVal.map((pln) => pln.dawahMaterial)}{" "}
                        <span style={{ color: "rgb(0, 149, 255)" }}>| </span>{" "}
                        {item.dawahMaterial}
                      </div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground3}>
                        <ProgressBar
                          style={{ marginTop: "5px" }}
                          variant={pro9}
                          label={
                            parseFloat(
                              (item.dawahMaterial /
                                planVal.map((pln) => pln.dawahMaterial)) *
                                100
                            ).toFixed(2) + " %"
                          }
                          now={parseFloat(
                            (item.dawahMaterial /
                              planVal.map((pln) => pln.dawahMaterial)) *
                              100
                          ).toFixed(2)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Report Item 10 */}
                <div style={{ width: "100%", padding: "20px" }}>
                  <div style={{ margin: "20px 0px" }}>
                    <div style={alignLeft40}>
                      <div style={itemBackground1}>Distribution</div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground2}>
                        {" "}
                        {planVal.map((pln) => pln.distribution)}{" "}
                        <span style={{ color: "rgb(0, 149, 255)" }}>| </span>{" "}
                        {item.distribution}
                      </div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground3}>
                        <ProgressBar
                          style={{ marginTop: "5px" }}
                          variant={pro10}
                          label={
                            parseFloat(
                              (item.distribution /
                                planVal.map((pln) => pln.distribution)) *
                                100
                            ).toFixed(2) + " %"
                          }
                          now={parseFloat(
                            (item.distribution /
                              planVal.map((pln) => pln.distribution)) *
                              100
                          ).toFixed(2)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Report Item 11 */}
                <div style={{ width: "100%", padding: "20px" }}>
                  <div style={{ margin: "20px 0px" }}>
                    <div style={alignLeft40}>
                      <div style={itemBackground1}>Family Meeting</div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground2}>
                        {" "}
                        {planVal.map((pln) => pln.familyMeeting)}{" "}
                        <span style={{ color: "rgb(0, 149, 255)" }}>| </span>{" "}
                        {item.familyMeeting}
                      </div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground3}>
                        <ProgressBar
                          style={{ marginTop: "5px" }}
                          variant={pro11}
                          label={
                            parseFloat(
                              (item.familyMeeting /
                                planVal.map((pln) => pln.familyMeeting)) *
                                100
                            ).toFixed(2) + " %"
                          }
                          now={parseFloat(
                            (item.familyMeeting /
                              planVal.map((pln) => pln.familyMeeting)) *
                              100
                          ).toFixed(2)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Report Item 12 */}
                <div style={{ width: "100%", padding: "20px" }}>
                  <div style={{ margin: "20px 0px" }}>
                    <div style={alignLeft40}>
                      <div style={itemBackground1}>Org Program</div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground2}>
                        {" "}
                        {planVal.map((pln) => pln.orgProgram)}{" "}
                        <span style={{ color: "rgb(0, 149, 255)" }}>| </span>{" "}
                        {item.orgProgram}
                      </div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground3}>
                        <ProgressBar
                          style={{ marginTop: "5px" }}
                          variant={pro12}
                          label={
                            parseFloat(
                              (item.orgProgram /
                                planVal.map((pln) => pln.orgProgram)) *
                                100
                            ).toFixed(2) + " %"
                          }
                          now={parseFloat(
                            (item.orgProgram /
                              planVal.map((pln) => pln.orgProgram)) *
                              100
                          ).toFixed(2)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Report Item 13 */}
                <div style={{ width: "100%", padding: "20px" }}>
                  <div style={{ margin: "20px 0px" }}>
                    <div style={alignLeft40}>
                      <div style={itemBackground1}>Org Time</div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground2}>
                        {" "}
                        {planVal.map((pln) => pln.orgTime)}{" "}
                        <span style={{ color: "rgb(0, 149, 255)" }}>| </span>{" "}
                        {item.orgTime}
                      </div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground3}>
                        <ProgressBar
                          style={{ marginTop: "5px" }}
                          variant={pro13}
                          label={
                            parseFloat(
                              (item.orgTime /
                                planVal.map((pln) => pln.orgTime)) *
                                100
                            ).toFixed(2) + " %"
                          }
                          now={parseFloat(
                            (item.orgTime / planVal.map((pln) => pln.orgTime)) *
                              100
                          ).toFixed(2)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Report Item 14 */}
                <div style={{ width: "100%", padding: "20px" }}>
                  <div style={{ margin: "20px 0px" }}>
                    <div style={alignLeft40}>
                      <div style={itemBackground1}> Supporter Increase</div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground2}>
                        {" "}
                        {planVal.map((pln) => pln.supporterIncrease)}{" "}
                        <span style={{ color: "rgb(0, 149, 255)" }}>| </span>{" "}
                        {item.supporterIncrease}
                      </div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground3}>
                        <ProgressBar
                          style={{ marginTop: "5px" }}
                          variant={pro14}
                          label={
                            parseFloat(
                              (item.supporterIncrease /
                                planVal.map((pln) => pln.supporterIncrease)) *
                                100
                            ).toFixed(2) + " %"
                          }
                          now={parseFloat(
                            (item.supporterIncrease /
                              planVal.map((pln) => pln.supporterIncrease)) *
                              100
                          ).toFixed(2)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Report Item 15 */}
                <div style={{ width: "100%", padding: "20px" }}>
                  <div style={{ margin: "20px 0px" }}>
                    <div style={alignLeft40}>
                      <div style={itemBackground1}>Self Criticism</div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground2}>
                        {" "}
                        {planVal.map((pln) => pln.selfCriticism)}{" "}
                        <span style={{ color: "rgb(0, 149, 255)" }}>| </span>{" "}
                        {item.selfCriticism}
                      </div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground3}>
                        <ProgressBar
                          style={{ marginTop: "5px" }}
                          variant={pro15}
                          label={
                            parseFloat(
                              (item.selfCriticism /
                                planVal.map((pln) => pln.selfCriticism)) *
                                100
                            ).toFixed(2) + " %"
                          }
                          now={parseFloat(
                            (item.selfCriticism /
                              planVal.map((pln) => pln.selfCriticism)) *
                              100
                          ).toFixed(2)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Report Item 16 */}
                <div style={{ width: "100%", padding: "20px" }}>
                  <div style={{ margin: "20px 0px" }}>
                    <div style={alignLeft40}>
                      <div style={itemBackground1}>Eyanat Paid</div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground2}>
                        <span>
                          {item.qiamulLail == 1 ? (
                            <span style={{ color: "green", fontWeight: "700" }}>
                              Paid
                            </span>
                          ) : (
                            <span style={{ color: "red" }}>Unpaid</span>
                          )}{" "}
                        </span>
                      </div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground3}>
                        <span>
                          {item.qiamulLail == 1 ? (
                            <span style={{ color: "black", fontWeight: "700" }}>
                              Date: {item.eyanatDate}
                            </span>
                          ) : null}{" "}
                        </span>
                        <span> </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Report Item 17 */}
                <div style={{ width: "100%", padding: "20px" }}>
                  <div style={{ margin: "20px 0px" }}>
                    <div style={alignLeft40}>
                      <div style={itemBackground1}>Study Circle</div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground2}>
                        <span>
                          {item.studyCircle == 1 ? (
                            <span style={{ color: "green" }}>
                              <FaCheck />
                            </span>
                          ) : (
                            <span style={{ color: "red" }}>
                              <BsXSquare />
                            </span>
                          )}{" "}
                        </span>
                      </div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground3}>
                        <span>
                          {item.studyCircle == 1 ? (
                            <span style={{ color: "black", fontWeight: "700" }}>
                              Date: {item.studyCircleDate}
                            </span>
                          ) : null}{" "}
                        </span>
                        <span> </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Report Item 18 */}
                <div style={{ width: "100%", padding: "20px" }}>
                  <div style={{ margin: "20px 0px" }}>
                    <div style={alignLeft40}>
                      <div style={itemBackground1}>Qiamul Lail</div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground2}>
                        <span>
                          {item.qiamulLail == 1 ? (
                            <span style={{ color: "green" }}>
                              <FaCheck />
                            </span>
                          ) : (
                            <span style={{ color: "red" }}>
                              <BsXSquare />
                            </span>
                          )}{" "}
                        </span>
                      </div>
                    </div>
                    <div style={alignLeft30}>
                      <div style={itemBackground3}>
                        <span>
                          {item.qiamulLail == 1 ? (
                            <span style={{ color: "black", fontWeight: "700" }}>
                              Date: {item.qiamulLailDate}
                            </span>
                          ) : null}{" "}
                        </span>
                        <span> </span>
                      </div>
                    </div>
                  </div>
                </div>

                <br></br>
                <br></br>
                <br></br>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h1
            style={{
              color: "#dcdcdc4f",
              textAlign: "center",
              width: "100%",
              fontSize: "300px",
            }}
          >
            <FaRegListAlt />
          </h1>
          <h1
            style={{
              color: "#dcdcdc4f",
              textAlign: "center",
              width: "100%",
              fontSize: "70px",
            }}
          >
            Monthly Report Summaruy
          </h1>
          {/* <h1 style={{color: "#dcdcdc4f",textAlign: "center",width: "100%",fontSize: "70px",}}><LodingItem logo={Logo} /></h1> */}
        </div>
      )}
    </div>
  );
};

export default MonthReportSummary;

import React from "react";
import { useEffect, useState } from "react";
import { FaUserAlt, FaBell, FaStepForward } from "react-icons/fa";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import config from "../../config"
const UserItenCounselor = ({ time, counsellor, review,seen }) => {
  const [counsel, setUData1] = useState([]);
  const [reviewee, setUData2] = useState([]);
  
  //-------------------------------------
  const fetchData = async () => {
    fetch(`${config.apiUrl}userInfo/` + counsellor + "/")
      .then((Response) => Response.json())
      .then((json) => {
        setUData1(json);
      });
    fetch(`${config.apiUrl}userInfo/` + review + "/")
      .then((Response) => Response.json())
      .then((json) => {
        setUData2(json);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Dtaseen = seen===1?<GoEye />:<GoEyeClosed/>;
  const colr = seen===1?"gray":"#be0606";


  return (
    <h6>
     
      <span style={{ fontSize: "17px", color:colr }}> 
        {Dtaseen}   <MdDateRange  style={{ fontSize: "15px"}}/> {time.substring(0, 10)} <BiTimeFive style={{ fontSize: "15px"}} /> { time.substring(11, 16)} 
       </span> 
      <span style={{ fontSize: "17px", color: "#530894",float: "right", }}>
      <BsChevronDoubleLeft />{counsel.firstName==null?counsel.id:counsel.firstName} {counsel.lastName}
      </span>
    </h6>
  );
};


export default UserItenCounselor
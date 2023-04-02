import React from "react";
import { useEffect, useState } from "react";
import { FaUserAlt, FaBell, FaStepForward } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import config from "../../config"

const UserItem = ({ time, counsellor, review,seen }) => {
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

  const Dtaseen = seen==1?<GoEye />:<GoEyeClosed/>;
const colr =seen==1?"gray":"#be0606";
  return (
    <h6>
      <span style={{ fontSize: "16px", color: "#530894" }}>
        <AiOutlineSend /> {reviewee.firstName==null?reviewee.id:reviewee.firstName} {reviewee.lastName}
      </span>
      <span style={{ fontSize: "15px", float: "right", color:colr }}>
      {Dtaseen}  <MdDateRange  style={{ fontSize: "15px"}}/> {time.substring(0, 10)} <BiTimeFive style={{ fontSize: "15px"}} /> { time.substring(11, 16)}
      </span>
    </h6>
  );
};

export default UserItem;

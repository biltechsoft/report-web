import React from 'react'
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import config from "../../config"
const NotificationSeen = ({seenList}) => {

    const user = localStorage.getItem("user_id");

    const filterRes = seenList.filter((item) => item == user);

    const colr =filterRes.length>=1?"gray":"#be0606";

  return (
    <span style={{color:colr}}>{filterRes.length>=1?<GoEye />:<GoEyeClosed/>}

    </span>
  )
}

export default NotificationSeen
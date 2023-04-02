import React from "react";
import { useState,useEffect } from "react";
import DailyreportbodyPost from "../components/DailyreportbodyPost";
import DailyreportbodyUpdate from "../components/DailyreportbodyUpdate";

import axios from "axios";
import swal from "sweetalert";
import config from "../config";

const DailyreportView = () => {

  const user = localStorage.getItem("user_id");
    const [status, setStatus] = useState(undefined); // For message

    const [postId, setPostId] = useState([]);
const [newdate, setDate] = useState();

///================ADD REPORT =========================
   const addRepot=(reportData)=>{
    axios
    .post(`${config.apiUrl}input/`,reportData)
    .then((res) => {
      setStatus({ type: "success" });
      swal("Success!", "Report successfully added", "success");
    })
    .catch((error) => {
      setStatus({ type: "error", error });
      swal("Error", "Report Not added", "warning");
      console.log('Error', error.message);
      console.log('Error', error.response.data);
      console.log('Error', error.response.status);
      
    });
   }

   ///================Update REPORT =========================
   const UpdateRepot=(updateData)=>{
    axios
    .put(`${config.apiUrl}input/` + postId + "/", updateData)
    .then((res) => {
      setStatus({ type: "success" });
      swal("Success!", "Report successfully Update", "success");
    })
    .catch((error) => {
      setStatus({ type: "error", error });
      swal("Error", "Report Not added", "warning");
      console.log('Error', error.message);
      console.log('Error', error.res.data);
      console.log('Error', error.res.status);
      
    });

   }
   
////########----------------------------------------------

   const filterData=(date)=>{
    setDate(date)
  fetch(`${config.apiUrl}input/`)
  .then((Response) => Response.json())
  .then((res) => {
    const filterResult = res.filter((item) => item.date == date && item.user == user);
    const postIdresult = filterResult.map((item) => item.id);
      setPostId(postIdresult);
  });
   }
   

if(!postId.length>=1){
  return (
    <div>
      <DailyreportbodyPost btnText="Add Report" hendleSubmitData={addRepot} hendleData={filterData} newDate={newdate} />
    </div>
  );
}else{
  return (
    <div>
      <DailyreportbodyUpdate buttonText="Update Report" hendleSubmitUpdate={UpdateRepot} hendleUpdateData={filterData} postId={postId} newDate={newdate}  />
    
    </div>
  );
}
  
};

export default DailyreportView;

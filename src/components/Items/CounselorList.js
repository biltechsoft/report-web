import React from 'react'
import { useEffect, useState } from "react";
import config from "../../config"

const CounselorList = ({useid,index}) => {

    const [userData, setUserData] = useState([]);

    const fetchData = async () => {
        fetch(`${config.apiUrl}userInfo/`+useid+"/")
          .then((Response) => Response.json())
          .then((json) => {
            setUserData(json);
          });
      };
    
      useEffect(() => {
        fetchData();
      }, []);
  


  return (
    <div>{index+1}. {userData.firstName==null?userData.id:userData.firstName} {userData.lastName}</div>
  )
}

export default CounselorList
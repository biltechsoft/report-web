import React from "react";
import { useEffect, useState } from "react";
import config from "../../config"
const ReviweeUser = ({item,index}) => {
  
  const [reviwelist, setRreviwelist] = useState([]);


  const fetchData = async () => {
    fetch(`${config.apiUrl}userInfo/` + item + "/")
      .then((Response) => Response.json())
      .then((json) => {
        setRreviwelist(json);
      });
  };


  useEffect(() => {
    fetchData();
  }, []);
  return (
    
      <option value={reviwelist.id}> {index +1} . {reviwelist.firstName==null?reviwelist.id:reviwelist.firstName}  {reviwelist.lastName}</option>
   
  );
};

export default ReviweeUser;

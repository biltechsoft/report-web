import React from "react";
import { useEffect, useState } from "react";
import config from "../../config";
const LoginUserView = ({ user }) => {
  
  const [username, setUData1] = useState([]);

  const fetchData = async () => {
    fetch(`${config.apiUrl}userInfo/` + user + "/")
      .then((Response) => Response.json())
      .then((res) => {
        setUData1(res);
      
      });
  };
  useEffect(() => {
    fetchData();
  }, []);


  return <div>{username.firstName}</div>;
};

export default LoginUserView;

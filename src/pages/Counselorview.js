import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState, } from "react";
const Counselorview = () => {
  const {id}=useParams();
  console.log(id);
  return (
   


    <div>Counselorview</div>
  )
}

export default Counselorview

import React from 'react';
// import React, { Component} from 'react';
// import { render }  from 'react-dom';
import "./assets/css/Global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dailyreport from "./pages/Dailyreport";
import DailyReportUpdate from "./components/DailyReportUpdateView";

import Dashboard from "./pages/Dashboard";
import Monthlysummary from "./pages/Monthlysummary";
import Monthlyplan from "./pages/Monthlyplan";
import Syllabus from "./pages/Syllabus";
import Reviewee from "./pages/Reviewee";
import Accomplishment from "./pages/Accomplishment";
import Contactus from "./pages/Contactus";
import Counselor from "./pages/Counselor";
import Notification from "./pages/Notification";

import Account from "./pages/Account";
import Setting from "./pages/Setting";
import Test from "./components/test/Test";
import Counselorview from "./pages/Counselorview";
import PageNotFound from "./pages/PageNotFound";

import Footer from "./components/Footer";
import { Container, Row, Col } from "react-bootstrap";
function App() {
  return (
    <BrowserRouter>
      <div className="gradientbg">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/dailyreport" element={<Dailyreport />} />
          <Route path="/dailyreportupdate" element={<DailyReportUpdate />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/monthlyplan" element={<Monthlyplan />} />
          <Route path="/monthlysummary" element={<Monthlysummary />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/reviewee" element={<Reviewee />} />
          <Route path="/accomplishment" element={<Accomplishment />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/counselor" element={<Counselor />} />
          <Route path="/notification" element={<Notification />} />
          
          <Route path="/account" element={<Account />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/counselorview" element={<Counselorview />} />
          <Route path="/test" element={<Test />} />
        <Route path="*" element={<PageNotFound />} />
          


        </Routes>
      </div>
      
    </BrowserRouter>
    
  );
}

export default App;

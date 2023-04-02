import React from 'react'
import { useEffect, useState } from "react";
import config from "../../config"
import styles from "../../assets/css/body.module.css";
const PlanFilter = () => {
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [searchApiData, setsearchApiData] = useState([]);
    const [filterVal, setFilterV] = useState([]);
    const user = localStorage.getItem("user_id");

    const handleFilter = async (e) => {
        fetch(`${config.apiUrl}plan/`)
          .then((Response) => Response.json())
          .then((json) => {
            setsearchApiData(json);
    
            const filterResult = searchApiData.filter(
              (item) =>
                item.month == month && item.year == year && item.user == user
            );
           setFilterV(filterResult);
          });
      };
      useEffect(() => {
        handleFilter();
      }, [month, year]);

     
  return (
    <div className={styles.bodyheaderright}>
                    <select
                      type="select"
                      required="required"
                      className={styles.inputmonthlydate}
                      placeholder="Last Name"
                      onInput={(e) => handleFilter(e)}
                      onChange={(e) => setMonth(e.target.value)}
                    >
                      <option disabled selected="selected">
                        Select Month
                      </option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">desember</option>
                    </select>
                    <select
                      type="select"
                      required="required"
                      className={styles.inputmonthlydate}
                      onInput={(e) => handleFilter(e)}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="Last Name"
                    >
                      <option disabled selected="selected">
                        Select Year
                      </option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                    </select>
                  </div>
  )
}

export default PlanFilter
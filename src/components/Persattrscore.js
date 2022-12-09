/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Axios from 'axios'
// import { attrScore } from "../components/functions/education";

const Persattrscore = (props) => {
  const courseGrp = props.courseGrp;
  const courseid = props.courseid;
  const persid = props.persid;
  const checkPage = props.checkPage;
  // console.log("props: ", props)
  // const idTokenResult = localStorage.token;

  const [score, setScore] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Axios.get(process.env.REACT_APP_API + `/attrScore/${courseGrp}/${courseid}/${persid}`)
       .then((res) => {
          //  console.log(res.data);
          setScore(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });

  }, []);

  const sumattrScore = (persattr, checkPage) => {
    let sum = 0;
    if (checkPage === 1) {
      sum = Math.floor(persattr * 10) / 10 / 10;
      return sum.toFixed(2);
    }
    sum = (persattr / 40) * 100;
    if (sum >= 70) {
      return "ผ่าน (" + sum.toFixed(0) + ")";
    }
    return "ไม่ผ่าน (" + sum.toFixed(0) + ")";
  };
  return (
    <div>
      {score.map((item, index) => (
        <div key={index}>
          <div>
            {item.persattr === null || item.persattr === 0.00 ? (
              <>
              <h5>-</h5>
            </>
            ) : (
              sumattrScore(item.persattr, checkPage)
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Persattrscore;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Axios from 'axios'


const Form = ({ subject, setSubject, accessId, setListUpdated }) => {
  // const classToselected = useSelector((state) => state.class);
  const courName = localStorage.getItem('CourseName')
  const courIds = localStorage.getItem('AccessRights')
  
   const courId = courIds.substring(11, 14)

  const [readSubject, setReadsubject] = useState([]);

  useEffect(() => {
    // loadSubject2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Axios.get(process.env.REACT_APP_API + `/subjects2/${courId}`)
    .then((res) => {
      setReadsubject(res.data);
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  
  const handleChange = (e) => {
    setSubject({
      ...subject,
      [e.target.name]: e.target.value,
    });
  };

  const { subjectId } = subject;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = {
        subjectId,
         accessId,
       };
       
    if (subjectId === undefined || subjectId === '') {
      toast.error("กรุณาเลือกหมวดวิชาที่สอน");
      return;
    } else {
    //     const idTokenResult = localStorage.token;
    // addsubjectAJ(idTokenResult, value)
    Axios.post(process.env.REACT_APP_API + `/addsubjectaj`,{
      value:value
    })
      .then((res) => {
        
        toast.success("บันทึกข้อมูลสำเร็จ");
        
      })
      .catch((err) => {
        
        toast.error(err.response.data.msg);
      });
    }
    setSubject({
      subjectId: "",
      course: "",
    });
    setListUpdated(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <br />
      <div className="mb-3">
        <FormControl sx={{ m: 1, minWidth: 100 }} className="form-control">
          <InputLabel htmlFor="grouped-select">ชื่อหมวดวิชาที่สอน</InputLabel>
          <Select
            defaultValue=""
            id="grouped-select"
            label="subjectId"
            name="subjectId"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {readSubject.map((items, index) => (
              <MenuItem key={index} value={items.SubjectId}>
                {items.SubjectName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="mb-3">
        <FormControl sx={{ m: 1, minWidth: 100 }} className="form-control">
          <TextField
            className="form-control"
            name="course"
            value={courName}
            type="text"
            id="outlined-basic"
            label="หลักสูตรที่สอน"
            variant="outlined"
          />
        </FormControl>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          เพิ่มรายวิชา
        </button>
      </div>
    </form>
  );
};

export default Form;

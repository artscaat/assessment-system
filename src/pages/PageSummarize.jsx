/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableSummarize from "../components/TableSummarize";
import { toast } from "react-toastify";
import Axios from 'axios';
import { useLocation } from 'react-router-dom'

import ToPrintPageSummarize from '../components/ToPrintPageSummarize'

export default function PageSummarize() {

  const courId = localStorage.getItem('AccessRights').substring(11,14)
// console.log(courId)
  const location = useLocation();

  const [classNo, setClassno] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSeminar, setSelectedSeminar] = useState("");
  const [isSubmit, setIssubmit] = useState(false);
  const [numSubject, setNumSubject] = useState([]);

  const [selected, setSelected] = useState([]);
  const courseNum = numSubject.length

  useEffect(() => {
    if (isSubmit) {
      // const idTokenResult = localStorage.token;
      Axios.get(process.env.REACT_APP_API + `/result/course/${selectedClass}/seminar/${selectedSeminar}/${courId}`)
      .then((res) => {
        setSelected(res.data);  
       // console.log(res.data);    
     })
     .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);

  useEffect(() => {
    loadClass();
    loadSubject2()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadClass = () => {
    Axios.get(process.env.REACT_APP_API + `/education/${courId}`)
      .then((res) => {
        setClassno(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      if (location.state !== null) {
        Axios.get(process.env.REACT_APP_API + `/result/course/${location.state.coursegrp}/seminar/${location.state.seminar}/${courId}`)
        .then((res) => {
          setSelected(res.data);
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
          // console.log(location.state)
          const { coursegrp, seminar } = location.state
          const backSelectedClass = coursegrp
          const backSelectedSeminar = seminar
          setSelectedClass(backSelectedClass) 
          setSelectedSeminar(backSelectedSeminar)
          setIssubmit(true);
        }
  };

  const handleChangeClass = (event) => {
    setSelectedClass(event.target.value);
    setIssubmit(false);
  };

  const handleChangeSeminar = (event) => {
    setSelectedSeminar(event.target.value);
    setIssubmit(false);
  };

  const onCilckSelect = (classNo, seminarNo) => {
    if (classNo === "" || seminarNo === "") {
      toast.error("กรุณาเลือกรุ่นและสัมมนา");
      setIssubmit(false);
    } else {
      setIssubmit(true);
    }
    return isSubmit;
  };

  const loadSubject2 = async () => {
    // const idTokenResult = localStorage.token;
    // listSubjects2(idTokenResult, courId)
    // .then((res) => {
    //   setNumSubject(res.data);  
    //   // console.log(res.data);    
    // })
    // .catch((err) => console.log(err));
    Axios.get(process.env.REACT_APP_API + `/subjects2/${courId}`)
      .then((res) => {
       setNumSubject(res.data);  
       // console.log(res.data);    
     })
     .catch((err) => console.log(err));

  }

  const selectClass = [...new Set(classNo.map((item) => item.CourseGrp))];
  return (
    <React.Fragment>
      <div className="cotainerDetail">
        <p className="HeadTextMain">ผลการศึกษาสรุปรวม</p>
        <div className="DropdownSelectModel">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel htmlFor="grouped-select">รุ่น</InputLabel>
              <Select
                defaultValue=""
                id="grouped-select"
                label="รุ่น"
                onChange={handleChangeClass}
                value={selectedClass}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {selectClass.map((items, index) => (
                  <MenuItem key={index} value={items}>
                    {items}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel htmlFor="grouped-select">สัมมนา</InputLabel>
              <Select
                defaultValue=""
                id="grouped-select"
                label="สัมมนา"
                onChange={handleChangeSeminar}
                value={selectedSeminar}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={0}>ทุกสัมมนา</MenuItem>
                <MenuItem value={1}>สัมมนา1</MenuItem>
                <MenuItem value={2}>สัมมนา2</MenuItem>
                <MenuItem value={3}>สัมมนา3</MenuItem>
                <MenuItem value={4}>สัมมนา4</MenuItem>
                <MenuItem value={5}>สัมมนา5</MenuItem>
                <MenuItem value={6}>สัมมนา6</MenuItem>
                <MenuItem value={7}>สัมมนา7</MenuItem>
                <MenuItem value={8}>สัมมนา8</MenuItem>
                <MenuItem value={9}>สัมมนา9</MenuItem>
                <MenuItem value={10}>สัมมนา10</MenuItem>
                <MenuItem value={11}>สัมมนา11</MenuItem>
                <MenuItem value={12}>สัมมนา12</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={() => onCilckSelect(selectedClass, selectedSeminar)}
              variant="contained"
              sx={{ 
                minWidth: 100, minHeight: 55, m: 1,
                fontFamily: 'THSarabunNew',
                fontWeight: 'bold',
                fontSize: 16,
               }}
               startIcon={<ManageSearchIcon />}
            >
              ตกลง
            </Button>
          </Box>
        </div>
        
        
        {/* <Button 
            onClick={handleOnExport} 
            variant="outlined" sx={{minWidth: 100, minHeight: 55 , m:1  }}>Export File
            </Button> */}
        <Container>
        <ToPrintPageSummarize
                dataToPrint={{
                  courseid: courId,
                  coursegrp: selectedClass,
                  seminar: selectedSeminar
                }}
              />
          <TableSummarize
            classNo={selectedClass}
            seminarNo={selectedSeminar}
            isSubmit={isSubmit}
            courseNum={courseNum}
          />
        </Container>
      </div>
    </React.Fragment>
  );
}

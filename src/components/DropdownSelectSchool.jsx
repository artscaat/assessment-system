import React , { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import {ToastContainer ,toast,Zoom} from 'react-toastify'



export default function DropdownSelectSchool () {
    // const nameSchools = [
    // 'วิทยาลัยกองทัพอากาศ',
    // 'โรงเรียนเสนาธิการทหารอากาศ',
    // 'โรงเรียนนายทหารอากาศอาวุโส',
    // 'โรงเรียนนายทหารชั้นผู้บังคับฝูง',
    // 'โรงเรียนนายทหารชั้นผู้บังคับหมวด',
    // 'โรงเรียนนายทหารชั้นประทวน',
    // 'โรงเรียนครูทหาร',
    // 'ศูนย์ภาษา',
    // 'สำนักบริหารการศึกษา'
    
    // ]

    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [state, setState] = useState([]);
    const [stateID, setStateID] = useState([]);
    const [alerts, setAlerts] = useState(false);


    useEffect(() => {
        fetch(process.env.REACT_APP_API + "/pmecourse")
      .then((res) => res.json())
      .then((data) => setData(data));
      }, []);

    //   console.log(data)

    //   const Submit = async () => {
       // eslint-disable-next-line no-unused-vars
    //     const result = await Axios
    //       .get("http://localhost:3300/pmecourse")
    //       .then((result) => setData(result.data))
    //       .catch((err) => console.log(err));
    //   };

    // const Submit = async () => {
     // eslint-disable-next-line no-unused-vars
    // const result = await Axios
    // .get("http://localhost:3001/pmecourse")
    // .then((result) => setData(result.data))
    // .catch((err) => console.log(err));
    //   }

      const Submit = () => {
        let result = stateID
        console.log(result);
        if(result[0]){
            localStorage.setItem("school",JSON.stringify(result))
            navigate("/login")
      }else{
        setAlerts(true);
         toast.error("กรุณาเลือกสถานศึกษา");
      }
      }

      const academy = [...new Set(data.map((item) => item.Academy))];
      academy.sort();
      const handleAcademy = (e) => {
        let Singleacademy = data.filter(
          (item) => item.Academy === e.target.value
        );
        let states = [...new Set(Singleacademy.map((item) => item.CourseName))];
        setState(states);
      };

      const handleStateChange = (e) => {
        let singleCourse = data.filter((item) => item.CourseName === e.target.value);
        setStateID(singleCourse);
      };

    //   const handleSubmit = () => {
    //     dispatch(selectToClass(stateID[0]))
    //     navigate('/login')
    //   };
  return (
    <React.Fragment> 
    {alerts ? <ToastContainer draggable={false} transition={Zoom} autoClose={8000} /> : <></> }
     <Box sx={{  display: 'flex', justifyContent: 'center' , flexDirection: 'column'} }>
            <FormControl sx={{ m: 1, minWidth: 500 }}>
          <InputLabel htmlFor="grouped-select">สถานศึกษา</InputLabel>
          <Select
            onChange={(e) => handleAcademy(e)}
            defaultValue=""
            id="grouped-select"
            label="สถานศึกษา"
            name="school"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {academy.map((items, index) => (
              <MenuItem key={index} value={items}>
                {items}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 500 }}>
          <InputLabel htmlFor="grouped-select">หลักสูตร</InputLabel>
          <Select
            onChange={(e) => handleStateChange(e)}
            defaultValue=""
            id="grouped-select"
            label="หลักสูตร"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {state.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <br />
          {stateID.map((item, index) => console.log(item))}
          <Button
            onClick={()=>Submit()}
            variant="outlined"
            sx={{ minWidth: 500 }}
          >
            ตกลง
          </Button>
        </FormControl>
     </Box>
    

   </React.Fragment>
  );
}

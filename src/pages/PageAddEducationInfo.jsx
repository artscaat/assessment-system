/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { Link,useNavigate } from "react-router-dom";
import Axios from 'axios'
// import {useState , useEffect} from 'react'
import {useState ,useEffect} from 'react'
import TextField from '@mui/material/TextField';


export default function PageAddEducationInfo() {
  const AccessRights = localStorage.getItem('AccessRights')
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [courseyear,setCourseYear] = useState("");
  const [coursegrp,setCourseGrp] = useState("");
  const [studyperiod,setStudyPeriod] = useState("");
  const [coursebegin,setCourseBegin] = useState("");
  const [courseend,setCourseEnd] = useState("");
  const [image,setImage] = useState("");
  const [file, setFile] = useState({})
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
  const [TotalHrs, setTotalHrs] = useState([]);
  // const [CourseTotalHrs,setCourseTotalHrs] = useState(JSON.parse(school)[0].CourseTotalHrs);
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(file)
      setImagePreviewUrl(reader.result)
    }

    reader.readAsDataURL(file)
  }
  const IdTotalHrs = AccessRights.substring(11, 14);

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/CourseTotalHrs/${IdTotalHrs}`).then((res) => {
      setTotalHrs(Object.assign({}, ...res.data));
    })
  }, []);
const submit = async () => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('courseyear', courseyear)
  formData.append('coursegrp', coursegrp)
  formData.append('studyperiod', studyperiod)
  formData.append('coursebegin', coursebegin)
  formData.append('courseend', courseend)
  Axios.post(process.env.REACT_APP_API +"/PageAddEducationInfo",formData,{
  })
  alert("Update Ok");
  navigate("/PageEducationInfo")
}


// useEffect(() => {
//   IdCourse();
// }, []);

// const IdCourse = () => {
//   Axios.get(process.env.REACT_APP_API + `/courseId/${courseId}`)
//       .then((res)=>{setCourseTotalHrs(res.data)
//       // console.log(res.data)
//       })
//       .catch((err)=>{ 
//         console.error(err);
//       })
  
// };

// console.log(file);
console.log(TotalHrs);
    
  return(
<React.Fragment>

                <div className="cotainerDetail">
            <p className="HeadTextMain">เพิ่มข้อมูลการศึกษา</p>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined">ปีการศึกษา</InputLabel>
                <OutlinedInput id="outlined" label="ปีการศึกษา" onChange={(event)=>{setCourseYear(event.target.value)}} />
                {/* <OutlinedInput id="outlined" label="ปีการศึกษา" onChange={handleInputChange} /> */}
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined">รุ่น</InputLabel>
                <OutlinedInput id="outlined" label="รุ่น" onChange={(event)=>{setCourseGrp(event.target.value)}} />
                {/* <OutlinedInput id="outlined" label="รุ่น" onChange={handleInputChange}/> */}
            </FormControl>
            {/* <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined">ระยะเวลาการศึกษา</InputLabel>
                <OutlinedInput id="outlined" label="ระยะเวลาการศึกษา" disabled value={CourseTotalHrs} />
            </FormControl> */}
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <TextField label="ระยะเวลาการศึกษา" id="outlined-start-adornment" InputLabelProps={{
            shrink: true,
          }}   value={TotalHrs.CourseTotalHrs + " " + "ชั่วโมง"} disabled/>
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <TextField id="date" label="วันที่เปิดหลักสูตร"  type="date"  onChange={(event)=>{setCourseBegin(event.target.value)}}   InputLabelProps={{ shrink: true,}} />
                {/* <InputLabel htmlFor="outlined"variant="standard" shrink>วันที่เปิดหลักสูตร</InputLabel>
                <OutlinedInput id="outlined" type='date' label="วันที่เปิดหลักสูตร" onChange={(event)=>{setCourseBegin(event.target.value)}} /> */}
                {/* <OutlinedInput id="outlined" type='date' label="วันที่เปิดหลักสูตร" onChange={handleInputChange}/> */}
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <TextField id="date" label="วันที่จบหลักสูตร"  type="date"  onChange={(event)=>{setCourseEnd(event.target.value)}}   InputLabelProps={{ shrink: true,}} />
                {/* <InputLabel htmlFor="outlined" variant="standard" shrink >วันที่จบหลักสูตร</InputLabel>
                <OutlinedInput id="outlined"  type='date' label="วันที่จบหลักสูตร" onChange={(event)=>{setCourseEnd(event.target.value)}} /> */}
                {/* <OutlinedInput id="outlined"  type='date' label="วันที่จบหลักสูตร" onChange={handleInputChange}/> */}
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined"shrink variant="standard" >อัพโหลดไฟล์คำสั่งเข้าเรียน</InputLabel>
                <OutlinedInput id="outlined" type='file'  onChange={handleUploadImage}  label="อัพโหลดไฟล์คำสั่งเข้าเรียน"  />
                 {/* <OutlinedInput id="outlined" type='file'  onChange={(e) => setImage(e.target.files[0])}  label="อัพโหลดไฟล์คำสั่งเข้าเรียน"  />  */}
            </FormControl>
            <div className="containerBtnAddEdu">
                <Link to="/PageEducationInfo"><Button variant="outlined" sx={{minWidth: 242, m:1  }}  >ย้อนกลับ</Button></Link> 
               <Button variant="outlined" onClick={()=>submit()}   sx={{minWidth: 242, m:1  }}>บันทึก</Button>
            </div>
           
        </div>
       
</React.Fragment>
  );
}

import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Axios from 'axios'
import {useState , useEffect} from 'react'
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from "@material-ui/core/TextField";


export default function DropdownManage() {

    const [level, setLevel] = React.useState('');
    const [rights , setRights] = useState([]);
    const staaa = rights.map((right) => (
      right.AccessRightsType
    ))
    console.log(staaa.length)
    useEffect(()=>{
      Axios.get(process.env.REACT_APP_API + '/PageManage')
        .then((res)=>{setRights(res.data)})
        .catch((err)=>{
          console.error(err);
        })
  },[])
console.log(rights)
    const handleChange = (event) => {
        setLevel(event.target.value);
    };

    // console.log(staaa)
  return(
<React.Fragment>
<FormControl sx={{ m: 1, minWidth: 80 }}>
  {rights.map((right) => (
    <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={right.AccessRightsType}
          onChange={handleChange}
          autoWidth
          defaultValue={right.AccessRightsType}
          // defaultValue={30}
        >
          
          <MenuItem value="รออนุมัติ">รออนุมัติ</MenuItem>
          <MenuItem value="วัดผลส่วนกลาง">วัดผลส่วนกลาง</MenuItem>
          <MenuItem value="กรรมวิธีส่วนกลาง">กรรมวิธีส่วนกลาง</MenuItem>
          <MenuItem value="ผอ.">ผอ.</MenuItem>
          <MenuItem value="กรรมวิธี">กรรมวิธี</MenuItem>
          <MenuItem value="วัดผล">วัดผล</MenuItem>
          <MenuItem value="ปกครอง">ปกครอง</MenuItem>
          <MenuItem value="อาจารย์ประจำหมวดวิชา">อาจารย์ประจำหมวดวิชา</MenuItem>
          <MenuItem value="นทน.">นทน.</MenuItem>
        </Select>
  ))}
        
        {/* <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          // value={rights.AccessRightsType}
          onChange={handleChange}
          autoWidth
          defaultValue={"วัดผลส่วนกลาง"}
          // defaultValue={30}
        >
          
          <MenuItem value="รออนุมัติ">รออนุมัติ</MenuItem>
          <MenuItem value="วัดผลส่วนกลาง">วัดผลส่วนกลาง</MenuItem>
          <MenuItem value="กรรมวิธีส่วนกลาง">กรรมวิธีส่วนกลาง</MenuItem>
          <MenuItem value="ผอ.">ผอ.</MenuItem>
          <MenuItem value="กรรมวิธี">กรรมวิธี</MenuItem>
          <MenuItem value="วัดผล">วัดผล</MenuItem>
          <MenuItem value="ปกครอง">ปกครอง</MenuItem>
          <MenuItem value="อาจารย์ประจำหมวดวิชา">อาจารย์ประจำหมวดวิชา</MenuItem>
          <MenuItem value="นทน.">นทน.</MenuItem>
        </Select> */}
        {/* <NativeSelect
          
          onChange={handleChange}
        >
          { rights.map(right => {
            return
          })


          }
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect> */}
         {/* <Select
            value={rights}
            onChange={handleChange}
            >
            {rights.map(({ AccessRightsId, AccessRightsType }, index) => <option value={AccessRightsId} >{AccessRightsType}</option>)}
        </Select> */}
      </FormControl>
</React.Fragment>
  );
}

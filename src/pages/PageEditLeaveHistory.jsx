import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Link } from "react-router-dom";

export default function PageEditLeaveHistory() {
  const [level, setLevel] = React.useState('');

  const handleChange = (event) => {
      setLevel(event.target.value);
  };
  return(
<React.Fragment>

                <div className="cotainerDetail">
            <p className="HeadTextMain">แก้ไขประวัติการลา</p>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined">ผู้ลง</InputLabel>
                <OutlinedInput id="outlined" label="ผู้ลง"/>
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined">เลขประจำตัว นทน.</InputLabel>
                <OutlinedInput id="outlined" label="เลขประจำตัว นทน."/>
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined">ชื่อ</InputLabel>
                <OutlinedInput id="outlined" label="ชื่อ"/>
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined">นามสกุล</InputLabel>
                <OutlinedInput id="outlined" label="นามสกุล"/>
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined"shrink variant="standard" >วันเริ่มต้นการลา</InputLabel>
                <OutlinedInput id="outlined" type='date' />
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined"shrink variant="standard" >เวลาเริ่มต้นการลา</InputLabel>
                <OutlinedInput id="outlined" type='time' />
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined"shrink variant="standard" >วันสิ้นสุดการลา</InputLabel>
                <OutlinedInput id="outlined" type='date' />
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined"shrink variant="standard" >เวลาสิ้นสุดการลา</InputLabel>
                <OutlinedInput id="outlined" type='time' />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 500 }}>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={level}
          onChange={handleChange}
          autoWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>ลาป่วย</MenuItem>
          <MenuItem value={2}>ลากิจ</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined"shrink variant="standard" >เอกสารการลา</InputLabel>
                <OutlinedInput id="outlined" type='file' />
        </FormControl>
        <div className="containerBtnAddEdu">
        <Link to="/PageEditInsertScore"><Button variant="outlined" sx={{minWidth: 242, m:1  }}>ย้อนกลับ</Button></Link>
        <Link to="/PageEditInsertScore"><Button variant="outlined" sx={{minWidth: 242, m:1  }}>บันทึก</Button></Link>
        </div>
        </div>
    
</React.Fragment>
  );
}

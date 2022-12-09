import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

export default function PagePrintHistoyrs() {
  return(
<React.Fragment>

                <div className="cotainerDetail">
            <p className="HeadTextMain">แก้ไขประวัติ นทน.</p>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined">เลขประจำตัวข้าราชการ</InputLabel>
                <OutlinedInput id="outlined" label="เลขประจำตัวข้าราชการ"/>
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined">สัมมนา</InputLabel>
                <OutlinedInput id="outlined" label="สัมมนา"/>
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined">ยศ</InputLabel>
                <OutlinedInput id="outlined" label="ยศ"/>
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
                <InputLabel htmlFor="outlined">เหล่า</InputLabel>
                <OutlinedInput id="outlined" label="เหล่า"/>
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined">จำพวก</InputLabel>
                <OutlinedInput id="outlined" label="จำพวก"/>
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined">สังกัด</InputLabel>
                <OutlinedInput id="outlined" label="สังกัด"/>
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined">ลชทอ.</InputLabel>
                <OutlinedInput id="outlined" label="ลชทอ."/>
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined">ตำแหน่งปัจจุบัน</InputLabel>
                <OutlinedInput id="outlined" label="ตำแหน่งปัจจุบัน"/>
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined">Email Rtaf</InputLabel>
                <OutlinedInput id="outlined" label="Email Rtaf"/>
            </FormControl>
            <Link to="/PageHistoyrS"><Button variant="outlined" sx={{minWidth: 500, m:1  }}>บันทึก</Button></Link>
        </div>

</React.Fragment>
  );
}

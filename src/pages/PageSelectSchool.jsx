import React from 'react';
import DropdownSelectSchool from '../components/DropdownSelectSchool'
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Logo from '../img/logo.png'
// import { Link } from "react-router-dom";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import ListSubheader from '@mui/material/ListSubheader';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';




export default function PageSelectSchool() {
//   const nameSchools = [
//     'วิทยาลัยกองทัพอากาศ',
//     'โรงเรียนเสนาธิการทหารอากาศ',
//     'โรงเรียนนายทหารอากาศอาวุโส',
//     'โรงเรียนนายทหารชั้นผู้บังคับฝูง',
//     'โรงเรียนนายทหารชั้นผู้บังคับหมวด',
//     'โรงเรียนนายทหารชั้นประทวน',
//     'โรงเรียนครูทหาร',
//     'ศูนย์ภาษา',
//     'สำนักบริหารการศึกษา'
    
//     ]

  return(
<React.Fragment>

  <Box sx={{  display: 'flex' ,justifyContent: 'center' , alignItems: 'center',flexDirection: 'column' , minHeight:'100vh'} }>
            <img src={Logo} alt="logo" className="logoLogin" />
            <p className="HeadTextShcool">ส่วนการศึกษา</p>
            <DropdownSelectSchool />
            {/* <Box sx={{  display: 'flex', justifyContent: 'center' , flexDirection: 'column'} }>
            <FormControl sx={{ m: 1, minWidth: 500 }}>
                <InputLabel htmlFor="grouped-select">สถานศึกษา</InputLabel>
                <Select defaultValue="" id="grouped-select" label="สถานศึกษา">
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {
                    nameSchools.map((nameSchool)=>(
                        <MenuItem value={nameSchool} key={nameSchool}>{nameSchool}</MenuItem>

                    ))
                }
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 500 }}>
                <InputLabel htmlFor="grouped-select">หลักสูตร</InputLabel>
                <Select defaultValue="" id="grouped-select" label="หลักสูตร">
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <ListSubheader>วิทยาลัยกองทัพอากาศ</ListSubheader>
                    <MenuItem value={1} >การทัพอากาศ</MenuItem>
                    <ListSubheader>โรงเรียนเสนาธิการทหารอากาศ</ListSubheader>
                    <MenuItem value={2}>เสนาธิการทหารอากาศ</MenuItem>
                    <ListSubheader>โรงเรียนนายทหารอากาศอาวุโส</ListSubheader>
                    <MenuItem value={3}>นายทหารอากาศอาวุโส</MenuItem>
                    <ListSubheader>โรงเรียนนายทหารชั้นผู้บังคับฝูง</ListSubheader>
                    <MenuItem value={4}>นายทหารชั้นผู้บังคับฝูง</MenuItem>
                    <ListSubheader>โรงเรียนนายทหารชั้นผู้บังคับหมวด</ListSubheader>
                    <MenuItem value={5}>นายทหารชั้นผู้บังคับหมวด</MenuItem>
                    <MenuItem value={6}>นายทหารประทวนเป็นนายทหารสัญญาบัตร</MenuItem>
                    <ListSubheader>โรงเรียนนายทหารชั้นประทวน</ListSubheader>
                    <MenuItem value={7}>นายทหารประทวน</MenuItem>
                    <MenuItem value={8}>นายทหารประทวนชั้นพันจ่าอากาศ</MenuItem>
                    <ListSubheader>โรงเรียนครูทหาร</ListSubheader>
                    <MenuItem value={9}>ครูทหารชั้นสัญญาบัตร</MenuItem>
                    <MenuItem value={10}>ครูทหารชั้นประทวน</MenuItem>
                    <MenuItem value={11}>ครูการบินเพื่อฝึกศิษย์การบิน</MenuItem>
                    <ListSubheader>ศูนย์ภาษา</ListSubheader>
                    <MenuItem value={12}>ภาษาไทยสำหรับนายทหารจากสาธารณรัฐสังคมนิยมเวีดนาม</MenuItem>
                    <MenuItem value={13}>ภาษาอังกฤษสำหรับเสมียน สน.ผชท.ไทย/ต่างประเทศ</MenuItem>
                    <MenuItem value={14}>ภาษาไทยสำหรับนายทหารต่างประเทศ</MenuItem>
                    <ListSubheader>สำนักบริหารการศึกษา</ListSubheader>
                    <MenuItem value={15}>ภาษาไทยสำหรับนายทหารต่างประเทศ</MenuItem>
                    <MenuItem value={16}>นายทหารการศึกษาและการฝึก</MenuItem>
                    <MenuItem value={17}>เจ้าหน้าที่การศึกษาและการฝึก</MenuItem>
                </Select>
            </FormControl>
     </Box>
            <Link to="/login"><Button variant="outlined" sx={{minWidth: 500 }}>ตกลง</Button></Link> */}
        
    </Box>

</React.Fragment>

  );
}

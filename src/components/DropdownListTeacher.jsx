import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropdownListTeacher() {
    const [subject, setSubject] = React.useState('');

    const handleChange = (event) => {
        setSubject(event.target.value);
    };
  return(
<React.Fragment>
<FormControl sx={{ m: 1, minWidth: 80 }}>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={subject}
          onChange={handleChange}
          autoWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>การติดต่อสื่อสาร</MenuItem>
          <MenuItem value={2}>ฝ่ายอำนวยการ</MenuItem>
          <MenuItem value={3}>ความเป็นผู้นำและการบริหาร</MenuItem>
          <MenuItem value={4}>ความมั่นคงแห่งชาติและการทหาร</MenuItem>
          <MenuItem value={5}>กิจกรรมพัฒนาความเป็นผู้นำ</MenuItem>
        </Select>
      </FormControl>
</React.Fragment>
  );
}

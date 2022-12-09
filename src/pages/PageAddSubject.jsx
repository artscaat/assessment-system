// import React from 'react';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Button from '@mui/material/Button';
// import { Link } from "react-router-dom";


// export default function PageAddSubject() {
//   return(
// <React.Fragment>

//                 <div className="cotainerDetail">
//             <p className="HeadTextMain">เพิ่มหมวดวิชา</p>
//             <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
//                 <InputLabel htmlFor="outlined">ผู้ลง</InputLabel>
//                 <OutlinedInput id="outlined" label="ผู้ลง"/>
//             </FormControl>
//             <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
//                 <InputLabel htmlFor="outlined">หมวดวิชา</InputLabel>
//                 <OutlinedInput id="outlined" label="หมวดวิชา"/>
//             </FormControl>
//             <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
//                 <InputLabel htmlFor="outlined">ชื่อวิชา</InputLabel>
//                 <OutlinedInput id="outlined" label="ชื่อวิชา"/>
//             </FormControl>
//             <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
//                 <InputLabel htmlFor="outlined">หน่วยกิต</InputLabel>
//                 <OutlinedInput id="outlined" label="หน่วยกิต"/>
//             </FormControl>
//             <div className="containerBtnAddEdu">
//                 <Link to="/PageSubject"><Button variant="outlined" sx={{minWidth: 242, m:1  }}>ย้อนกลับ</Button></Link>
//                 <Link to="/PageSubject"><Button variant="outlined" sx={{minWidth: 242, m:1  }}>บันทึก</Button></Link>     
//             </div>
//         </div>
    
// </React.Fragment>
//   );
// }

import React from 'react';
import AddSubject from '../components/AddSubject'


export default function PageAddSubject() {
  return(
<React.Fragment>
<div className="containerMainPage">
              
                <AddSubject />
            </div>
                  
</React.Fragment>
  );
}


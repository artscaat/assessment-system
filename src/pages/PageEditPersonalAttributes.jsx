// import React from 'react';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Button from '@mui/material/Button';
// import { Link } from "react-router-dom";

// export default function PageEditPersonalAttributes() {
//   return(
// <React.Fragment>

//                 <div className="cotainerDetail">
//             <p className="HeadTextMain">แก้ไขคุณลักษณะส่วนบุคคล</p>
//             <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
//                 <InputLabel htmlFor="outlined">ผู้ลง</InputLabel>
//                 <OutlinedInput id="outlined" label="ผู้ลง"/>
//             </FormControl>
//             <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
//                 <InputLabel htmlFor="outlined">ชื่อคุณลักษณะส่วนบุคคล</InputLabel>
//                 <OutlinedInput id="outlined" label="ชื่อคุณลักษณะส่วนบุคคล"/>
//             </FormControl>
//             <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
//                 <InputLabel htmlFor="outlined">คะแนนเต็ม</InputLabel>
//                 <OutlinedInput id="outlined" label="คะแนนเต็ม"/>
//             </FormControl>
//             <div className="containerBtnAddEdu">
//                 <Link to="/PagePersonalAttributes"><Button variant="outlined" sx={{minWidth: 242, m:1  }}>ย้อนกลับ</Button></Link>
//                 <Link to="/PagePersonalAttributes"><Button variant="outlined" sx={{minWidth: 242, m:1  }}>บันทึก</Button></Link>     
//             </div>
           
//         </div>
      
// </React.Fragment>
//   );
// }



import React from 'react';
import EditPersonalAttributes from '../components/EditPersonalAttributes'

export default function PageEditPersonalAttributes() {
  return(
<React.Fragment>

<div className="containerMainPage">
               
                <EditPersonalAttributes />
            </div>
                  
</React.Fragment>
  );
}

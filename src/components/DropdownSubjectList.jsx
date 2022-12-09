// import React from 'react';
// import FormControl from '@mui/material/FormControl';
// import {useState , useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import Axios from 'axios'

// const DropdownSubjectList = ({CourseId,ID,SubjectId}) => {
//     const navigate = useNavigate()
//     const [SubjectList , setSubjectList] = useState([]);
    
//     const handleChange = (e,id) => {
//       const InstructorId = id;
//       const SubjectId = e.target.value
//         Axios.post(process.env.REACT_APP_API + '/SubjectUserUpdate',{
//           InstructorId:InstructorId,
//           SubjectId:SubjectId
          
//         }).then(
//           res => res.data
//         ).catch(error => console.log(error))
//           alert("Update ok");
//           navigate("/PageListTeacher")
              
//      }

// //display subject in acadamy
//     useEffect(() => {
   
//         fetch(process.env.REACT_APP_API + '/getsubject', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             CourseId
           
//            }),
//         })
//           .then((res) => {
//               return res.json();
//           })
//           .then((data) => {
//             // console.log("-------")
//             // console.log(data)
//             setSubjectList(data)
//           });
          
      
//         },[]);

//     return (
//       <React.Fragment>   
//         <FormControl sx={{ m: 1, minWidth: 300 }}>
//         <Select 
//             labelId="demo-simple-select-autowidth-label"
//             id="demo-simple-select-autowidth"
//             defaultValue={SubjectId}
//             onChange={(e) => handleChange(e, ID)}>
//               <MenuItem value="">
//                   <em>ไม่อนุมัติ</em>
//               </MenuItem>
//             {SubjectList.map((v, index) => (
//               <MenuItem key={index} value={v.SubjectId}>{v.SubjectName}</MenuItem>
//             ))}
//         </Select>
//         </FormControl>
//         </React.Fragment>
//     )
// }


// export default DropdownSubjectList

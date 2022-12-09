// /* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container'
import { DataGrid } from '@mui/x-data-grid'
import ModalClassRoom from '../components/ModalClassRoom'
import ModelAccess from '../components/ModelAccess'
import Axios from 'axios'
import { Link  } from "react-router-dom";
import {Edit} from '@material-ui/icons';



  function getFullName(params) {
    return `${params.row.Rank || ""} ${params.row.PersFname || ""} ${params.row.PersLname || ""}`;
  }

 

//เปิดการจัดการ เฉพาะสิทธิ์กรรมวิธี
const columns = [
  { field: "id",headerName: "ลำดับ",width: 70,headerAlign: 'center',align: "center", valueGetter: (params) => params.api.getRowIndex(params.row.AccessRightsId) + 1,},
  { field: 'PersId', headerName: 'เลขประจำตัว',   headerAlign: 'center',align: "center",width: 200 },
  { field: 'fullName', headerName: 'ยศ ชื่อ สกุล', width: 270, headerAlign: 'center',align: "center",valueGetter: getFullName },
  { field: 'level', headerName: 'สิทธิ์การใช้งาน', headerAlign: 'center', align: "center", width: 250,
  renderCell: (params) => {
    const accessId = params.row.AccessRightsId

    return (
        <>
            <ModelAccess accessId = {accessId} />
        </>
    )
  }
 },
  {field: 'subject',headerName: 'หมวดวิชาที่สอน', width: 240, headerAlign: 'center', align: "center",
      renderCell: (params) => {
      const accessId = params.row.AccessRightsId
      const rank = params.row.Rank
      const fname = params.row.PersFname
      const lname = params.row.PersLname
      const checkAJ = params.row.Professor
      return (
        <>
          <ModalClassRoom accessId = {accessId} rank = {rank} fname = {fname} lname = {lname} checkAJ= {checkAJ} />
          
        </>
      )
    },
  },
  
  {field: 'action',headerName: 'การจัดการ',align: 'center',width: 100,
    renderCell: (params) => {
      
      return (
        
                <div style={{ width:"100%",textAlign: "center" }} >
                
                <Link to="/PageEditListTeacher" //ส่งแบบ state ไปที่ link to นี้
                state={{
                  Id : params.row.AccessRightsId,
                  Dir : params.row.Director,
                }}
              ><Edit className="userListDate" ></Edit></Link>        
                </div>)
    },
  },
]
//ปิดการจัดการ 
const columns1 = [
  { field: "id",headerName: "ลำดับ",width: 70,headerAlign: 'center',align: "center",valueGetter: (params) => params.api.getRowIndex(params.row.AccessRightsId) + 1,},
  { field: 'PersId', headerName: 'เลขประจำตัว',   headerAlign: 'center',align: "center",width: 250 },
  { field: 'fullName', headerName: 'ยศ ชื่อ สกุล', width: 300, headerAlign: 'center',align: "center",valueGetter: getFullName },
  { field: 'level', headerName: 'สิทธิ์การใช้งาน', headerAlign: 'center', align: "center", width: 250,
  renderCell: (params) => {
    const accessId = params.row.AccessRightsId

    return (
        <>
            <ModelAccess accessId = {accessId} />
        </>
    )
  }
 },
  {field: 'subject',headerName: 'หมวดวิชาที่สอน',width: 250,headerAlign: 'center',align: "center",
      renderCell: (params) => {
      const accessId = params.row.AccessRightsId
      const rank = params.row.Rank
      const fname = params.row.InstructorFname
      const lname = params.row.InstructorLname
      const checkAJ = params.row.Professor
      return (
        <>
          <ModalClassRoom accessId = {accessId} rank = {rank} fname = {fname} lname = {lname} checkAJ= {checkAJ} />
          
        </>
      )
    },
  },
]
export default function PageListTeacher() {
    const [officer, setOfficer] = useState([]);
    const AccessRights = localStorage.getItem('AccessRights')
    const courId = AccessRights.substring(11, 14)
    const checkStatus = localStorage.getItem('Access')

   useEffect(() => {
        Axios.get(process.env.REACT_APP_API + `/listofficer/${courId}`)
        .then((res)=>{
          setOfficer(res.data); 
        }
        )
        .catch((err)=>{
        console.error(err);
        
        })
      },[])
  return (
    <React.Fragment>
      <div className="cotainerDetail">
        <p className="HeadTextMain">รายชื่อเจ้าหน้าที่ภายในสถานศึกษา</p>
        {checkStatus === 'กรรมวิธี' || checkStatus === 'กรรมวิธีส่วนกลาง' ? (
          <Container>
            <div style={{ height: 700, width: '100%' }}>
              <DataGrid
                getRowId={(row) => row.AccessRightsId}
                rows={officer}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
              />
            </div>
          </Container>
        ):(
          <Container> 
          <div style={{ height: 700, width: '100%' }}>
            <DataGrid
              getRowId={(row) => row.AccessRightsId}
              rows={officer}
              columns={columns1}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </div>
        </Container>
        )}
      </div>
    </React.Fragment>
  )
}


import React from 'react'
import Container from '@mui/material/Container'
// import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid'
// import AddIcon from '@mui/icons-material/Add';
// import PictureAsPdf from '@mui/icons-material/PictureAsPdf'
import { Edit } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import Modelorder from '../components/Modelorder'
// import FileDownload from 'js-file-download'
import moment from 'moment'
require('moment/locale/th')

export default function PageEducationInfo() {
  const Access = localStorage.getItem('Access')


  const columns = [
    {
      field: 'id',
      headerName: 'ลำดับ',
      width: 70,
      valueGetter: (params) => params.api.getRowIndex(params.row.id) + 1,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {cellValues.value}
          </div>
        )
      },
    },
    {
      field: 'CourseYear',
      headerName: 'ปีการศึกษา',
      width: 100,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {cellValues.value}
          </div>
        )
      },
    },
    {
      field: 'CourseGrp',
      headerName: 'รุ่น',
      width: 70,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {cellValues.value}
          </div>
        )
      },
    },
    {
      field: 'CourseTotalHrs',
      headerName: 'ระยะเวลาการศึกษา',
      width: 140,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {cellValues.value}
          </div>
        )
      },
    },
    //   {field: 'CourseBegin',headerName: 'วันที่เปิดหลักสูตร',align: "center",width: 130,type: "date",
    //   valueFormatter: (params) => moment(params).add(543, 'year').format('ll')
    // },
    {
      field: 'CourseBegin',
      headerName: 'วันที่เปิดหลักสูตร',
      align: 'center',
      width: 130,
      type: 'date',
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {moment(cellValues.value).add(543, 'year').format('ll')}
          </div>
        )
      },
    },
    //   {field: 'CourseEnd',headerName: 'วันที่จบหลักสูตร',align: "center",width: 130,type: "date",

    //   valueFormatter: (params) => moment(params).add(543, 'year').format('ll')
    // },
    {
      field: 'CourseEnd',
      headerName: 'วันที่ปิดหลักสูตร',
      align: 'center',
      width: 130,
      type: 'date',
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {moment(cellValues.value).add(543, 'year').format('ll')}
          </div>
        )
      },
    },
    {
      field: 'numberofpartic',
      headerName: 'จำนวนผู้เข้ารับการศึกษา',
      width: 170,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {cellValues.value}
          </div>
        )
      },
    },
    {
      field: 'numberofgraduates',
      headerName: 'จำนวนผู้สำเร็จการศึกษา',
      width: 170,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {cellValues.value}
          </div>
        )
      },
    },
    {
      field: 'admissionorder',
      headerName: 'คำสั่งเข้าเรียน',
      width: 110,
      renderCell: (params) => {
        const filepath = params.row.namefile
        return (
          <>
            <Modelorder filepath={filepath} />
          </>
        )
      },
    },
    {
      field: 'edit',
      headerName: Access === "ปกครอง" ? "" 
                : Access === "ผอ." ? ""
                : Access === "วัดผลส่วนกลาง" ? ""
                : 'แก้ไข/ประเมินผลการเรียน',
      width: 180,
      renderCell: (params) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {
                Access === "ปกครอง" ? "" 
            :  Access === "ผอ." ? "" 
            :  Access === "วัดผลส่วนกลาง" ? "" 
            : ((<Link
              to="/PageEditEducationInfo"
              state={{
                eduinfo: params.row,
              }}
            >
              <Edit className="userListDate" />
            </Link>))}
            {/* <Link
              to="/PageEditEducationInfo"
              state={{
                eduinfo: params.row,
              }}
            >
              <Edit className="userListDate" />
            </Link> */}
          </div>
        )
      },
    },
  ]

  // เรียกข้อมูล
  // const location = useLocation()
  const [courseYear, setCourseYear] = useState([])

  // console.log(courseYear)
  // console.log(userrank)
  // console.log(userfname)
  // console.log(userlname)
  // console.log(useraccess)

  // const [user,setUser] = useState("")
  // console.log(location)

  // user = JSON.parse(user)
  // console.log(user.id)
  // const [data,setData] = useState("");
  // console.log(data[0].id)

  const handleCellClick = (param, event) => {
    event.stopPropagation()
  }

  const handleRowClick = (param, event) => {
    event.stopPropagation()
  }
  // const handleClick = (event, cellValues) => {
  //   console.log(cellValues.row);
  // };
  // // console.log(location)
  // console.log(data.id)
  const AccessRights = localStorage.getItem('AccessRights')
  const Id = AccessRights.substring(11, 14)
  // console.log(Id)
  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/PageEducationInfo/${Id}`)
      .then((res) => {
        setCourseYear(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const DatetoDay = [...new Set(courseYear.map((item) => item.CourseBegin))]
  // moment.locale('th')
  // const a =  moment(DatetoDay).add(543, 'year').format('ll')
  // console.log(a)

  return (
    <React.Fragment>
      {/* <NavbarMain rank={userrank} fname={userfname}  lname={userlname} AccesssRightsId={useraccess}/>
<div className="containerMainPage">
<Sidebar /> */}
      <div className="cotainerDetail">
        <p className="HeadTextMain">ข้อมูลการศึกษา</p>

        <Container>
          <div style={{ height: 700, width: '100%' }}>
            {/* <Link to="/PageAddEducationInfo"><Button variant="outlined" startIcon={<AddIcon />}>เพิ่ม</Button></Link> */}
            <DataGrid
              getRowId={(row) => row.id}
              rows={courseYear}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              onCellClick={handleCellClick}
              onRowClick={handleRowClick}
            />
          </div>
        </Container>
      </div>
      {/* </div>
        <Footer /> */}
    </React.Fragment>
  )
}

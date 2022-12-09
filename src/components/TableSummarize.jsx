import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Edit } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { showGPA } from '../components/functions/education'
import Persattrscore from '../components/Persattrscore'
import ModelComment from './ModelComment'

// import { showGPA, listStudyResults } from "../components/functions/education";

function getFullName(params) {
  return `${params.row.Rank || ''} ${params.row.PersFname || ''} ${
    params.row.PersLname || ''
  }`
}

//คิดเกรดเฉลี่ยสะสม/GPA
function getGPA(params) {
  const gradeAll = []
  let sum = 0
  for (let i = 1; i < 8; i++) {
    gradeAll.push(params.row[`grade_${i}`])
  }
  // console.log(gradeAll)
  const grade = gradeAll.filter((item) => item !== null)
  for (let i = 0; i < grade.length; i++) {
    sum += showGPA(grade[i])
  }
  const sumGPA2 = sum / grade.length
  const GPA = Math.floor(sumGPA2 * 100) / 100
  // console.log(GPA)
  if (isNaN(GPA)) {
    return 'ไม่มีคะแนน'
  } else {
    return GPA.toFixed(2)
  }
}

export default function TableSummarize({
  classNo,
  seminarNo,
  isSubmit,
  courseNum,
}) {
  const setClass = classNo
  const setSeminar = seminarNo

  const [selected, setSelected] = useState([])
  // const school = localStorage.getItem('school')
  // const Id = useState(JSON.parse(school)[0].CourseId);
  // const CourseId = Id[0];
  const AccessRights = localStorage.getItem('AccessRights')
  const auth = localStorage.getItem('Access')
  const CourseId = AccessRights.substring(11, 14)

  const columns = [
    {
      field: 'id',
      headerName: 'ลำดับ',
      width: 65,
      align: 'center',
      valueGetter: (params) => params.api.getRowIndex(params.row.PerId) + 1,
    },
    { field: 'StudentId', headerName: 'เลขประจำตัว นทน.', width: 140,align: 'center' },
    {
      field: 'fullName',
      headerName: 'ยศ ชื่อ สกุล',
      width: 180,
      valueGetter: getFullName,
    },
    {
      field: 'RemainScore',
      headerName: 'เกรดเฉลี่ยสะสม/GPA',
      width: 150,
      align: 'center',
      renderCell: (params) => {
        return (
          <>
            {getGPA(params) === 'ไม่มีคะแนน' ? (
              <>
                <h5>-</h5>
              </>
            ) : (
              <>{getGPA(params)}</>
            )}
          </>
        )
      },
      // valueGetter: getGPA,
    },
    {
      field: 'averagescore',
      headerName: 'คะแนนเฉลี่ยคุณลักษณะส่วนบุคคล',
      width: 230,
      align: 'center',
      renderCell: (params) => {
        // console.log(params);
        const courseGrp = params.row.CourseGrp
        const courseid = params.row.cutstring
        const persid = params.row.PerId
        const checkPage = 1
  
        return (
          <>
            <Persattrscore
              courseGrp={courseGrp}
              courseid={courseid}
              persid={persid}
              checkPage={checkPage}
            />
          </>
        )
      },
    },
    {
      field: 'comment',
      headerName: 'ความคิดเห็นผู้บังคับบัญชา',
      width: 180,
      align: "center",
      renderCell: (params) => {
        const rank = params.row.Rank
        const name = params.row.PersFname
        const lname = params.row.PersLname
        const id = params.row.PerId
        const fullName = `${rank} ${name} ${lname}`
        const stdId = params.row.StudentId
  
        return (
          <>
            <ModelComment persid={id} name={fullName} stdId={stdId} />
          </>
        )
      },
    },
    auth === "ปกครอง" || auth === "วัดผลส่วนกลาง"
    ? {
      // check auth
      field: "note",
      headerName: "หมายเหตุ",
      width: 110,
      renderCell: (params) => {
        return (
          <>
            {getGPA(params) === "ไม่มีคะแนน" ? (
              <>
                <div className="text-danger">
                  <h6>
                    <small>ไม่มีคะแนน</small>
                  </h6>
                </div>
              </>
            ) : (
              <>
                <div className="text-success">
                  <h6>
                    <small>มีคะแนนแล้ว</small>
                  </h6>
                </div>
              </>
            )}
          </>
        );
      },
    }
    : {
      field: 'details',
      headerName: 'รายละเอียดเพิ่มเติม',
      width: 140,
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/PageEditSummarize/${params.row.PerId}`}
              state={{
                coursegrp: params.row.CourseGrp,
                seminar: params.row.Seminar,
                AccessRightsId : params.row.AccessRightsId,
              }}
            >
              <Edit className="userListDate" />
            </Link>
          </>
        )
      },
    },
    auth !== "ปกครอง" || auth !== "วัดผลส่วนกลาง"
    ? 
    {
      field: "note",
      headerName: "หมายเหตุ",
      width: 110,
      renderCell: (params) => {
        return (
          <>
            {getGPA(params) === "ไม่มีคะแนน" ? (
              <>
                <div className="text-danger">
                  <h6>
                    <small>ไม่มีคะแนน</small>
                  </h6>
                </div>
              </>
            ) : (
              <>
                <div className="text-success">
                  <h6>
                    <small>มีคะแนนแล้ว</small>
                  </h6>
                </div>
              </>
            )}
          </>
        );
      },
    }
    :{hide: true,}
  ]

  useEffect(() => {
    if (isSubmit) {
      // Axios.get(process.env.REACT_APP_API + `/result/report/${setClass}/seminar/${setSeminar}/${CourseId}`).then((res) => {
      Axios.get(
        process.env.REACT_APP_API + `/result/course/${setClass}/seminar/${setSeminar}/${CourseId}`,
      )
        .then((res) => {
          setSelected(res.data)
          // console.log('data: ',res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit])
  return (
    <React.Fragment>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid
          getRowId={(row) => row.PerId}
          rows={selected}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </React.Fragment>
  )
}

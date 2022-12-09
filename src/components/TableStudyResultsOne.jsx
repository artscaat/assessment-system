import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Print } from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'
import Axios from 'axios'

import Persattrscore from '../components/Persattrscore'

function getFullName(params) {
  return `${params.row.Rank || ''} ${params.row.PersFname || ''} ${
    params.row.PersLname || ''
  }`
}

export default function TableStudyResultsOne({
  classNo,
  seminarNo,
  isSubmit,
  courseNum,
  chkAttFile,
}) {
  const location = useLocation()
  const setClass = classNo
  const setSeminar = seminarNo
  //check values
  // const course2 = courseNum !== 0 ? courseNum : location.state.courseNum
  const course2 = courseNum === undefined ? location.state.courseNum : courseNum
  // console.log("data:", course2)

  const AccessRights = localStorage.getItem('AccessRights')
  const courId = AccessRights.substring(11, 14)

  const [selected, setSelected] = useState([])
  const [selected1, setSelected1] = useState([])
  const [selected2, setSelected2] = useState([])
  const [selected3, setSelected3] = useState([])

  useEffect(() => {
    if (isSubmit) {
      listStudent(setClass, setSeminar)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit])

  const listStudent = async (course2) => {
    Axios.get(
      process.env.REACT_APP_API + `/pageInsertScore/coursegrp/${setClass}/${setSeminar}/${courId}`,
    )
      .then((res) => {
        setSelected1(res.data)
        // console.log("selected1:", selected1);
      })
      .catch((err) => {
        console.log(err)
      })
    Axios.get(
      process.env.REACT_APP_API + `/result/report/${setClass}/seminar/${setSeminar}/${courId}/${course2}`,
    )
      .then((res) => {
        const allSelect = res.data.map((e) =>
          Object.assign(e, e.PersId === selected1.persid),
        )
        setSelected(allSelect)
        // console.log("selected:", allSelect);
      })
      .catch((err) => {
        console.log(err)
      })
      Axios.get(
        process.env.REACT_APP_API + `/getpercentment/courseid/${courId}/coursegrp/${setClass}`,
      )
      .then((res) => {
        setSelected2(res.data)
        // console.log("Selected2: ",res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      Axios.get(process.env.REACT_APP_API + `/pageStudyDir/${courId}`)
      .then((res) => {
        setSelected3(res.data)
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const merged = selected.map((e) => {
    return {
      ...e,
      ...selected1.find((s) => s.persid === e.PersId),
    }
  })

  const merged2 = merged.map((e) => {
    return {
      ...e,
      ...selected2.find((s) => s.PersId === e.PersId),
    }
  })

  const merged3 = merged2.map((e) => {
    return {
      ...e,
      ...selected3.find((s) => s.CourseId === e.CourseId),
    }
  })
  // const dataTable = []
  // console.log("merged3: ", merged3)
  // const dataTable = selected3.length === 0 ? merged2 : merged3
  // if (selected3.length == 0) {
  //   return dataTable = merged2
  // } else {
  //   return dataTable = merged3
  // }
  // console.log("dataTable:",dataTable);

  const course_1 = [...new Set(merged.map((item) => item.course_1))]
  const course_2 = [...new Set(merged.map((item) => item.course_2))]
  const course_3 = [...new Set(merged.map((item) => item.course_3))]
  const course_4 = [...new Set(merged.map((item) => item.course_4))]
  const course_5 = [...new Set(merged.map((item) => item.course_5))]
  const course_6 = [...new Set(merged.map((item) => item.course_6))]
  const course_7 = [...new Set(merged.map((item) => item.course_7))]

  const columns = [
    {
      field: 'id',
      headerName: 'ลำดับ',
      width: 65,
      align: 'center',
      valueGetter: (params) => params.api.getRowIndex(params.row.PersId) + 1,
    },
    {
      field: 'studentid',
      headerName: 'เลขประจำตัว นทน.',
      width: 140,
      align: 'center',
    },
    {
      field: 'fullName',
      headerName: 'ยศ ชื่อ สกุล',
      width: 180,
      valueGetter: getFullName,
    },
    {
      field: 'PersAffiliation',
      headerName: 'สังกัด',
      width: 70,
    },
    course_1 === null
      ? {
          hide: true,
        }
      : {
          field: 'course_1',
          headerName: 'หมวดวิชาที่1/100คะแนน',
          width: 180,
          align: 'center',
          renderCell: (params) => {
            const score1 = params.row.course_1
            return (
              <>
                {score1 === null ? (
                  <>
                    <h5>-</h5>
                  </>
                ) : (
                  <>{score1}</>
                )}
              </>
            )
          },
        },
    course_2[0] === null
      ? {
          hide: true,
        }
      : {
          field: 'course_2',
          headerName: 'หมวดวิชาที่2/100คะแนน',
          width: 180,
          align: 'center',
          renderCell: (params) => {
            const score2 = params.row.course_2
            return (
              <>
                {score2 === null ? (
                  <>
                    <h5>-</h5>
                  </>
                ) : (
                  <>{score2}</>
                )}
              </>
            )
          },
        },
    course_3[0] === null
      ? {
          hide: true,
        }
      : {
          field: 'course_3',
          headerName: 'หมวดวิชาที่3/100คะแนน',
          width: 180,
          align: 'center',
          renderCell: (params) => {
            const score3 = params.row.course_3
            return (
              <>
                {score3 === null ? (
                  <>
                    <h5>-</h5>
                  </>
                ) : (
                  <>{score3}</>
                )}
              </>
            )
          },
        },
    course_4[0] === null
      ? {
          hide: true,
        }
      : {
          field: 'course_4',
          headerName: 'หมวดวิชาที่4/100คะแนน',
          width: 180,
          align: 'center',
          renderCell: (params) => {
            const score4 = params.row.course_4
            return (
              <>
                {score4 === null ? (
                  <>
                    <h5>-</h5>
                  </>
                ) : (
                  <>{score4}</>
                )}
              </>
            )
          },
        },
    course_5[0] === null
      ? {
          hide: true,
        }
      : {
          field: 'course_5',
          headerName: 'หมวดวิชาที่5/100คะแนน',
          width: 180,
          align: 'center',
          renderCell: (params) => {
            const score5 = params.row.course_5
            return (
              <>
                {score5 === null ? (
                  <>
                    <h5>-</h5>
                  </>
                ) : (
                  <>{score5}</>
                )}
              </>
            )
          },
        },
    course_6[0] === null
      ? {
          hide: true,
        }
      : {
          field: 'course_6',
          headerName: 'หมวดวิชาที่6/100คะแนน',
          width: 180,
          align: 'center',
          renderCell: (params) => {
            const score6 = params.row.course_6
            return (
              <>
                {score6 === null ? (
                  <>
                    <h5>-</h5>
                  </>
                ) : (
                  <>{score6}</>
                )}
              </>
            )
          },
        },
    course_7[0] === null
      ? {
          hide: true,
        }
      : {
          field: 'course_7',
          headerName: 'หมวดวิชาที่7/100คะแนน',
          width: 180,
          align: 'center',
          renderCell: (params) => {
            const score7 = params.row.course_7
            return (
              <>
                {score7 === null ? (
                  <>
                    <h5>-</h5>
                  </>
                ) : (
                  <>{score7}</>
                )}
              </>
            )
          },
        },
    {
      field: 'TotalScore',
      headerName: 'คะแนนรวม400คะแนน',
      width: 170,
      align: 'center',
      renderCell: (params) => {
        // const TotalScore = params.row.TotalScore;
        const score1 = params.row.course_1
        const score2 = params.row.course_2
        const score3 = params.row.course_3
        const score4 = params.row.course_4
        const score5 = params.row.course_5
        const score6 = params.row.course_6
        const score7 = params.row.course_7
        const TotalScore =
          score1 + score2 + score3 + score4 + score5 + score6 + score7
        return (
          <>
            {TotalScore === 0 ? (
              <>
                <h5>-</h5>
              </>
            ) : (
              <>{Math.floor(TotalScore)}</>
            )}
          </>
        )
      },
    },
    {
      field: 'RemainScore',
      headerName: 'คะแนนร้อยละ',
      width: 110,
      align: 'center',
      renderCell: (params) => {
        // const RemainScore = params.row.RemainScore
        const courseNum = course2
        const num = courseNum * 100
        const score1 = params.row.course_1
        const score2 = params.row.course_2
        const score3 = params.row.course_3
        const score4 = params.row.course_4
        const score5 = params.row.course_5
        const score6 = params.row.course_6
        const score7 = params.row.course_7
        const TotalScore =
          score1 + score2 + score3 + score4 + score5 + score6 + score7
        const percentScore = (TotalScore / num) * 100
        return (
          <>
            {TotalScore === null || TotalScore === 0.0 ? (
              <>
                <h5>-</h5>
              </>
            ) : (
              <>{percentScore.toFixed(2)}</>
            )}
          </>
        )
      },
    },
    {
      field: 'status',
      headerName: 'ผ่าน(ประเภท)/ไม่ผ่าน',
      width: 160,
      align: 'center',
      renderCell: (params) => {
        const courseNum = course2
        const num = courseNum * 100
        const score1 = params.row.course_1
        const score2 = params.row.course_2
        const score3 = params.row.course_3
        const score4 = params.row.course_4
        const score5 = params.row.course_5
        const score6 = params.row.course_6
        const score7 = params.row.course_7
        const TotalScore =
          score1 + score2 + score3 + score4 + score5 + score6 + score7
        const percentScore = (TotalScore / num) * 100
        const grade = params.row.Grade
        // console.log("grade: ",grade)
        // console.log("percentScore: ",percentScore)
        return (
          <>
            {percentScore >= 60 || grade === "P" ? (
              <>
                <h6>
                  <small>ผ่าน</small>
                </h6>
              </>
            ) : (
              <div className="text-danger">
                <h6>
                  <small>ไม่ผ่าน</small>
                </h6>
              </div>
            )}
          </>
        )
      },
    },
    {
      field: 'attribute',
      headerName: 'คุณลักษณะส่วนบุคคล(ค่าเฉลี่ย)',
      width: 210,
      align: 'center',
      renderCell: (params) => {
        const courseGrp = params.row.CourseGrp
        const courseid = params.row.cutstring
        const persid = params.row.PersId
        const checkPage = 0

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
      field: 'studyhours',
      headerName: 'ชั่วโมงการศึกษา(ค่าเฉลี่ย)',
      width: 180,
      align: 'center',
      renderCell: (params) => {
        const percentHrs = (params.row.sumattendhrs / params.row.period) * 100
        return (
          <>
            {percentHrs.toFixed(0) >= 80 ? (
              <>ผ่าน {'(' + percentHrs.toFixed(0) + ')'}</>
            ) : (
              <>ไม่ผ่าน {'(' + percentHrs.toFixed(0) + ')'}</>
            )}
          </>
        )
      },
    },
    {
      field: 'ordnr',
      headerName: 'ลำดับที่สอบได้',
      width: 110,
      align: 'center',
    },
    {
      field: 'print',
      headerName: 'พิมพ์',
      width: 80,
      renderCell: (params) => {
        const value = {
          PersId: params.row.PersId,
          AccessRightsId: params.row.AccessRightsId,
          Cutstring: params.row.cutstring,
          CourseGrp: params.row.CourseGrp,
        }
        return (
          <>
            <Link
              to={`/PagePrintStudyResultsOne`}
              state={{
                coursegrp: params.row.CourseGrp,
                seminar: params.row.Seminar,
                businessleave: params.row.businessleave,
                sickleave: params.row.sickleave,
                percentattendhrs: params.row.percentattendhrs,
                period: params.row.period,
                PersId: value.PersId,
                AccessRightsId: value.AccessRightsId,
                Cutstring: value.Cutstring,
                CourseGrp: value.CourseGrp,
                course2: course2,
                ordnr : params.row.ordnr ? params.row.ordnr : '-',
                imgInstrId : params.row.InstructorId ? params.row.InstructorId : '-',
                imgpath : params.row.SignatureImg ? params.row.SignatureImg : '-',
                chkattackfile : chkAttFile !== undefined ? chkAttFile : '0',
                dateattechfile : params.row.Dateattechfile ? params.row.Dateattechfile : '-',
              }}
            >
              <Print className="userListPrint" />
            </Link>
          </>
        )
      },
    },
  ]

  return (
    <React.Fragment>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid
          getRowId={(row) => row.PersId}
          rows={merged3}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </React.Fragment>
  )
}

/* eslint eqeqeq: 0 */
import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Print } from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'
import Axios from 'axios'

import Averagescore from '../components/Averagescore'

import {showGPA} from '../components/functions/education'

import Persattrscore from '../components/Persattrscore'

function getFullName(params) {
  return `${params.row.Rank || ''} ${params.row.PersFname || ''} ${
    params.row.PersLname || ''
  }`
}

export default function TableStudyResultsTwo({
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

  const AccessRights = localStorage.getItem('AccessRights')
  const courId = AccessRights.substring(11, 14)

  const [selected, setSelected] = useState([])
  const [selected1, setSelected1] = useState([])
  const [selected2, setSelected2] = useState([])
  const [selected3, setSelected3] = useState([])

  useEffect(() => {
    if (isSubmit) {
      listStudent(setClass, setSeminar, courId, course2)
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
        process.env.REACT_APP_API + `/result/reportgrade/${setClass}/seminar/${setSeminar}/${courId}/${course2}`,
      )
        .then((res) => {
          const allSelect = res.data.map((e) =>
            Object.assign(e, e.PersId === selected1.persid),
          )
          setSelected(allSelect)
          // console.log("selected 2:", allSelect);
        })
        .catch((err) => {
          console.log(err)
        })
      Axios.get(
          process.env.REACT_APP_API + `/courseid/${courId}/coursegrp/${setClass}`,
        )
      .then((res) => {
        setSelected2(res.data)
        // console.log("selected2:", res.data);
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

  // console.log("merged3 table 2 : ",merged2)

  const grade_1 = [...new Set(merged.map((item) => item.grade_1))]
  const grade_2 = [...new Set(merged.map((item) => item.grade_2))]
  const grade_3 = [...new Set(merged.map((item) => item.grade_3))]
  const grade_4 = [...new Set(merged.map((item) => item.grade_4))]
  const grade_5 = [...new Set(merged.map((item) => item.grade_5))]
  const grade_6 = [...new Set(merged.map((item) => item.grade_6))]
  const grade_7 = [...new Set(merged.map((item) => item.grade_7))]

  const columns = [
    {
      field: 'id',
      headerName: 'ลำดับ',
      width: 60,
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
    grade_1[0] === null
      ? {
          hide: true,
        }
      : {
          field: 'grade_1',
          headerName: 'หมวดวิชาที่1/นน.คะแนน',
          width: 180,
          align: 'center',
          renderCell: (params) => {
            const grade_1 = params.row.grade_1
            return (
              <>
                {grade_1 === null ? (
                  <>
                    <h5>-</h5>
                  </>
                ) : (
                  <>
                    {showGPA(grade_1).toFixed(2) == 0.0
                      ? '-'
                      : showGPA(grade_1).toFixed(2)}
                  </>
                )}
              </>
            )
          },
        },
    grade_2[0] === null
      ? {
          hide: true,
        }
      : {
          field: 'grade_2',
          headerName: 'หมวดวิชาที่2/นน.คะแนน',
          width: 180,
          align: 'center',
          renderCell: (params) => {
            const grade_2 = params.row.grade_2
            return (
              <>
                {grade_2 === null ? (
                  <>
                    <h5>-</h5>
                  </>
                ) : (
                  <>
                    {showGPA(grade_2).toFixed(2) == 0.0
                      ? '-'
                      : showGPA(grade_2).toFixed(2)}
                  </>
                )}
              </>
            )
          },
        },
    grade_3[0] === null
      ? {
          hide: true,
        }
      : {
          field: 'grade_3',
          headerName: 'หมวดวิชาที่3/นน.คะแนน',
          width: 180,
          align: 'center',
          renderCell: (params) => {
            const grade_3 = params.row.grade_3
            return (
              <>
                {grade_3 === null ? (
                  <>
                    <h5>-</h5>
                  </>
                ) : (
                  <>
                    {showGPA(grade_3).toFixed(2) == 0.0
                      ? '-'
                      : showGPA(grade_3).toFixed(2)}
                  </>
                )}
              </>
            )
          },
        },
    grade_4[0] === null
      ? {
          hide: true,
        }
      : {
          field: 'grade_4',
          headerName: 'หมวดวิชาที่4/นน.คะแนน',
          width: 180,
          align: 'center',
          renderCell: (params) => {
            const grade_4 = params.row.grade_4
            return (
              <>
                {grade_4 === null ? (
                  <>
                    <h5>-</h5>
                  </>
                ) : (
                  <>
                    {showGPA(grade_4).toFixed(2) == 0.0
                      ? '-'
                      : showGPA(grade_4).toFixed(2)}
                  </>
                )}
              </>
            )
          },
        },
    grade_5[0] === null
      ? {
          hide: true,
        }
      : {
          field: 'grade_5',
          headerName: 'หมวดวิชาที่5/นน.คะแนน',
          width: 180,
          align: 'center',
          renderCell: (params) => {
            const grade_5 = params.row.grade_5
            return (
              <>
                {grade_5 === null ? (
                  <>
                    <h5>-</h5>
                  </>
                ) : (
                  <>
                    {showGPA(grade_5).toFixed(2) == 0.0
                      ? '-'
                      : showGPA(grade_5).toFixed(2)}
                  </>
                )}
              </>
            )
          },
        },
    grade_6[0] === null
      ? {
          hide: true,
        }
      : {
          field: 'grade_6',
          headerName: 'หมวดวิชาที่6/นน.คะแนน',
          width: 180,
          align: 'center',
          renderCell: (params) => {
            const grade_6 = params.row.grade_6
            return (
              <>
                {grade_6 === null ? (
                  <>
                    <h5>-</h5>
                  </>
                ) : (
                  <>
                    {showGPA(grade_6).toFixed(2) == 0.0
                      ? '-'
                      : showGPA(grade_6).toFixed(2)}
                  </>
                )}
              </>
            )
          },
        },
    grade_7[0] === null
      ? {
          hide: true,
        }
      : {
          field: 'grade_7',
          headerName: 'หมวดวิชาที่7/นน.คะแนน',
          width: 180,
          align: 'center',
          renderCell: (params) => {
            const grade_7 = params.row.grade_7
            return (
              <>
                {grade_7 === null ? (
                  <>
                    <h5>-</h5>
                  </>
                ) : (
                  <>
                    {showGPA(grade_7).toFixed(2) == 0.0
                      ? '-'
                      : showGPA(grade_7).toFixed(2)}
                  </>
                )}
              </>
            )
          },
        },
    {
      field: 'averagescore',
      headerName: 'ค่าระดับคะแนนเฉลี่ย',
      width: 150,
      align: 'center',
      renderCell: (params) => {
        const PersId = params.row.PersId
        const checkPage = 0
        const checkPrint = 0
        return (
          <>
            <Averagescore id={PersId} checkPage={checkPage} checkPrint={checkPrint}/>
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
        const PersId = params.row.PersId
        const checkPage = 1
        const grade = params.row.Grade
        // console.log("grade: ", grade)
        return (
          <>
            <Averagescore id={PersId} checkPage={checkPage} grade={grade} />
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
      headerName: 'ชั่วโมงการศึกษา',
      width: 120,
      align: 'center',
      renderCell: (params) => {
        const percentHrs = (params.row.sumattendhrs / params.row.period) * 100
        return <>{
          percentHrs.toFixed(0) >= 80 ? (
            <>
              ผ่าน {"(" + percentHrs.toFixed(0) + ")"}
            </>
          ) : (
            <>
              ไม่ผ่าน {"(" + percentHrs.toFixed(0) + ")"}
            </>
          )
        }</>
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
              to={`/PagePrintStudyResults`}
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
                course2 : course2,
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
          // rows={merged}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </React.Fragment>
  )
}

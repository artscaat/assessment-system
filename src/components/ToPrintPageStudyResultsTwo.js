/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { forwardRef, Fragment, useEffect, useRef, useState } from 'react'
// import { styled } from '@mui/material/styles'
import { Table, TableBody, TableHead, TableRow } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import { Button } from '@mui/material'
import { useReactToPrint } from 'react-to-print'
import { showGPA, thaiNumber } from '../components/functions/education'
// import Averagescore from '../components/Averagescore'
import axios from 'axios'

function getGPA(params) {
  // console.log('get: ',params)
  const gradeAll = []
  let sum = 0
  for (let i = 1; i < 8; i++) {
    gradeAll.push(params[`grade_${i}`])
  }
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

/*------------- Function Component to be called by ToPrintPageInsertScore -----------*/
const ComponentToPrint = forwardRef((props, ref) => {
  const { dataToPrint } = props
  const [rows, setRows] = useState([])
  const [resultReport, setResultReport] = useState([])
  const [getperCentment, setGetpercentment] = useState([])
  const coursenameref = useRef(localStorage.getItem('CourseName'))
  // const checkPage = 1

  useEffect(() => {
    if (dataToPrint.isSubmit) {
      fetchdata()
    }
  }, [dataToPrint.isSubmit])

  const fetchdata = async () => {
    await axios
      .get(
        process.env.REACT_APP_API + `/pageInsertScore/coursegrp/${dataToPrint.coursegrp}/${dataToPrint.seminar}/${dataToPrint.courseid}`,
      )
      .then((list) => {
        setRows(list.data)
        // console.log("data: ", list.data);
      })
      .catch((err) => {
        console.log('ToPrintPageInsertScore failed >>> err : ', err)
      })
    await axios
      .get(
        process.env.REACT_APP_API + `/result/reportgrade/${dataToPrint.coursegrp}/seminar/${dataToPrint.seminar}/${dataToPrint.courseid}/${dataToPrint.courseNum}`,
      )
      .then((list) => {
        const allSelect = list.data.map((e) =>
          Object.assign(e, e.PersId === rows.persid),
        )
        setResultReport(allSelect)
        // console.log("resultReport: ", list.data);
      })
      .catch((err) => {
        console.log('ToPrintPageInsertScore failed >>> err : ', err)
      })
    await axios
      .get(
        process.env.REACT_APP_API + `/courseid/${dataToPrint.courseid}/coursegrp/${dataToPrint.coursegrp}`,
      )
      .then((list) => {
        setGetpercentment(list.data)
        // console.log("setGetpercentment: ", list.data);
      })
      .catch((err) => {
        console.log('ToPrintPageInsertScore failed >>> err : ', err)
      })
  }

  const merged = resultReport.map((e) => {
    return {
      ...e,
      ...rows.find((s) => s.persid === e.PersId),
    }
  })
  const merged2 = merged.map((e) => {
    return {
      ...e,
      ...getperCentment.find((s) => s.PersId === e.PersId),
    }
  })

  // console.log("data: ", merged2)
  const sort_data = merged2.sort((a, b) => b.avg - a.avg)
  // const sort_data = merged2.sort()
  // console.log("data: ", sort_data)
  // const sort_data = merged2.sort((a, b) => a.PersId === null ? (
  //   b.PersId === null? 0 : 1
  //   ) : (
  //   b.PersId === null? 1 : -1
  //   )
  // )

  const grade_1 = [...new Set(merged.map((item) => item.grade_1))]
  const grade_2 = [...new Set(merged.map((item) => item.grade_2))]
  const grade_3 = [...new Set(merged.map((item) => item.grade_3))]
  const grade_4 = [...new Set(merged.map((item) => item.grade_4))]
  const grade_5 = [...new Set(merged.map((item) => item.grade_5))]
  const grade_6 = [...new Set(merged.map((item) => item.grade_6))]
  const grade_7 = [...new Set(merged.map((item) => item.grade_7))]

  // const checkPage = 0 //check คะแนนเฉลี่ย
  // const checkPrint = 1 //check หน้า print

  function thai_avg(avg) {
    // const avg_result = thaiNumber(avg)
    const avg_f = thaiNumber(Number(avg).toFixed(2))
    // console.log("data: ",avg_f)
    return avg_f
  }

  return (
    <div ref={ref}>
      <Table
        sx={{
          [`& .${tableCellClasses.root}`]: {
            border: 'none',
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} align="center">
              <div style={{ fontSize: 18, fontWeight: 'bold' }}>
                ผลการศึกษาของผู้เข้ารับการศึกษาหลักสูตร&ensp;
                {coursenameref.current}
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* <TableRow>
                    <TableCell colSpan={2} align='center'>
                        <div style={{ fontSize: 18, fontWeight: 'bold' }}>
                            หลักสูตร&ensp;{ coursenameref.current }
                        </div>
                    </TableCell>
                </TableRow> */}
          <TableRow>
            <TableCell align="center">
              <strong>รุ่นที่</strong>&ensp;{thaiNumber(dataToPrint.coursegrp)}
            </TableCell>
            <TableCell align="center">
              <strong>สัมมนาที่</strong>&ensp;
              {dataToPrint.seminar === 0 ? '--' : thaiNumber(dataToPrint.seminar)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/*------------------ สรุปชั่วโมงการศึกษา -----------------*/}
      <hr />
      <Table>
        <TableHead>
          {/* <TableRow>
                    <TableCell colSpan={15} align='center'>
                        <div style={{ fontSize: 18, fontWeight: 'bold' }}>
                            ผลการศึกษาสรุปรวม
                        </div>
                    </TableCell>
                </TableRow> */}
          <TableRow>
            <TableCell align="center" sx={{ width: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 'bold' }}>ลำดับ</div>
            </TableCell>
            {/* <TableCell align='center'>
                        <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                            เลขประจำตัว นทน.
                        </div>
                    </TableCell> */}
            <TableCell align="center" sx={{ width: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                ยศ-ชื่อ-สกุล
              </div>
            </TableCell>
            <TableCell align="center" sx={{ width: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 'bold' }}>สังกัด</div>
            </TableCell>
            {grade_1[0] === null ? (
              <></>
            ) : (
              <TableCell align="center" sx={{ width: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                  หมวดวิชาที่ {thaiNumber(1)}
                </div>
              </TableCell>
            )}
            {grade_2[0] === null ? (
              <></>
            ) : (
              <TableCell align="center" sx={{ width: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                  หมวดวิชาที่ {thaiNumber(2)}
                </div>
              </TableCell>
            )}
            {grade_3[0] === null ? (
              <></>
            ) : (
              <TableCell align="center" sx={{ width: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                  หมวดวิชาที่ {thaiNumber(3)}
                </div>
              </TableCell>
            )}
            {grade_4[0] === null ? (
              <></>
            ) : (
              <TableCell align="center" sx={{ width: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                  หมวดวิชาที่ {thaiNumber(4)}
                </div>
              </TableCell>
            )}
            {grade_5[0] === null ? (
              <></>
            ) : (
              <TableCell align="center" sx={{ width: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                  หมวดวิชาที่ {thaiNumber(5)}
                </div>
              </TableCell>
            )}
            {grade_6[0] === null ? (
              <></>
            ) : (
              <TableCell align="center" sx={{ width: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                  หมวดวิชาที่ {thaiNumber(6)}
                </div>
              </TableCell>
            )}
            {grade_7[0] === null ? (
              <></>
            ) : (
              <TableCell align="center" sx={{ width: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                  หมวดวิชาที่ {thaiNumber(7)}
                </div>
              </TableCell>
            )}
            <TableCell align="center" sx={{ width: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                ค่าระดับคะแนนเฉลี่ย
              </div>
            </TableCell>
            {/* <TableCell align='center'sx={{ width: 20}}>
                        <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                            คะแนนร้อยละ
                        </div>
                    </TableCell> */}
            <TableCell align="center" sx={{ width: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                ผ่าน(ประเภท)/ไม่ผ่าน
              </div>
            </TableCell>

            <TableCell align="center" sx={{ width: 90 }}>
              <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                ลำดับที่สอบได้
              </div>
            </TableCell>
            <TableCell align="center" sx={{ width: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 'bold' }}>หมายเหตุ</div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sort_data.map((e, i) => {
            return (
              <TableRow key={i}>
                <TableCell align="center">
                  <div style={{ fontSize: 12 }}>
                    {/* { e.id } */}
                    {thaiNumber(i+1)}
                  </div>
                </TableCell>
                <TableCell align="left">
                  <div style={{ fontSize: 12, whiteSpace: 'nowrap' }}>
                    {e.Rank} {e.PersFname} {e.PersLname}
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div style={{ fontSize: 12 }}>{e.PersAffiliation}</div>
                </TableCell>
                {grade_1[0] === null ? (
                  <></>
                ) : (
                  <TableCell align="center">
                    <div style={{ fontSize: 12 }}>
                          {showGPA(e.grade_1).toFixed(2) == 0.0
                            ? '-'
                            : thaiNumber(showGPA(e.grade_1).toFixed(2))}
                    </div>
                  </TableCell>
                )}
                {grade_2[0] === null ? (
                  <></>
                ) : (
                  <TableCell align="center">
                    <div style={{ fontSize: 12 }}>
                          {showGPA(e.grade_2).toFixed(2) == 0.0
                            ? '-'
                            : thaiNumber(showGPA(e.grade_2).toFixed(2))}
                        </div>
                  </TableCell>
                )}
                {grade_3[0] === null ? (
                  <></>
                ) : (
                  <TableCell align="center">
                    <div style={{ fontSize: 12 }}>
                          {showGPA(e.grade_3).toFixed(2) == 0.0
                            ? '-'
                            : thaiNumber(showGPA(e.grade_3).toFixed(2))}
                    </div>
                  </TableCell>
                )}
                {grade_4[0] === null ? (
                  <></>
                ) : (
                  <TableCell align="center">
                    <div style={{ fontSize: 12 }}>
                          {showGPA(e.grade_4).toFixed(2) == 0.0
                            ? '-'
                            : thaiNumber(showGPA(e.grade_4).toFixed(2))}
                    </div>
                  </TableCell>
                )}
                {grade_5[0] === null ? (
                  <></>
                ) : (
                  <TableCell align="center">
                    <div style={{ fontSize: 12 }}>
                          {showGPA(e.grade_5).toFixed(2) == 0.0
                            ? '-'
                            : thaiNumber(showGPA(e.grade_5).toFixed(2))}
                    </div>
                  </TableCell>
                )}
                {grade_6[0] == null ? (
                  <></>
                ) : (
                  <TableCell align="center">
                    <div style={{ fontSize: 12 }}>
                          {showGPA(e.grade_6).toFixed(2)== 0.0
                            ? '-'
                            : thaiNumber(showGPA(e.grade_6).toFixed(2))}
                    </div>
                  </TableCell>
                )}
                {grade_7[0] == null ? (
                  <></>
                ) : (
                  <TableCell align="center">
                    <div style={{ fontSize: 12 }}>
                          {showGPA(e.grade_7).toFixed(2)== 0.0
                            ? '-'
                            : thaiNumber(showGPA(e.grade_7).toFixed(2))}
                    </div>
                  </TableCell>
                )}
                <TableCell align='center'>
                        <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                          {thai_avg(e.avg)}
                        {/* <Averagescore id={e.PersId} checkPage={checkPage} checkPrint ={checkPrint} /> */}
                        </div>
                    </TableCell>
                <TableCell align="center">
                  {Number(getGPA(e)) >= 2.0  || e.Grade == 'P' ? (
                    <div style={{ fontSize: 12, color: '#018822' }}>ผ่าน/ก</div>
                  ) : (
                    <div style={{ fontSize: 12, color: '#A50000' }}>
                      ไม่ผ่าน
                    </div>
                  )}
                </TableCell>
                <TableCell align="center">
                  {thaiNumber(e.ordnr)}
                </TableCell>
                <TableCell align="center">
                  {" "}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  ) //end of return
})

const ToPrintPageStudyResultsTwo = (props) => {
  const { dataToPrint } = props
  const componentRef = useRef()

  const marginTop = '1cm'
  const marginRight = '0.5cm'
  const marginBottom = '1cm'
  const marginLeft = '0.5cm'

  const getPageMargin = () => {
    return `
            @page {
                size: A4 landscape;
                margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important;
            }
        `
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: getPageMargin(),
  })

  /*------- updated on 23.09.2022 -> change button, color and fontweght ----*/
  return (
    <Fragment>
      <div style={{ display: 'none' }}>
        <ComponentToPrint ref={componentRef} dataToPrint={dataToPrint} />
      </div>
      {/*<IconButton onClick={ 
                handlePrint
            }>
                <LocalPrintshopIcon sx={{ color: '#3A9CFE' }} />
            </IconButton>*/}
      <Button
        variant={'contained'}
        startIcon={<LocalPrintshopIcon />}
        sx={{
          minWidth: 100,
          minHeight: 55,
          m: 1,
          fontFamily: 'THSarabunNew',
          fontWeight: 'bold',
          fontSize: 16,
        }}
        onClick={handlePrint}
      >
        พิมพ์
      </Button>
    </Fragment>
  )
}

export default ToPrintPageStudyResultsTwo

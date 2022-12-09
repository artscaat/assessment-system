import React, { forwardRef, Fragment, useEffect, useRef, useState } from 'react'
// import { styled } from '@mui/material/styles'
import { Table, TableBody, TableHead, TableRow } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import { Button } from '@mui/material'
import { useReactToPrint } from 'react-to-print'
import { thaiNumber } from '../components/functions/education'
import axios from 'axios'

/*------------- Function Component to be called by ToPrintPageInsertScore -----------*/
const ComponentToPrint = forwardRef((props, ref) => {
  const { dataToPrint } = props
  const [rows, setRows] = useState([])
  const [resultReport, setResultReport] = useState([])
  const [getperCentment, setGetpercentment] = useState([])
  const coursenameref = useRef(localStorage.getItem('CourseName'))

  useEffect(() => {
    if (dataToPrint.isSubmit) {
      fetchdata()
    }
  }, [dataToPrint.isSubmit])

  const fetchdata = async () => {
    // console.log("fetchdata: ", dataToPrint)
    await axios
      .get(
        process.env.REACT_APP_API + `/pageInsertScore/coursegrp/${dataToPrint.coursegrp}/${dataToPrint.seminar}/${dataToPrint.courseid}`,
      )
      .then((list) => {
        setRows(list.data)
        // console.log("data: ", list.data);
      })
      .catch((err) => {
        console.log('ToPrintPageInsertScore1 failed >>> err : ', err)
      })
    await axios
      .get(
        process.env.REACT_APP_API + `/result/report/${dataToPrint.coursegrp}/seminar/${dataToPrint.seminar}/${dataToPrint.courseid}/${dataToPrint.courseNum}`,
      )
      .then((list) => {
        const allSelect = list.data.map((e) =>
          Object.assign(e, e.PersId === rows.persid),
        )
        setResultReport(allSelect)
        // console.log("resultReport: ", list.data);
      })
      .catch((err) => {
        console.log('ToPrintPageInsertScore2 failed >>> err : ', err)
      })
    await axios
      .get(
        process.env.REACT_APP_API + `/getpercentment/courseid/${dataToPrint.courseid}/coursegrp/${dataToPrint.coursegrp}`,
      )
      .then((list) => {
        setGetpercentment(list.data)
        // console.log("setGetpercentment: ", list.data);
      })
      .catch((err) => {
        console.log('ToPrintPageInsertScore3 failed >>> err : ', err)
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

  const sort_data = merged2.sort((a, b) => a.PersId === null ? (
    b.PersId === null? 0 : 1
    ) : (
    b.PersId === null? 1 : -1
    )
  )

  // console.log("data: ", merged2)
  // console.log("data sort: ", sort_data)
  const course_1 = [...new Set(merged2.map((item) => item.course_1))]
  const course_2 = [...new Set(merged2.map((item) => item.course_2))]
  const course_3 = [...new Set(merged2.map((item) => item.course_3))]
  const course_4 = [...new Set(merged2.map((item) => item.course_4))]
  const course_5 = [...new Set(merged2.map((item) => item.course_5))]
  const course_6 = [...new Set(merged2.map((item) => item.course_6))]
  const course_7 = [...new Set(merged2.map((item) => item.course_7))]

  function total(s1,s2,s3,s4,s5,s6,s7) {
    // return parseInt(s1) + parseInt(s2) + parseInt(s3) + parseInt(s4) + parseInt(s5) + parseInt(s6) + parseInt(s7)
    // console.log("total: ",parseInt(s1) + parseInt(s2) + parseInt(s3) + parseInt(s4) + parseInt(s5) + parseInt(s6) + parseInt(s7))
    const total = s1+s2+s3+s4+s5+s6+s7
    return total
  }

  function calPercent(total) {
    //คำนวณร้อยละ
    const num = dataToPrint.courseNum * 100
    const percentScore = (total / num) * 100
    return percentScore.toFixed(2)
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
          <TableRow>
            <TableCell align="center">
              <strong>รุ่นที่</strong>&ensp;{thaiNumber(dataToPrint.coursegrp)}
            </TableCell>
            <TableCell align="center">
              <strong>สัมมนาที่</strong>&ensp;
              {dataToPrint.seminar === thaiNumber(0) ? '--' : thaiNumber(dataToPrint.seminar)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/*------------------ สรุปชั่วโมงการศึกษา -----------------*/}
      <hr />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ width: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 'bold' }}>ลำดับ</div>
            </TableCell>
            {/* <TableCell align='center'>
                        <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                            เลขประจำตัว นทน.
                        </div>
                    </TableCell> */}
            <TableCell align="center">
              <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                ยศ-ชื่อ-สกุล
              </div>
            </TableCell>
            <TableCell align="center" sx={{ width: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 'bold' }}>สังกัด</div>
            </TableCell>
            <TableCell align="center" sx={{ width: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                เวลาเรียนร้อยละ
              </div>
            </TableCell>
            {course_1[0] === null ? (
              <></>
            ) : (
              <TableCell align="center" sx={{ width: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                  หมวดวิชาที่ {thaiNumber(1)}
                </div>
              </TableCell>
            )}
            {course_2[0] === null ? (
              <></>
            ) : (
              <TableCell align="center" sx={{ width: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                  หมวดวิชาที่ {thaiNumber(2)}
                </div>
              </TableCell>
            )}
            {course_3[0] === null ? (
              <></>
            ) : (
              <TableCell align="center" sx={{ width: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                  หมวดวิชาที่ {thaiNumber(3)}
                </div>
              </TableCell>
            )}
            {course_4[0] === null ? (
              <></>
            ) : (
              <TableCell align="center" sx={{ width: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                  หมวดวิชาที่ {thaiNumber(4)}
                </div>
              </TableCell>
            )}
            {course_5[0] === null ? (
              <></>
            ) : (
              <TableCell align="center" sx={{ width: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                  หมวดวิชาที่ {thaiNumber(5)}
                </div>
              </TableCell>
            )}
            {course_6[0] === null ? (
              <></>
            ) : (
              <TableCell align="center" sx={{ width: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                  หมวดวิชาที่ {thaiNumber(6)}
                </div>
              </TableCell>
            )}
            {course_7[0] === null ? (
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
                คะแนนรวม {thaiNumber(400)} คะแนน
              </div>
            </TableCell>
            <TableCell align="center" sx={{ width: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                คะแนนร้อยละ
              </div>
            </TableCell>
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
          // {merged2.map((e, i) => {
            return (
              <TableRow key={i}>
                <TableCell align="center">
                  <div style={{ fontSize: 12 }}>
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
                <TableCell align="center">
                  <div style={{ fontSize: 12 }}>
                    {thaiNumber(((e.sumattendhrs / e.period) * 100).toFixed(0))}
                  </div>
                </TableCell>
                {e.course_1 === null ? (
                  <></>
                ) : (
                  <TableCell align="center">
                    <div style={{ fontSize: 12 }}>{thaiNumber(e.course_1)}</div>
                  </TableCell>
                )}
                {e.course_2 === null ? (
                  <></>
                ) : (
                  <TableCell align="center">
                    <div style={{ fontSize: 12 }}>{thaiNumber(e.course_2)}</div>
                  </TableCell>
                )}
                {e.course_3 === null ? (
                  <></>
                ) : (
                  <TableCell align="center">
                    <div style={{ fontSize: 12 }}>{thaiNumber(e.course_3)}</div>
                  </TableCell>
                )}
                {e.course_4 === null ? (
                  <></>
                ) : (
                  <TableCell align="center">
                    <div style={{ fontSize: 12 }}>{thaiNumber(e.course_4)}</div>
                  </TableCell>
                )}
                {e.course_5 === null ? (
                  <></>
                ) : (
                  <TableCell align="center">
                    <div style={{ fontSize: 12 }}>{thaiNumber(e.course_5)}</div>
                    {/* <div style={{ fontSize: 12 }}>{thaiNumber(String(e.course_6))}</div> */}
                  </TableCell>
                )}
                {e.course_6 === null ? (
                  <></>
                ) : (
                  <TableCell align="center">
                    <div style={{ fontSize: 12 }}>{thaiNumber(e.course_6)}</div>
                  </TableCell>
                )}
                {e.course_7 === null ? (
                  <></>
                ) : (
                  <TableCell align="center">
                    <div style={{ fontSize: 12 }}>{thaiNumber(e.course_7)}</div>
                  </TableCell>
                )}
                <TableCell align="center">
                  <div style={{ fontSize: 12 }}>
                    {isNaN(total(e.course_1, e.course_2, e.course_3, e.course_4, e.course_5, e.course_6, e.course_7))? '-': thaiNumber(total(e.course_1, e.course_2, e.course_3, e.course_4, e.course_5, e.course_6, e.course_7))}
                  </div>
                </TableCell>
                <TableCell align='center'>
                    <div style={{ fontSize: 12 }}>
                        { 
                        isNaN(calPercent(total(e.course_1, e.course_2, e.course_3, e.course_4, e.course_5, e.course_6, e.course_7))) ? '-': thaiNumber(calPercent(total(e.course_1, e.course_2, e.course_3, e.course_4, e.course_5, e.course_6, e.course_7)))
                        }
                    </div>
                </TableCell>
                <TableCell align='center'>
                    <div style={{ fontSize: 12 }}>
                    {calPercent(total(e.course_1, e.course_2, e.course_3, e.course_4, e.course_5, e.course_6, e.course_7)) >= 60 || e.Grade === "P"? (
                          <>
                            <h6>
                              <small>ผ่าน (ก)</small>
                            </h6>
                          </>
                        ) : (
                          <div className="text-danger">
                            <h6>
                              <small>ไม่ผ่าน (ก)</small>
                            </h6>
                          </div>
                        )}
                    </div>
                </TableCell>
                <TableCell align="center">
                  {thaiNumber(String(e.ordnr))}
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

const ToPrintPageStudyResultsOne = (props) => {
  const { dataToPrint } = props
  // console.log("data: ", dataToPrint)
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

export default ToPrintPageStudyResultsOne

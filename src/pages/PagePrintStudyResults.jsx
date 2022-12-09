/* eslint-disable react-hooks/exhaustive-deps */
/* eslint eqeqeq: 0 */
import React, { useEffect, useRef } from 'react'
import Button from '@mui/material/Button'
import { Print } from '@material-ui/icons'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Link, useLocation } from 'react-router-dom'

import { estiGrade,thaiNumber } from '../components/functions/education'
import { useReactToPrint } from 'react-to-print'
import Axios from 'axios'
import moment from 'moment'

export default function PagePrintStudyResults() {
  const AccessRights = localStorage.getItem('AccessRights')
  const CourseName = localStorage.getItem('CourseName')
  const Academy = localStorage.getItem('Academy')
  const courId = AccessRights.substring(11, 14)
  // const id = localStorage.getItem('AccessRights').substring(0, 10)
  const Access = localStorage.getItem('Access')
  const location = useLocation()
  const data =
    location.state.data !== undefined
      ? location.state.data[0]
      : location.state.data
  // const {
  //   coursegrp,
  //   seminar,
  //   businessleave,
  //   sickleave,
  //   percentattendhrs,
  //   period,
  //   PersId,
  //   AccessRightsId,
  //   Cutstring,
  //   CourseGrp,
  //   ordnr,
  //   imgInstrId,
  //   imgpath,
  //   dateattechfile,
  // } = location.state

  const coursegrp =
    undefined !== location.state.coursegrp
      ? location.state.coursegrp
      : data.coursegrp
  const seminar =
    undefined !== location.state.seminar ? location.state.seminar : data.seminar
  const businessleave =
    undefined !== location.state.businessleave
      ? location.state.businessleave
      : data.businessleave
  const sickleave =
    undefined !== location.state.sickleave
      ? location.state.sickleave
      : data.sickleave
  const PersId =
    undefined !== location.state.PersId ? location.state.PersId : data.persid
  const AccessRightsId = undefined !== location.state.AccessRightsId 
      ? location.state.AccessRightsId 
      : data.AccessRightsId
  const percentattendhrs =
    undefined !== location.state.percentattendhrs
      ? location.state.percentattendhrs
      : data.percentattendhrs
  const period =
    undefined !== location.state.period ? location.state.period : data.period
  const ordnr =
    undefined !== location.state.ordnr ? location.state.ordnr : data.ordnr
  const imgpath =
    undefined !== location.state.imgpath ? location.state.imgpath : data.imgpath
  const imgInstrId =
    undefined !== location.state.imgInstrId
      ? location.state.imgInstrId
      : data.imgInstrId
  // const chkattackfile =
  //   undefined !== location.state.chkattackfile
  //     ? location.state.chkattackfile
  //     : data.chkattackfile
  const dateattechfile =
    undefined !== location.state.dateattechfile
      ? location.state.dateattechfile
      : data.dateattechfile

  // console.log("data local :", location.state);
  // console.log("data :", data);

  const [StudentId, setStudentId] = React.useState('')
  const [Rank, setRank] = React.useState('')
  const [PersFname, setPersFname] = React.useState('')
  const [PersLname, setPersLname] = React.useState('')
  const [PersDutyNum, setPersDutyNum] = React.useState('')
  const [PersCorps, setPersCorps] = React.useState('')
  const [PersGrp, setPersGrp] = React.useState('')
  const [PersCurrPosition, setPersCurrPosition] = React.useState('')
  const [PersAffiliation, setPersAffiliation] = React.useState('')
  const [Course, setCourse] = React.useState('')
  const [CourseYear, setCourseYear] = React.useState('')
  const [CourseBegin, setCourseBegin] = React.useState('')
  const [CourseEnd, setCourseEnd] = React.useState('')
  const [chkAttFile1, setchkAttFile1] = React.useState('')

  const [subjects, setSubjects] = React.useState([])
  const [comment, setComment] = React.useState('')
  const [number, setNumber] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [dataDir, setDataDir] = React.useState([])
  // const [signatureImg, setSignatureImg] = React.useState('')

  const [E01, setE01] = React.useState(0)
  const [E02, setE02] = React.useState(0)
  const [E03, setE03] = React.useState(0)
  const [E04, setE04] = React.useState(0)
  const [E05, setE05] = React.useState(0)
  const [E06, setE06] = React.useState(0)
  const [E07, setE07] = React.useState(0)
  const [E08, setE08] = React.useState(0)
  const [E09, setE09] = React.useState(0)
  const [E10, setE10] = React.useState(0)

  const auth = localStorage.getItem('Access')
  // console.log(PersFname)

  //แปลงวันที่เป็น format ภาษาไทย
  const dateThai = (strDate) => {
    if (strDate == null) return ''
    var date = new Date(strDate)
    var thmonth = 'ม.ค. ก.พ. มี.ค. เม.ย. พ.ค. มิ.ย. ก.ค. ส.ค. ก.ย. ต.ค. พ.ย. ธ.ค.'.split(
      ' ',
    )[date.getMonth()]
    return date.getDate() + ' ' + thmonth + (date.getFullYear() + 543)
  }

  const dateThaiSignature = (strDate) => {
    if (strDate == null) return ''
    var date = new Date(strDate)
    var thmonth = 'ม.ค. ก.พ. มี.ค. เม.ย. พ.ค. มิ.ย. ก.ค. ส.ค. ก.ย. ต.ค. พ.ย. ธ.ค.'.split(
      ' ',
    )[date.getMonth()]
    const year = String(date.getFullYear() + 543)
    return date.getDate() + ' ' + thmonth + year.slice(-2)
  }
  const dateBegin = dateThai(CourseBegin)
  const dateEnd = dateThai(CourseEnd)
  const dateAttachFile = dateThaiSignature(dateattechfile)

  const weeks = moment(CourseEnd).diff(moment(CourseBegin), 'weeks')

  useEffect(() => {
    setLoading(true)
    loadStudent()
    loadSubject()
    loadComment()
    loadstudentNum()
    loadpersattrScore()
    loadDirctor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   Axios.get(process.env.REACT_APP_API + `/CourseTotalHrs/${courId}`).then((res) => {
  //     setTotalHrs(Object.assign({}, ...res.data));
  //   })
  // }, []);

  useEffect(() => {
    chkSendScoreE()
    // chkButton()
  },[coursegrp])

  const loadSubject = async () => {
    Axios.get(process.env.REACT_APP_API + `/subjects/${courId}/${PersId}`)
      .then((res) => {
        setLoading(false)
        setSubjects(res.data)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }
  const loadStudent = async () => {
    Axios.get(process.env.REACT_APP_API + `/report/${AccessRightsId}`)
      .then((res) => {
        setLoading(false)
        setStudentId(res.data[0].StudentId)
        setRank(res.data[0].Rank)
        setPersFname(res.data[0].PersFname)
        setPersLname(res.data[0].PersLname)
        setPersDutyNum(res.data[0].PersDutyNum)
        setPersCorps(res.data[0].PersCorps)
        setPersGrp(res.data[0].PersGrp)
        setPersCurrPosition(res.data[0].PersCurrPosition)
        setPersAffiliation(res.data[0].PersAffiliation)
        setCourse(res.data[0].CourseGrp)
        setCourseYear(res.data[0].CourseYear)
        setCourseBegin(res.data[0].CourseBegin)
        setCourseEnd(res.data[0].CourseEnd)
        // console.log(res.data[0])
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }
  const loadComment = async () => {
    Axios.get(process.env.REACT_APP_API + `/commentbyid/${PersId}/${courId}`)
      .then((res) => {
        setLoading(false)
        setComment(res.data[0].CommentDetails)
      })
      .catch((err) => {
        setLoading(false)
        // console.log(err)
      })
  }

  const loadstudentNum = async () => {
    Axios.get(process.env.REACT_APP_API + `/number/${courId}/${coursegrp}`)
      .then((res) => {
        setLoading(false)
        setNumber(res.data[0].theCount)
        // console.log(res.data);
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  const loadpersattrScore = async () => {
    Axios.get(process.env.REACT_APP_API + `/persattrScore/${PersId}/${courId}`)
      .then((res) => {
        setLoading(false)
        setE01(res.data[0].PerAttrScore)
        setE02(res.data[1].PerAttrScore)
        setE03(res.data[2].PerAttrScore)
        setE04(res.data[3].PerAttrScore)
        setE05(res.data[4].PerAttrScore)
        setE06(res.data[5].PerAttrScore)
        setE07(res.data[6].PerAttrScore)
        setE08(res.data[7].PerAttrScore)
        setE09(res.data[8].PerAttrScore)
        setE10(res.data[9].PerAttrScore)
        // console.log(res.data);
      })
      .catch((err) => {
        setLoading(false)
        // console.log(err)
      })
  }

  const loadDirctor = async () => {
    Axios.get(process.env.REACT_APP_API + `/pageprintDir/${courId}/${imgInstrId}`)
      .then((res) => {
        setLoading(false)
        setDataDir(res.data[0])
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  const chkSendScoreE = async () => {
    // const class = selectedClass2 === '' ? selectedClass2
    Axios.get(process.env.REACT_APP_API + `/chkSendScore/${AccessRights}/${coursegrp}`)
      .then((res) => {
        setchkAttFile1(res.data[0]);
        // console.log("chkSendScoreE: ",res.data[0]);
      })
      .catch((err) => console.log(err))
  }

  //เช็คกดส่งคะแนน
  const sendchkScore = chkAttFile1 === undefined ? '0' :chkAttFile1.Chkattackfile

  const marginTop = '0cm'
  const marginRight = '0.5cm'
  const marginBottom = '0cm'
  const marginLeft = '0.5cm'

  const getPageMargin = () => {
    return `
        @page {
            size: A3 portrait;
            margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important;
            height: initial !important;
            overflow: initial !important;
        }
    `
  }

  //print PDF
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: getPageMargin(),
  })

  const showGPA = (grade) => {
    if (courId !== '041') {
      switch (grade) {
        case 'A':
          return 4.0
        case 'B+':
          return 3.5
        case 'B':
          return 3.0
        case 'C+':
          return 2.5
        case 'C':
          return 2.0
        case 'D+':
          return 1.5
        case 'D':
          return 1.0
        default:
          return 0
      }
    } else {
      switch (grade) {
        case 'A':
          return 4.0
        case 'A-':
          return 3.75
        case 'B+':
          return 3.5
        case 'B-':
          return 2.75
        case 'B':
          return 3.0
        case 'C+':
          return 2.5
        case 'C':
          return 2.0
        case 'C-':
          return 1.75
        case 'D+':
          return 1.5
        case 'D':
          return 1.0
        default:
          return 0
      }
    }
  }

  const estiResult = (grade) => {
    if (courId !== '041') {
      switch (grade) {
        case 'A':
          return 'ดีมาก'
        case 'B+':
          return 'ค่อนข้างดีมาก'
        case 'B':
          return 'ดี'
        case 'C+':
          return 'ค่อนข้างดี'
        case 'C':
          return 'พอใช้'
        case 'D+':
          return 'ค่อนข้างพอใช้'
        case 'D':
          return 'ควรปรับปรุง'
        case 'P':
          return 'ผ่าน'
        case 'U':
          return 'ไม่ผ่าน'
        default:
          return 'ไม่ผ่านเกณฑ์'
      }
    } else {
      switch (grade) {
        case 'A':
          return 'ดีมาก'
        case 'A-':
          return 'ค่อนข้างดีมาก'
        case 'B+':
          return 'ดีปานกลาง'
        case 'B':
          return 'ดี'
        case 'B-':
          return 'ค่อนข้างดี'
        case 'C+':
          return 'ปานกลาง'
        case 'C':
          return 'พอใช้'
        case 'C-':
          return 'ค่อนข้างพอใช้'
        case 'D+':
          return 'ควรปรับปรุง'
        case 'D':
          return 'ผ่านเกณฑ์'
        case 'P':
          return 'ผ่าน'
        case 'U':
          return 'ไม่ผ่าน'
        default:
          return 'ไม่ผ่านเกณฑ์'
      }
    }
  }

  const sumGPA = (subjects) => {
    let sum = 0
    for (let i = 0; i < subjects.length; i++) {
      sum += showGPA(subjects[i].Grade)
    }
    return sum
  }

  // const Grade = (Grade) => {
  //   if (Grade === 'P') return 'ผ่าน' //ผ่าน
  //   if (Grade === 'F') return 'ไม่ผ่านเกณฑ์' //ไม่ผ่านเกณฑ์
  //   if (Grade === 'U') return 'ไม่ผ่าน (พ้นสภาพ)' //ไม่ผ่าน (พ้นสภาพ)
  //   return Grade
  // }

  //ค่าระดับคะแนนรวมหารจำนวนหมวดวิชา
  const sumGPA2 = sumGPA(subjects) / subjects.length
  const GPA = Math.floor(sumGPA2 * 100) / 100
  // console.log("GPA", GPA.toFixed(2))

  //ผลรวมคุณลักษณะส่วนบุคคล
  const sum = E01 + E02 + E03 + E04 + E05 + E06 + E07 + E08 + E09 + E10
  const sumattrScore = Math.floor(sum * 10) / 10 / 10
  return (
    <React.Fragment>
      <div className="cotainerDetail">
        {loading ? (
          <p className="HeadTextMain">
            Loading... <CircularProgress size={20} />{' '}
          </p>
        ) : (
          <p className="HeadTextMain">รายงานการศึกษา</p>
        )}
        <div className="containerBtnResults">
          <div className="BtnResults">
            {' '}
            <Link
              to="#"
              state={{
                coursegrp: coursegrp,
                seminar: seminar,
                businessleave: businessleave,
                sickleave: sickleave,
                percentattendhrs: percentattendhrs,
                period: period,
                PersId: PersId,
                AccessRightsId: AccessRightsId,
                // Cutstring: Cutstring,
                CourseGrp: coursegrp,
                ordnr: ordnr,
                imgInstrId: imgInstrId,
                imgpath: imgpath,
                chkattackfile: chkAttFile1 === undefined ? '0' :chkAttFile1.Chkattackfile,
                dateattechfile: dateattechfile,
              }}
            >
              <Button
                variant="outlined"
                startIcon={<Print />}
                sx={{ minWidth: 100, m: 1 }}
                onClick={handlePrint}
              >
                พิมพ์
              </Button>
            </Link>
          </div>
          {/* <div className="BtnResults">
            <Link
              to={`/PagePrintStudyResults`}
              state={{
                coursegrp: coursegrp,
                seminar: seminar,
                businessleave: businessleave,
                sickleave: sickleave,
                percentattendhrs: percentattendhrs,
                period: period,
                PersId: PersId,
                Cutstring: Cutstring,
                CourseGrp: CourseGrp,
                ordnr: ordnr,
                imgInstrId: imgInstrId,
                imgpath: imgpath,
                chkattackfile: chkAttFile1 === undefined ? '0' :chkAttFile1.Chkattackfile,
                dateattechfile: dateattechfile,
              }}
            >
              {location.pathname === '/PagePrintStudyResults' ? (
                <Button variant="contained" sx={{ minWidth: 100, m: 1 }}>
                  แสดงผลแบบเกรด
                </Button>
              ) : (
                <Button variant="outlined" sx={{ minWidth: 100, m: 1 }}>
                  แสดงผลแบบเกรด
                </Button>
              )}
            </Link>
          </div>
          <div className="BtnResults">
            {' '}
            <Link
              to={`/PagePrintStudyResultsOne`}
              state={{
                coursegrp: coursegrp,
                seminar: seminar,
                businessleave: businessleave,
                sickleave: sickleave,
                percentattendhrs: percentattendhrs,
                period: period,
                PersId: PersId,
                Cutstring: Cutstring,
                CourseGrp: CourseGrp,
                ordnr: ordnr,
                imgInstrId: imgInstrId,
                imgpath: imgpath,
                chkattackfile: chkAttFile1 === undefined ? '0' :chkAttFile1.Chkattackfile,
                dateattechfile: dateattechfile,
              }}
            >
              <Button variant="outlined" sx={{ minWidth: 100, m: 1 }}>
                แสดงผลแบบร้อยละ
              </Button>
            </Link>
          </div> */}
        </div>
        <Container>
          <div ref={componentRef} className="print-source">
            {/* TAble 1 */}
            <div className="ContainerTabless2">
              <p className="HeadTextPrint">{Academy} กรมยุทธศึกษาทหารอากาศ</p>
              <p className="HeadTextPrint">รายงานผลการศึกษารายบุคคล</p>
              <p className="HeadTextPrint">
                หลักสูตร {CourseName} รุ่น {thaiNumber(Course)} ประจำปีงบประมาณ {thaiNumber(CourseYear)}
              </p>
              <p>ตอนที่ {thaiNumber(1)} ประวัติทั่วไป</p>
              <table className="table table-bordered border-dark">
                <tbody>
                  <tr>
                    <th rowSpan="4">
                      <p>
                        ยศ-ชื่อ-สกุล <br /> {Rank} {PersFname} {PersLname}{' '}
                      </p>
                    </th>
                    <th colSpan="4">
                      <p>เลขประจำตัว นทน. {thaiNumber(StudentId)}</p>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <p>เหล่าทหาร {PersCorps}</p>
                    </td>
                    <td colSpan="4">
                      <p>จำพวกทหาร {PersGrp}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>ลชทอ. {thaiNumber(PersDutyNum)}</p>
                    </td>
                    <td colSpan="4">
                      <p>ตำแหน่ง {PersCurrPosition}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4">
                      <p>สังกัด {PersAffiliation}</p>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <th rowSpan="4">
                      <p>
                        ระยะเวลาการศึกษา
                        <br />
                        {loading ? (
                          <CircularProgress size={20} />
                        ) : (
                          <p>
                            {thaiNumber(weeks)} สัปดาห์ ตั้งแต่ {thaiNumber(dateBegin)} - {thaiNumber(dateEnd)}
                          </p>
                        )}
                      </p>
                    </th>
                    <th colSpan="4">
                      <p>ชั่วโมงการศึกษา</p>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <p className="text-center">ตามหลักสูตร</p>
                    </td>
                    <td>
                      <p className="text-center">ลากิจ</p>
                    </td>
                    <td>
                      <p className="text-center">ลาป่วย</p>
                    </td>
                    <td>
                      <p className="text-center">เวลาศึกษาคิดเป็นร้อยละ</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="text-center">{thaiNumber(period)}</p>
                    </td>
                    <td>
                      <p className="text-center">
                        {businessleave ? thaiNumber(businessleave) : '-'}
                      </p>
                    </td>
                    <td>
                      <p className="text-center">
                        {sickleave ? thaiNumber(sickleave) : '-'}
                      </p>
                    </td>
                    <td>
                      <p className="text-center">{thaiNumber(percentattendhrs)}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* TAble 2 */}
              <p>ตอนที่ {thaiNumber(2)} ผลประเมินความรู้ความสามารถ</p>
              <table className="table table-bordered border-dark">
                <thead>
                  <tr>
                    <th className="text-center" scope="col">
                      ชื่อหมวดวิชา
                    </th>
                    <th className="text-center" scope="col">
                      น.น.คะแนน/หน่วยกิต
                    </th>
                    <th className="text-center" scope="col">
                      ระดับคะแนนที่ได้
                    </th>
                    <th className="text-center" scope="col">
                      ค่าระดับคะแนน
                    </th>
                    <th className="text-center" scope="col">
                      ผลการประเมิน
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isNaN(subjects) ? (
                    subjects.map((sub, index) => (
                      <tr key={index}>
                        <th>
                          หมวดวิชา {thaiNumber(sub.SubjectNr)} {sub.SubjectName}
                        </th>
                        <td className="text-center">
                          {
                            sub.Grade === "P" || sub.Grade === "F" || sub.Grade === "U" ? '-' :
                          sub.SubjectCreditOrScore === ''
                            ? '-'
                            : thaiNumber(sub.SubjectCreditOrScore)
                          }
                        </td>
                        <td className="text-center">{sub.Grade}</td>
                        <td className="text-center">
                          {showGPA(sub.Grade).toFixed(2) == 0.0
                            ? '-'
                            : thaiNumber(showGPA(sub.Grade).toFixed(2))}
                        </td>
                        <td className="text-center">{estiResult(sub.Grade)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">
                        <p className="text-center">ไม่มีคะแนน</p>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td colSpan="3">
                      <p>เฉลี่ยตลอดหลักสูตร</p>
                    </td>
                    <td className="text-center">
                      {GPA.toFixed(2) == 0.0 ? '-' : thaiNumber(GPA.toFixed(2))}
                    </td>
                    <td className="text-center">
                      {isNaN(subjects) ? estiGrade(sumGPA2,subjects[0].Grade) : '-'}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="ContainerTableStudy">
                {/* TAble 3 */}
                <div className="ContainerTable1">
                  <p>ตอนที่ {thaiNumber(3)} ผลการประเมินค่าคุณลักษณะส่วนบุคคล</p>
                  <table className="table table-bordered border-dark">
                    <thead>
                      <tr>
                        <th scope="col">คุณลักษณะส่วนบุคคล</th>
                        <th scope="col">คะแนนเต็ม</th>
                        <th scope="col">คะแนนที่ได้</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>ด้านที่ {thaiNumber(1)} ความวิริยะอุตสาหะ</th>
                        <td className="text-center">{thaiNumber(4)}</td>
                        <td className="text-center">
                          {E01 ? thaiNumber(E01.toFixed(2)) : '-'}
                        </td>
                      </tr>
                      <tr>
                        <th>ด้านที่ {thaiNumber(2)} วินัย</th>
                        <td className="text-center">{thaiNumber(4)}</td>
                        <td className="text-center">
                          {E02 ? thaiNumber(E02.toFixed(2)) : '-'}
                        </td>
                      </tr>
                      <tr>
                        <th>ด้านที่ {thaiNumber(3)} ความประพฤติ</th>
                        <td className="text-center">{thaiNumber(4)}</td>
                        <td className="text-center">
                          {E03 ? thaiNumber(E03.toFixed(2)) : '-'}
                        </td>
                      </tr>
                      <tr>
                        <th>ด้านที่ {thaiNumber(4)} บุคลิกลักษณะ</th>
                        <td className="text-center">{thaiNumber(4)}</td>
                        <td className="text-center">
                          {E04 ? thaiNumber(E04.toFixed(2)) : '-'}
                        </td>
                      </tr>
                      <tr>
                        <th>ด้านที่ {thaiNumber(5)} นิสัยและอุปนิสัย</th>
                        <td className="text-center">{thaiNumber(4)}</td>
                        <td className="text-center">
                          {E05 ? thaiNumber(E05.toFixed(2)) : '-'}
                        </td>
                      </tr>
                      <tr>
                        <th>ด้านที่ {thaiNumber(6)} การสังคม</th>
                        <td className="text-center">{thaiNumber(4)}</td>
                        <td className="text-center">
                          {E06 ? thaiNumber(E06.toFixed(2)) : '-'}
                        </td>
                      </tr>
                      <tr>
                        <th>ด้านที่ {thaiNumber(7)} ความเป็นผู้นำ</th>
                        <td className="text-center">{thaiNumber(4)}</td>
                        <td className="text-center">
                          {E07 ? thaiNumber(E07.toFixed(2)) : '-'}
                        </td>
                      </tr>
                      <tr>
                        <th>ด้านที่ {thaiNumber(8)} เชาว์ริเริ่ม</th>
                        <td className="text-center">{thaiNumber(4)}</td>
                        <td className="text-center">
                          {E08 ? thaiNumber(E08.toFixed(2)) : '-'}
                        </td>
                      </tr>
                      <tr>
                        <th>ด้านที่ {thaiNumber(9)} การปฏิบัติงาน</th>
                        <td className="text-center">{thaiNumber(4)}</td>
                        <td className="text-center">
                          {E09 ? thaiNumber(E09.toFixed(2)) : '-'}
                        </td>
                      </tr>
                      <tr>
                        <th>ด้านที่ {thaiNumber(10)} ดุลยพินิจ</th>
                        <td className="text-center">{thaiNumber(4)}</td>
                        <td className="text-center">
                          {E10 ? thaiNumber(E10.toFixed(2)) : '-'}
                        </td>
                      </tr>
                      <tr>
                        <th colSpan="2">เฉลี่ยตลอดหลักสูตร</th>
                        <td className="text-center">
                          {sumattrScore ? thaiNumber(sumattrScore.toFixed(2)) : '-'}
                        </td>
                      </tr>
                      <tr>
                        <th colSpan="2">ผลการประเมิน</th>
                        <td className="text-center">
                          {sumattrScore ? estiGrade(sumattrScore) : '-'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="ContainerTable1">
                  <p>
                    ตอนที่ {thaiNumber(4)} ผลการศึกษา
                    {GPA.toFixed(2) <= 2.0 && subjects[0].Grade != 'P'
                      ? ' ไม่สำเร็จการศึกษา'
                      : ' สำเร็จการศึกษา'}
                  </p>
                  <div className="ContainerCommentStu">
                    <p>สอบได้ลำดับที่ {thaiNumber(ordnr)} ประเภท ก</p>
                    <p>จำนวนผู้เข้ารับการศึกษา {thaiNumber(number)} คน</p>
                  </div>
                  <p>ตอนที่ {thaiNumber(5)} ความคิดเห็นผู้บังคับบัญชา</p>

                  <TextField
                    id="outlined-multiline-static"
                    label="ความคิดเห็นของผู้บังคับบัญชา"
                    value={comment}
                    multiline
                    rows={4}
                    sx={{ width: '100%' }}
                  />

                   {sendchkScore === '0' ? ('') 
                   // : chkattackfile === undefined  ?('') 
                   : dateattechfile === '-' ? ('') 
                   : Access === 'วัดผล' || Access === 'ผอ.' || Access === 'วัดผลส่วนกลาง' ? (
                    <Box sx={{ marginTop: '20px' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body1"
                            gutterBottom
                            sx={{
                              fontFamily: 'THSarabunNew',
                            }}
                          >
                            {dataDir.Rank}
                          </Typography>
                        </Box>
                        <Box>
                          {imgpath === '' ? (
                            ''
                          ) : (
                            <img
                              className="signature"
                              src={process.env.REACT_APP_IMG_SIGN + `/${imgpath}`}
                              alt="img"
                            />
                          )}
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{
                            fontFamily: 'THSarabunNew',
                          }}
                        >
                          {
                            loading ? (
                              <CircularProgress size={20} />
                            ) : (
                          '(' +
                            dataDir.PersFname +
                            ' ' +
                            dataDir.PersLname +
                            ')')}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{
                            fontFamily: 'THSarabunNew',
                          }}
                        >
                          {
                            loading ? (
                              <CircularProgress size={20} />
                            ) : (
                          dataDir.PersCurrPosition +
                            ' ' +
                            dataDir.PersAffiliation)}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{
                            fontFamily: 'THSarabunNew',
                          }}
                        >
                          {thaiNumber(dateAttachFile)}
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            <div className="pagebreak">
              <div
                className="ContainerTabless2"
                style={{
                  pageBreakAfter: true,
                }}
              >
                <p className="TextTabless2">เกณฑ์</p>
                <div className="ContainerTableS2">
                  <div className="ContainerTable2">
                    <p>เกณฑ์การประเมินความรู้ความสามารถ (การประเมินแบบเกรด)</p>
                    <table className="table table-bordered border-dark">
                      <thead>
                        <tr>
                          <th scope="col">คะแนนรวมร้อยละ</th>
                          <th scope="col">เกณฑ์ความรู้ความสามารถ</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>๓.๕๐ - ๔.๐๐</th>
                          <td>ดีมาก</td>
                        </tr>
                        <tr>
                          <th>๓.๐๐ - ๓.๔๙</th>
                          <td>ดี</td>
                        </tr>
                        <tr>
                          <th>๒.๕๐ - ๒.๙๙</th>
                          <td>ปานกลาง</td>
                        </tr>
                        <tr>
                          <th>๒.๐๐ - ๒.๔๙</th>
                          <td>พอใช้</td>
                        </tr>
                        <tr>
                          <th>ต่ำกว่า ๒.๐๐</th>
                          <td>ไม่ผ่านเกณฑ์</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="ContainerTable2">
                    <p>เกณฑ์การประเมินค่าคุณลักษณะส่วนบุคคล</p>
                    <table className="table table-bordered border-dark">
                      <thead>
                        <tr>
                          <th scope="col">คะแนนรวมร้อยละ</th>
                          <th scope="col">เกณฑ์ความรู้ความสามารถ</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>๓.๕๐ - ๔.๐๐</th>
                          <td>ดีมาก</td>
                        </tr>
                        <tr>
                          <th>๓.๐๐ - ๓.๔๙</th>
                          <td>ดี</td>
                        </tr>
                        <tr>
                          <th>๒.๕๐ - ๒.๙๙</th>
                          <td>ปานกลาง</td>
                        </tr>
                        <tr>
                          <th>๒.๐๐ - ๒.๔๙</th>
                          <td>พอใช้</td>
                        </tr>
                        <tr>
                          <th>ต่ำกว่า ๒.๐๐</th>
                          <td>ไม่ผ่านเกณฑ์</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {auth === 'นทน.' ? (
            <div className="containerBtnStudyResults">
              <Link to="/PageHistory">
                <Button variant="outlined" sx={{ minWidth: 300, m: 1 }}>
                  ย้อนกลับ
                </Button>
              </Link>
            </div>
          ) : (
            <div className="containerBtnStudyResults">
              <Link
                to="/PageStudyResults"
                state={{
                  coursegrp: coursegrp,
                  seminar: seminar,
                  courseNum: subjects.length,
                }}
              >
                <Button variant="outlined" sx={{ minWidth: 300, m: 1 }}>
                  ย้อนกลับ
                </Button>
              </Link>
            </div>
          )}
        </Container>
        {/* <a href="/PageStudyResults"><Button variant="outlined" sx={{minWidth: 300, m:1  }}>ย้อนกลับ</Button></a> */}
      </div>
    </React.Fragment>
  )
}

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TableStudyResultsOne from '../components/TableStudyResultsOne'
import TableStudyResultsTwo from '../components/TableStudyResultsTwo'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import Axios from 'axios'

import ToPrintPageStudyResultsOne from '../components/ToPrintPageStudyResultsOne'
import ToPrintPageStudyResultsTwo from '../components/ToPrintPageStudyResultsTwo'

export default function PageStudyResults() {
  // const classToselected = useSelector(state => state.class)
  const courId = localStorage.getItem('AccessRights').substring(11, 14)
  const id = localStorage.getItem('AccessRights')
  const Access = localStorage.getItem('Access')
  const location = useLocation()

  const [classNo, setClassno] = useState([])
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedClass1, setSelectedClass1] = useState('')
  // const [selectedClass2, setSelectedClass2] = useState('')
  const [selectedSeminar, setSelectedSeminar] = useState('')
  const [isSubmit, setIssubmit] = useState(false)
  // const [numSubject, setNumSubject] = useState([])
  const [chkAttFile, setchkAttFile] = useState([])
  let [chkSendScore, setchkSendScore] = useState([])
  const [courseNum, setcourseNum] = useState('')
  // const [isSend, setIssend] = useState(true)

  // eslint-disable-next-line no-unused-vars
  // const [selected, setSelected] = useState([]);

  useEffect(() => {
    loadSubject2()
    loadClass()
    chkAttachFile()
    // chkSendScoreE()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chkSendScore, selectedClass1])

  useEffect(() => {
    chkSendScoreE()
    // chkButton()
  },[selectedClass1, chkAttFile])

  const loadClass = () => {
    Axios.get(process.env.REACT_APP_API + `/education/${courId}`)
      .then((res) => {
        setClassno(res.data)
        //  console.log(res.data);
      })
      .catch((err) => {
        console.log(err)
      })

    if (location.state !== null) {
      const { coursegrp, seminar, courseNum } = location.state
      setSelectedClass(coursegrp)
      setSelectedSeminar(seminar)
      setcourseNum(courseNum)
      setIssubmit(true)
    }
  }

  const loadSubject2 = async () => {
    Axios.get(process.env.REACT_APP_API + `/subjects2/${courId}`)
      .then((res) => {
        // setNumSubject(res.data)
        setcourseNum(res.data.length)
        //  console.log("courId: ",res.data);
      })
      .catch((err) => console.log(err))
  }

  const chkAttachFile = async () => {
    Axios.get(process.env.REACT_APP_API + `/chkAttachFile/${id}`)
      .then((res) => {
        setchkAttFile(res.data[0]);
        // console.log("AttFile: ",res.data[0]);
      })
      .catch((err) => console.log(err))
  }

  const chkSendScoreE = async () => {
    // const class = selectedClass2 === '' ? selectedClass2
    Axios.get(process.env.REACT_APP_API + `/chkSendScore/${id}/${selectedClass1}`)
      .then((res) => {
        setchkSendScore(res.data[0]);
        // console.log("chkSendScoreE: ",res.data[0]);
      })
      .catch((err) => console.log(''))
  }

  // console.log("chkSendScore: ",chkSendScore);
  // console.log("Chksendscore1: ",chkSendScore.Chksendscore);
  // console.log("chkAttFile: ",chkAttFile);

  const handleChangeClass = (event) => {
    setSelectedClass(event.target.value)
    setIssubmit(false)
  }

  const handleChangeClass1 = (event) => {
    setSelectedClass1(event.target.value)
    setIssubmit(false)
  }

  // const handleChangeClass2 = (event) => {
  //   setSelectedClass2(event.target.value)
  //   setIssubmit(false)
  // }

  const handleChangeSeminar = (event) => {
    setSelectedSeminar(event.target.value)
    setIssubmit(false)
  }

  const onCilckSelect = (classNo, seminarNo) => {
    if (classNo === '' || seminarNo === '') {
      toast.error('กรุณาเลือกรุ่นและสัมมนา')
      setIssubmit(false)
    } else {
      setIssubmit(true)
    }
    return isSubmit
  }

  const onCilckAttachFile = (e, id) => {
    // e.preventDefault();
   if (selectedClass1 === '') {
    toast.error("กรุณาเลือกรุ่นก่อนแนบลายเซ็น")
    }  else if (chkAttFile === undefined) {
    // }  else if (chkAttFile === undefined||chkSendScore === undefined) {
      toast.error("กรุณา UPLOAD ลายเซ็นอิเล็กทรอนิกส์ก่อนแนบลายเซ็น")
    } else {
        Axios.put(process.env.REACT_APP_API + `/attachFile/${id}/${selectedClass1}`)
        .then((res) => {},
        chkAttachFile(),
        toast.success("ระบบได้ทำการแนบลายเซ็นอิเล็กทรอนิกส์เรียบร้อยแล้ว")) 
    }
  }
  const onCilckSendScore = (e, id) => {
    chkSendScoreE()
    if (selectedClass1 === '') {
      toast.error("กรุณาเลือกรุ่นก่อนส่งคะแนน")
      chkSendScoreE()
    } else if (chkSendScore === undefined) {
      toast.error("กรุณาเข้าสิทธิ์ ผอ. เพื่อแนบลายเซ็นอิเล็กทรอนิกส์ก่อนส่งคะแนน")
    } else {
        Axios.put(process.env.REACT_APP_API + `/sendScore/${id}/${selectedClass1}`)
        .then((res) => {},
        // chkAttachFile(),
        chkSendScoreE(),
        setIssubmit(false),
        toast.success("ระบบได้ทำการส่งคะแนนเรียบร้อยแล้ว")) 
    }
  }

  //เช็คแนบไฟล์ลายเซ็น
  const txtBT = chkSendScore !== undefined ? chkSendScore.Chkattackfile : '0'
  const txtBT1 = txtBT === '1' ? true : false 
  //เช็คส่งคะแนน
  const txtBT2 = chkSendScore !== undefined ? chkSendScore.Chksendscore : '0'
  const txtBT3 = txtBT2 === '1' ? true : false 

  // const courseNum = numSubject.length
  // console.log("courseNum: ",courseNum)

  const selectClass = [...new Set(classNo.map((item) => item.CourseGrp))]

  return (
    <React.Fragment>
      <div className="cotainerDetail">
        <p className="HeadTextMain">รายงานผลการศึกษา</p>
        <div className="DropdownSelectModel">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel htmlFor="grouped-select">รุ่น</InputLabel>
              <Select
                defaultValue=""
                id="grouped-select"
                label="รุ่น"
                onChange={handleChangeClass}
                value={selectedClass}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {selectClass.map((items, index) => (
                  <MenuItem key={index} value={items}>
                    {items}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel htmlFor="grouped-select">สัมมนา</InputLabel>
              <Select
                defaultValue=""
                id="grouped-select"
                label="สัมมนา"
                onChange={handleChangeSeminar}
                value={selectedSeminar}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={0}>ทุกสัมมนา</MenuItem>
                <MenuItem value={1}>สัมมนา1</MenuItem>
                <MenuItem value={2}>สัมมนา2</MenuItem>
                <MenuItem value={3}>สัมมนา3</MenuItem>
                <MenuItem value={4}>สัมมนา4</MenuItem>
                <MenuItem value={5}>สัมมนา5</MenuItem>
                <MenuItem value={6}>สัมมนา6</MenuItem>
                <MenuItem value={7}>สัมมนา7</MenuItem>
                <MenuItem value={8}>สัมมนา8</MenuItem>
                <MenuItem value={9}>สัมมนา9</MenuItem>
                <MenuItem value={10}>สัมมนา10</MenuItem>
                <MenuItem value={11}>สัมมนา11</MenuItem>
                <MenuItem value={12}>สัมมนา12</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={(e) => onCilckSelect(selectedClass, selectedSeminar)}
              variant="contained"
              sx={{
                minWidth: 100,
                minHeight: 55,
                m: 1,
                fontFamily: 'THSarabunNew',
                fontWeight: 'bold',
                fontSize: 16,
              }}
              startIcon={<ManageSearchIcon />}
            >
              ตกลง
            </Button>
          </Box>
        </div>
        {
          courId === '074' || courId === '075' || courId === '082' || courId === '083' ? (
            <Container>
          <ToPrintPageStudyResultsOne
            dataToPrint={{
              courseid: courId,
              coursegrp: selectedClass,
              seminar: selectedSeminar,
              courseNum: courseNum,
              isSubmit: isSubmit,
            }}
          />
          <h3>ผนวก ข (แบบ ร้อยละ)</h3>
          <TableStudyResultsOne
            classNo={selectedClass}
            seminarNo={selectedSeminar}
            isSubmit={isSubmit}
            courseNum={courseNum}
            chkAttFile={chkAttFile}
          />
        </Container>
          ) : (
            <Container>
          <ToPrintPageStudyResultsTwo
            dataToPrint={{
              courseid: courId,
              coursegrp: selectedClass,
              seminar: selectedSeminar,
              courseNum: courseNum,
              isSubmit: isSubmit,
            }}
          />
          <h3>ผนวก ค (แบบ เกรด)</h3>
          <TableStudyResultsTwo
            classNo={selectedClass}
            seminarNo={selectedSeminar}
            isSubmit={isSubmit}
            courseNum={courseNum}
            chkAttFile={chkAttFile}
          />
        </Container>
          )
        }
        {/* <Container>
          <ToPrintPageStudyResultsOne
            dataToPrint={{
              courseid: courId,
              coursegrp: selectedClass,
              seminar: selectedSeminar,
              courseNum: courseNum,
              isSubmit: isSubmit,
            }}
          />
          <h3>ผนวก ข (แบบ ร้อยละ)</h3>
          <TableStudyResultsOne
            classNo={selectedClass}
            seminarNo={selectedSeminar}
            isSubmit={isSubmit}
            courseNum={courseNum}
            chkAttFile={chkAttFile}
          />
        </Container>{' '} */}
        {/* <br />
        <Container>
          <ToPrintPageStudyResultsTwo
            dataToPrint={{
              courseid: courId,
              coursegrp: selectedClass,
              seminar: selectedSeminar,
              courseNum: courseNum,
              isSubmit: isSubmit,
            }}
          />
          <h3>ผนวก ค (แบบ เกรด)</h3>
          <TableStudyResultsTwo
            classNo={selectedClass}
            seminarNo={selectedSeminar}
            isSubmit={isSubmit}
            courseNum={courseNum}
            chkAttFile={chkAttFile}
          />
        </Container> */}
        {Access === 'ผอ.' ? (
          <Box sx={{ margin: '10px' }}>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel htmlFor="grouped-select">รุ่น</InputLabel>
              <Select
                defaultValue=""
                id="grouped-select"
                label="รุ่น"
                onChange={handleChangeClass1}
                value={selectedClass1}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {selectClass.map((items, index) => (
                  <MenuItem key={index} value={items}>
                    {items}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained"
            onClick={(e) => onCilckAttachFile(e,id)}
            disabled={txtBT1}
            >
              <Box>
                {!txtBT1 ?
                  <Box sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                  แนบลายเซ็นอิเล็กทรอนิกส์
                </Box>
                  :
                 <Box sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                  แนบลายเซ็นอิเล็กทรอนิกส์เรียบร้อยแล้ว
                </Box>
                 } 
                <Box>กดเมื่อสิ้นสุดกาารศึกษา</Box>
              </Box>{' '}
            </Button>
          </Box>
        ) : Access === 'วัดผลส่วนกลาง' ? (
          <Box sx={{ margin: '10px' }}>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel htmlFor="grouped-select">รุ่น</InputLabel>
              <Select
                defaultValue=""
                id="grouped-select"
                label="รุ่น"
                onChange={handleChangeClass1}
                value={selectedClass1}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {selectClass.map((items, index) => (
                  <MenuItem key={index} value={items}>
                    {items}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained"
            onClick={(e) => onCilckSendScore(e,id)}
            disabled={txtBT3}
              // chkSendScore !== undefined ? 
            // false: chkSendScore ? 
            // false: !chkSendScore ? 
            // true: false
          // }

        // กรณีแรก เลือกรุ่นแนบไฟล์ และไม่ upload ไฟล์ เห็นปุ่มส่งคะแนน 
        //         ใช้ disabled ปุ่ม : chkSendScore === [] ? true: false  ---> false
        //         ใช้ เปลี่ยนข้อความปุ่ม chkSendScore === undefined || chkSendScore ? ---> true
        // กรณีสอง กดปุ่มส่งคะแนนไป upload ค่าในตาราง และเปลี่ยนปุ่มเป็น disabled และเปลี่ยนข้อความ
        //     ส่งคะแนนเรียบร้อยแล้ว
        //         ใช้ disabled ปุ่ม : {chkSendScore !== [] ? true: false  ---> true
        //         ใช้ เปลี่ยนข้อความปุ่ม !chkSendScore ? ---> false
        // กรณีสาม แสดงปุ่มกดกรณีส่งคะแนนแล้ว เป็น disabled ปุ่ม พร้อมเปลี่ยนข้อความปุ่ม และ 
        //     กรณีรุ่นยังไม่ upload ลายเซ็นอิเล็กทรอนิกส์
        //         ใช้ disabled ปุ่ม : chkSendScore !== undefined ? true: false ---> true, false
        //         ใช้ เปลี่ยนข้อความปุ่ม !chkSendScore ? ---> true, false

            >
              <Box>
              {!txtBT3 ?
              // {chkSendScore === "undefined" || !chkSendScore ?
                <Box sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                  ส่งคะแนน
                </Box>
                :
                <Box sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                 ส่งคะแนนเรียบร้อยแล้ว
               </Box>
                }
                <Box>กดเมื่อสิ้นสุดกาารศึกษา</Box>
              </Box>{' '}
            </Button>
          </Box>
        ) : (
          ''
        )}
      </div>
    </React.Fragment>
  )
}

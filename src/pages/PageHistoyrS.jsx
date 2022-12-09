/* eslint-disable no-unused-vars */
import React, { useRef, forwardRef } from 'react'
import { useState, useEffect } from 'react'
import { useReactToPrint } from 'react-to-print'
import Container from '@mui/material/Container'
// import { DataGrid } from '@mui/x-data-grid'
// import { Print } from '@material-ui/icons'
// import { Link } from 'react-router-dom'
import Axios from 'axios'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import TablePageHistoryS from '../components/TablePageHistoryS'
import { useLocation } from 'react-router-dom'
// import PrintIcon from '@mui/icons-material/Print'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'; //added on 23.09.2022
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

// import '../../src/print.css'

const ComponentToPrint = forwardRef((props, ref) => {
  const selected = props.dataToPrint
  //  console.log("class: ",props.class)
  //  console.log("seminar: ",props.seminar)
  const CourseName = localStorage.getItem('CourseName')
  return (
    <Box ref={ref}>

      <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
        <Typography variant="h4" gutterBottom 
        sx={{ fontFamily: 'THSarabunNew' }}
        >
          ทะเบียนประวัติผู้เข้ารับการศึกษา
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom
        sx={{ fontFamily: 'THSarabunNew' }}
        >
            {CourseName}
        </Typography>
      </Box>
      <Box sx={{display: 'flex',justifyContent: 'center'}}>
      <Box sx={{marginRight:'20%'}}>
      <Typography variant="h6" gutterBottom
      sx={{ fontFamily: 'THSarabunNew' }}
      >
          รุ่นที่ {props.class}
          </Typography>
      </Box>
      <Box sx={{marginLeft:'20%'}}>
      <Typography variant="h6" gutterBottom
      sx={{ fontFamily: 'THSarabunNew' }}
      >
          สัมมนาที่  {props.seminar? props.seminar: '-'}
          </Typography>
      </Box>
      </Box>
      
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, fontFamily: 'THSarabunNew' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center"  sx={{ fontFamily: 'THSarabunNew' }}>
                  ลำดับ
                </TableCell>
                <TableCell align="center"  sx={{ fontFamily: 'THSarabunNew' }}>
                  เลขประจำตัว
                </TableCell>
                <TableCell align="center"   sx={{ fontFamily: 'THSarabunNew' }}>เลขประจำตัว นทน.</TableCell>
                <TableCell align="center" sx={{ fontFamily: 'THSarabunNew' }} >
                  ยศ-ชื่อ-สกุล
                </TableCell>
                <TableCell align="center"  sx={{ fontFamily: 'THSarabunNew' }}>เหล่า</TableCell>
                <TableCell align="center"  sx={{ fontFamily: 'THSarabunNew' }}>จำพวก</TableCell>
                <TableCell align="center" sx={{ fontFamily: 'THSarabunNew' }}>ลชทอ.</TableCell>
                <TableCell align="center"  sx={{ fontFamily: 'THSarabunNew' }} >
                  ตำแหน่ง
                </TableCell>
                <TableCell align="center"  sx={{ fontFamily: 'THSarabunNew' }}>
                  สังกัด
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selected.map((e, i) => {
                return (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center" sx={{ fontFamily: 'THSarabunNew' }}>
                      {i + 1}
                    </TableCell>
                    <TableCell align="center"  sx={{ fontFamily: 'THSarabunNew' }}>
                      {e.PerId}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: 'THSarabunNew' }}>
                      {e.StudentId}
                    </TableCell>
                    <TableCell align="center"  sx={{ fontFamily: 'THSarabunNew' }}>
                      {e.Rank} {e.PersFname} {e.PersLname}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: 'THSarabunNew' }}>{e.PersCorps}</TableCell>
                    <TableCell align="center" sx={{ fontFamily: 'THSarabunNew' }}>{e.PersGrp}</TableCell>
                    <TableCell align="center" sx={{ fontFamily: 'THSarabunNew' }}>{e.PersDutyNum}</TableCell>
                    <TableCell align="center" sx={{ fontFamily: 'THSarabunNew' }}>
                      {e.PersCurrPosition}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: 'THSarabunNew' }}>
                      {e.PersAffiliation}
                    </TableCell>
                  </TableRow>
                )
              })}
             
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>

  
  ) //end of return
})

export default function PageHistoyrS() {
  // เรียกข้อมูล
  const location = useLocation()
  const courId = localStorage.getItem('AccessRights').substring(11, 14)
  const [classNo, setClassno] = useState([])
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedSeminar, setSelectedSeminar] = useState('')
  const [isSubmit, setIssubmit] = useState(false)
  const [confirmPrint, setconfirmPrint] = useState(false)
  const [numSubject, setNumSubject] = useState([])
  const [selected, setSelected] = useState([])
  const courseNum = numSubject.length
  // console.log(location)
  useEffect(() => {
    loadClass()
    loadSubject2()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log(classNo, selectedClass, selectedSeminar);

  useEffect(() => {
    if (isSubmit) {
      // const idTokenResult = localStorage.token;
      Axios.get(
        process.env.REACT_APP_API + `/result/course/${selectedClass}/seminar/${selectedSeminar}/${courId}`,
      )
        .then((res) => {
          setSelected(res.data)
          // console.log("data: ",res.data)
        })
        .catch((err) => console.log(err))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit])

  const loadClass = () => {
    Axios.get(process.env.REACT_APP_API + `/education/${courId}`)
      .then((res) => {
        setClassno(res.data)
        // console.log(res.data)
      })
      .catch((err) => {
        console.error(err)
      })

    if (location.state !== null) {
      Axios.get(
        process.env.REACT_APP_API + `/result/course/${location.state.coursegrp}/seminar/${location.state.seminar}/${courId}`,
      )
        .then((res) => {
          setSelected(res.data)
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err)
        })
      // console.log(location.state)
      const { coursegrp, seminar } = location.state
      const backSelectedClass = coursegrp
      const backSelectedSeminar = seminar
      setSelectedClass(backSelectedClass)
      setSelectedSeminar(backSelectedSeminar)
      setIssubmit(true)
    }
  }

  const handleChangeClass = (event) => {
    setSelectedClass(event.target.value)
    setIssubmit(false)
  }

  const handleChangeSeminar = (event) => {
    setSelectedSeminar(event.target.value)
    setIssubmit(false)
  }

  const onCilckSelect = (classNo, seminarNo) => {
    if (classNo === '' || seminarNo === '') {
      alert('กรุณาเลือกรุ่นและสัมมนา')
      setIssubmit(false)
    } else {
      setIssubmit(true)
    }
    return isSubmit
  }

  const selectClass = [...new Set(classNo.map((item) => item.CourseGrp))]

  const loadSubject2 = async () => {

    Axios.get(process.env.REACT_APP_API + `/subjects2/${courId}`)
      .then((res) => {
        setNumSubject(res.data)
       
      })
      .catch((err) => console.log(err))
  }
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
    documentTitle: 'emp-data',
    onBeforePrint: () => setconfirmPrint(true),
    onAfterPrint: () => setconfirmPrint(false),
    pageStyle: getPageMargin(),
  })

  // console.log(selected)
  return (
    <React.Fragment>
      <div className="cotainerDetail">
        <p className="HeadTextMain">ทะเบียนประวัติผู้เข้ารับการศึกษา</p>
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
                <MenuItem value={0}>เลือกทุกสัมมนา</MenuItem>
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
              variant={'contained'}
              onClick={() => onCilckSelect(selectedClass, selectedSeminar)}
             
              sx={{
                minWidth: 100,
                minHeight: 55,
                m: 1,
                fontFamily: 'THSarabunNew',
                fontWeight: 'bold',
                fontSize: 16,
              }}
              startIcon={< ManageSearchIcon />} 
            >
              ตกลง
            </Button>
          </Box>
        </div>
        <Container>
          <Box sx={{ display: 'flex' }}>

           
              <Button
                startIcon={ <LocalPrintshopIcon/> }
                sx={{
                    minWidth: 100, 
                    minHeight: 55, 
                    m:1,
                    fontFamily: 'THSarabunNew',
                    fontWeight: 'bold',
                    fontSize: 16,
                }}
                variant={'contained'} 
                onClick={handlePrint}
              >
                พิมพ์
              </Button>
            
          </Box>


          <TablePageHistoryS
            classNo={selectedClass}
            seminarNo={selectedSeminar}
            isSubmit={isSubmit}
            courseNum={courseNum}
          />

          <Box sx={{ display: 'none' }}>
            <ComponentToPrint ref={componentRef} dataToPrint={selected} class = {selectedClass} seminar = {selectedSeminar}/>
          </Box>
         
        </Container>
      </div>
    </React.Fragment>
  )
}

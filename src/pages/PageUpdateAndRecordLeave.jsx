import React, { Component } from 'react'
import {
  MenuItem,
  Container,
  Select,
  Box,
  Button,
  TextField,
  Grid,
  Paper,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useLocation, useNavigate } from 'react-router-dom'
import OwnDatePickersWithFunc from '../components/DatePickersWithFunc'
import OwnTimePickersWithFunc from '../components/TimePickersWithFunc'
import FileUpload from '../components/FileUpload'
import { CalTimeSpan } from '../components/TimeDiffCal'
import AlertDialog from '../components/AlertDialog'
import axios from 'axios'

class PageUpdateAndRecordLeave extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curr_persid: '',
      curr_studid: '',
      curr_studlistid: '',
      courseid: '',
      classattendid: '',
      leavestartdate: '',
      leavestarttime: '',
      leaveenddate: '',
      leaveendtime: '',
      coursegrplist: [],
      seminarlist: [],
      instrlist: [],
      selcoursegrp: '',
      selseminar: '',
      selcoursegrp_indx: -1,
      selseminar_indx: -1,
      // selinstr_indx: -1,
      selleavetype_indx: -1,
      leavereason: '',
      addnewleave: 0,
      uploadfilepath: '',
      newlocalstorage: '',
      loading: true,
      openAlertDialog: false,
    }

    this.fileUploadRef = React.createRef()
    this.handleCourseGrpSelect = this.handleCourseGrpSelect.bind(this)
    this.handleSeminarSelect = this.handleSeminarSelect.bind(this)
    this.handleInstructorOnChange = this.handleInstructorOnChange.bind(this)
    this.handleLeaveTypeOnChange = this.handleLeaveTypeOnChange.bind(this)
    this.handleLeaveStartDateOnChange = this.handleLeaveStartDateOnChange.bind(
      this,
    )
    this.handleLeaveStartTimeOnChange = this.handleLeaveStartTimeOnChange.bind(
      this,
    )
    this.handleLeaveEndDateOnChange = this.handleLeaveEndDateOnChange.bind(this)
    this.handleLeaveEndTimeOnChange = this.handleLeaveEndTimeOnChange.bind(this)
    this.handleLeaveReasonOnchange = this.handleLeaveReasonOnchange.bind(this)
    this.handleBtnRecOnClick = this.handleBtnRecOnClick.bind(this)
    this.handleBtnGoBackOnClick = this.handleBtnGoBackOnClick.bind(this)
  }

  componentDidMount() {
    // this.createCourseGrpAndSeminarList();
    this.createIntructorList()
    this.getStudListIdFromLocalStorage()
    this.setState({
      addnewleave: this.props.location.state.addleave ? 1 : 0,
      selleavetype_indx: this.leaveTypeMgmt(
        this.props.location.state.sel_student.leavetype,
      ),
      classattendid: this.props.location.state.sel_student.classattendid,
      leavestartdate: this.props.location.state.sel_student.leavestartdate,
      leavestarttime: this.props.location.state.sel_student.leavestarttime,
      leaveenddate: this.props.location.state.sel_student.leaveenddate,
      leaveendtime: this.props.location.state.sel_student.leaveendtime,
      leavereason: this.props.location.state.sel_student.leavereason,
    })
  }

  leaveTypeMgmt = (type) => {
    // console.log('leaveTypeMgmt >>> ', type)
    // eslint-disable-next-line default-case
    switch (type) {
      case 'ลาป่วย':
        return 0
      case 'ลากิจ':
        return 1
      case undefined:
        return -1
    }
  }

  getStudListIdFromLocalStorage = () => {
    let res = JSON.parse(localStorage.getItem('datastorage')).filter(
      (e) => e.studentid === this.props.location.state.sel_student.studentid,
    )
    this.setState({
      curr_studlistid: res[0].id,
      curr_persid: res[0].persid,
      courseid: res[0].courseid,
    })
  }

  createIntructorList = async () => {
    const courIds = localStorage.getItem('AccessRights')
    let res_instrlist = await axios.get(
      process.env.REACT_APP_API + `/PageUpdateAndRecordLeave/instructor/${courIds}`,
    )
    let instr_indx = res_instrlist.data
      .map((e) => {
        return e.instr_name
      })
      .indexOf(this.props.location.state.sel_student.persontakingtheleave)
    this.setState({ instrlist: res_instrlist.data, selinstr_indx: instr_indx })
  }

  /*-------------------------- Event -----------------------------*/
  handleCourseGrpSelect = (event, child) => {
    const arr = Object.values(child)[4].children.split(' ')
    this.setState({
      selcoursegrp: parseInt(arr[1]),
      selcoursegrp_indx: this.state.coursegrplist.findIndex((e) =>
        e.includes(arr[1]),
      ),
    })
  }

  handleSeminarSelect = (event, child) => {
    const arr = Object.values(child)[4].children.split(' ')
    this.setState({
      selseminar: parseInt(arr[1]),
      selseminar_indx: this.state.seminarlist.findIndex((e) =>
        e.includes(arr[1]),
      ),
    })
  }

  handleInstructorOnChange = (event, child) => {
    this.setState({ selinstr_indx: event.target.value })
  }

  handleLeaveTypeOnChange = (event, child) => {
    this.setState({ selleavetype_indx: event.target.value })
  }

  handleLeaveStartDateOnChange = (event, child) => {
    this.setState({ leavestartdate: event.target.value })
  }

  handleLeaveStartTimeOnChange = (event, child) => {
    this.setState({ leavestarttime: event.target.value })
  }

  handleLeaveEndDateOnChange = (event, child) => {
    this.setState({ leaveenddate: event.target.value })
  }

  handleLeaveEndTimeOnChange = (event, child) => {
    this.setState({ leaveendtime: event.target.value })
  }

  handleLeaveReasonOnchange = (event) => {
    this.setState({ leavereason: event.target.value })
  }

  /*--------------------- button to go back to previous page --------------------*/
  handleBtnGoBackOnClick = async (event, child) => {
    const CourseId = localStorage.getItem('AccessRights').substring(11, 14)
    let _coursegrp = this.props.location.state.sel_student.coursegrp
    let _seminar = this.props.location.state.sel_student.seminar
    await axios
      .get(
        process.env.REACT_APP_API + `/PageInsertScore/coursegrp/${_coursegrp}/${_seminar}/${CourseId}`,
      )
      .then((results) => {
        this.props.navigate('/PageEditInsertScore', {
          state: {
            id: this.state.curr_studlistid,
            prev_page: 1,
            newdatastorage: JSON.stringify(
              results.data.map((e) =>
                Object.assign(e, {
                  courseid: CourseId, //// have to edit to get courseid from local storage or some sources
                  CourseGrp: _coursegrp,
                  Seminar: _seminar,
                  pageinsertscore: 0,
                }),
              ),
            ),
          },
        })
      })
      .catch((err) => {
        console.log('cannot goback to previous page err : ', err)
      })
  }

  /*--------------------- button to insert data into database ---------------------*/
  handleBtnRecOnClick = async (event, child) => {
    /*---------------- updated :: 26.08.2565 --------------------*/
    const CourseIds = localStorage.getItem('AccessRights').substring(11, 14)
    const user = localStorage.getItem('PersonalHistory')
    const UserId = JSON.parse(user)[0].PersId
    if (
      // this.state.selinstr_indx !== -1 &&
      this.state.selleavetype_indx !== -1 &&
      this.state.leavereason !== undefined &&
      this.state.uploadfilepath !== ''
    ) {
      let _dataToDatabase = {
        newleave: this.state.addnewleave,
        PersId: this.state.curr_persid,
        CourseId: this.state.courseid,
        ClassAttendId: this.state.classattendid,
        BeginLeaveDate: this.state.leavestartdate,
        BeginLeaveTime: this.state.leavestarttime,
        EndLeaveDate: this.state.leaveenddate,
        EndLeaveTime: this.state.leaveendtime,
        LeaveHrs: this.calDifferentDateAndTime(
          this.state.leavestartdate,
          this.state.leavestarttime,
          this.state.leaveenddate,
          this.state.leaveendtime,
        ),
        LeaveType: this.state.selleavetype_indx,
        Reason: this.state.leavereason,
        filepath: await this.fileUploadRef.current.uploadFileProgress(),
        InstructorId: UserId,
      }

      // console.log('_dataToDatabase: ', _dataToDatabase)

      await axios
        .put(
          process.env.REACT_APP_API + '/PageUpdateAndRecordLeave/handleleavedata',
          _dataToDatabase,
        )
        .then(async (res) => {
          let _coursegrp = this.props.location.state.sel_student.coursegrp
          let _seminar = this.props.location.state.sel_student.seminar
          await axios
            .get(
              process.env.REACT_APP_API + `/PageInsertScore/coursegrp/${_coursegrp}/${_seminar}/${CourseIds}`,
            )
            .then((results) => {
              this.setState({
                loading: false,
                newlocalstorage: JSON.stringify(
                  results.data.map((e) =>
                    Object.assign(e, {
                      CourseId: CourseIds, //// have to edit to get courseid from local storage or some sources
                      CourseGrp: _coursegrp,
                      Seminar: _seminar,
                      pageinsertscore: 0,
                    }),
                  ),
                ),
              })
              console.log('tbclassattendance get data >> successful')
            })
            .catch((err) => {
              console.log('tbclassattendance get data >> err : ', err)
            })
          console.log('tbclassattendance inserted or updated >> successful')
        })
        .catch((err) => {
          console.log('tbclassattendance inserted or updated >> err : ', err)
        })

      if (!this.state.loading) {
        this.props.navigate('/PageEditInsertScore', {
          state: {
            id: this.state.curr_studlistid,
            prev_page: 1,
            newdatastorage: this.state.newlocalstorage,
          },
        })
      }
    } else {
      this.setOpenAlertDialog(true)
    }
  }

  calDifferentDateAndTime(s_date, s_time, e_date, e_time) {
    const timespan = new CalTimeSpan(s_date, s_time, e_date, e_time)
    return timespan.getTotalLeaveHrs()
  }

  /*---------------- updated :: 26.08.2565 --------------------*/
  setOpenAlertDialog = (state) => {
    this.setState({ openAlertDialog: state })
  }
  /*-----------------------------------------------------------*/

  render() {
    let res = JSON.parse(localStorage.getItem('PersonalHistory'))
    return (
      <div className='cotainerDetail'>
        <Container>
          <Grid container spacing={2}>
            {/*--------------- 1.row -----------------*/}
            <Grid item xs={10} >
              <Paper
                sx={{
                  display: 'flex',
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 36,
                  fontWeight: 'bold',
                }}
                elevation={0}
              >
                ชั่วโมงการศึกษา และคะแนนความประพฤติ
              </Paper>
            </Grid>
            <Grid item xs={2} >
              <Paper
                sx={{
                  display: 'flex',
                  height: 80,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
                elevation={0}
              >
                <Button
                  variant={'contained'}
                  sx={{
                    fontFamily: 'THSarabunNew',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                  startIcon={<ArrowCircleLeftIcon />}
                  onClick={this.handleBtnGoBackOnClick}
                >
                  ย้อนกลับ
                </Button>
              </Paper>
            </Grid>

            {/*--------------- 3.row -----------------*/}
            <Grid item xs={10} >
              <Paper
                sx={{
                  display: 'flex',
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 28,
                  fontWeight: 'bold',
                }}
                elevation={0}
              >
                {this.state.addnewleave === 1 ? 'เพิ่มประวัติการลา' : 'แก้ไขประวัติการลา'}
              </Paper>
            </Grid>
            {/*--------------- 4.row -----------------*/}
            <Grid item xs={10} >
              <Grid container spacing={1}>
                {/*--------------- 4.1 ผู้ลงประวัติการลา-----------------*/}
                <Grid item xs={2}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: 80,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                    elevation={0}
                  >
                    ผู้ลงประวัติการลา :
                  </Paper>
                </Grid>
                <Grid item xs={10}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: 80,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                    elevation={0}
                  >
                    {res[0].Rank + " " + res[0].PersFname + " " + res[0].PersLname}
                  </Paper>
                </Grid>

                {/*--------------- 4.2 เลขประจำตัวและชื่อ นทน. -----------------*/}
                <Grid item xs={2}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: 80,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                    elevation={0}
                  >
                    เลขประจำตัว นทน. :
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: 80,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                    elevation={0}
                  >
                    {this.props.location.state.sel_student.studentid}
                  </Paper>
                </Grid>
                <Grid item xs={2}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: 80,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                    elevation={0}
                  >
                    ชื่อ นทน. :
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: 80,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                    elevation={0}
                  >
                    {this.props.location.state.sel_student.studname}
                  </Paper>
                </Grid>
                {/*--------------- 4.3 เริ่มต้นการลา -----------------*/}
                <Grid item xs={2}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: 80,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                    elevation={0}
                  >
                    วันเริ่มต้นการลา :
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: 80,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                    elevation={0}
                  >
                    <OwnDatePickersWithFunc
                      action={
                        {
                          rec_date: this.props.location.state.sel_student.leavestartdate,
                          func: (newdate) => { this.setState({ leavestartdate: newdate }) }
                        }
                      }
                    />
                  </Paper>
                </Grid>
                <Grid item xs={2}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: 80,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                    elevation={0}
                  >
                    เวลาเริ่มต้นการลา :
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: 80,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                    elevation={0}
                  >
                    <OwnTimePickersWithFunc
                      rec_time={
                        {
                          _date: this.props.location.state.sel_student.leavestartdate,
                          _time: this.props.location.state.sel_student.leavestarttime,
                          func: (newtime) => { this.setState({ leavestarttime: newtime }) }
                        }
                      }
                    />
                  </Paper>
                </Grid>
                {/*--------------- 4.4 สิ้นสุดการลา -----------------*/}
                <Grid item xs={2}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: 80,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                    elevation={0}
                  >
                    วันสิ้นสุดการลา :
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: 80,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                    elevation={0}
                  >
                    <OwnDatePickersWithFunc
                      action={
                        {
                          rec_date: this.props.location.state.sel_student.leaveenddate,
                          func: (newdate) => { this.setState({ leaveenddate: newdate }) }
                        }
                      }
                    />
                  </Paper>
                </Grid>
                <Grid item xs={2}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: 80,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                    elevation={0}
                  >
                    เวลาสิ้นสุดการลา :
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: 80,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                    elevation={0}
                  >
                    <OwnTimePickersWithFunc
                      rec_time={
                        {
                          _date: this.props.location.state.sel_student.leaveenddate,
                          _time: this.props.location.state.sel_student.leaveendtime,
                          func: (newtime) => { this.setState({ leaveendtime: newtime }) }
                        }
                      }
                    />
                  </Paper>
                </Grid>
                {/*--------------- 4.5 ประเภทและเหตุผลการลา -----------------*/}
                <Grid item xs={2}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: 80,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                    elevation={0}
                  >
                    ประเภทการลา :
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: 80,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                    elevation={0}
                  >
                    <Select
                      value={this.state.selleavetype_indx}
                      id="leavetype" label="ประเภทการลา"
                      style={{ width: '70%' }}
                      onChange={this.handleLeaveTypeOnChange}
                    >
                      <MenuItem key={0} value={0} name={'ลาป่วย'}>ลาป่วย</MenuItem>
                      <MenuItem key={1} value={1} name={'ลากิจ'}>ลากิจ</MenuItem>
                    </Select>
                  </Paper>
                </Grid>

                <Grid item xs={2}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: 80,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                    elevation={0}
                  >
                    เหตุผลการลา :
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    component="form"
                    sx={{ "&.MuiTextField-root": { m: 1, width: "30ch" } }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      sx={{ width: "100%" }}
                      defaultValue={this.state.leavereason}
                      multiline={true}
                      rows={3}
                      onChange={this.handleLeaveReasonOnchange}
                    />
                  </Box>

                </Grid>
                {/*--------------- 4.6 เหตุผลการลา -----------------*/}
                <Grid item xs={2}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: 80,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                    elevation={0}
                  >
                    เอกสารการลา :
                  </Paper>
                </Grid>
                <Grid item xs={8}>
                  <Paper
                    sx={{
                      display: 'flex',
                      //height: 80,
                      justifyContent: 'center',
                      //alignItems: 'center',
                    }}
                    elevation={0}
                  >
                    <FileUpload
                      ref={this.fileUploadRef}
                      data={{
                        _props: this.props,
                        func: (path) => {
                          this.setState({ uploadfilepath: path });
                        },
                      }}
                    />
                  </Paper>
                </Grid>

                {/*--------------- 4.7 ปุ่มย้อนกลับและบันทึก -----------------*/}
                
                <Grid item xs={6}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: 80,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                    elevation={0}
                  >
                    <Button
                      variant={'contained'}
                      sx={{
                        fontFamily: 'THSarabunNew',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}
                      startIcon={<SaveIcon />}
                      onClick={this.handleBtnRecOnClick}
                    >
                      บันทึก
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper
                    sx={{
                      display: 'flex',
                      height: 80,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      fontSize: 16,
                    }}
                    elevation={0}
                  >
                    <Button
                      variant={'contained'}
                      sx={{
                        fontFamily: 'THSarabunNew',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}
                      startIcon={<ArrowCircleLeftIcon />}
                      onClick={this.handleBtnGoBackOnClick}
                    >
                      ย้อนกลับ
                    </Button>
                  </Paper>
                </Grid>

              </Grid>
            </Grid>
          </Grid>
        </Container>
        {
          /*---------------- add :: 26.08.2565 --------------------*/
          this.state.openAlertDialog &&
          <AlertDialog
            title='แจ้งเตือน'
            content={'กรุณาตรวจสอบและกรอกข้อมูลที่กำหนดให้ครบถ้วน'}
            openDialog={this.state.openAlertDialog}
            setOpenDialog={this.setOpenAlertDialog}
          />
        }
      </div >
    ) //end return
  } //end render
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <PageUpdateAndRecordLeave location={useLocation()} navigate={useNavigate()} />
)

/* eslint-disable import/no-anonymous-default-export */
import React, { Component } from 'react';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
  Button
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit } from '@material-ui/icons';
import ToPrintPageInsertScore from '../components/ToPrintPageInsertScore'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'; //added on 23.09.2022
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress'; //added on 26.09.2022
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import Container from '@mui/material/Container';

/*--------------- Functional Component : Loading Progress ------------*/
const LoadingProgress = (props) => {
  const { loading } = props;
  return loading ? (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant='determinate'
        sx={{
          color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
        }}
        size={40}
        thickness={4}
      />
      <CircularProgress
        variant='indeterminate'
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
      />
    </Box>
  ) : null;
};

/*------------------------- Functional Component : PageInsertScore ------------*/
class PageInsertScore extends Component {
  /*---------- updated on 24.09.2022 >>> alignment & text color ---------*/
  constructor(props) {
    super(props);
    this.columns = [
      { field: 'id', headerName: 'ลำดับ', width: 60, headerAlign: 'center', align: 'center' },
      { field: 'studentid', headerName: 'เลขประจำตัว', width: 110, headerAlign: 'center', align: 'center' },
      { field: 'studentname', headerName: 'ยศ ชื่อ สกุล', width: 150, headerAlign: 'center' },
      {
        field: 'leaveday',
        headerName: 'วันที่ลา',
        width: 70,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          return (
            <>
              <Link to='/PageEditInsertScore' state={{
                id: params.id,
                prev_page: 0,
                newdatastorage: ''
              }} >
                <Edit className="userListDate" />
              </Link>
            </>
          )
        }
      },
      { field: 'period', headerName: 'ระยะเวลาการศึกษา(ชั่วโมง)', width: 150, headerAlign: 'center', align: 'center' },
      { field: 'businessleave', headerName: 'จำนวนชั่วโมงลากิจ', width: 150, headerAlign: 'center', align: 'center' },
      { field: 'sickleave', headerName: 'จำนวนชั่วโมงลาป่วย', width: 150, headerAlign: 'center', align: 'center' },
      { field: 'sumattendhrs', headerName: 'รวมเวลามาเรียน', width: 130, headerAlign: 'center', align: 'center' },
      { field: 'percentattendhrs', headerName: 'ร้อยละเวลามาเรียน', width: 150, headerAlign: 'center', align: 'center' },
      { field: 'conductscore', headerName: 'คะแนนความประพฤติ', width: 150, headerAlign: 'center', align: 'center', editable: true },
      {
        field: 'status', headerName: 'สถานะ', width: 100, headerAlign: 'center', align: 'center', renderCell: (params) => {
          return (
            <>
              {
                Number(params.getValue(params.id, 'percentattendhrs')) >= 80 ?
                  <div style={{ color: '#018822', fontWeight: 'bold' }}>ผ่าน</div> :
                  <div style={{ color: '#A50000', fontWeight: 'bold' }}>ไม่ผ่าน</div>
              }
            </>
          )
        }
      },
      {
        field: 'remark', headerName: 'หมายเหตุ', width: 150, headerAlign: 'center', align: 'center',
        renderCell: (params) => (
          <>
            {
              parseInt(params.getValue(params.id, 'conductscore')) !== 0 ?
                <div style={{ color: '#018822', fontWeight: 'bold' }}>เรียบร้อยแล้ว</div> :
                <div style={{ color: '#A50000', fontWeight: 'bold' }}>ยังไม่ได้ใส่คะแนน</div>
            }
          </>
        )
      }
    ];

    this.state = {
      courseid: localStorage.getItem('AccessRights').substring(11, 14), //--added on 24.09.2022 
      coursegrplist: [],
      seminarlist: [],
      datagridrows: [],
      seldatagridrows: [],
      selcoursegrp: '',
      selcoursegrp_indx: '',
      selseminar: '',
      selseminar_indx: '',
      instrlist: [],
      dataPassedToNextComp: [],
      loading: false //Loading Progress State
    };

    this.acceptBtnOnClick = this.acceptBtnOnClick.bind(this);
    this.handleCourseGrpSelect = this.handleCourseGrpSelect.bind(this);
    this.handleSeminarSelect = this.handleSeminarSelect.bind(this);
    this.handleStudBehaveScore = this.handleStudBehaveScore.bind(this);
  }

  componentDidMount() {
    this.createCourseGrpAndSeminarList();
  }

  /*----------------------- Event ---------------------------*/
  acceptBtnOnClick = () => {
    this.setState({ loading: true }); //Start Data Loading
    this.fetchdataToCreateDataGridRows(
      this.state.selcoursegrp,
      this.state.selseminar
    );
  }

  handleCourseGrpSelect = (event, child) => {
    const arr = Object.values(child)[4].children.split(' ');
    this.setState({
      selcoursegrp: parseInt(arr[1]),
      selcoursegrp_indx: this.state.coursegrplist.findIndex((e) => e.includes(arr[1]))
    });
    this.setState({ datagridrows: [] });
    this.setState({ loading: false });
  }

  /*-------------------- updated on 23.09.2022  -----------*/
  handleSeminarSelect = (event, child) => {
    const arr = Object.values(child)[4].children.split(' ');
    // console.log("dataAtt: ", event.target.value)
    // console.log("arr: ", arr)
    this.setState({
      selseminar: event.target.value === 0 ? 0 : parseInt(arr[1]),
      // selseminar: event.target.value,
      selseminar_indx: event.target.value
    });
    this.setState({ datagridrows: [] });
    this.setState({ loading: false });
  }

  handleStudBehaveScore = async (event, child) => {
    let rel_stud = this.state.datagridrows.map((e) => e).filter((e) => e.id === event.id);
    const id = localStorage.getItem('AccessRights').substring(0, 10)
    if (rel_stud[0].conductscore !== event.value) {
      rel_stud[0].conductscore = event.value;
      Object.assign(rel_stud[0], { 'InstructorId': id });
      /*---------------------------------------------------------------------------*/
      let success = await axios.put(process.env.REACT_APP_API + '/PageInsertScore/lastestscore', rel_stud);
      //console.log('handleStudBehaveScore :: ', success);

      if (success !== undefined) {
        this.fetchdataToCreateDataGridRows(
          this.state.selcoursegrp,
          this.state.selseminar
        );
      }
    }
  }

  /*---------------------------------------------------------*/
  fetchdataToCreateDataGridRows = async (_coursegrp, _seminar) => {
    // console.log('PageInsertScore >>>> fetchdataToCreateDataGridRows ', _coursegrp, ' : ', _seminar);
    localStorage.removeItem('datastorage');
    const courId = localStorage.getItem('AccessRights').substring(11, 14)
    let results = await axios.get(process.env.REACT_APP_API + `/PageInsertScore/coursegrp/${_coursegrp}/${_seminar}/${courId}`);

    // console.log('PageInsertScore >>>> fetchdataToCreateDataGridRows : ', results.data);

    localStorage.setItem('datastorage', JSON.stringify(results.data.map((e) => Object.assign(e, { 'courseid': courId, 'coursegrp': _coursegrp, 'seminar': _seminar, 'pageinsertscore': 1 }))));
    this.setState({ datagridrows: results.data });
    this.setState({ loading: false }); //added on 26.09.2022
  }

  /*-------------------- updated on 23.09.2022 >>> add unshift('ทุกสัมมนา') -----------*/
  createCourseGrpAndSeminarList = async () => {
    const courId = localStorage.getItem('AccessRights').substring(11, 14)
    let datalist = await axios.get(process.env.REACT_APP_API + `/PageInsertScore/${courId}`);
    datalist.data.seminar.unshift('ทุกสัมมนา'); //added on 23.09.2022
    // console.log("data SeminarList: ", datalist.data)
    this.setState({
      coursegrplist: datalist.data.coursegrp,
      seminarlist: datalist.data.seminar
    });

    /*------------------- get props from pageeditinsertscore ---------------*/
    if (this.props.location.state !== null) {
      this.setState({ loading: true });
      this.fetchdataToCreateDataGridRows(
        this.props.location.state.coursegrp,
        this.props.location.state.seminar
      );

      /*---------------- updated on 23.09.2022 ---------------*/
      let props_sem = this.props.location.state.seminar === '0' ? '0' : this.props.location.state.seminar;
      console.log("data props_sem: ", props_sem)

      this.setState({
        selcoursegrp: this.props.location.state.coursegrp,
        selcoursegrp_indx: this.state.coursegrplist.findIndex((e) => e.includes(this.props.location.state.coursegrp)),
        selseminar: props_sem,
        selseminar_indx: props_sem,
      });
    }
  }

  /*--------------- added on 26.09.2022 ----------------*/
  loadingProgress = () => {
    if (this.state.loading) {
      return (
        <Box display={'flex'} justifyContent={'center'}>
          <LoadingProgress loading={this.state.loading} />
        </Box>
      )
    }
  }

  render() {
    //console.log('loading ', this.state.loading); 
    return (
      <React.Fragment>
        <div className="cotainerDetail">
          <p
            className="HeadTextMain"
            sx={{ fontWeight: 'bold' }}
          >
            ชั่วโมงการศึกษาและคะแนนความประพฤติ
          </p>
          <div className="DropdownSelectModel">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <InputLabel
                  htmlFor="grouped-select"
                  sx={{
                    fontFamily: 'THSarabunNew',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                >
                  รุ่น
                </InputLabel>
                <Select
                  sx={{
                    fontFamily: 'THSarabunNew',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                  value={this.state.selcoursegrp_indx}
                  id="grouped-select"
                  label="รุ่น"
                  onChange={this.handleCourseGrpSelect}>
                  {
                    this.state.coursegrplist.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={index}
                          sx={{
                            fontFamily: 'THSarabunNew',
                            fontWeight: 'bold',
                            fontSize: 16,
                          }}
                        >
                          {item}
                        </MenuItem>
                      );
                    })
                  }
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <InputLabel
                  htmlFor="seminar-select"
                  sx={{
                    fontFamily: 'THSarabunNew',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                >
                  สัมมนา
                </InputLabel>
                <Select
                  sx={{
                    fontFamily: 'THSarabunNew',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                  value={this.state.selseminar_indx}
                  id="seminar-select"
                  label="สัมมนา"
                  onChange={this.handleSeminarSelect} >
                  {this.state.seminarlist.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={index}
                        sx={{
                          fontFamily: 'THSarabunNew',
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}
                      >
                        {item}
                      </MenuItem>
                    );
                  })
                  }
                </Select>
              </FormControl>
              <Button
                variant={'contained'}
                sx={{
                  minWidth: 100,
                  minHeight: 55,
                  m: 1,
                  fontFamily: 'THSarabunNew',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
                startIcon={< ManageSearchIcon />} //add on 23.09.2022
                onClick={this.acceptBtnOnClick}
              >
                ตกลง
              </Button>
            </Box>
          </div>

          {/*------- updated on 23.09.2022 -> change color and fontweght ----*/}
          <Container >
            <Box component={'span'} sx={{ display: 'block' }}>
              <ToPrintPageInsertScore
                dataToPrint={{
                  courseid: this.state.courseid,
                  coursegrp: this.state.selcoursegrp,
                  seminar: this.state.selseminar
                }}
              />
            </Box>
            <Box
              component={'span'}
              sx={{
                display: 'block',
                justifyContent: 'center',
                height: 700,
                '& .normal': {
                  fontWeight: 'bold',
                  color: '#018822',
                  backgroundColor: '#F0F1F1',
                },
                '& .urgent': {
                  fontWeight: 'bold',
                  color: '#A50000',
                  backgroundColor: '#F0F1F1',
                }
              }}>
              <DataGrid
                rows={this.state.datagridrows}
                columns={this.columns}
                pageSize={10}
                //rowsPerPageOptions={[5, 10]} 
                onCellEditCommit={this.handleStudBehaveScore}
                getCellClassName={(params) => {
                  if (params.field === 'conductscore') {
                    return parseInt(params.value) !== 0 ? 'normal' : 'urgent';
                  }
                }}
                loading={
                  this.loadingProgress() //added on 26.09.2022
                }
              />
            </Box>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default () => (
  <PageInsertScore location={useLocation()} />
);

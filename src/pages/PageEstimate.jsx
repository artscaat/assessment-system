/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {
  Table, TableBody, TableCell, TableHead,
  TableRow, TableFooter, IconButton, useTheme
} from '@mui/material';
import { TableContainer, TablePagination } from '@mui/material';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AlertDialog from '../components/AlertDialog';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import ManageSearchIcon from '@mui/icons-material/ManageSearch'; //added on 23.09.2022
import ToPrintPageEstimate from '../components/ToPrintPageEstimate'; //added on 30.09.2022
import axios from 'axios';
import moment from 'moment-timezone';

/*----------------------- Global Variable ----------------------*/
const gradegrptype = [
  /*------- 0 :: 051 : หลักสูตรนายทหารชั้นผู้บังคับหมวด --------*/
  {
    '--': 'รอลงคะแนน',
    'A': 'ดีมาก',
    'A-': 'ค่อนข้างดีมาก',
    'B+': 'ดีปานกลาง',
    'B': 'ดี',
    'B-': 'ค่อนข้างดี',
    'C+': 'ปานกลาง',
    'C': 'พอใช้',
    'C-': 'ค่อนข้างพอใช้',
    'D+': 'ควรปรับปรุง',
    'D': 'ผ่านเกณฑ์',
    'F': 'ไม่ผ่านเกณฑ์',
    'P': 'ผ่าน',
    'U': 'ไม่ผ่าน'
  },
  /*------- 1 :: 073 : หลักสูตรครูการบินเพื่อฝึกศิษย์การบิน --------*/
  {
    '--': 'รอลงคะแนน',
    'P': 'ผ่าน',
    'U': 'ไม่ผ่าน'
  },
  /*------- 2 :: หลักสูตรทั่วไป --------*/
  {
    '--': 'รอลงคะแนน',
    'A': 'ดีมาก',
    'B+': 'ค่อนข้างดีมาก',
    'B': 'ดี',
    'C+': 'ค่อนข้างดี',
    'C': 'พอใช้',
    'D+': 'ค่อนข้างพอใช้',
    'D': 'ควรปรับปรุง',
    'F': 'ไม่ผ่านเกณฑ์',
    'P': 'ผ่าน',
    'U': 'ไม่ผ่าน'
  },
];

/*--------------- Functional Component : Loading Progress ------------*/
const LoadingProgress = ({ loading }) => {
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

/*-------------- Functional Component : TablePaginationActions -------------*/
const TablePaginationActions = (props) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (evt) => {
    onPageChange(evt, 0);
  }

  const handleBackButtonClick = (evt) => {
    onPageChange(evt, page - 1);
  }

  const handleNextButtonClick = (evt) => {
    onPageChange(evt, page + 1);
  }

  const handleLastPageButtonClick = (evt) => {
    onPageChange(evt, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

/*--------------------- React Function Component ---------------------*/
export default function PageEstimate() {
  /*---------------- UseState and Init Values ---------------------*/
  const _accessrights = localStorage.getItem('AccessRights'); //added on 07112022
  const CourseId = _accessrights.substring(11, 14); //updated on 07112022

  const user = localStorage.getItem('PersonalHistory');
  const UserId = JSON.parse(user)[0].PersId;

  /*----------------- added on 02.10.2022 ----------------*/
  const [access, setAccess] = useState(
    localStorage.getItem('Access') || ''
  );
  const [subjScoreEnable, setSubjScoreEnable] = useState(
    access !== 'ผอ.' && access !== 'วัดผลส่วนกลาง'
      ? true
      : false
  );

  const [fullscoreEnable, setFullscoreEnable] = useState(
    access !== 'ผอ.' && access !== 'วัดผลส่วนกลาง'
      ? true
      : false
  );

  const [gradeEnable, setGradeEnable] = useState(
    access !== 'ผอ.' && access !== 'วัดผลส่วนกลาง'
      ? true
      : false
  );

  const [subjectrights, setSubjectRights] = useState([]); //added on 12112022
  const [courseid, setCourseId] = useState(CourseId); //get Course Id from anywhere
  const [grpSemList, setGrpSemList] = useState({});
  const [courseSubjList, setCourseSubjList] = useState([]);
  const [selgrade, setSelGrade] = useState({});
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [subjgrpname, setSubjGrpName] = useState('');
  const [subjectgrp, setSubjectGrp] = useState('');
  const [coursegrp, setCourseGrp] = useState('');
  const [seminar, setSeminar] = useState('');
  const [fullscore, setFullScore] = useState(0);
  const [indvScoreList, setIndvScoreList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tbpage, setTbPage] = useState(0);
  const [completeList, setCompleteList] = useState([]); //text color in remark table cell
  const [loading, setLoading] = useState(false); //Loading Progress State
  const [matching, setMatching] = useState(''); //protect to fetch the same data 

  /*-------------------- emptyRows -----------------------*/
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, indvScoreList.length - tbpage * rowsPerPage);

  /*-------------------- useEffect -----------------------*/
  useEffect(() => {
    createCourseGrpAndSeminarList();
    createCourseSubjectList();
    selectGradeForEachCourse();
  }, []);

  /*-------------------- Update Fullscore -------------*/
  useEffect(() => {
    let newArr = [...indvScoreList];
    newArr.map((e) => { e.fullscore = fullscore; });
    setIndvScoreList(newArr);
  }, [fullscore]);

  /*-------------------- Func : createCourseGrpAndSeminarList -----------------------*/
  const createCourseGrpAndSeminarList = async () => {
    let grpsemlist = await axios.get(process.env.REACT_APP_API +`/PageEstimate/CourseGrpSeminar/${courseid}`);
    grpsemlist.data.seminar.unshift('ทุกสัมมนา');
    // console.log("data: ", grpsemlist.data)
    setGrpSemList(
      {
        coursegrplist: grpsemlist.data.coursegrp,
        seminarlist: grpsemlist.data.seminar,
      }
    );
  };

  /*-------------------- Func : createCourseSubjectList :: updated on 13112022-----------------------*/
  const createCourseSubjectList = async () => {
    //let coursesubjlist = await axios.get(`https://edu-evaluation.rtaf.mi.th/app/api/PageEstimate/CourseSubject/${courseid}`);
    await axios.get(process.env.REACT_APP_API +`/PageEstimate/CourseSubject/${courseid}`)
      .then(async coursesubjlist => {
        if (access === 'อาจารย์ประจำหมวดวิชา') {
          let remainsubjitem = [];
          let _subjectrights = await axios.get(process.env.REACT_APP_API +`/PageEstimate/accessrightid/${_accessrights}`)
          _subjectrights.data.map(subjright => {
            remainsubjitem.push(coursesubjlist.data.filter(e => e.includes(subjright.SubjectId))[0]);
          });
          setCourseSubjList(remainsubjitem);
        } else {
          setCourseSubjList(coursesubjlist.data);
        }
      })
      .catch(err => {
        console.log('PageEstimate : createCourseSubjectList failed -> err : ', err);
      });
  };

  /*-------------------- Func : selectGradeForEachCourse -----------------------*/
  const selectGradeForEachCourse = () => {
    switch (courseid) {
      case '041': //หลักสูตรนายทหารชั้นผู้บังคับฝูง
        setSelGrade(gradegrptype[0]);
        break;
      case '073': //หลักสูตรครูการบินเพื่อฝึกศิษย์การบิน
        setSelGrade(gradegrptype[1]);
        break;
      default: //หลักสูตรทั่วไป
        setSelGrade(gradegrptype[2]);
        break;
    }
  };

  //console.log('grade >>> ', Object.keys(selgrade)[0], ' : ', Object.values(selgrade)[0]);
  /*----------------- Func : fetchdataToCreateDataGridRows--------------------------*/
  const fetchdataToCreateDataGridRows = async (subject, coursegrp, seminar) => {
    let list = [];
    await axios.get(process.env.REACT_APP_API +`/PageEstimate/Subject/${subject}/CourseGrp/${coursegrp}/Seminar/${seminar}`)
      .then((res) => {
        res.data.forEach((e, i) => {
          list.push(
            {
              id: Number(i + 1),
              persid: e.PersId,
              studentid: e.StudentId,
              studentname: e.StudentName,
              subjectid: e.SubjectId,
              subjectscore: e.SubjectScore,
              fullscore: fullscore,
              grade: e.Grade === '' ? Object.keys(selgrade)[0] : e.Grade,
              instructorid: UserId,  //get id from login
              currentdate: moment(new Date()).format('YYYY-MM-DD'),
            }
          );

          setCompleteList(
            arr => [
              ...arr,
              {
                id: Number(i + 1),
                fullscore: (fullscore !== 0) ? true : false,
                subjscore: (e.SubjectScore !== 0) ? true : false,
                grade: (e.Grade !== '') ? true : false,
                status: e.Status,
              }
            ]
          );
        }); //forEach
        setIndvScoreList(list);
        let fscore = res.data.filter(e => e.FullScore !== 0)[0]?.FullScore;
        setFullScore(fscore !== undefined ? fscore : 0);
        setLoading(false); //End of Data Loading 
      }) //then
      .catch((err) => {
        console.log('PageEstimate fetchdataToCreateDataGridRows failed >>> err ', err);
      });
  };

  /*--------------- Func : Change Text Color (Normal) --------------*/
  const completeCheckFunc = (i, key) => {
    let newArr = [...completeList];
    if (newArr[i] !== undefined) {
      //console.log('>>>>> ', Object.keys(newArr[i]), ' : ', Object.values(newArr[i]));
      newArr[i].fullscore = Number(indvScoreList[i].subjectscore / fullscore) > 0 ? true : false;
      switch (key) {
        case 0:
          newArr[i].subjscore = indvScoreList[i].subjectscore !== '0' ? true : false;
          break;
        case 1:
          newArr[i].grade = indvScoreList[i].grade !== Object.keys(selgrade)[0] ? true : false;
          break;
      }

      if (indvScoreList[i].grade === 'P' || indvScoreList[i].grade === 'U') {
        newArr[i].fullscore = true;
        newArr[i].subjscore = true;
      }

      if (newArr[i].fullscore && newArr[i].subjscore && newArr[i].grade) {
        newArr[i].status = 'เรียบร้อย';
      } else {
        newArr[i].status = 'ไม่เรียบร้อย';
      }

      setCompleteList(newArr);
    }
  };

  /*------------------------ Func : addAndUpdateGradeScore -------------------*/
  const addAndUpdateGradeScore = async (index) => {
    try {
      await axios.put(process.env.REACT_APP_API +'/PageEstimate/handleGradeAndScore', indvScoreList[index])
        .then(res => {
          console.log('addAndUpdateGradeScore response from server >>> ', res);
        })
        .catch(err => {
          console.log('addAndUpdateGradeScore failed >>> err : ', err);
        })
    } catch (err) {
      console.log('PageEstimate addAndUpdateGradeScore failed err >>> ', err);
    }
  }

  /*------------------------ Func : passStudListToPrintPage -------------------*/
  const passStudListToPrintPage = () => {
    return indvScoreList;
  }

  /*------------------------- Events : handleSubjectGrpSelect ---------------------*/
  const handleSubjectGrpSelect = (evt) => {
    setSubjectGrp(courseSubjList[evt.target.value].split(':')[0]);
    setSubjGrpName(`${courseSubjList[evt.target.value].split(':')[1]}`);
    setFullScore(0);
    setIndvScoreList([]);
    setCompleteList([]);
    setMatching('');
    setRowsPerPage(5);
    setLoading(false);
  };

  /*------------------------- Events : handleCourseGrpSelect ---------------------*/
  const handleCourseGrpSelect = (evt) => {
    setCourseGrp(grpSemList.coursegrplist[evt.target.value].split(' ')[1]);
    setFullScore(0);
    setIndvScoreList([]);
    setCompleteList([]);
    setMatching('');
    setRowsPerPage(5);
    setLoading(false);
  };

  /*------------------------- Events : handleSeminarSelect ---------------------*/
  const handleSeminarSelect = (evt) => {
    // console.log('handleSeminarSelect >>> ', evt.target.value);
    setSeminar(evt.target.value);
    //setSeminar(grpSemList.seminarlist[evt.target.value].split(' ')[1]);
    setFullScore(0);
    setIndvScoreList([]);
    setCompleteList([]);
    setMatching('');
    setRowsPerPage(5);
    setLoading(false);
  };

  /*------------------------- Events : AcceptBtnOnClick ---------------------*/
  const AcceptBtnOnClick = (evt) => {
    let cmpstr = subjectgrp + '-' + coursegrp + '-' + seminar;

    //console.log('AcceptBtnOnClick >>> ', cmpstr);

    if (subjectgrp === '' || coursegrp === '' || seminar === '') {
      setOpenAlertDialog(true);
    } else {
      if (matching !== cmpstr) {
        setMatching(subjectgrp + '-' + coursegrp + '-' + seminar);
        setLoading(true); //Start Data Loading
        fetchdataToCreateDataGridRows(subjectgrp, coursegrp, seminar);
      }
    }
  };

  //console.log('indvScoreList >>>>>>>>>>>>>>> ', indvScoreList);
  //console.log('completeList >>>>>>>>>>>>>>> ', completeList);
  /*-------------------------------- Return -------------------------*/
  return (
    <React.Fragment>
      <div className="cotainerDetail">
        <p className="HeadTextMain">การวัด และประเมินผลการเรียน</p>
        <div className="DropdownSelectModel">
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel
                htmlFor="subjgrp-select"
                sx={{
                  fontFamily: 'THSarabunNew',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
              >
                หมวดวิชา
              </InputLabel>
              <Select
                defaultValue={''}
                sx={{
                  fontFamily: 'THSarabunNew',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
                id="subjgrp-select"
                label="หมวดวิชา"
                onChange={handleSubjectGrpSelect}
              >
                {courseSubjList?.map((item, index) => {
                  return (
                    <MenuItem
                      sx={{
                        fontFamily: 'THSarabunNew',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}
                      key={index}
                      value={index}
                    >
                      {item.split(':')[1]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
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
                defaultValue={''}
                sx={{
                  fontFamily: 'THSarabunNew',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
                id="grouped-select"
                label="รุ่น"
                onChange={handleCourseGrpSelect}
              >
                {grpSemList.coursegrplist?.map((item, index) => {
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
                })}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel
                htmlFor="grouped-select"
                sx={{
                  fontFamily: 'THSarabunNew',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
              >
                สัมมนา
              </InputLabel>
              <Select
                defaultValue={''}
                sx={{
                  fontFamily: 'THSarabunNew',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
                id="seminar-select"
                label="สัมมนา"
                onChange={handleSeminarSelect}>
                {grpSemList.seminarlist?.map((item, index) => {
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
                })}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              sx={{
                minWidth: 100,
                minHeight: 55,
                m: 1,
                fontFamily: 'THSarabunNew',
                fontWeight: 'bold',
                fontSize: 16,
              }}
              startIcon={<ManageSearchIcon />} //add on 23.09.2022
              onClick={AcceptBtnOnClick}
            >
              ตกลง
            </Button>
          </Box>
        </div>
        <hr />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              sx={{ height: 100, fontSize: '20px', fontWeight: 'bold' }}
            >
              {subjgrpname}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'flex-end'}
              sx={{ height: 50, fontSize: '12px', fontWeight: 'bold' }}
            >
              <ToPrintPageEstimate
                dataToPrint={{
                  subjectname: subjgrpname,
                  subject: subjectgrp,
                  coursegrp: coursegrp,
                  seminar: seminar,
                }}
                Func={passStudListToPrintPage}
              />
            </Box>
          </Grid>
        </Grid>
        <hr />
        {/*------------- TableContainer ---------------------*/}
        <TableContainer component={Paper}>
          <Table
            sx={{
              minWidth: 700,
              '& .MuiTableCell-root': {
                borderTop: '1px solid rgba(95, 155, 255, 1)',
                borderBottom: '1px solid rgba(95, 155, 255, 1)',
              }
            }}

          >
            {/*------------ Table Header -------------------*/}
            <TableHead>
              <TableRow sx={{
                backgroundColor: '#DEF3FF',//'rgba(236, 236, 236, 1)',
                '& th': {
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  fontFamily: 'THSarabunNew',
                  //color: 'rgba(256, 256, 256)'
                }
              }}>
                <TableCell rowSpan={2} align='center'>ลำดับ</TableCell>
                <TableCell rowSpan={2} align='center'>เลขประจำตัว นทน.</TableCell>
                <TableCell rowSpan={2} align='center'>ยศ ชื่อ นามสกุล</TableCell>
                <TableCell colSpan={4} align='center'>สรุปคะแนนทั้งหมด</TableCell>
                <TableCell rowSpan={2} align='center'>สถานะ</TableCell>
                <TableCell rowSpan={2} align='center'>หมายเหตุ</TableCell>
              </TableRow>
              <TableRow
                sx={{
                  backgroundColor: '#DEF3FF',//'rgba(236, 236, 236, 1)',
                  '& th': {
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    fontFamily: 'THSarabunNew',
                    //color: 'rgba(256, 256, 256)'
                  }
                }}
              >
                <TableCell align='center'>คะแนนเต็ม</TableCell>
                <TableCell align='center'>คะแนนรวม</TableCell>
                <TableCell align='center'>ร้อยละคะแนนรวม</TableCell>
                <TableCell align='center'>ระดับคะแนน</TableCell>
              </TableRow>
            </TableHead>
            {/*------------ Table Body -------------------*/}
            <TableBody>
              {
                (rowsPerPage > 0
                  ? indvScoreList.slice(tbpage * rowsPerPage, tbpage * rowsPerPage + rowsPerPage)
                  : indvScoreList
                ).map((item, index) => {
                  index = rowsPerPage * tbpage + index;
                  return (
                    <TableRow key={index}>
                      <TableCell
                        align='center'
                        sx={{
                          fontWeight: 'bold',
                          fontFamily: 'THSarabunNew'
                        }}
                      >
                        {item.id}
                      </TableCell>
                      <TableCell
                        align='center'
                        sx={{
                          fontWeight: 'bold',
                          fontFamily: 'THSarabunNew'
                        }}
                      >
                        {item.studentid}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                          fontFamily: 'THSarabunNew'
                        }}
                      >
                        {item.studentname}
                      </TableCell>
                      {/*------ Full Score -----*/}
                      <TableCell align='center'>
                        <TextField
                          value={fullscore}
                          style={{
                            width: 100,
                            backgroundColor: fullscoreEnable ? '#FBFBFB' : '#CACACA',
                          }}
                          onChange={(evt) => {
                            setFullScore(evt.target.value);
                          }}
                          onBlur={(evt) => {
                            evt.preventDefault();
                            addAndUpdateGradeScore(index);
                          }}
                          InputProps={{
                            readOnly: !fullscoreEnable,
                            inputProps: {
                              style: { textAlign: 'center' },
                            }
                          }}
                        />
                      </TableCell>
                      {/*------ Subject Score -----*/}
                      <TableCell align='center'>
                        <TextField
                          value={indvScoreList[index].subjectscore}
                          style={{
                            width: 100,
                            backgroundColor: subjScoreEnable ? '#FBFBFB' : '#CACACA',
                          }}
                          onChange={(evt) => {
                            setIndvScoreList(
                              indvScoreList.map(item =>
                                item.id === (index + 1)
                                  ? { ...item, subjectscore: evt.target.value }
                                  : item
                              )
                            );
                          }}
                          onBlur={(evt) => {
                            evt.preventDefault();
                            completeCheckFunc(index, 0);
                            addAndUpdateGradeScore(index);
                          }}
                          InputProps={{
                            readOnly: !subjScoreEnable,
                            inputProps: {
                              style: { textAlign: 'center' },
                            }
                          }}
                        />
                      </TableCell>
                      {/*------ Score in percent -----*/}
                      <TableCell align='center'>
                        <TextField
                          style={{
                            width: 100,
                            backgroundColor: '#CACACA',
                          }}
                          value={
                            Number(fullscore) !== 0 ?
                              Number((indvScoreList[index].subjectscore / fullscore) * 100).toFixed(2) : '0.00'
                          }
                          inputProps={{
                            readOnly: true,
                            style: { textAlign: 'center' },
                          }}
                        />
                      </TableCell>
                      {/*----- Grade ----*/}
                      <TableCell align='center'>
                        <FormControl variant='standard'>
                          <Select
                            key={index}
                            defaultValue={''}
                            value={indvScoreList[index].grade ?? ''}
                            disableUnderline={true}
                            disabled={!gradeEnable}
                            onChange={(evt) => {
                              evt.preventDefault();
                              //let newArr = [...indvScoreList];
                              //newArr[index].grade = evt.target.value;
                              //setIndvScoreList(newArr);
                              indvScoreList[index].grade = evt.target.value;
                              setIndvScoreList([...indvScoreList]);
                              completeCheckFunc(index, 1);
                              addAndUpdateGradeScore(index);
                            }}
                          >
                            {
                              Object.keys(selgrade).map((elm, i) => {
                                return (<MenuItem key={i} value={elm}> {elm} </MenuItem>);
                              })
                            }
                          </Select>
                        </FormControl>
                      </TableCell>
                      {/*---------- Status -------------*/}
                      <TableCell
                        align='center'
                        sx={{
                          //fontSize: '1rem',
                          fontWeight: 'bold',
                          fontFamily: 'THSarabunNew',
                          color: indvScoreList[index].grade === 'F' ||
                            indvScoreList[index].grade === 'U' ?
                            'rgba(256, 0, 0)' : indvScoreList[index].grade !== '--' ?
                              'rgba(50, 200, 50)' : 'rgba(0, 0, 0)',
                        }}
                      >
                        {
                          selgrade[indvScoreList[index].grade]
                        }
                      </TableCell>
                      {/*---------- Score Remark -------------*/}
                      <TableCell
                        align='center'
                        sx={{
                          //fontSize: '1rem',
                          fontWeight: 'bold',
                          fontFamily: 'THSarabunNew',
                          color: () => {
                            if (completeList[index] !== undefined) {
                              return completeList[index].status === 'เรียบร้อย' ?
                                'rgba(50, 200, 50)' : 'rgba(256, 0, 0)';
                            } else {
                              return 'rgba(256, 0, 0)';
                            }
                          }
                        }}
                      >
                        {
                          completeList[index] !== undefined ? completeList[index].status : 'ไม่เรียบร้อย'
                        }
                      </TableCell>
                    </TableRow>
                  ); //End of Return
                }) //End of row.map  
              }
              {
                emptyRows > 0 && (
                  <TableRow style={{ height: 50 * emptyRows }}>
                    <TableCell colSpan={9} align='center'>
                      { /*loading && */<LoadingProgress loading={loading} />}
                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
            {/*--------- Table Footer -----------*/}
            <TableFooter>
              <TableRow>
                <TablePagination
                  page={tbpage}
                  count={indvScoreList.length}
                  //colSpan={9}
                  rowsPerPageOptions={[5, 10, 25, { label: 'ทั้งหมด', value: -1 }]}
                  rowsPerPage={rowsPerPage}
                  labelRowsPerPage={'จำนวนแถวต่อหน้า'}
                  labelDisplayedRows={({ from, to, count }) => `${from} - ${to} จาก ${count}`}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page'
                    },
                    native: true,
                  }}
                  onPageChange={(evt, page) => {
                    setTbPage(page);
                  }}
                  onRowsPerPageChange={(evt) => {
                    setRowsPerPage(parseInt(evt.target.value, 10));
                    setTbPage(0);
                  }}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      {
        openAlertDialog &&
        <AlertDialog
          title='แจ้งเตือน'
          content={'กรุณาเลือกหมวดวิชา รุ่น และ สัมมนา ที่ท่านต้องการค้นหา'}
          openDialog={openAlertDialog}
          setOpenDialog={setOpenAlertDialog}
        />
      }
    </React.Fragment>
  );
}

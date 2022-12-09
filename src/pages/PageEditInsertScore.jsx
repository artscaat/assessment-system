/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import TableEditPageInsertScoreOne from '../components/TableEditPageInsertScoreOne.jsx'
import TableEditPageInsertScoreTwo from '../components/TableEditPageInsertScoreTwo.jsx'
import ToPrintPageEditInsertScore from '../components/ToPrintPageEditInsertScore.js'
import { Button, Box, Grid } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Link, useLocation } from "react-router-dom";
import moment from 'moment-timezone';


/*------------------------- Functional Component : PageEditInsertScore ------------*/
const PageEditInsertScore = () => {
  const location = useLocation();
  const { id, prev_page, newdatastorage } = location.state;


  //console.log('location.state >>> ', location.state);

  let g_id = id;

  /*-------------- update :: 23.09.2022 >>> accessrights ----------------*/
  const [access, setAccess] = useState(
    localStorage.getItem('Access') || ''
  );
  const [backBtnHide, setBackBtnHide] = useState(access === "นทน." ? true : false);
  const [addBtnHide, setAddBtnHide] = useState(access !== "ปกครอง" && access !== "กรรมวิธี" ? true : false);

  //console.log('Access ', access);
  /*---------------- local storage to go forwards (only for start)-----------------------*/
  const [_datastorage, setDataStorage] = useState(() => {
    const localData = JSON.parse(localStorage.getItem('datastorage'));
    return (localData.length !== 0 ? localData : []);
  });

  /*-------------------- data for go back to previous page ---------------*/
  useEffect(() => {
    if (parseInt(prev_page) === 1) {
      setDataStorage(JSON.parse(newdatastorage));
    }
  }, [prev_page, newdatastorage.length]);

  const getUpdateFunc = (datastate) => {
    g_id = datastate.state.id;
    setDataStorage(JSON.parse(datastate.state.newdatastorage));
  };

  /*---------------- process to display both data sources -------------*/
  let storeitem = _datastorage.filter((item) => {
    return (item.id === g_id);
  });

  // console.log('PageEditInsertScore >>>> storeitem ', storeitem[0]);
  // console.log('PageEditInsertScore >>>> _datastorage ', _datastorage[0]);


  let dataToUse = Object.keys(storeitem).map((el) => {
    //console.log('dataToUse >>> el : ', el, ' : ', storeitem[el].CourseId, ' : ', storeitem[el].courseid);
    let obj = {
      'courseid': storeitem[el].CourseId === undefined ? storeitem[0].courseid : storeitem[0].CourseId,
      'studyperiod': storeitem[el].period,
      'coursegrp': storeitem[el].coursegrp,
      'seminar': storeitem[el].seminar,
      'persid': storeitem[el].persid,
      'studentid': storeitem[el].studentid,
      'studentname': storeitem[el].studentname,
      'hoursofleave': storeitem[el].businessleave,
      'hoursofsickleave': storeitem[el].sickleave,
      'conductscore': storeitem[el].conductscore,
      'totaltimestudy': storeitem[el].sumattendhrs,
      'percentagestudy': storeitem[el].percentattendhrs,
      'remark': storeitem[el].remark
    };
    //console.log('dataToUse >>> obj : ', obj);
    return obj;
  });

  // console.log('PageEditInsertScore >>>> dataToUse: ', dataToUse);

  /*------------------------ Create title -------------------*/
  const pTagRef = useRef();
  useEffect(() => {
    if (pTagRef.current) {
      pTagRef.current.innerText = `เลขประจำตัว นทน.: ${dataToUse[0].studentid} เลขประจำตัวข้าราชการ: ${dataToUse[0].persid} ชื่อ: ${dataToUse[0].studentname}`;
    }
  }, []);

  /*--------------------- add :: 25.08.2565 ----------------*/
  const defineDate = () => {
    let def_date = 0; //miliseconds
    let hrs = (new Date()).getHours();

    if (!(hrs >= 8 && hrs <= 16)) {
      def_date = (new Date()).setHours(8, 0, 0, 0);
    } else {
      let min = (new Date()).getMinutes();
      if (min > 0 && min < 30) {
        def_date = (new Date()).setMinutes(30, 0, 0);
      } else if (min > 30 && min < 60) {
        let h = (new Date()).getHours() + 1;
        def_date = (new Date()).setHours(h, 0, 0, 0);
      }
    }
    return new Date(def_date);
  }
  /*--------------------------------------------------------*/

  // console.log('dataToUse[0] >>>>>>>>>>>>>> ', dataToUse[0]);
  return (
    <React.Fragment>
      <div className='cotainerDetail'>
      <Box flexGrow={1}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box display={'flex'} justifyContent={'flex-end'} sx={{ padding: '5px' }}>
              <Link to="/PageInsertScore" state={{
                coursegrp: dataToUse[0]?.coursegrp,
                seminar: dataToUse[0]?.seminar
              }}
              >
                <Button
                  variant={'contained'}
                  startIcon={<NavigateBeforeIcon />}
                  sx={{
                    display: backBtnHide ? 'none' : '', // added : 23.09.2022
                    minWidth: 100,
                    minHeight: 55,
                    m: 1,
                    fontFamily: 'THSarabunNew',
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginRight: '130px'
                  }}
                >
                  ย้อนกลับ
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <div style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
              ชั่วโมงการศึกษา และคะแนนความประพฤติ
            </div>
          </Grid>
          <Grid item xs={12} style={{ height: '50px' }} />
          <Grid item xs={12}>
            <div
              ref={pTagRef}
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ height: '50px' }} />
          <Grid item xs={12}>
            <div style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
              สรุปชั่วโมงการศึกษา
            </div>
          </Grid>

          <Grid item xs={12}>
            {/*-------------- TableEditPageInsertScoreOne ---------------------*/}
            <Box display={'flex'} sx={{
              marginLeft: '80px'
            }}>
              {/*------------------ updated on 24.09.2022 -------------------*/}
              <ToPrintPageEditInsertScore toprint={dataToUse[0]} />
            </Box>
            <Box display={'flex'} justifyContent={'center'}>
              <TableEditPageInsertScoreOne
                data={dataToUse[0]}
              />
            </Box>
            <Box display='flex' justifyContent='flex-end' sx={{ padding: '10px' }}>
              <div style={{ fontSize: 16, fontWeight: 'bold', marginRight:'130px' }}>
                สถานะ&ensp;
                {
                  Number(dataToUse[0].percentagestudy) >= 80 ?
                    <span style={{ color: '#018822' }}>ผ่าน</span> :
                    <span style={{ color: '#A50000' }}>ไม่ผ่าน</span>
                }
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} style={{ height: '50px' }} />
          <Grid item xs={12} >
            <div style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
              ประวัติการลา
            </div>
          </Grid>
          <Grid item xs={12}>
            <Box display={'flex'} justifyContent={'flex-end'} >
              <Link to="/PageUpdateAndRecordLeave" state={{
                addleave: 1,
                sel_student: {
                  'persid': dataToUse[0].persid,
                  'studentid': dataToUse[0].studentid,
                  'studname': dataToUse[0].studentname,
                  'courseid': dataToUse[0].courseid,
                  'coursegrp': dataToUse[0].coursegrp,
                  'seminar': dataToUse[0].seminar,
                  'leavestartdate': moment(new Date()).format('YYYY-MM-DD'),
                  /*------------- updated :: 26.08.2565 --------------*/
                  'leavestarttime': moment(defineDate()).format('HH:mm:ss'),
                  //moment(new Date()).format('HH:mm:ss'),
                  'leaveenddate': moment(new Date()).format('YYYY-MM-DD'),
                  'leaveendtime': moment(defineDate()).format('HH:mm:ss'),
                  //</Box>moment(new Date()).format('HH:mm:ss'),
                }
              }}>
                <Button
                  variant={'contained'}
                  startIcon={<AddBoxIcon />}
                  sx={{
                    minWidth: 100,
                    minHeight: 55, 
                    m: 1,
                    display: addBtnHide ? 'none' : '', // added : 23.09.2022
                    fontFamily: 'THSarabunNew',
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginRight: '130px'
                  }}
                >
                  วันลา
                </Button>
              </Link>
            </Box>
            <Box display={'flex'}>
              {/*-------------- TableEditPageInsertScoreTwo ---------------------*/}
              <TableEditPageInsertScoreTwo
                data={dataToUse[0]}
                updateFunc={getUpdateFunc}
              />
            </Box>
          </Grid>
        </Grid> {/*---- End Grid Container ----*/}
      </Box>
      </div>
    </React.Fragment>
  );
}

export default PageEditInsertScore;

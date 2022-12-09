/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation, useNavigate } from "react-router-dom";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SaveIcon from '@mui/icons-material/Save';
import AlertDialog from '../components/AlertDialog';
import { toast } from 'react-toastify';
import axios from 'axios';

/*------------------------- Columns of Table ----------------------*/
const columns = [
  {
    field: 'personalattributes',
    headerName: 'คุณลักษณะส่วนบุคคล',
    minWidth: 300,
    headerAlign: 'center',
    flex: 1
  },
  {
    field: 'fullscore',
    headerName: 'คะแนนเต็ม',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
    flex: 1
  },
  {
    field: 'score',
    headerName: 'คะแนนที่ได้',
    cellClassName: 'super-app-theme--cell',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    editable: true,
  }
];

/*----------------- Functional Components ------------*/
export default function PageEditAttribute() {
  /*------------------------ list --------------------*/
  const pTagRef = useRef();
  const [persattrdata, setPersAttrData] = useState([]);
  const [rows, setRows] = useState([]);

  /*-------------------- get login user from local storage ------------------*/
  const [loginusr, setUsrLogin] = useState(() => {
    const initvalues = JSON.parse(localStorage.getItem('PersonalHistory'));
    return initvalues || '';
  });

  /*-------------------- get props (id) from PageAttribute ------------------*/
  const location = useLocation();
  const navigate = useNavigate()
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const { id } = location.state;

  /*-------------------- Local Storage ----------------------*/
  const [datastorage, setDataStorage] = useState(() => {
    const initvalues = JSON.parse(localStorage.getItem('datastorage'));
    return initvalues || '';
  });

  let storeitem = datastorage.filter((item) => {
    return (item.id === id);
  });

  let tmp = Object.keys(storeitem).map((el) => {
    let obj = {};
    obj['courseid'] = storeitem[el].CourseId;
    obj['persid'] = storeitem[el].persid;
    obj['studid'] = storeitem[el].studentid;
    obj['name'] = storeitem[el].name;
    obj['score'] = storeitem[el].score;
    obj['coursegrp'] = storeitem[el].CourseGrp;
    obj['seminar'] = storeitem[el].Seminar;
    return obj;
  });

  //console.log("tmp: ", tmp)

  /*----------------------- Event Func --------------------------------*/
  const fetchdata = async () => {
    await axios.get(process.env.REACT_APP_API + `/PageEditAttribute/courseid/${tmp[0].courseid}/coursegrp/${tmp[0].coursegrp}/studentid/${tmp[0].studid}/name/${tmp[0].name}`)
      .then(p_scorelist => {
        setPersAttrData(p_scorelist);
      })
      .catch(err => {
        console.log('PageEditAttribute -> fetchdata failed -> err >>> ', err);
      });
  };

  const saveToDatabase = async () => {
    let mul = 1;
    rows.forEach((e) => {
      mul = mul * e.score
    });

    const score = rows.filter((e) => { return e.score > e.fullscore ? true : false })

    if (!isNaN(mul) && score.length === 0) {
      let lastestscore = {};
      lastestscore['CourseId'] = tmp[0].courseid;
      lastestscore['PersId'] = tmp[0].persid;
      lastestscore['PerAttrScore'] = rows.map((e) => { return e.score });
      lastestscore['InstructorId'] = loginusr[0].PersId;
      await axios.put(process.env.REACT_APP_API + '/PageEditAttribute/lastestscore', lastestscore)
        .then((res) => {
          navigate('/pageAttribute',
            {
              state: {
                backcoursegrp: tmp[0].coursegrp,
                backseminar: tmp[0].seminar,
              }
            }
          )
          toast.success("บันทึกข้อมูลสำเร็จ")
        })
        .catch((err) => {
          console.log('PageEditAttribute saveToDatabase failed >>> err : ', err);
        })
    } else {
      toast('กรุณาตรวจสอบความครบถ้วนของคะแนนและค่าระดับคะแนนไม่เกินคะแนนเต็ม');
    }
  }

  const handleRowEditCommit = (params, event) => {
    rows[params.id - 1].score = parseFloat(params.value);
    let num = parseFloat(params.value);
    // if (num === 0 || isNaN(num) || num > parseFloat(rows[params.id - 1].fullscore)) {
    if (num === 0 || isNaN(num)) {
      toast('กรุณากรอกคะแนนให้ครบทั้ง 10 ด้านก่อนบันทึกผล');
    } else {
      setRows(rows);
    }
  }

  /*---------------------- Use Effect --------------------------------*/
  useEffect(() => {
    if (pTagRef.current) {
      pTagRef.current.innerText = `เลขประจำตัว นทน. : ${tmp[0].studid} เลขประจำตัวข้าราชการ : ${tmp[0].persid} ชื่อ : ${tmp[0].name}`;
    }

    fetchdata();

    let title = ['ด้านที่ 1 ความวิริยะอุตสาหะ', 'ด้านที่ 2 วินัย', 'ด้านที่ 3 ความประพฤติ',
      'ด้านที่ 4 บุคลิกลักษณะ', 'ด้านที่ 5 นิสัยและอุปนิสัย', 'ด้านที่ 6 การสังคม',
      'ด้านที่ 7 ความเป็นผู้นำ', 'ด้านที่ 8 เชาว์ริเริ่ม', 'ด้านที่ 9 การปฏิบัติงาน',
      'ด้านที่ 10 ดุลยพินิจ'];

    const rows = new Array(10).fill().map((item, key) => {
      let elm = {};
      elm['id'] = parseInt(key + 1);
      elm['personalattributes'] = title[key];
      elm['fullscore'] = storeitem[0].fullscore / title.length;
      elm['score'] = persattrdata !== undefined && persattrdata.length !== 0 ? persattrdata.data[0].score[key].score : 0;
      return elm;
    });
    setRows(rows);
  }, [persattrdata?.length]);

  /*------------------------------- Render (Return) -------------------*/
  return (
    <React.Fragment>
      <div className="cotainerDetail">
        <p className="HeadTextMain"
          style={{
            fontSize: '24px', /*color: "#4a54f1",*/
            fontWeight: 'bold',
            textAlign: "center"
          }}>
          ประเมินผลคุณลักษณะส่วนบุคคล
        </p>
        <hr />
        <div
          className="containerNameStu"
          ref={pTagRef}
          style={{
            fontSize: '20px', /*color: "#4a54f1",*/
            fontWeight: 'bold',
            textAlign: "center"
          }}>
        </div>
        <hr />
        <Container >
          <Box
            display={'flex'}
            justifyContent={'center'}
            sx={{
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            ผู้ลงคะแนน:&ensp;{loginusr[0].Rank + ' ' + loginusr[0].PersFname + ' ' + loginusr[0].PersLname}&ensp;ตำแหน่ง&ensp;{loginusr[0].PersCurrPosition + ' ' + loginusr[0].PersAffiliation}
          </Box>
          <hr />
          <Box
            display={'flex'}
            sx={{
              height: 650,
              '& .super-app-theme--cell': {
                backgroundColor: 'rgba(240, 240, 240, 1)',
                color: '#1a3e72',
                fontWeight: '600',
              },
            }}
            justifyContent={'center'}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 20]}
              hideFooterPagination={true}
              experimentalFeatures={{ newEditingApi: true }}
              onCellEditCommit={
              // onCellEditStop={
                handleRowEditCommit
              }
            />
          </Box>
          <hr />
          <div className="containerBack">
            <Button variant="outlined"
              sx={{
                minWidth: 100,
                minHeight: 55,
                m: 1,
                fontFamily: 'THSarabunNew',
                fontWeight: 'bold',
                fontSize: 16,
              }}
              startIcon={<SaveIcon />}
              onClick={() => {
                saveToDatabase();
              }}>บันทึก</Button>
            <Button
              variant="outlined"
              sx={{
                minWidth: 100,
                minHeight: 55,
                m: 1,
                fontFamily: 'THSarabunNew',
                fontWeight: 'bold',
                fontSize: 16,
              }}
              startIcon={<NavigateBeforeIcon />}
              onClick={() => {
                navigate('/PageAttribute', {
                  state: {
                    backcoursegrp: tmp[0].coursegrp,
                    backseminar: tmp[0].seminar
                  }
                }
                );
              }}
            >
              ย้อนกลับ
            </Button>
          </div>
        </Container>
      </div>
      {
        openAlertDialog &&
        <AlertDialog
          title='แจ้งเตือน'
          content={'กรุณาคลิกเลือกผู้ลงคะแนนคุณลักษณะส่วนบุคคลของ นทน.'}
          openDialog={openAlertDialog}
          setOpenDialog={setOpenAlertDialog}
        />
      }
    </React.Fragment>
  );
}



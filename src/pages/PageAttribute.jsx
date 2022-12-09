/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { InputLabel, MenuItem, FormControl, Select, Box, Button, Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ManageSearchIcon from '@mui/icons-material/ManageSearch'; //added on 23.09.2022
import IconButton from "@mui/material/IconButton";
import PrintIcon from '@mui/icons-material/Print';
import { Edit } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import ToPrintPageAttrbute from '../components/ToPrintPageAttribute';
import ToPrintIndvPageAttrbute from '../components/ToPrintIndvPageAttribute';
import axios from 'axios';

/*----------------------- Functional Component ---------------------*/
export default function PageAttribute() {
  const componentRef = useRef(null);
  const [rowtoreport, setRowToReportOnClick] = useState(0);

  const fetchIndvDataToPrint = async (courseid, coursegrp, studentid, studentname) => {
    try {
      let p_scorelist = await axios.get(process.env.REACT_APP_API + `/PageEditAttribute/courseid/${courseid}/coursegrp/${coursegrp}/studentid/${studentid}/name/${studentname}`);
      return p_scorelist;
    } catch (err) {
      console.log('PageAttrbute -> fetchdata to print failed -> err >>> ', err);
    }
  };

  /*-------------------- Hidding Datagrid column : added on 29.10.2022-----------------------*/
  const [access, setAccess] = useState(
    localStorage.getItem('Access') || ''
  );

  const fieldhidden = {
    'นทน.': true,
    'อาจารย์ประจำหมวดวิชา': true,
    'ปกครอง': false,
    'วัดผล': true,
    'กรรมวิธี': false,
    'ผอ.': true,
    'กรรมวิธีส่วนกลาง': false,
    'วัดผลส่วนกลาง': true,
  }

  /*---------------- columns ----------------*/
  const columns = [
    {
      field: 'id',
      headerName: 'ลำดับ',
      width: 70,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'studentid',
      headerName: 'เลขประจำตัว',
      width: 110,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'name',
      headerName: 'ยศ-ชื่อ-สกุล',
      width: 150,
      headerAlign: 'center',
    },
    {
      field: 'fullscore',
      headerName: 'รวมคะแนนเต็ม',
      width: 130,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'score',
      headerName: 'คะแนนที่ได้',
      width: 130,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'averagescore',
      headerName: 'คะแนนเฉลี่ย',
      width: 130,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'edit',
      headerName: 'แก้ไข/ประเมินผลการเรียน',
      width: 180,
      headerAlign: 'center',
      align: 'center',
      hide: fieldhidden[access],
      renderCell: (params) => {
        return (
          <>
            <Link to='/PageEditAttribute' state={{ id: params.id }} >
              <Edit className="userListDate" />
            </Link>
          </>
        )
      }
    },
    {
      field: 'status',
      headerName: 'สถานะ',
      width: 70,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <div style={{
            fontWeight: 'bold',
            color: params.value ? '#018822' : '#A50000'
          }}>
            {params.value ? 'ผ่าน' : 'ไม่ผ่าน'}
          </div>
        )
      }
    },
    {
      field: 'print',
      headerName: 'พิมพ์',
      width: 70,
      headerAlign: 'center',
      align: 'center',
      hide: fieldhidden[access],
      renderCell: (params) => {
        return (
          <div>
            <IconButton
              onClick={() => {
                fetchIndvDataToPrint(
                  params.row.CourseId,
                  params.row.CourseGrp,
                  params.row.studentid,
                  params.row.name
                )
                  .then(indvdata => {
                    setRowToReportOnClick(indvdata.data);
                    componentRef.current.handleprint();
                  })
                  .catch(err => {
                    console.log('PageAttrbute : rendercell -> fetchdata to print failed -> err >>> ', err);
                  });
              }}
            >
              <PrintIcon />
            </IconButton >
          </div>
        )
      }
    },
    {
      field: 'note',
      headerName: 'หมายเหตุ',
      width: 130,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <div style={{
            fontWeight: 'bold',
            color: params.value ? '#018822' : '#A50000'
          }}>
            {params.value ? 'เรียบร้อยแล้ว' : 'รอลงคะแนน'}
          </div>
        )
      }
    }
  ];

  /*------------------------- Initial useState ---------------------*/
  const [grpselected, setGrpSelect] = useState('');
  const [semselected, setSemSelect] = useState('');
  const [dropdownitems, setDropDownList] = useState([]);

  /*--------------- get coursegrp and seminar from PageEditAttribute ---------------*/
  const location = useLocation();
  const { backcoursegrp, backseminar } = location.state || {};

  /*--------------- Function used in this component ----------------*/
  const fetchdataToCreateList = async (_coursegrp, _seminar) => {
    // console.log("data SeminarList A: ", _seminar)
    try {
      const courId = localStorage.getItem('AccessRights').substring(11, 14)
      let response = await axios.get(process.env.REACT_APP_API + `/PageAttribute/coursegrp/${_coursegrp}/seminar/${_seminar}/${courId}`);

      if (response.data !== undefined) {
        setDataStorage(response.data.map((e) => Object.assign(e, { 'CourseId': courId, 'CourseGrp': _coursegrp, 'Seminar': _seminar })));
        setStudListTable(response.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  /*--------------- get data to create dropdown list ---------------*/
  useEffect(() => {
    (async () => {
      try {
        const courId = localStorage.getItem('AccessRights').substring(11, 14)
        let resdata = await axios.get(process.env.REACT_APP_API + `/PageAttribute/${courId}`);
        resdata.data.seminar.unshift('ทุกสัมมนา'); //---added on 26.09.2022
        // console.log("data SeminarList A: ", resdata.data)
        if (resdata.data !== undefined) {
          setDropDownList(resdata.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, [setDropDownList]);

  /*------------------------- make Student List ---------------------------*/
  const btnclick_ref = useRef(null);
  const [studlist, setStudListTable] = useState([]);

  const [coursegrp, setCourseGrp] = useState('');
  const handleCourseGrpSelect = (event, child) => {
    const arr = Object.values(child)[4].children.split(' ');
    setCourseGrp(parseInt(arr[1]));
    setGrpSelect(dropdownitems.coursegrp.findIndex((e) => e.includes(arr[1])));
  };

  const [seminar, setSeminar] = useState('');
  const handleSeminarSelect = (event, child) => {
    const arr = Object.values(child)[4].children.split(' ');
    // console.log("dataAtt: ", event.target.value)
    // console.log("arr: ", arr)
    setSeminar(event.target.value === 0 ? 0 : parseInt(arr[1]));
    setSemSelect(event.target.value === 0 ? 0 : dropdownitems.seminar.findIndex((e) => e.includes(arr[1])));
  };

  /*------------------- local storage ------------------------------*/
  const [datastorage, setDataStorage] = useState([]);
  localStorage.setItem('datastorage', JSON.stringify(datastorage));

  /*----------------------- Use Effect (Accept Button Clicked)-----------------------------*/
  useEffect(() => {
    const acceptBtnOnClick = () => {
      // console.log('PageAttr >>>> fetchdataToCreateDataGridRows ', coursegrp, ' : ', seminar);
      fetchdataToCreateList(coursegrp, seminar);
    };
    btnclick_ref.current = acceptBtnOnClick;
  }, [coursegrp, seminar, datastorage]);

  /*---------------------- Use Effect (Get back from PageEditAttribute) -------------------*/
  useEffect(() => {
    if (backcoursegrp !== undefined && dropdownitems.coursegrp !== undefined) {
      setGrpSelect(dropdownitems.coursegrp.findIndex((e) => e.includes(backcoursegrp)));
      setCourseGrp(backcoursegrp);
    }

    if (backseminar !== undefined && dropdownitems.seminar !== undefined) {
      //setSemSelect(dropdownitems.seminar.findIndex((e) => e.includes(backseminar)));
      setSemSelect(backseminar);
      setSeminar(backseminar);
    }

    fetchdataToCreateList(backcoursegrp, backseminar);

  }, [dropdownitems.coursegrp, dropdownitems.seminar]);

  const passStudListToPrintPage = () => {
    return studlist;
  }

  /*------------------------------- Return ---------------------------*/
  return (
    <React.Fragment>
      <ToPrintIndvPageAttrbute
        ref={componentRef}
        dataToPrint={rowtoreport}
      />

      <div className="cotainerDetail">
        <p className="HeadTextMain">การวัด และประเมินคุณลักษณะส่วนบุคคล</p>
        <div className="DropdownSelectModel">
          <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
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
                value={grpselected}
                id="grouped-select"
                label="รุ่น"
                onChange={handleCourseGrpSelect}
                sx={{
                  fontFamily: 'THSarabunNew',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
              >
                {dropdownitems.coursegrp?.map((item, index) => {
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
                value={semselected}
                id="seminar-select"
                label="สัมมนา"
                onChange={handleSeminarSelect}
                sx={{
                  fontFamily: 'THSarabunNew',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
              >
                {dropdownitems.seminar?.map((item, index) => {
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
              onClick={() => btnclick_ref.current()}
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
        <Container> {/*------- To Print ------*/}
          <ToPrintPageAttrbute
            grpAndSem={{
              coursegrp: coursegrp,
              seminar: seminar,
            }}
            Func={passStudListToPrintPage}
          />
          <div style={{ height: 700, width: '100%' }}>
            <DataGrid
              rows={studlist}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10]}
            />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}
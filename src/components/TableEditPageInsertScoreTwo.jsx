/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { red, yellow, green } from '@mui/material/colors';
import FilePreviewDialogBox from '../components/FilePreviewDialog';
import ConfirmDialogBox from './ConfirmDialogBox';
import AlertDialog from './AlertDialog';
import axios from 'axios';

/*------------- TableEditPageInsertScoreTwo -------------*/
const TableEditPageInsertScoreTwo = (props) => {

  // console.log('TableEditPageInsertScoreTwo >>> ', props.data);

  /*-------------- update :: 23.09.2022 >>> accessrights ----------------*/
  const [access, setAccess] = useState(
    localStorage.getItem('Access') || ''
  );
  const [editColHide, setEditColHide] = useState(
    access !== "ปกครอง" && access !== "กรรมวิธี" ? true : false
  );
  const [delColHide, setDelColHide] = useState(
    access !== "ปกครอง" ? true : false
  );

  //console.log('TableEditPageInsertScoreTwo >>> ', props.data);
  const [prvwfile, setPrvwFile] = useState('');
  const [rowsdata, setRowsData] = useState([]);
  const navigate = useNavigate();
  /*---------------- Columns ----------*/
  const columns = [
    {
      field: 'no',
      headerName: 'ลำดับ',
      width: 60,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'leavestartdate',
      headerName: 'วันเริ่มต้นลา',
      width: 110,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'leavestarttime',
      headerName: 'เวลาเริ้มต้นลา',
      width: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'leaveenddate',
      headerName: 'วันสิ้นสุดการลา',
      width: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'leaveendtime',
      headerName: 'เวลาสิ้นสุดการลา',
      width: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'numberofhoursleave',
      headerName: 'จำนวนชั่วโมงลา',
      width: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'leavetype',
      headerName: 'ประเภทการลา',
      width: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'persontakingtheleave',
      headerName: 'ผู้ลงการลา',
      width: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'leavedocument',
      headerName: 'เอกสารการลา',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <div>
            <IconButton onClick={() => {
              //console.log('leavedocument >>> ', params.getValue(params.id, 'leavedocument'));
              let filepath = params.getValue(params.id, 'leavedocument').replace(/\\/g, '/');
              setPrvwFile(filepath);
              setOpenFilePreviewDialog(true);
            }}>
              <PreviewIcon sx={{ color: green['A700'] }} />
            </IconButton >
          </div>
        )
      }
    },
    {
      field: 'edit',
      headerName: 'แก้ไข',
      width: 70,
      headerAlign: 'center',
      align: 'center',
      hide: editColHide, //add 23.09.2022
      renderCell: (params) => {
        return (
          <IconButton onClick={() => {
            navigate('/PageUpdateAndRecordLeave',
              {
                state: {
                  sel_student: {
                    'persid': props.data.persid,
                    'studentid': props.data.studentid,
                    'studname': props.data.studentname,
                    'courseid': props.data.courseid,
                    'coursegrp': props.data.coursegrp,
                    'seminar': props.data.seminar,
                    'classattendid': rowsdata.filter((e) => e.id === params.id)[0].classattendid,
                    'leavestartdate': changeDateToInterFormat(params.getValue(params.id, 'leavestartdate')),
                    'leavestarttime': params.getValue(params.id, 'leavestarttime'),
                    'leaveenddate': changeDateToInterFormat(params.getValue(params.id, 'leaveenddate')),
                    'leaveendtime': params.getValue(params.id, 'leaveendtime'),
                    'leavetype': params.getValue(params.id, 'leavetype'),
                    'leavedocument': params.getValue(params.id, 'leavedocument'),
                    'persontakingtheleave': params.getValue(params.id, 'persontakingtheleave'),
                    'leavereason': rowsdata.filter((e) => e.id === params.id)[0].leavereason
                  }
                }
              })
          }}>
            <EditIcon sx={{ color: yellow['A700'] }} />
          </IconButton>
        )
      }
    },
    {
      field: 'delete',
      headerName: 'ลบ',
      width: 70,
      headerAlign: 'center',
      align: 'center',
      hide: delColHide, //add 23.09.2022
      renderCell: (params) => {
        return (
          <div>
            <IconButton onClick={() => {
              onShowConfirmDialog(); //To open delete confirm dialog
              setDelRowsId(params.id);
              setDelRowsNr(params.getValue(params.id, 'no'));
            }}>
              <DeleteIcon sx={{ color: red['A700'] }} />
            </IconButton>
            {/*--------------- Delete Confirmation Dialog ---------------*/}
            <ConfirmDialogBox
              title='ยืนยันการลบข้อมูลการลา'
              content={`คุณต้องการลบข้อมูลการลาลำดับที่ ${delRowNr} ของ ${props.data.studentname} ที่เลือกหรือไม่?`}
              setDelFlag={setDelFlag}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
            />
          </div>
        )
      }
    },
  ];

  /*------------------------Dialog -------------------------------*/
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [openFilePreviewDialog, setOpenFilePreviewDialog] = useState(false);

  /*---------------- Control Delete Confirm Dialog -------------------*/
  const [delrowsid, setDelRowsId] = useState(-1);
  const [delRowNr, setDelRowsNr] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [delflag, setDelFlag] = useState(false);

  const onShowConfirmDialog = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    const handleDeleteProcess = async (delitem_id, filepath) => {
      let delsuccess = 0;
      let deleteitems = {
        itemid: delitem_id,
        filename: filepath
      };
      await axios.delete(process.env.REACT_APP_API + '/PageEditInsertScore/deleteitems',
        { data: deleteitems },
      )
        .then((res) => {
          if (res.data === 'OK') {
            delsuccess = 1;
          }
          let remain_rows = rowsdata.filter((e) => e.id !== delrowsid);
          for (let i = 0; i < remain_rows.length; i++) {
            remain_rows[i].no = parseInt(i + 1);
          }
          setRowsData(remain_rows);
          setDelFlag(false);
        })
        .catch((err) => {
          console.log('TableEditPageInsertScoreTwo delete failed >>> err : ', err);
          if (err) delsuccess = 0;
        });

      return delsuccess;
    };

    if (delflag) {
      let del_rows = rowsdata.filter((e) => e.id === delrowsid);
      handleDeleteProcess(del_rows[0].classattendid, del_rows[0].leavedocument)
        .then((res) => {
          //console.log('handleDeleteProcess res >> ', res);
          setOpenAlertDialog(true);
          //if(!openAlertDialog)
          handleDelItemsInTable(del_rows);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delflag/*, delrowsid*/]);

  /*-------------- Function to update the tbeditpageinsertscoreone ---*/
  const handleDelItemsInTable = async (data) => {
    let _coursegrp = props.data.coursegrp;
    let _seminar = props.data.seminar;
    const CourseId = localStorage.getItem('AccessRights').substring(11, 14);
    await axios.get(process.env.REACT_APP_API + `/PageInsertScore/coursegrp/${_coursegrp}/${_seminar}/${CourseId}`)
      .then((results) => {
        let lastresult = results.data.filter((e) => e.persid === data[0].classattendid.split('-')[0]);
        props.updateFunc(
          {
            state:
            {
              id: lastresult[0].id,
              prev_page: 2,
              newdatastorage: JSON.stringify(results.data.map((e) => Object.assign(e,
                {
                  'courseid': CourseId, //// have to edit to get courseid from local storage or some sources
                  'coursegrp': _coursegrp,
                  'seminar': _seminar,
                  'pageinsertscore': 0
                }
              )))
            }
          }
        );
      })
      .catch((err) => {
        console.log('cannot updated table after delete process >>> err : ', err);
      });
  }

  /*----------------------- Function to covert time format ----------*/
  const changeDateToThaiFormat = (curr_date) => {
    const th_month = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const datearr = curr_date.split('-');
    let year = (parseInt(datearr[0]) + 543).toString().substring(2, 4);
    let month = th_month[parseInt(datearr[1]) - 1];
    let curr_thdate = parseInt(datearr[2]).toString() + ' ' + month + year;
    return curr_thdate;
  };

  const changeDateToInterFormat = (th_date) => {
    const th_month = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    let _day = th_date.length !== 0 ? th_date.substring(0, th_date.indexOf(' ')) : '';
    let _month = th_date.length !== 0 ? th_date.substring(th_date.indexOf(' '), th_date.length - 2) : '';
    let _year = th_date.length !== 0 ? th_date.substring(th_date.length - 2, th_date.length) : '';
    let int_year = 2500 + parseInt(_year) - 543;
    let int_month = ((th_month.findIndex((e) => e === _month.trim()) + 1) < 10) ? '0'.concat((th_month.findIndex((e) => e === _month.trim()) + 1).toString()) : (th_month.findIndex((e) => e === _month.trim()) + 1).toString();
    let int_day = (parseInt(_day) < 10) ? '0'.concat(_day) : _day;
    let int_date = (int_year + '-' + int_month + '-' + int_day);

    return int_date;
  };

  /*--------------- Function to fetch data from the related database ----------*/
  const fetchdata = async (data) => {
    let list = await axios.get(process.env.REACT_APP_API + `/PageEditInsertScore/courseid/${data.courseid}/persid/${data.persid}`);
    let newlist = list.data.map((e, indx) => {
      let tmp = {
        'id': parseInt(indx) + 1,
        'no': parseInt(indx) + 1,
        'classattendid': e.ClassAttendId,
        'leavestartdate': changeDateToThaiFormat(e.BeginLeaveDate),
        'leavestarttime': e.BeginLeaveTime,
        'leaveenddate': changeDateToThaiFormat(e.EndLeaveDate),
        'leaveendtime': e.EndLeaveTime,
        'numberofhoursleave': e.LeaveHrs,
        'leavetype': (e.LeaveType === 'B') ? 'ลากิจ' : 'ลาป่วย',
        'persontakingtheleave': e.tbaccessrights[0].Rank + ' ' + e.tbaccessrights[0].PersFname + ' ' + e.tbaccessrights[0].PersLname,
        'leavedocument': e.filepath,
        'leavereason': e.Reason
      }
      return tmp;
    });
    return newlist;
  }

  /*------------- set Data to the datagrid ---------------*/
  useEffect(() => {
    const getAndSetDataInRows = async (data) => {
      await Promise.all([fetchdata(data)]).then((e) => {
        setRowsData(e[0]);
      });
    };
    getAndSetDataInRows(props.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data.studentid]);

  return (
    <React.Fragment>
      <div style={{ height: 500, width: '90%', marginLeft: '50px' }}>
        <DataGrid
          rows={rowsdata}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
      {
        openAlertDialog &&
        <AlertDialog
          title='แจ้งผลการลบข้อมูล'
          content={`ข้อมูลการลาของ ${props.data.studentname} ถูกลบเรียบร้อยแล้ว`}
          openDialog={openAlertDialog}
          setOpenDialog={setOpenAlertDialog}
        />
      }
      { /*--------------- File Preview DialogBox ---------------*/
        /*--------------- added on 29.09.2022 ------------------*/
        openFilePreviewDialog &&
        <FilePreviewDialogBox
          title={`เอกสารการลาของ ${props.data.studentname}`}
          previewfile={prvwfile}
          openDialog={openFilePreviewDialog}
          setOpenDialog={setOpenFilePreviewDialog}
        />
      }
    </React.Fragment>
  );
}

export default TableEditPageInsertScoreTwo;




/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import Axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { updateHrs } from "../slices/courseSlice";


export default function TableSubject() {
  
  // const server = process.env.REACT_APP_API + '';
  const dispatch = useDispatch();
  const AccessRights = localStorage.getItem('AccessRights')
  const CourseId = AccessRights.substring(11, 15);

  //รายวิชาแสดงตาราง
  const [SubjectList, setSubjectList] = useState([]);
  const [search, setSearch] = useState("");
  //รับค่าจากฐานข้อมูล
  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/TableSubject/${CourseId}`).then((response) => {
      setSubjectList(response.data);
    });
  }, []);

  //ค่าชั่วโมงการศึกษา
  const [TotalHrs, setTotalHrs] = useState([]);
  
  //รับค่าชั่วโมงการศึกษา
  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/CourseTotalHrs/${CourseId}`).then((res) => {
      setTotalHrs(Object.assign({}, ...res.data));
    })
  }, []);
  const [Hrs, setHrs] = useState(TotalHrs.CourseTotalHrs);
  // console.log(TotalHrs);
  //กำหนดคอลัมน์ให้ Table Datagrid
  const columns = [
    { field: "SubjectNr", headerName: "หมวดวิชาที่", width: 200, align: 'center' },
    { field: "SubjectName", headerName: "ชื่อวิชา", width: 300 },
    {
      field: "SubjectCreditOrScore",
      headerName: "หน่วยกิต/คะแนนเต็ม",
      width: 200,
      align: 'center'
    },
    {
      field: "action",
      headerName: "การจัดการ",
      width: 250,
      renderCell: (SubjectList) => {
        return (
          <>
            <button
              className="userListEdit"
              onClick={() => {
                toEditSubject(SubjectList);
              }}
            >
              Edit
            </button>

            <DeleteOutline
              className="userListDelete"
              onClick={() => {
                handleClickOpen();
                SetCurrentSubject({
                  id: SubjectList.row.id,
                  name: SubjectList.row.SubjectName,
                });
              }}
            />
          </>
        );
      },
    },
  ];

  //ตั้งค่า Alert Dialog Delete
  const [currentSubject, SetCurrentSubject] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //ตั้งค่า Alert Dialog ระยะเวลาการศึกษา
  const [open1, setOpen1] = useState(false);
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  //ลบรายวิชาผ่าน URL
  const toDeleteSubject = (id) => {
    Axios.delete(process.env.REACT_APP_API +`/delete/${id}`).then((response) => {
      setSubjectList(
        SubjectList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  //ส่งรายวิชาที่เลือกผ่าน URL
  const navigate = useNavigate();
  const toEditSubject = (clickedSubject) => {
    navigate("/PageEditSubject", {
      state: {
        id: clickedSubject.row.id,
        SubjectNr: clickedSubject.row.SubjectNr,
        SubjectName: clickedSubject.row.SubjectName,
        SubjectCreditOrScore: clickedSubject.row.SubjectCreditOrScore,
      },
    });
  };


  
  //รับค่าชั่วโมงการศึกษา
  const [CourseHrs, setCourseHrs] = useState(Hrs);

  //แก้ไขชั่วโมงการศึกษา
  const UpdateCourseHrs = () => {
    Axios.put((process.env.REACT_APP_API +`/UpdateCourseHrs`), {
      CourseId: CourseId,
      CourseHrs: Hrs
    }).then((res) => {
        // console.log(res);
        // console.log(res.data);
      });
  };

  return (
    
    <React.Fragment>
      <div className="cotainerDetail">
        <p className="HeadTextMain">หมวดวิชาของสถานศึกษา</p>
      
        <Container>
          <div style={{ height: 400, width: "100%" }}>
            <div className="ContainerInputSubject">
              <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                sx={{ width: "100%" }}
                placeholder="ค้นหารายวิชา"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
              
                <Button
                  variant="outlined"
                  sx={{ height: 55 }}
                  startIcon={<AddIcon />}
                  onClick={() => {
                    navigate("/PageAddSubject");
                  }}
                >
                  เพิ่ม
                </Button>
             
            </div>

            <DataGrid
              rows={SubjectList.filter((val) => {
                if (search === "") {
                  return val;
                } else if (val.SubjectName.toLowerCase().includes(search.toLowerCase())) {
                  return val;
                }
              })}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5]}
            />

            {/*Dialog Delete*/}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
            >
              <DialogTitle id="alert-dialog-title">
                {`คุณต้องการจะลบ วิชา ${currentSubject.name} ใช่หรือไม่ ?`}
              </DialogTitle>
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    toDeleteSubject(currentSubject.id);
                    handleClose();
                  }}
                >
                  Yes
                </Button>
                <Button variant="contained" color="error" onClick={handleClose}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

            {/*Dialog ระยะเวลาการศึกษา*/}
            <Dialog
              open={open1}
              onClose={handleClose1}
              aria-labelledby="alert-dialog-title"
            >
              <DialogTitle id="alert-dialog-title">
                {`คุณต้องการจะแก้ไขชั่วโมงการศึกษาใช่หรือไม่ ?`}
              </DialogTitle>
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    UpdateCourseHrs();
                    dispatch(updateHrs(CourseHrs));
                    handleClose1();
                  }}
                >
                  Yes
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  //refresh page to clear data
                  onClick={() => {
                    handleClose1();
                    navigate(0);
                  }}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

            <div className="ContainerTableSubject">
              <div className="subject">
                <p>ระยะเวลาการศึกษา</p>
              </div>
              <div className="subject">
                <input
                  className="form-control"
                  Value={TotalHrs.CourseTotalHrs}
                  onChange={(event) => {
                    setHrs(event.target.value);
                  }}
                />
              </div>
              <div className="subject">
                <p>ชั่วโมง</p>
              </div>

              <Button
                variant="contained"
                color="primary"
                sx={{ minWidth: 50, mx: 1 }}
                onClick={
                  handleClickOpen1
                }
              >
                บันทึก
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}




import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";



export default function EditSubject() {

   //ตั้งค่า Dialog
   const [open, setOpen] = useState(false);
   const handleClickOpen = () => {
     setOpen(true);
   };
   const handleClose = () => {
     setOpen(false);
   };
   
   //รับค่าจาก Navigate
  const location = useLocation();
  // console.log(location);
  const [SubjectId, setSubjectId] = useState(location.state.id);
  const [SubjectNr, setSubjectNr] = useState(location.state.SubjectNr);
  const [SubjectName, setSubjectName] = useState(location.state.SubjectName);
  const [SubjectCredit, setSubjectCredit] = useState(location.state.SubjectCreditOrScore);
    // console.log(SubjectId);
    // console.log(SubjectNr);
    // console.log(SubjectName);
    // console.log(SubjectCredit);

    const UpdateSubject = () => {
      Axios.put((process.env.REACT_APP_API + '/EditSubject'), {
        SubjectId: SubjectId,
        SubjectNr: SubjectNr,
        SubjectName: SubjectName,
        SubjectCreditOrScore: SubjectCredit
      }).then((res) => {
          // console.log(res);
          // console.log(res.data);
        });
    };

const navigate = useNavigate();

  return (
    <React.Fragment>
      
      <div className="cotainerDetail">
        <p className="HeadTextMain">แก้ไขรายวิชา</p>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel htmlFor="SubjectId">รหัสวิชา</InputLabel>
          <OutlinedInput
            id="SubjectId"
            label="รหัสวิชา"
            value={SubjectId}
            disabled= {true}
            onChange={(event) => {
              setSubjectId(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel htmlFor="SubjectNr">หมวดวิชา</InputLabel>
          <OutlinedInput
            id="SubjectNr"
            label="หมวดวิชา"
            type="number"
            value={SubjectNr}
            disabled= {true}
            onChange={(event) => {
              setSubjectNr(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel htmlFor="SubjectName">ชื่อวิชา</InputLabel>
          <OutlinedInput
            id="SubjectName"
            label="ชื่อวิชา"
            value={SubjectName}
            onChange={(event) => {
              setSubjectName(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel htmlFor="SubjectCreditOrScore">
            หน่วยกิต/คะแนนเต็ม
          </InputLabel>
          <OutlinedInput
            id="SubjectCreditOrScore"
            label="หน่วยกิต/คะแนนเต็ม"
            type="number"
            value={SubjectCredit}
            onChange={(event) => {
              setSubjectCredit(event.target.value);
            }}
          />
        </FormControl>
        <div className="containerBtnAddEdu">
          
            <Button 
            variant="outlined" 
            sx={{ minWidth: 242, m: 1 }}
            onClick={handleClickOpen}
            >
              บันทึก
            </Button>

            <Button 
            variant="outlined" 
            sx={{ minWidth: 242, m: 1 }}
            onClick = {() => {
              navigate("/PageSubject");
            }}
            >
              ย้อนกลับ
            </Button>
          
        </div>
        
        <Dialog
              open={open}
              onClose={handleClose} 
              aria-labelledby="alert-dialog-title"              
            >
              <DialogTitle id="alert-dialog-title">
                {`คุณยืนยันที่จะปรับแก้ข้อมูลใช่หรือไม่ ?`}
              </DialogTitle>
              <DialogActions>
                <Button 
                variant="contained"
                color="primary"
                onClick={()=> {
                UpdateSubject();
                handleClose();
                navigate("/PageSubject");
              }}> Yes </Button>
                <Button 
                variant="contained"
                color="error"
                onClick={handleClose}>
                  Cancel
                  </Button>
              </DialogActions>
            </Dialog>
      </div>
    </React.Fragment>
  );
}

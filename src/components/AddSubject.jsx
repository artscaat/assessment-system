import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Axios  from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
//import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AddSubject() {

  // const server = process.env.REACT_APP_API + '';
  const [SubjectList, setSubjectList] = useState([]);
  const courId = localStorage.getItem('AccessRights').substring(11, 14)
  
  //รับค่าจากฐานข้อมูล
  useEffect(() => {
    // Axios.get(`${server}/TableSubject`).then((response) => {
    Axios.get(process.env.REACT_APP_API + `/TableSubject/${courId}`).then((response) => {
      setSubjectList(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  //ตั้งค่า Dialog
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  //ตั้งค่า Dialog Duplicate
  const [openDuplicate, setOpenDuplicate] = useState(false);
  const handleCloseDuplicate = () => {
    setOpenDuplicate(false);
  }

  const AccessRights = localStorage.getItem('AccessRights');
  const IdSchool = AccessRights.substring(11,14);
  const [SubjectNr, setSubjectNr] = useState(0);
  const [SubjectName, setSubjectName] = useState("");
  const [SubjectCredit, setSubjectCredit] = useState();

  // const SubjectFilter = SubjectList.filter((val) => {
  //   return val.CourseId === IdSchool;
  // })
 
  const Duplicate = SubjectList.filter((val) =>{
    return val.SubjectNr >= SubjectNr
  })

  const addSubject = () => {
    Axios.post((process.env.REACT_APP_API + '/AddSubject'), {  
      SubjectNr: SubjectNr,
      SubjectName: SubjectName,
      SubjectCreditOrScore: SubjectCredit,
      CourseId: IdSchool,
    }).then((res) => {
        // console.log(res);
        // console.log(res.data);
      });
  }

  const checkDuplicate = () => { 
    if(Duplicate.length === 0){
      setOpen(true);
    }else{
      setOpenDuplicate(true);
    }
  };

const navigate = useNavigate();

  return (
    <React.Fragment>
      <div className="cotainerDetail">
        <p className="HeadTextMain">เพิ่มรายวิชา</p>

        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel error={SubjectNr === 0} htmlFor="SubjectNr">หมวดวิชา</InputLabel>
          <OutlinedInput
            id="SubjectNr"
            label="หมวดวิชา"
            type="number"
            error={SubjectNr === 0}
            onChange={(event) => {
                setSubjectNr(event.target.value);
                
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel error={SubjectName.length <= 0} htmlFor="SubjectName">ชื่อวิชา</InputLabel>
          <OutlinedInput
            id="SubjectName"
            label="ชื่อวิชา"
            error={SubjectName.length <= 0}
            onChange={(event) => {
              setSubjectName(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel error={SubjectCredit === null} htmlFor="SubjectCreditOrScore">
            หน่วยกิต/คะแนนเต็ม
          </InputLabel>
          <OutlinedInput
            id="SubjectCreditOrScore"
            label="หน่วยกิต/คะแนนเต็ม"
            type="number"
            error={SubjectCredit == null}
            onChange={(event) => {
              setSubjectCredit(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel htmlFor="CourseId">รหัสสถานศึกษา</InputLabel>
          <OutlinedInput
            id="CourseId"
            label="รหัสสถานศึกษา"
            value={IdSchool}
            disabled={true}
          />
        </FormControl>

        <div className="containerBtnAddEdu">
          
            <Button
              variant="outlined"
              sx={{ minWidth: 242, m: 1 }}
              onClick={checkDuplicate}
              disabled={SubjectNr === 0 || SubjectCredit == null || SubjectName.length <= 0 }
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
                {`คุณต้องการจะเพิ่ม วิชา ${SubjectName} ใช่หรือไม่ ?`}
              </DialogTitle>
              <DialogActions>
              
                <Button 
                variant="contained"
                color="primary"
                onClick={()=> {
                addSubject();
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

              {/* Dialog Duplicate */}
            <Dialog
              open={openDuplicate}
              onClose={handleCloseDuplicate} 
              aria-labelledby="alert-dialog-title"              
            >
              <DialogTitle id="alert-dialog-title">
                {`หมวดวิชาที่ ${SubjectNr} มีในฐานข้อมูลอยู่แล้ว`}
              </DialogTitle>
              <DialogActions>
              
                <Button 
                variant="contained"
                color="primary"
                onClick={()=> {
                handleCloseDuplicate();    
              }}> แก้ไข </Button>
             
              </DialogActions>
            </Dialog>
      </div>
    </React.Fragment>
  );
}

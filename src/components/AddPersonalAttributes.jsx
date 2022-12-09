import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

export default function AddPersonalAttributes() {

  const [AttrList, setAttrList] = useState([]);

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API +"/TableAttr").then((response) => {
      setAttrList(response.data);
    });
  });

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

  const [PerAttrCatId, setPerAttrCatId] = useState("");
  const [PersAttrCatName, setPersAttrCatName] = useState("");
  const [PersAttrCatFullscore, setPersAttrCatFullscore] = useState(0);

  const Duplicate = AttrList.filter((val) =>{
    return val.id === PerAttrCatId
  })

  const checkDuplicate = () => { 
    console.log("data: ",Duplicate)
    if(Duplicate.length === 0){
      setOpen(true);
    }else{
      setOpenDuplicate(true);
    }
  };

  const addAttr = () => {
    Axios.post(process.env.REACT_APP_API + "/AddAttr", {
      PerAttrCatId: PerAttrCatId,
      PersAttrCatName: PersAttrCatName,
      PersAttrCatFullscore: PersAttrCatFullscore,
    }).then((res) => {
      // console.log(res);
      // console.log(res.data);
    });
  };

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div className="cotainerDetail">
        <p className="HeadTextMain">เพิ่มคุณลักษณะส่วนบุคคล</p>

        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel error={PerAttrCatId.length <= 0} htmlFor="PerAttrCatId">รหัสด้านการประเมิน</InputLabel>
          <OutlinedInput
            required
            id="PerAttsCatId"
            label="รหัสด้านการประเมิน"
            error={PerAttrCatId.length <= 0}
            onChange={(event) => {
              setPerAttrCatId(event.target.value);
            }}
          />
        </FormControl>
        <FormControl error={PersAttrCatName.length <= 0} sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel htmlFor="PersAttrCatName">
            ชื่อคุณลักษณะส่วนบุคคล
          </InputLabel>
          <OutlinedInput
            id="PersAttrCatName"
            label="ชื่อคุณลักษณะส่วนบุคคล"
            error={PersAttrCatName.length <= 0}
            onChange={(event) => {
              setPersAttrCatName(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel error={PersAttrCatFullscore === 0} htmlFor="PersAttrCatFullscore">คะแนนเต็ม</InputLabel>
          <OutlinedInput
            id="PersAttrCatFullscore"
            label="คะแนนเต็ม"
            type="number"
            error={PersAttrCatFullscore === 0}
            onChange={(event) => {
              setPersAttrCatFullscore(event.target.value);
            }}
          />
        </FormControl>

        <div className="containerBtnAddEdu">
            <Button 
            variant="outlined" 
            sx={{ minWidth: 242, m: 1 }}
            disabled={PersAttrCatFullscore === 0 || PersAttrCatName.length <= 0 || PerAttrCatId.length <= 0}
            onClick={checkDuplicate}
            >
              บันทึก
            </Button>

            <Button 
            variant="outlined" 
            sx={{ minWidth: 242, m: 1 }}
            onClick = {() => {
              navigate("/PagePersonalAttributes");
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
                {`คุณต้องการจะเพิ่มคุณลักษณะด้าน ${PersAttrCatName} ใช่หรือไม่ ?`}
              </DialogTitle>
              <DialogActions>
            
                <Button 
                variant="contained"
                color="primary"
                onClick={()=> {
                addAttr();
                handleClose();
                navigate("/PagePersonalAttributes");
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
                {`การประเมินด้าน ${PerAttrCatId} มีในฐานข้อมูลอยู่แล้ว`}
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

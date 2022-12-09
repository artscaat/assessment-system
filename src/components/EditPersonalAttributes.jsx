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

export default function EditPersonalAttributes() {
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
  const [PerAttrCatId, setPerAttrCatId] = useState(location.state.id);
  const [PersAttrCatName, setPersAttrCatName] = useState(
    location.state.PersAttrCatName
  );
  const [PersAttrCatFullscore, setPersAttrCatFullscore] = useState(
    location.state.PersAttrCatFullscore
  );

  const UpdateAttr = () => {
    Axios.put(process.env.REACT_APP_API + "/EditAttr", {
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
        <p className="HeadTextMain">แก้ไขคุณลักษณะส่วนบุคคล</p>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel htmlFor="PerAttrCatId">รหัสด้านการประเมิน</InputLabel>
          <OutlinedInput
            id="PerAttsCatId"
            label="รหัสด้านการประเมิน"
            value={PerAttrCatId}
            disabled={true}
            onChange={(event) => {
              setPerAttrCatId(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel htmlFor="PersAttrCatName">
            ชื่อคุณลักษณะส่วนบุคคล
          </InputLabel>
          <OutlinedInput
            id="PersAttrCatName"
            label="ชื่อคุณลักษณะส่วนบุคคล"
            value={PersAttrCatName}
            onChange={(event) => {
              setPersAttrCatName(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel htmlFor="PersAttrCatFullscore">คะแนนเต็ม</InputLabel>
          <OutlinedInput
            id="PersAttrCatFullscore"
            label="คะแนนเต็ม"
            type="number"
            value={PersAttrCatFullscore}
            onChange={(event) => {
              setPersAttrCatFullscore(event.target.value);
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

            {/* <a href="/PagePersonalAttributes"> */}
            <Button 
            variant="outlined" 
            sx={{ minWidth: 242, m: 1 }}
            onClick = {() => {
              navigate("/PagePersonalAttributes");
            }}
            >
              ย้อนกลับ
            </Button>
          {/* </a> */}
          
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
              {/* <a href="/PagePersonalAttributes"> */}
                <Button 
                variant="contained"
                color="primary"
                onClick={()=> {
                UpdateAttr();
                handleClose();
                navigate("/PagePersonalAttributes");
              }}> Yes </Button>
              {/* </a> */}
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

import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";

import PictureAsPdf from "@mui/icons-material/PictureAsPdf";

const style = {
  margin: "0 auto",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Modelorder = ({ filepath }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label"></InputLabel> */}
      {/* <button onClick={handleOpen} className="btn btn-success">
          คำสั่งเข้าเรียน
        </button> */}
      {!filepath ? (
        <PictureAsPdf
          className="PictureAsPdf"
          sx={{ color: grey["A700"] }}
          onClick={handleOpen}
        ></PictureAsPdf>
      ) : (
        <PictureAsPdf
          className="PictureAsPdf"
          onClick={handleOpen}
        ></PictureAsPdf>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title text-center"
        aria-describedby="modal-modal-description"
      >
        {filepath ? (
          <Box sx={style}>
            <iframe
              src={process.env.REACT_APP_IMG + `/${filepath}#view=fitH`}
              title="คำสั่งเข้าเรียน"
              width="100%"
              height="500px"
              frameBorder="0"
              allowFullScreen
            />

            {/* // <div
                // className="text-danger"
                // style={{ textAlign: "center" }}
                // >ไม่มีไฟล์คำสั่งเข้าเรียน</div>               */}
          </Box>
        ) : (
          <Box
            sx={{
              margin: "0 auto",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              height: 100,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
            className="text-danger"
            style={{ textAlign: "center" }}
          >
            **ไม่มีไฟล์คำสั่งเข้าเรียน**
          </Box>
        )}
      </Modal>
      {/* </FormControl> */}
    </>
  );
};

export default Modelorder;

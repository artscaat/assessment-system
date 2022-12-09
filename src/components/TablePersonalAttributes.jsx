import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { DeleteOutline } from "@material-ui/icons";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function TablePersonalAttributes() {
  //Set Colums Datagrid
  const columns = [
    { field: "id", headerName: "ลำดับ", width: 200, align: 'center' },
    { field: "PersAttrCatName", headerName: "คุณลักษณะส่วนบุคคล", width: 300 },
    { field: "PersAttrCatFullscore", headerName: "คะแนนเต็ม", width: 200, align: 'center' },
    {
      field: "action",
      headerName: "การจัดการ",
      width: 250,
      renderCell: (AttrList) => {
        return (
          <>
            <button
              className="userListEdit"
              onClick={() => {
                toEditAttr(AttrList);
              }}
            >
              Edit
            </button>
            <DeleteOutline
              className="userListDelete"
              onClick={() => {
                handleClickOpen();
                setCurrentAttr({
                  id: AttrList.row.id,
                  name: AttrList.row.PersAttrCatName,
                });
              }}
            />
          </>
        );
      },
    },
  ];

  //Get Data Personnel Attr From tbpersattrcategory
  const [AttrList, setAttrList] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    Axios.get(process.env.REACT_APP_API +"/TableAttr").then((response) => {
      setAttrList(response.data);
    });
  });

  //Edit Data Personnel
  const navigate = useNavigate();
  const toEditAttr = (clickedAttr) => {
    navigate("/PageEditPersonalAttributes", {
      state: {
        id: clickedAttr.row.id,
        PersAttrCatName: clickedAttr.row.PersAttrCatName,
        PersAttrCatFullscore: clickedAttr.row.PersAttrCatFullscore,
      },
    });
  };

  //ตั้งค่า Dialog Delete
  const [CurrentAttr, setCurrentAttr] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //ลบAttr ผ่าน URL
  const toDeleteAttr = (id) => {
    Axios.delete(process.env.REACT_APP_API + `/deleteAttr/${id}`).then((response) => {
      setAttrList(
        AttrList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <React.Fragment>
      <div className="cotainerDetail">
        <p className="HeadTextMain">คุณลักษณะส่วนบุคคล</p>
        <Container>
          <div style={{ height: 700, width: "100%" }}>
            <div className="ContainerInputSubject">
            <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                sx={{ width: "100%" }}
                placeholder="ค้นหาคุณลักษณะ"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
            {/* <a href="/PageAddPersonalAttributes"> */}
              <Button 
              variant="outlined"
              sx={{ height: 55 }} 
              startIcon={<AddIcon />}
              onClick= {() => {
                navigate("/PageAddPersonalAttributes");
              }}
              >
                เพิ่ม
              </Button>
            {/* </a> */}
            </div>
            
            <DataGrid
              rows={AttrList.filter((val) => {
                if (search === "") {
                  return val;
                } else if (val.PersAttrCatName.includes(search)) {
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
                {`คุณต้องการจะลบคุณลักษณะ ด้าน ${CurrentAttr.name} ใช่หรือไม่ ?`}
              </DialogTitle>
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    toDeleteAttr(CurrentAttr.id);
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
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}

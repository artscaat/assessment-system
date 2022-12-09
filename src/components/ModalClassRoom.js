
import React, { useState, useEffect } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Axios from 'axios'
import TableclassRoom from '../components/TableclassRoom'
import Form from '../components/Form'

const style = {
  margin: '0 auto',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const ModalClassRoom = ({ accessId, rank, fname, lname, checkAJ }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const accId = accessId.substring(0, 10)

  const [subject, setSubject] = useState({
    name: '',
    course: '',
  })
  const [subjects, setSubjects] = useState([])
  const [listUpdated, setListUpdated] = useState(false)
  const Access = localStorage.getItem('AccessRights')
  const access = Access.substring(0, 10)

  const checkStatus = localStorage.getItem('Access')

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/listsubjectsaj/${access}/${accessId}`)
      .then((res) => {
        setSubjects(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
    setListUpdated(false)
  }, [listUpdated])

  return (
    <React.Fragment>
      <FormControl variant="standard" sx={{ m: 1, minWidth: '100%' }}>
        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
        <center>
          <button
            onClick={handleOpen}
            className="btnSeeSubj"
            disabled={!checkAJ}
          >
            {checkAJ
              ? 'คลิกเพื่อดูหมวดวิชาที่สอน'
              : '----- ไม่มีสิทธิ์อาจารย์ -----'}
          </button>
        </center>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title text-center"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <br></br>
            <center>
              <b className="HeadTextMain">จัดการหมวดวิชา</b>
            </center>
            <p
              className="HeadTextNameStu"
              style={{
                textAlign: 'center',
              }}
            >
              เลขประจำตัวข้าราชการ {accId} ชื่อ{' '}
              {rank + ' ' + fname + ' ' + lname + ''}
            </p>
            <hr></hr>
            <br></br>

            {checkStatus === 'กรรมวิธี' ? (
              <div className="container">
                <div className="row">
                  <div className="col-8">
                    <center>
                      <p className="HeadTextNameStu">หมวดวิชาที่สอน</p>
                    </center>
                    <TableclassRoom
                      subject={subject}
                      setSubject={setSubject}
                      subjects={subjects}
                      setListUpdated={setListUpdated}
                    />
                  </div>
                  <div className="col-4">
                    <center>
                      <p className="HeadTextNameStu">เพิ่มหมวดวิชาที่สอน</p>
                    </center>
                    <Form
                      subject={subject}
                      setSubject={setSubject}
                      accessId={accessId}
                      setListUpdated={setListUpdated}
                    />
                  </div>
                </div>
              </div>
            ) : (
              //จัดหนา้กึ่งกล่างต้องไม่ใช่กรรมวิธี
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <center>
                      <p className="HeadTextNameStu">หมวดวิชาที่สอน</p>
                    </center>
                    <TableclassRoom
                      subject={subject}
                      setSubject={setSubject}
                      subjects={subjects}
                      setListUpdated={setListUpdated}
                    />
                  </div>
                </div>
              </div>
            )}
          </Box>
        </Modal>
      </FormControl>
    </React.Fragment>
  )
}

export default ModalClassRoom



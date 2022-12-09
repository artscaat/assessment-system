import React, { useState, useEffect } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PersonIcon from '@mui/icons-material/Person'
import Axios from 'axios'


const style = {
  margin: '0 auto',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}



const ModelAccess = ({ accessId }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

 
  const [data, setData] = useState([])
  const [level1, setLevel1] = useState(false)
  const [level2, setLevel2] = useState(false)
  const [level3, setLevel3] = useState(false)
  const [level4, setLevel4] = useState(false)
  const [level5, setLevel5] = useState(false)
  const [level6, setLevel6] = useState(false)
  const [level7, setLevel7] = useState(false)
  const [level8, setLevel8] = useState(false)

  const [rank, setRank] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')

  const accId = accessId.substring(0, 10);

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/checkLeveloffice/${accessId}`)
    .then((res)=>{
      // console.log(res.data[0])
      setData(res.data[0])
        setLevel1(res.data[0].Administrative)
        setLevel2(res.data[0].Student)
        setLevel3(res.data[0].Director)
        setLevel4(res.data[0].Evaluation)
        setLevel5(res.data[0].EvaluationCenter)
        setLevel6(res.data[0].Process)
        setLevel7(res.data[0].ProcessCenter)
        setLevel8(res.data[0].Professor)
        setRank(res.data[0].Rank)
        setFname(res.data[0].PersFname)
        setLname(res.data[0].PersLname)
    })
    .catch((err)=>{
    console.error(err);
    })
  },[])


  return (
    <>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
        <button onClick={handleOpen} 
        
        className="btnHome">  
          คลิกเพื่อดูสิทธิ์การใช้งาน
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <p className="HeadTextMain">สิทธิ์ที่สามารถเข้าถึงได้</p>

              <p
                className="HeadTextNameStu"
                style={{
                  textAlign: 'center',
                }}
              >
               เลขประจำตัวข้าราชการ {accId} ชื่อ {rank + " " + fname + " " + lname + ""} 
              </p>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: '1px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: '30px',
                  }}
                >
                  {' '}
                  <Button
                    startIcon={<PersonIcon />}
                    sx={{
                      backgroundColor: level5 ? '#ebf1fe' : 'none',
                      fontSize: '1px',
                      fontWeight: 'bold',
                      borderRadius: '50px',
                      width: '200px',
                      height: '50px',
                      marginRight: '20px',
                      marginTop: '20px',
                      marginBottom: '20px',
                      padding: '0px',
                      border: '5px #000',
                      outline: 'none',
                    }}
                    variant="outlined"
                    name="EvaluationCenter"
                   
                    disabled={level5 === 1 ? false : true}
                    
                  >
                    <span className="TextNavMain">วัดผลส่วนกลาง</span>
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: '30px',
                  }}
                >
                  {' '}
                  <Button
                    startIcon={<PersonIcon />}
                    sx={{
                      backgroundColor: level7 ? '#ebf1fe' : 'none',
                      fontSize: '1px',
                      fontWeight: 'bold',
                      borderRadius: '50px',
                      width: '200px',
                      height: '50px',
                      marginRight: '20px',
                      marginTop: '20px',
                      marginBottom: '20px',
                      padding: '0px',
                      border: '5px #000',
                      outline: 'none',
                    }}
                    variant="outlined"
                    name="ProcessCenter"
                    disabled={level7 === 1 ? false : true}
                    
                  >
                    <span className="TextNavMain">กรรมวิธีส่วนกลาง</span>
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: '30px',
                  }}
                >
                  {' '}
                  <Button
                    startIcon={<PersonIcon />}
                    sx={{
                      backgroundColor: level3 ? '#ebf1fe' : 'none',
                      fontSize: '1px',
                      fontWeight: 'bold',
                      borderRadius: '50px',
                      width: '200px',
                      height: '50px',
                      marginRight: '20px',
                      marginTop: '20px',
                      marginBottom: '20px',
                      padding: '0px',
                      border: '5px #000',
                      outline: 'none',
                    }}
                    variant="outlined"
                    name="Director"
                    disabled={level3 === 1 ? false : true}
                    
                  >
                    <span className="TextNavMain">ผอ.</span>
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: '30px',
                  }}
                >
                  {' '}
                  <Button
                    startIcon={<PersonIcon />}
                    sx={{
                      backgroundColor: level6 ? '#ebf1fe' : 'none',
                      fontSize: '1px',
                      fontWeight: 'bold',
                      borderRadius: '50px',
                      width: '200px',
                      height: '50px',
                      marginRight: '20px',
                      marginTop: '20px',
                      marginBottom: '20px',
                      padding: '0px',
                      border: '5px #000',
                      outline: 'none',
                    }}
                    variant="outlined"
                    name="Process"
                    disabled={level6 === 1 ? false : true}
                    
                  >
                    <span className="TextNavMain">กรรมวิธี</span>
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: '30px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: '30px',
                  }}
                >
                  {' '}
                  <Button
                    startIcon={<PersonIcon />}
                    sx={{
                      backgroundColor: level4 ? '#ebf1fe' : 'none',
                      fontSize: '1px',
                      fontWeight: 'bold',
                      borderRadius: '50px',
                      width: '200px',
                      height: '50px',
                      marginRight: '20px',
                      marginTop: '20px',
                      marginBottom: '20px',
                      padding: '0px',
                      border: '5px #000',
                      outline: 'none',
                    }}
                    variant="outlined"
                    name="Evaluation"
                    disabled={level4 === 1 ? false : true}
                    
                  >
                    <span className="TextNavMain">วัดผล</span>
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: '30px',
                  }}
                >
                  {' '}
                  <Button
                    startIcon={<PersonIcon />}
                    sx={{
                      backgroundColor: level1 ? '#ebf1fe' : 'none',
                      fontSize: '1px',
                      fontWeight: 'bold',
                      borderRadius: '50px',
                      width: '200px',
                      height: '50px',
                      marginRight: '20px',
                      marginTop: '20px',
                      marginBottom: '20px',
                      padding: '0px',
                      border: '5px #000',
                      outline: 'none',
                    }}
                    variant="outlined"
                    name="Administrative"
                    disabled={level1 === 1 ? false : true}
                    
                  >
                    <span className="TextNavMain">ปกครอง</span>
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: '30px',
                  }}
                >
                  {' '}
                  <Button
                    startIcon={<PersonIcon />}
                    sx={{
                      backgroundColor: level8 ? '#ebf1fe' : 'none',
                      fontSize: '1px',
                      fontWeight: 'bold',
                      borderRadius: '50px',
                      width: '200px',
                      height: '50px',
                      marginRight: '20px',
                      marginTop: '20px',
                      marginBottom: '20px',
                      padding: '0px',
                      border: '5px #000',
                      outline: 'none',
                    }}
                    variant="outlined"
                    name="Professor"
                    disabled={level8 === 1 ? false : true}
                    
                  >
                    <span className="TextNavMain">อาจารย์ประจำ</span>
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: '30px',
                  }}
                >
                  {' '}
                  <Button
                    startIcon={<PersonIcon />}
                    sx={{
                      backgroundColor: level2 ? '#ebf1fe' : 'none',
                      fontSize: '1px',
                      fontWeight: 'bold',
                      borderRadius: '50px',
                      width: '200px',
                      height: '50px',
                      marginRight: '20px',
                      marginTop: '20px',
                      marginBottom: '20px',
                      padding: '0px',
                      border: '5px #000',
                      outline: 'none',
                    }}
                    variant="outlined"
                    name="Student"
                    disabled={level2 === 1 ? false : true}
                    
                  >
                    <span className="TextNavMain"> นทน.</span>
                  </Button>
                </Box>
              </Box>
          </Box>
        </Modal>
      </FormControl>
    </>
  )
}

export default ModelAccess

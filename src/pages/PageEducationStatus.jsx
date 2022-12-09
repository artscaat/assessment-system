/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Axios from 'axios'

function PageEducationStatus() {
  const [chkAttFile, setchkAttFile] = useState('')
  const id = localStorage.getItem('AccessRights')
  const PersonalHistory = localStorage.getItem('PersonalHistory')
  const [CourseGrp, setCourseGrp] = useState(JSON.parse(PersonalHistory)[0].CourseGrp)

  useEffect(() => {
    chkAttachFileStu()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chkAttFile])

  const chkAttachFileStu = async () => {
    Axios.get(process.env.REACT_APP_API + `/chkAttachFilestu/${id}/${CourseGrp}`)
      .then((res) => {
        setchkAttFile(res.data[0].Chkattackfile);
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="cotainerDetail">
        <Box sx={{height:'100vh',width:'100%'}}>
            <Box sx={{display:'flex',justifyContent:'flex-start',margin:'20px'}}>
                <Typography variant="h6" gutterBottom
                sx= {{
                  fontFamily: 'THSarabunNew'
                }}>
                สถานภาพ 
                </Typography>

                <Typography variant="h6" gutterBottom sx={{color:'green',marginLeft:'10px', fontFamily: 'THSarabunNew', fontWeight: 'bold' }}>
                {chkAttFile === "1" ?"สำเร็จการศึกษา":"กำลังศึกษา"}
                </Typography>
            </Box>   
        </Box>
    </div>
  )
}

export default PageEducationStatus
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Box from '@mui/material/Box'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'
import React, { useState, useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import Axios from 'axios'
// import { useParams } from 'react-router-dom'
import {  toast} from 'react-toastify'

function PageSelectSchools() {
  const [expanded, setExpanded] = React.useState(false)
  const navigate = useNavigate()
  const user = localStorage.getItem('user')
  const [sendaccessrightsids, setSendAccessRightsIds] = useState([])
  const [schoolss, setSchoolss] = useState([])
  const accessrightsid = useState(JSON.parse(user)[0].PersId)
  const acc_id = accessrightsid[0].substring(0, 10)

  const academy = [...new Set(sendaccessrightsids.map((item) => item.Academy))]

  const courseName = (academy) => {
    let course = sendaccessrightsids.filter((item) => item.Academy === academy)
    return course
  }

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API +`/SendAccessRightsId/${acc_id}`)
      .then((res) => {
        setSendAccessRightsIds(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/schoolss/${acc_id}`)
      .then((res) => {
        setSchoolss(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const accessrights = async (a) => {
    var Id = a.AccessRightsId
    localStorage.setItem('Academy', a.Academy)
    localStorage.setItem('CourseName', a.CourseName)
    localStorage.setItem('AccessRights', a.AccessRightsId)
    Axios.get(process.env.REACT_APP_API + `/PageSelectSchools`, {
      id: Id,
    })
    navigate('/PageAccessRights')
  }

  const accessrightss = () => {
    toast.error('สิทธิ์การเข้าถึงถูกระงับการใช้งานกรุณาติดต่อ admin')
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  // console.log(sendaccessrightsids.map((sendaccessrightsid,i) => (
  //   console.log(sendaccessrightsid)
  // )))

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          marginTop: '50px',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            width: '80vw',
            backgroundColor: '#F2F2F7',
            borderRadius: '10px',
          }}
        >
          <Box sx={{ margin: '20px' }}>
            <Box sx={{ marginTop: '50px' }}>
              <p className="HeadTextRegis">หลักสูตร</p>
            </Box>
            {academy.map((sendaccessrightsid, i) => (
              <Accordion
                expanded={expanded === i}
                key={i}
                onChange={handleChange(i)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  key={i}
                >
                  <Typography sx={{ width: '70vw', flexShrink: 0 }} key={i}>
                    {sendaccessrightsid}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails key={i}>
                  {/* {
             sendaccessrightsid.Approve === 0 ? (<Button variant="outlined" sx={{minWidth: 180  }} disabled onClick={()=>accessrights(sendaccessrightsid)}>{sendaccessrightsid.CourseName}</Button>) : sendaccessrightsid.AcctStatus === "ถูกระงับ" ? (<Button variant="outlined" sx={{minWidth: 180  }}  onClick={()=>accessrightss()}>{sendaccessrightsid.CourseName}</Button>) : (<Button variant="outlined" sx={{minWidth: 180  }} onClick={()=>accessrights(sendaccessrightsid)}>{sendaccessrightsid.CourseName}</Button>)
           }     */}
                  {courseName(sendaccessrightsid).map((item, index) =>
                    // <Button variant="outlined" sx={{minWidth: 180  }} disabled onClick={()=>accessrights(sendaccessrightsid)}> {item.CourseName}</Button>
                    item.Approve === 0 ? (
                      <Button
                        key={index}
                        variant="outlined"
                        sx={{ minWidth: 180 }}
                        disabled
                        onClick={() => accessrights(item)}
                      >
                        {item.CourseName}
                      </Button>
                    ) : item.AcctStatus === 'ถูกระงับ' ? (
                      <Button
                        key={index}
                        variant="outlined"
                        sx={{ minWidth: 180 }}
                        onClick={() => accessrightss()}
                      >
                        {item.CourseName}
                      </Button>
                    ) : (
                      <Button
                        key={index}
                        variant="outlined"
                        sx={{ minWidth: 180 }}
                        onClick={() => accessrights(item)}
                      >
                        {item.CourseName}
                      </Button>
                    ),
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default PageSelectSchools

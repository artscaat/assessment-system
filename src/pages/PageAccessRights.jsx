/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PersonIcon from '@mui/icons-material/Person'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#ffffff'),
  backgroundColor: '#F2F2F7',
  borderStyle: 'solid',
  borderColor: '#000000',
  borderWidth: '3px',
  borderRadius: '10px',
  fontWeight: 'bold',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: '#F2F2F7',
    borderColor: '#000000',
    boxShadow: '5px 10px #888888',
  },
}))

function PageAccessRights() {
  const [PersonalHistory, setPersonalHistory] = useState('')
  localStorage.setItem('PersonalHistory', JSON.stringify(PersonalHistory))
  const navigate = useNavigate()
  const [AccessRights, setAccessRights] = useState([])
  const id = localStorage.getItem('AccessRights')

  const getData = () => {
    try {
      Axios.get(process.env.REACT_APP_API + `/PageSelectSchoolsss/${id}`).then(
        (res) => {
          setAccessRights(Object.assign({}, ...res.data)) // array of object to object
        },
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/PersonalHistory/${id}`)
      .then((res) => {
        setPersonalHistory(res.data)
        // console.log("PersoHis: ",res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])



  useEffect(() => {
    getData()
  }, [])

  const nextPage = async (a, b) => {
    // console.log(b)
    // localStorage.setItem("Access",b)
    let AccessRightsId = a
    if (AccessRightsId && b === 'นทน.') {
      // localStorage.setItem("AccessRights",JSON.stringify(AccessRightsId))
      localStorage.setItem('Access', b)
      // navigate("/PageEducationInfo")
      // navigate("/PageHistory")
      navigate('/PageEducationStatus')
    } else if (AccessRightsId && b === 'อาจารย์ประจำหมวดวิชา') {
      localStorage.setItem('Access', b)
      navigate('/PageHistory')
    } else {
      // toast.error("เกิดข้อผิดพลาด");
      localStorage.setItem('Access', b)
      navigate('/PageEducationInfo')
    }
  }

  localStorage.setItem('AllAccessRights', JSON.stringify(AccessRights))
  // console.log("PersonalHistory: ",PersonalHistory)

  return (
    <Box sx={{ width: '100vw' }}>
      <Box sx={{ marginTop: '50px' }}>
        <p className="HeadTextRegis">สิทธิ์ที่สามารถเข้าถึงได้</p>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ margin: '10px' }}>
          {AccessRights.EvaluationCenter === 0 ? (
            <ColorButton
              startIcon={<PersonIcon />}
              sx={{ width: '350px', height: '130px', color: '#000000' }}
              disabled
            >
              สิทธิ์ วัดผลส่วนกลาง
            </ColorButton>
          ) : (
            <ColorButton
              startIcon={<PersonIcon />}
              sx={{ width: '350px', height: '130px', color: '#000000' }}
              onClick={() => nextPage(id, 'วัดผลส่วนกลาง')}
            >
              สิทธิ์ วัดผลส่วนกลาง
            </ColorButton>
          )}
        </Box>
        <Box sx={{ margin: '10px' }}>
          {AccessRights.ProcessCenter === 0 ? (
            <ColorButton
              startIcon={<PersonIcon />}
              sx={{ width: '350px', height: '130px', color: '#000000' }}
              disabled
            >
              สิทธิ์ กรรมวิธีส่วนกลาง
            </ColorButton>
          ) : (
            <ColorButton
              startIcon={<PersonIcon />}
              sx={{ width: '350px', height: '130px', color: '#000000' }}
              onClick={() => nextPage(id, 'กรรมวิธีส่วนกลาง')}
            >
              สิทธิ์ กรรมวิธีส่วนกลาง
            </ColorButton>
          )}
        </Box>
        <Box sx={{ margin: '10px' }}>
          {AccessRights.Director === 0 ? (
            <ColorButton
              startIcon={<PersonIcon />}
              sx={{ width: '350px', height: '130px', color: '#000000' }}
              disabled
            >
              สิทธิ์ ผอ.
            </ColorButton>
          ) : (
            <ColorButton
              startIcon={<PersonIcon />}
              sx={{ width: '350px', height: '130px', color: '#000000' }}
              onClick={() => nextPage(id, 'ผอ.')}
            >
              สิทธิ์ ผอ.
            </ColorButton>
          )}
        </Box>
        <Box sx={{ margin: '10px' }}>
          {AccessRights.Process === 0 ? (
            <ColorButton
              startIcon={<PersonIcon />}
              sx={{ width: '350px', height: '130px', color: '#000000' }}
              disabled
            >
              สิทธิ์ กรรมวิธี
            </ColorButton>
          ) : (
            <ColorButton
              startIcon={<PersonIcon />}
              sx={{ width: '350px', height: '130px', color: '#000000' }}
              onClick={() => nextPage(id, 'กรรมวิธี')}
            >
              สิทธิ์ กรรมวิธี
            </ColorButton>
          )}
        </Box>
        <Box sx={{ margin: '10px' }}>
          {AccessRights.Evaluation === 0 ? (
            <ColorButton
              startIcon={<PersonIcon />}
              sx={{ width: '350px', height: '130px', color: '#000000' }}
              disabled
            >
              สิทธิ์ วัดผล
            </ColorButton>
          ) : (
            <ColorButton
              startIcon={<PersonIcon />}
              sx={{ width: '350px', height: '130px', color: '#000000' }}
              onClick={() => nextPage(id, 'วัดผล')}
            >
              สิทธิ์ วัดผล
            </ColorButton>
          )}
        </Box>
        <Box sx={{ margin: '10px' }}>
          {AccessRights.Administrative === 0 ? (
            <ColorButton
              startIcon={<PersonIcon />}
              sx={{ width: '350px', height: '130px', color: '#000000' }}
              disabled
            >
              สิทธิ์ ปกครอง
            </ColorButton>
          ) : (
            <ColorButton
              startIcon={<PersonIcon />}
              sx={{ width: '350px', height: '130px', color: '#000000' }}
              onClick={() => nextPage(id, 'ปกครอง')}
            >
              สิทธิ์ ปกครอง
            </ColorButton>
          )}
        </Box>
        <Box sx={{ margin: '10px' }}>
          {AccessRights.Professor === 0 ? (
            <ColorButton
              startIcon={<PersonIcon />}
              sx={{ width: '350px', height: '130px', color: '#000000' }}
              disabled
            >
              สิทธิ์ อาจารย์ประจำหมวดวิชา
            </ColorButton>
          ) : (
            <ColorButton
              startIcon={<PersonIcon />}
              sx={{ width: '350px', height: '130px', color: '#000000' }}
              onClick={() => nextPage(id, 'อาจารย์ประจำหมวดวิชา')}
            >
              สิทธิ์ อาจารย์ประจำหมวดวิชา
            </ColorButton>
          )}
        </Box>
        <Box sx={{ margin: '10px' }}>
          {AccessRights.Student === 0 ? (
            <ColorButton
              startIcon={<PersonIcon />}
              sx={{ width: '350px', height: '130px', color: '#000000' }}
              disabled
            >
              สิทธิ์ นทน.
            </ColorButton>
          ) : (
            <ColorButton
              startIcon={<PersonIcon />}
              sx={{ width: '350px', height: '130px', color: '#000000' }}
              onClick={() => nextPage(id, 'นทน.')}
            >
              สิทธิ์ นทน.
            </ColorButton>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default PageAccessRights

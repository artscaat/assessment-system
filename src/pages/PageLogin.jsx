/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Logo from '../img/logo.png'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Link, useNavigate } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import Axios from 'axios'
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded'
import 'react-toastify/dist/ReactToastify.css'

export default function PageLogin() {
  const [email, setEmail] = useState('')
  const [alerts, setAlerts] = useState(false)
  const [confirm, setComfirm] = useState(false)
  const [user, setUser] = useState()
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  })

  const navigate = useNavigate()

  // var delayInMilliseconds = 3000;
  // console.log(email)
  // console.log(password)
  const login = async () => {
    // console.log("email","password",email,password)
    let result = await fetch(process.env.REACT_APP_API + '/login', {
      method: 'POST',
      // body:JSON.stringify({email,password}),
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    result = await result.json()
    // console.log(email.length);
    if (result[0]) {
      localStorage.setItem('user', JSON.stringify(result))
      navigate('/PageSelectSchools')
    } else if (email.length === 0) {
      setAlerts(true)
      toast.error('กรุณาใส่Email และ Password')
    } else {
      setAlerts(true)
      toast.error(
        'Email ไม่ถูกต้อง หรือถูกระงับการใช้งาน หรือรออนุมัติ กรุณาติดต่อ admin',
      )
    }
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  // console.log("ENV: ", process.env.NODE_ENV)
  // console.log("ENV: ", process.env)

  return (
    <React.Fragment>
      {/* <NavbarLogin /> */}
      {/* {confirm ? <ToastContainer draggable={false} transition={Zoom} autoClose={8000} /> : <></> } */}
      {alerts ? (
        <ToastContainer draggable={false} transition={Zoom} autoClose={8000} />
      ) : (
        <></>
      )}
      <div className="containerPageLogin">
        <div className="containerLogin">
          <img src={Logo} alt="logo" className="logoLogin" />
          <p className="HeadTextLogin">
            ระบบสารสนเทศเพื่อการวัดและประเมินผลการศึกษา
          </p>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <FormControl sx={{ m: 1, width: '500px' }} variant="outlined">
              <InputLabel htmlFor="outlined">E-mail</InputLabel>
              <OutlinedInput
                id="outlined"
                label="E-mail"
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '500px' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                label="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Button
            variant="outlined"
            sx={{ minWidth: 500 }}
            onClick={() => login()}
          >
            เข้าสู่ระบบ
          </Button>
          {/* <Link to="/PageSelectSchools"> <Button variant="outlined" sx={{minWidth: 500 }} >เข้าสู่ระบบ</Button></Link> */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              m: 1,
            }}
          >
            <Link to="/RegisStu">
              <Button variant="outlined" sx={{ minWidth: 244, m: 1 }}>
                สมัครสมาชิกสำหรับ นทน.
              </Button>
            </Link>
            <Link to="/RegisTeac">
              <Button variant="outlined" sx={{ minWidth: 244, m: 1 }}>
                สมัครสมาชิกสำหรับ เจ้าหน้าที่
              </Button>
            </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ fontWeight: 'bold', marginTop: '40px' }}>
              <p>ติดต่อสอบถาม</p>
            </Box>
            <Box sx={{ fontWeight: 'bold', fontSize: '12px', display: 'flex' }}>
              <p>
                <PhoneForwardedIcon sx={{ fontSize: '14px' }} />{' '}
                กรมยุทธศึกษาทหารอากาศ โทร 2-5777
              </p>
            </Box>
            <Box sx={{ fontWeight: 'bold', fontSize: '10px' }}>
              <p>Version 0.0.1</p>
            </Box>
            <Box sx={{ fontSize: '10px' }}>
              <p>DESIGNED BY ARTHIT &reg; {new Date().getFullYear()}</p>
            </Box>
          </Box>
        </div>
      </div>
    </React.Fragment>
  )
}

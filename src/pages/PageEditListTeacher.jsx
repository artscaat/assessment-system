// /* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import TextField from '@mui/material/TextField'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import { Link, useLocation } from 'react-router-dom'

export default function PageEditHistory() {
  const initialValues = {
    AccesssRightsId: '',
    PersId: '',
    Rank: '',
    PersFname: '',
    PersLname: '',
    PersCurrPosition: '',
    PersAffiliation: '',
    email: '',
    SignatureImg: '',
    Director: '',
  }

  const Ranks = [
    'นาย',
    'นาง',
    'นางสาว',
    'จ.ต.',
    'จ.ต.หญิง',
    'จ.ท.',
    'จ.ท.หญิง',
    'จ.อ.',
    'จ.อ.หญิง',
    'พ.อ.ต.',
    'พ.อ.ต.หญิง',
    'พ.อ.ท.',
    'พ.อ.ท.หญิง',
    'พ.อ.อ.',
    'พ.อ.อ.หญิง',
    'ร.ต.',
    'ร.ต.หญิง',
    'ร.ท.',
    'ร.ท.หญิง',
    'ร.อ.',
    'ร.อ.หญิง',
    'น.ต.',
    'น.ต.หญิง',
    'น.ท.',
    'น.ท.หญิง',
    'น.อ.',
    'น.อ.หญิง',
    'พล.อ.ต.',
    'พล.อ.ต.หญิง',
    'พล.อ.ท.',
    'พล.อ.ท.หญิง',
    'พล.อ.อ.',
    'พล.อ.อ.หญิง',
  ]
  const Companys = [
    'กง.ทอ.',
    'กบ.ทอ.',
    'กพ.ทอ.',
    'กร.ทอ.',
    'ขว.ทอ.',
    'ขส.ทอ.',
    'คปอ.',
    'จร.ทอ.',
    'ชย.ทอ.',
    'ชอ.ทอ.(ดอนเมือง)',
    'ชอ.ทอ.(บางซื่อ)',
    'ทสส.ทอ.',
    'พธ.ทอ.',
    'พอ.',
    'ยก.ทอ.',
    'ยศ.ทอ.',
    'รร.นนก.',
    'ศวอ.ทอ.',
    'สก.ทอ.',
    'สตน.ทอ.',
    'สธน.ทอ.',
    'สน.ผบ.ดม',
    'สนภ.ทอ.',
    'สบ.ทอ.',
    'สปช.ทอ.',
    'สพ.ทอ.',
    'สลก.ทอ.',
    'สวบ.ทอ.',
    'สอ.ทอ.',
    'อย.',
    'บก.ทอ.',
    'บน.1',
    'บน.2',
    'บน.3',
    'บน.4',
    'บน.5',
    'บน.6',
    'บน.7',
    'บน.21',
    'บน.23',
    'บน.41',
    'บน.46',
    'บน.56',
    'สถานีรายงาน',
    'ศซว.ทอ.',
    'ศซบ.ทอ.',
    'รร.การบิน',
    'สพร.ทอ.',
    'ศปอว.ทอ.',
    'สำนักงานการบิน ทอ.',
    'สยล.ทอ.',
    'สง.ปรมน.ทอ.',
    'ศูนย์อำนวยการเครื่องบินพระราชพาหนะ',
    'ศูนย์อำนวยการเฮลิคอปเตอร์พระราชพาหนะ',
    'ศูนย์การสงครามทางอากาศ',
    'สคม.ทอ.',
  ]

  const location = useLocation() // หาทีอยู่ที่ส่งมา
  const { Id, Dir } = location.state //เอาตัวใน state ออกมา
  const [user, setUser] = useState(initialValues)
  const {
    PersId,
    Rank,
    PersFname,
    PersLname,
    PersCurrPosition,
    PersAffiliation,
    // SignatureImg,
    email,
    // Director,
  } = user
  const navigate = useNavigate()
  const [confirm, setComfirm] = useState(false)

  // const [ImgSignature, setImgSignature] = useState([])
  const userlogin = localStorage.getItem('PersonalHistory')
  var delayInMilliseconds = 3000
  const CourseId = localStorage.getItem('AccessRights').substring(11, 14)
  const SignatureId = `${CourseId}-${PersId}`
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage))
    }
  }, [selectedImage])

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const getData = () => {
    try {
      Axios.get(process.env.REACT_APP_API + `/ListTeacher/${Id}`).then(
        (res) => {
          setUser(Object.assign({}, ...res.data)) // array of object to object
        },
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const editTeacher = () => {
    const formData = new FormData()
    formData.append('PersId', PersId)
    formData.append('Rank', Rank)
    formData.append('PersFname', PersFname)
    formData.append('PersLname', PersLname)
    formData.append('PersCurrPosition', PersCurrPosition)
    formData.append('PersAffiliation', PersAffiliation)
    formData.append('email', email)
    formData.append('SignatureId', SignatureId)
    formData.append('CourseId', CourseId)
    formData.append('AccessRightsId', Id)
    formData.append('ImgSignatureTest', ImgSignatureTest)
    formData.append(
      'file',
      selectedImage === undefined || selectedImage === null
        ? ImgSignatureTest
        : selectedImage,
    )

    JSON.parse(userlogin)[0].AccessRightsId === Id
      ? Axios.put(
          process.env.REACT_APP_API + `/updateListTeacher/${Id}/${CourseId}`,
          formData,
        ).then(
          (res) => {},
          setComfirm(true),
          toast.success(
            'ระบบได้ทำการอัพเดทข้อมูลเรียบร้อยแล้ว และจะทำการออกจากระบบ',
          ),
          setTimeout(function () {
            navigate('/')
            localStorage.clear()
          }, delayInMilliseconds),
        )
      : Axios.put(
          process.env.REACT_APP_API + `/updateListTeacher/${Id}/${CourseId}`,
          formData,
        ).then(
          (res) => {},
          setComfirm(true),
          toast.success('ระบบได้ทำการอัพเดทข้อมูลเรียบร้อยแล้ว'),
          navigate('/PageListTeacher'),
        )
  }

  const Arr = user
  const ImgSignatureTest =
    Arr.SignatureImg === null
      ? 'NoSignature'
      : Arr.SignatureImg !== null
      ? Arr.SignatureImg
      : ''

  return (
    <React.Fragment>
      {confirm ? (
        <ToastContainer draggable={false} transition={Zoom} autoClose={8000} />
      ) : (
        <></>
      )}

      <FormGroup>
        <div className="cotainerDetail">
          <p className="HeadTextMain">แก้ไขประวัติอาจารย์</p>
          <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <TextField
              label="เลขประจำตัวข้าราชการ"
              id="outlined-start-adornment"
              name="PersId"
              value={PersId}
              onChange={(e) => onValueChange(e)}
              disabled
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <InputLabel id="demo-simple-select-label">ยศ</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              onChange={(e) => onValueChange(e)}
              autoWidth
              value={Rank}
              name="Rank"
              label="ยศ"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Ranks.map((Rank) => (
                <MenuItem value={Rank} key={Rank}>
                  {Rank}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <TextField
              label="ชื่อ"
              id="outlined-start-adornment"
              name="PersFname"
              value={PersFname}
              onChange={(e) => onValueChange(e)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <TextField
              label="นามสกุล"
              id="outlined-start-adornment"
              name="PersLname"
              value={PersLname}
              onChange={(e) => onValueChange(e)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <TextField
              label="ตำแหน่ง"
              id="outlined-start-adornment"
              name="PersCurrPosition"
              value={PersCurrPosition}
              onChange={(e) => onValueChange(e)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <InputLabel id="demo-simple-select-label">สังกัด</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              onChange={(e) => onValueChange(e)}
              autoWidth
              value={PersAffiliation}
              name="PersAffiliation"
              label="สังกัด"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Companys.map((Company) => (
                <MenuItem value={Company} key={Company}>
                  {Company}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <TextField
              label="Email Rtaf"
              disabled
              id="outlined-start-adornment"
              value={email}
            />
          </FormControl>

          {Dir === 1 ? (
            <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
              <input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: 'none' }}
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />

              <label htmlFor="select-image">
                <center>
                  <Button variant="outlined" color="primary" component="span">
                    กดเพื่ออัพโหลดลายเซ็นอิเล็กทรอนิกส์
                  </Button>
                </center>
              </label>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {user.SignatureImg !== null ? (
                  <Box
                    mt={2}
                    textAlign="center"
                    sx={{
                      margin: '20px',
                      border: '1px dashed grey',
                      padding: '40px',
                      flex: '50%',
                    }}
                  >
                    <div>ลายเซ็นอิเล็กทรอนิกส์ (เก่า)</div>
                    <br></br>
                    <img
                      src={
                        process.env.REACT_APP_IMG_SIGN + `/${user.SignatureImg}`
                      }
                      alt=""
                      height="200px"
                    />
                  </Box>
                ) : (
                  <Box
                    mt={2}
                    textAlign="center"
                    sx={{
                      margin: '20px',
                      border: '1px dashed grey',
                      padding: '40px',
                      flex: '50%',
                    }}
                  >
                    <div>ลายเซ็นอิเล็กทรอนิกส์ (เก่า)</div>
                    <hr></hr>
                    <div>ไม่มีไฟล์ลายเซ็นอิเล็กทรอนิกส์ </div>
                  </Box>
                )}

                {imageUrl && selectedImage && (
                  <Box
                    mt={2}
                    textAlign="center"
                    sx={{
                      margin: '20px',
                      border: '1px dashed grey',
                      padding: '40px',
                      flex: '50%',
                    }}
                  >
                    <br></br>
                    <div>ลายเซ็นอิเล็กทรอนิกส์ (ใหม่)</div>
                    <br></br>
                    <img
                      src={imageUrl}
                      alt={selectedImage.name}
                      height="200px"
                    />
                  </Box>
                )}
              </Box>
            </FormControl>
          ) : (
            ''
          )}

          <div className="containerBtnbackPageEditListTeacher">
            <Button
              variant="outlined"
              sx={{ minWidth: 242, m: 1 }}
              onClick={() => editTeacher()}
            >
              บันทึก
            </Button>
            <Link to="/PageListTeacher">
              <Button variant="outlined" sx={{ minWidth: 242, m: 1 }}>
                ย้อนกลับ{' '}
              </Button>
            </Link>
          </div>
        </div>
      </FormGroup>
    </React.Fragment>
  )
}

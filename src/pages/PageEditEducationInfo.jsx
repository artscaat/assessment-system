/* eslint-disable no-useless-concat */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import TextField from '@mui/material/TextField'
import OwnDatePickersWithFunc from '../components/DatePickersWithFunc'

import moment from 'moment'
require('moment/locale/th')

export default function PageEditEducationInfo() {
  // const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { eduinfo } = location.state
  console.log('eduinfo edit ', eduinfo)
  const id = eduinfo.id
  const [file, setFile] = useState('')
  const [CourseYear, setCourseyear] = useState('')
  const [CourseGrp, setCoursegrpp] = useState('')
  const [CourseBegin, setCoursebegin] = useState('')
  const [CourseEnd, setCourseend] = useState('')
  // const [Namefile, setNamefile] = useState('')
  const [filename, setFilename] = useState(eduinfo.namefile)

  const defaultDatebegin = moment(eduinfo.CourseBegin).format('YYYY-MM-DD')
  const defaultDateend = moment(eduinfo.CourseEnd).format('YYYY-MM-DD')

  const submit = async () => {
    const formData = new FormData()
    formData.append('filename', eduinfo.namefile ? eduinfo.namefile : filename)
    formData.append('CourseYear', CourseYear ? CourseYear : eduinfo.CourseYear)
    formData.append('CourseGrp', eduinfo.CourseGrp)
    formData.append('start', CourseBegin ? CourseBegin : defaultDatebegin)
    formData.append('end', CourseEnd ? CourseEnd : defaultDateend)
    formData.append('file', file)
    Axios.put(
      process.env.REACT_APP_API + `/PageEditEducationInfo/${id}`,
      formData,
    ).then((res) => {
      console.log(res)
    })
    alert('Update Ok')
    navigate('/PageEducationInfo')
  }

  // console.log(user)

  return (
    <React.Fragment>
      <div className="cotainerDetail">
        <p className="HeadTextMain">แก้ไขข้อมูลการศึกษา</p>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <TextField
            label="ปีการศึกษา"
            id="outlined-start-adornment"
            name="CourseYear"
            defaultValue={eduinfo.CourseYear}
            onChange={(e) => setCourseyear(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <TextField
            label="รุ่น"
            id="outlined-start-adornment"
            name="CourseGrp"
            value={eduinfo.CourseGrp}
            disabled
            onChange={(e) => setCoursegrpp(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <TextField
            label="ระยะเวลาการศึกษา"
            id="outlined-start-adornment"
            InputLabelProps={{
              shrink: true,
            }}
            value={eduinfo.CourseTotalHrs + ' ' + 'ชั่วโมง'}
            disabled
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <OwnDatePickersWithFunc
            action={{
              label: 'วันเปิดหลักสูตร',
              name: 'CourseBegin',
              rec_date: defaultDatebegin,
              func: (newdate) => {
                setCoursebegin(newdate)
              },
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <OwnDatePickersWithFunc
            action={{
              label: 'วันปิดหลักสูตร',
              name: 'CourseEnd',
              rec_date: defaultDateend,
              func: (newdate) => {
                setCourseend(newdate)
              },
            }}
          />
        </FormControl>

        {/* <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel htmlFor="outlined"shrink variant="standard" >อัพโหลดไฟล์คำสั่งเข้าเรียน</InputLabel>
                <OutlinedInput   id="outlined" type='file'  onChange={handleUploadImage}  label="อัพโหลดไฟล์คำสั่งเข้าเรียน"  />
            </FormControl> */}
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <div className="custom-file mb-2">
            <label
              htmlFor="btn-files"
              className="btn"
              style={{
                borderRadius: '5px',
                border: '1px solid #778899',
                backgroundColor: '#F5F5F5',
                color: '#000',
                padding: '10px',
              }}
            >
              อัพโหลดไฟล์คำสั่งเข้าเรียน
              <input
                onChange={(e) => {
                  setFile(e.target.files[0])
                  setFilename(e.target.files[0].name)
                }}
                id="btn-files"
                hidden
                type="file"
                name="file"
                // accept="image/*"
                className="form-control"
              />
            </label>
            &nbsp;&nbsp;&nbsp;
            <label className="custom-file-label" htmlFor="customfile">
              {filename}
            </label>
          </div>
        </FormControl>
        <div className="containerBtnAddEdu">
          <Button
            variant="outlined"
            sx={{ minWidth: 242, m: 1 }}
            onClick={() => submit()}
          >
            บันทึก
          </Button>
          <Link to="/PageEducationInfo">
            <Button variant="outlined" sx={{ minWidth: 242, m: 1 }}>
              ย้อนกลับ
            </Button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}

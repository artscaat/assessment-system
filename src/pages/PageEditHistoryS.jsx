/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import Button from '@mui/material/Button'
// import { Link } from "react-router-dom";
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
// import { useNavigate } from "react-router-dom";
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'

const initialValues = {
  PersId: '',
  Rank: '',
  PersFname: '',
  PersLname: '',
  PersCorps: '',
  PersGrp: '',
  PersDutyNum: '',
  PersCurrPosition: '',
  PersAffiliation: '',
  StudentId: '',
  Seminar: '',
  AccesssRightsId: '',
  email: '',
  PersWeight: '',
  PersHeight: '',
 
}

export default function PageEditHistory() {
  const navigate = useNavigate()
  const Ranks = [
    'นาย',
    'นาง',
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
    ' พล.อ.อ.',
    'พล.อ.อ.หญิง',
  ]

  const Companys = [
    "กง.ทอ.",
"กบ.ทอ.",
"กพ.ทอ.",
"กร.ทอ.",
"ขว.ทอ.",
"ขส.ทอ.",
"คปอ.",
"จร.ทอ.",
"ชย.ทอ.",
"ชอ.ทอ.(ดอนเมือง)",
"ชอ.ทอ.(บางซื่อ)",
"ทสส.ทอ.",
"บก.ทอ.",
"พธ.ทอ.",
"พอ.",
"ยก.ทอ.",
"ยศ.ทอ.",
"รร.นนก.",
"ศวอ.ทอ.",
"สก.ทอ.",
"สตน.ทอ.",
"สธน.ทอ.",
"สน.ผบ.ดม",
"สนภ.ทอ.",
"สบ.ทอ.",
"สปช.ทอ.",
"สพ.ทอ.",
"สลก.ทอ.",
"สวบ.ทอ.",
"สอ.ทอ.",
"อย.",
"บน.1",
"บน.2",
"บน.3",
"บน.4",
"บน.5",
"บน.6",
"บน.7",
"บน.21",
"บน.23",
"บน.41",
"บน.46",
"บน.56",
"สถานีรายงาน",
"ศซว.ทอ.",
"ศซบ.ทอ.",
"รร.การบิน",
"สพร.ทอ.",
"ศปอว.ทอ.",
"สำนักงานการบิน ทอ.",
"สยล.ทอ.",
"สง.ปรมน.ทอ.",
"ศูนย์อำนวยการเครื่องบินพระราชพาหนะ",
"ศูนย์อำนวยการเฮลิคอปเตอร์พระราชพาหนะ",
"ศูนย์การสงครามทางอากาศ",
"สคม.ทอ."
  ];

  const Perscorps = [
    "นบ.",
    "ถร.",
    "ชอ.",
    "ชย.",
    "กง.",
    "สบ.",
    "ส.",
    "พธ.",
    "สพ.",
    "พ.",
    "ขส.",
    "วศ.",
    "อย.",
    "สห.",
    "พด.",
    "ดย.",
    "ผท.",
    "อต.",
    "ตห.",
  ];

  const PersGrps = [
    "ผู้ทำการในอากาศ",
    "ยุทธการ",
    "นักบิน",
    "วิทยาศาสตร์",
    "อุตุนิยมวิทยา",
    "ควบคุมการปฏิบัติทางอากาศ",
    "นิรภัย",
    "สารสนเทศและสงครามอิเล็กทรอนิกส์",
    "สื่อสารอิเล็กทรอนิกส์",
    "สรรพาวุธ",
    "ช่างอากาศ",
    "ส่งกำลังบำรุง",
    "ช่างพาหนะ",
    "ช่างโยธา",
    "แผนที่",
    "ขนส่ง",
    "พลาธิการ",
    "พัสดุ",
    "การเงิน",
    "ปลัดบัญชี",
    "ตรวจสอบภายใน",
    "สารบรรณ",
    "ลาดตระเวนทางอากาศ",
    "กำลังพล",
    "สวัสดิการ",
    "การศึกษาและการฝึก",
    "ดุริยางค์",
    "สารวัตร",
    "อากาศโยธิน",
    "กิจการพลเรือนและประชาสัมพันธ์",
    "อนุศาสนาจารย์",
    "บริการแพทย์",
    "พยาบาล",
    "การข่าวกรอง",
    "พระธรรมนูญ",
    "ผู้ชำนาญการแพทย์เฉพาะอย่าง",
    "เภสัชกร",
    "แพทย์",
    "ทันตแพทย์",
    "ผู้บังคับอากาศยานไร้คนขับ",
    "ปฏิบัติการทางอวกาศ",
    "ไม่ระบุจำพวก",
  ];

  const { id } = useParams()
  const [user, setUser] = useState(initialValues)
  const [StudentIds, setStudentIds] = useState(initialValues)
  const {
    PersId,
    Rank,
    PersFname,
    PersLname,
    PersCurrPosition,
    PersAffiliation,
    PersHeight,
    PersWeight,
    email,
    PersCorps,
    PersGrp,
    PersDutyNum,
  } = user
  const { StudentId, Seminar } = StudentIds
  const location = useLocation()
  const { coursegrp, seminar } = location.state
  // const { coursegrp, seminar } = location.state
  // const navigate = useNavigate();
  // const EmailS = localStorage.getItem('user')
  // const emailS = JSON.parse(EmailS)[0].email
  const onValueChange = (e) => {
    // console.log(e.target.value)
    setUser({ ...user, [e.target.name]: e.target.value })
    setStudentIds({ ...StudentIds, [e.target.name]: e.target.value })
    // console.log(user)
  }

  // console.log(user)
  // console.log(StudentIds)
  const getData = () => {
    try {
      Axios.get(process.env.REACT_APP_API + `/PageEditHistoryS/${id}`).then((res) => {
        setUser(Object.assign({}, ...res.data)) // array of object to object
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getDataStudentId = () => {
    try {
      Axios.get(process.env.REACT_APP_API + `/PageEditHistorySstudentId/${id}`).then(
        (res) => {
          setStudentIds(Object.assign({}, ...res.data)) // array of object to object
        },
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = () => Promise.all([
    getData(),
    getDataStudentId()
  ]);

  const editStudents = () => {
    Axios.put(process.env.REACT_APP_API + `/PageEditHistoryS/${id}`, {
      PersId: PersId,
      Rank: Rank,
      PersFname: PersFname,
      PersLname: PersLname,
      PersCurrPosition: PersCurrPosition,
      PersAffiliation: PersAffiliation,
      StudentId: StudentId,
      Seminar: Seminar,
      PersWeight: PersWeight,
      PersHeight: PersHeight,
      PersCorps:PersCorps,
      PersGrp:PersGrp,
      PersDutyNum:PersDutyNum,
    })
      .then(() => {
        fetchAll()
        // setUser([
        //   ...user,
        //   {
        //     PersId: PersId,
        //     Rank: Rank,
        //     PersFname: PersFname,
        //     PersLname: PersLname,
        //     PersCurrPosition: PersCurrPosition,
        //     PersAffiliation: PersAffiliation,
        //     StudentId: StudentId,
        //     PersWeight: PersWeight,
        //     PersHeight: PersHeight,
        //     PersCorps:PersCorps,
        //     PersGrp:PersGrp,
        //     PersDutyNum:PersDutyNum,
        //   },
        // ])
      })
      .then(() => {
        fetchAll()
        // setStudentIds([
        //   ...StudentIds,
        //   {
        //     StudentId: StudentId,
        //     Seminar: Seminar,
        //   },
        // ])
      })
    alert('Update Ok')
    navigate('/PageHistoyrS', {
      state: {
        coursegrp: coursegrp,
        seminar: seminar,
      },
    })
  }

  return (
    <React.Fragment>
      <FormGroup>
        <div className="cotainerDetail">
          <p className="HeadTextMain">แก้ไขประวัติ นทน.</p>
          <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <TextField
              label="เลขประจำตัว"
              id="outlined-start-adornment"
              name="StudentId"
              type="number"
              value={StudentId}
              onChange={(e) => onValueChange(e)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <TextField
              label="สัมมนา"
              id="outlined-start-adornment"
              name="Seminar"
              type="number"
              value={Seminar}
              onChange={(e) => onValueChange(e)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <TextField
              label="เลขประจำตัวข้าราชการ(กรุณากรอกเลข10หลัก)"
              placeholder="เลขประจำตัวข้าราชการ(กรุณากรอกเลข10หลัก)"
              id="outlined-start-adornment"
              inputProps={{ maxLength: 10 }}
              name="PersId"
              value={PersId}
              onChange={(e) => onValueChange(e)}
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
            {/* <TextField label="สังกัด" id="outlined-start-adornment" name='PersAffiliation' value={PersAffiliation} onChange={(e)=> onValueChange(e)} /> */}
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
          <InputLabel id="demo-simple-select-label">เหล่า</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            onChange={(e) => onValueChange(e)}
            autoWidth
            value={PersCorps}
            name='PersCorps'
            label="เหล่า"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Perscorps.map((Perscorp) => (
              <MenuItem value={Perscorp} key={Perscorp}>
                {Perscorp}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel id="demo-simple-select-label">จำพวก</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            onChange={(e) => onValueChange(e)}
            autoWidth
            value={PersGrp}
            name='PersGrp'
            label="จำพวก"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {PersGrps.map((PersGrp) => (
              <MenuItem value={PersGrp} key={PersGrp}>
                {PersGrp}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <TextField
              label="ลชทอ."
              id="outlined-start-adornment"
              type="text"
              name="PersDutyNum"
              value={PersDutyNum}
              onChange={(e) => onValueChange(e)}
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <TextField
              label="Email Rtaf"
              disabled
              id="outlined-start-adornment"
              name="email"
              value={email}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <TextField
              label="น้ำหนัก"
              id="outlined-start-adornment"
              type="number"
              name="PersWeight"
              value={PersWeight}
              onChange={(e) => onValueChange(e)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <TextField
              label="ส่วนสูง"
              id="outlined-start-adornment"
              type="number"
              name="PersHeight"
              value={PersHeight}
              onChange={(e) => onValueChange(e)}
            />
          </FormControl>
        </div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box>
            <Button
              variant="contained"
              sx={{ m: 1, width: '15.5vw' }}
              onClick={() => editStudents()}
            >
              บันทึก
            </Button>
          </Box>
          <Box>
            <Link
              to="/PageHistoyrS"
              state={{
                coursegrp: coursegrp,
                seminar: seminar,
              }}
            >
              <Button variant="outlined" sx={{ m: 1, width: '15.5vw' }}>
                ย้อนกลับ
              </Button>
            </Link>
          </Box>
        </Box>
      </FormGroup>
    </React.Fragment>
  )
}

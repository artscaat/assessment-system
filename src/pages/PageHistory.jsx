/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'

export default function PageHistory() {
  const ReceivePersonalHistory = localStorage.getItem('PersonalHistory')
  const PersonalHistory = localStorage.getItem('PersonalHistory')
  const AccessRights = localStorage.getItem('AccessRights')
  const AllAccessRights = localStorage.getItem('AllAccessRights')
  const [confirm, setComfirm] = useState(false)
  const navigate = useNavigate()
  const [persid, setPersId] = useState(JSON.parse(PersonalHistory)[0].PersId)
  const [rank, setRank] = useState(JSON.parse(PersonalHistory)[0].Rank)
  const [persfname, setPersFname] = useState(JSON.parse(PersonalHistory)[0].PersFname)
  const [perslname, setPersLname] = useState(JSON.parse(PersonalHistory)[0].PersLname)
  const [perscurrposition, setPersCurrPosition] = useState(
    JSON.parse(PersonalHistory)[0].PersCurrPosition,
  )
  const [persaffiliation, setPersAffiliation] = useState(
    JSON.parse(PersonalHistory)[0].PersAffiliation,
  )
  const [PersCorps, setPersCorps] = useState(
    JSON.parse(PersonalHistory)[0].PersCorps,
  )
  const [PersGrp, setPersGrp] = useState(
    JSON.parse(PersonalHistory)[0].PersGrp,
  )
  const [PersDutyNum, setPersDutyNum] = useState(
    JSON.parse(PersonalHistory)[0].PersDutyNum,
  )
  const [email, setEmail] = useState(JSON.parse(PersonalHistory)[0].email)
  const [users, setUsers] = useState([])
  const [allAccessRights, setAllAccessRights] = useState(
    JSON.parse(AllAccessRights),
  )
  const [selectedImage, setSelectedImage] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const Access = localStorage.getItem('Access')
  const [persweight, setPersWeight] = useState(
    Access === 'นทน.' ? JSON.parse(ReceivePersonalHistory)[0].PersWeight : null,
  )
  const [persheight, setPersHeight] = useState(
    Access === 'นทน.' ? JSON.parse(ReceivePersonalHistory)[0].PersHeight : null,
  )
  const [StudentId, setStudentId] = useState(
    Access === 'นทน.' ? JSON.parse(ReceivePersonalHistory)[0].StudentId : null,
  )
  const [Seminar, setSeminar] = useState(
    Access === 'นทน.' ? JSON.parse(ReceivePersonalHistory)[0].Seminar : null,
  )
  const CourseId = JSON.parse(PersonalHistory)[0].AccessRightsId.substring(11, 14)
  // const CourseYear = new Date().getFullYear() + 543
  const AccessRightsId = JSON.parse(PersonalHistory)[0].AccessRightsId
  const [ImgSignature, setImgSignature] = useState([])
  const SignatureId = `${CourseId}-${persid}`
  // const [ImgSignatureDirector,setImgSignatureDirector] = useState(ImgSignature[0].SignatureImg)

  console.log(selectedImage)

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage))
    }
  }, [selectedImage])

  var delayInMilliseconds = 3000
  // function handleChange(event) {
  //     console.log(event.target.value);
  //   }
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
    'พล.อ.อ.',
    'พล.อ.อ.หญิง',
  ]
  // const Companys = [
  //   'ศบพ.',
  //   'ศฮพ.',
  //   'ศกอ.',
  //   'สพร.ทอ.',
  //   'สคม.ทอ.',
  //   'สลก.ทอ.',
  //   'สบ.ทอ.',
  //   'กพ.ทอ.',
  //   'ขว.ทอ.',
  //   'ยก.ทอ.',
  //   'กบ.ทอ.',
  //   'กร.ทอ.',
  //   'ทสส.ทอ.',
  //   'สปช.ทอ.',
  //   'กง.ทอ.',
  //   'จร.ทอ.',
  //   'สตน.ทอ.',
  //   'สนภ.ทอ.',
  //   'สธน.ทอ.',
  //   'ศซบ.ทอ.',
  //   'สบน.ทอ.',
  //   'คปอ.ทอ.',
  //   'อย.',
  //   'รร.การบิน',
  //   'บน.1',
  //   'บน.2',
  //   'บน.3',
  //   'บน.4',
  //   'บน.5',
  //   'บน.7',
  //   'บน.6',
  //   'บน.23',
  //   'บน.21',
  //   'บน.41',
  //   'บน.46',
  //   'บน.56',
  //   'ศปอว.ทอ.',
  //   'พธ.ทอ.',
  //   'ชอ.',
  //   'สอ.ทอ.',
  //   'สพ.ทอ.',
  //   'พอ.',
  //   'ขส.ทอ.',
  //   'ชย.ทอ.',
  //   'ศซว.ทอ.',
  //   'ยศ.ทอ.',
  //   'รร.นนก.',
  //   'ศวอ.ทอ.',
  //   'สก.ทอ.',
  //   'สน.ผบ.ดม.',
  //   'สวบ.ทอ.',
  // ]

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
 
  const editUserS = () => {
    const formData = new FormData()
    formData.append('PersId', persid)
    formData.append('Rank', rank)
    formData.append('PersFname', persfname)
    formData.append('PersLname', perslname)
    formData.append('PersCurrPosition', perscurrposition)
    formData.append('PersAffiliation', persaffiliation)
    formData.append('email', email)
    formData.append('allAccessRights', allAccessRights.Student)
    formData.append('persweight', persweight)
    formData.append('persheight', persheight)
    formData.append('PersCorps', PersCorps)
    formData.append('PersGrp', PersGrp)
    formData.append('PersDutyNum', PersDutyNum)
    formData.append(
      'file',
      selectedImage === undefined || selectedImage === null
        ? ImgSignatureTest
        : selectedImage,
    )
    formData.append('CourseId', CourseId)
    formData.append('AccessRightsId', AccessRightsId)
    formData.append('ImgSignatureTest', ImgSignatureTest)
    formData.append('SignatureId', SignatureId)
    Axios.put(process.env.REACT_APP_API + `/PageHistory/${AccessRightsId}`,formData)
    .then((res) => {
      // console.log(res)
       })
       setComfirm(true)
       toast.success("ระบบได้ทำการอัพเดทเรียบร้อยแล้ว และจะทำการออกจากระบบ");
       setTimeout(function() {
         navigate('/')
         localStorage.clear();
       }, delayInMilliseconds);
  }

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/ImgSignature/${SignatureId}`)
      .then((res) => {
        setImgSignature(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const Arr = ImgSignature
  const ImgSignatureTest =
    Arr.length === 0
      ? 'NoSignature'
      : Arr.length === 1
      ? [Arr[0].SignatureImg]
      : ''

  return (
    <React.Fragment>
      {confirm ? (
        <ToastContainer draggable={false} transition={Zoom} autoClose={8000} />
      ) : (
        <></>
      )}
      <div className="cotainerDetail">
        <p className="HeadTextMain">ทะเบียนประวัติ</p>
        {Access === 'นทน.' ? (
          <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <InputLabel htmlFor="outlined">เลขประจำตัว</InputLabel>
            <OutlinedInput
              disabled
              id="outlined"
              label="เลขประจำตัว"
              value={StudentId}
              onChange={(event) => {
                setStudentId(event.target.value)
              }}
            />
          </FormControl>
        ) : (
          ''
        )}

        {Access === 'นทน.' ? (
          <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <InputLabel htmlFor="outlined">สัมมนา</InputLabel>
            <OutlinedInput
              disabled
              id="outlined"
              label="สัมมนา"
              value={Seminar}
              onChange={(event) => {
                setSeminar(event.target.value)
              }}
            />
          </FormControl>
        ) : (
          ''
        )}

        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel htmlFor="outlined">เลขประจำตัวข้าราชการ(กรุณากรอกเลข10หลัก)</InputLabel>
          <OutlinedInput
            disabled
            id="outlined"
            inputProps={{ maxLength: 10 }}
            label="เลขประจำตัวข้าราชการ(กรุณากรอกเลข10หลัก)"
            placeholder="เลขประจำตัวข้าราชการ(กรุณากรอกเลข10หลัก)"
            value={persid}
            onChange={(e) => setPersId(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel id="demo-simple-select-label">ยศ</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            onChange={(e) => setRank(e.target.value)}
            autoWidth
            value={rank}
            // name='PersAffiliation'
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
          <InputLabel htmlFor="outlined">ชื่อ</InputLabel>
          <OutlinedInput
            id="outlined"
            label="ชื่อ"
            value={persfname}
            onChange={(e) => setPersFname(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel htmlFor="outlined">นามสกุล</InputLabel>
          <OutlinedInput
            id="outlined"
            label="นามสกุล"
            value={perslname}
            onChange={(e) => setPersLname(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel htmlFor="outlined">ตำแหน่ง</InputLabel>
          <OutlinedInput
            id="outlined"
            label="ตำแหน่ง"
            value={perscurrposition}
            onChange={(e) => setPersCurrPosition(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel id="demo-simple-select-label">สังกัด</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            onChange={(e) => setPersAffiliation(e.target.value)}
            autoWidth
            value={persaffiliation}
            // name='PersAffiliation'
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
        {Access === 'นทน.' ? (
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel id="demo-simple-select-label">เหล่า</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            onChange={(e) => setPersCorps(e.target.value)}
            autoWidth
            value={PersCorps}
            // name='PersAffiliation'
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
          ) : (
            ''
          )}

        {Access === 'นทน.' ? (
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel id="demo-simple-select-label">จำพวก</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            onChange={(e) => setPersGrp(e.target.value)}
            autoWidth
            value={PersGrp}
            // name='PersAffiliation'
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
            ) : (
              ''
            )}
        {Access === 'นทน.' ? (
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel htmlFor="outlined">ลชทอ.</InputLabel>
          <OutlinedInput
            id="outlined"
            label="ลชทอ."
            value={PersDutyNum}
            onChange={(event) => {
              setPersDutyNum(event.target.value)
            }}
          />
        </FormControl>
          ) : (
            ''
          )}
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel htmlFor="outlined">Email Rtaf</InputLabel>
          <OutlinedInput
            id="outlined"
            disabled
            label="Email Rtaf"
            value={email}
          />
        </FormControl>
        {Access === 'นทน.' ? (
          <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <InputLabel htmlFor="outlined">น้ำหนัก</InputLabel>
            <OutlinedInput
              id="outlined"
              label="น้ำหนัก"
              onChange={(event) => {
                setPersWeight(event.target.value)
              }}
              value={persweight}
            />
          </FormControl>
        ) : (
          ''
        )}

        {Access === 'นทน.' ? (
          <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
            <InputLabel htmlFor="outlined">ส่วนสูง</InputLabel>
            <OutlinedInput
              id="outlined"
              label="ส่วนสูง"
              onChange={(event) => {
                setPersHeight(event.target.value)
              }}
              value={persheight}
            />
          </FormControl>
        ) : (
          ''
        )}

        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <input
            accept="image/*"
            type="file"
            id="select-image"
            style={{ display: 'none' }}
            onChange={(e) => setSelectedImage(e.target.files[0])}
          />
          {Access === 'ผอ.' ? (
            <label htmlFor="select-image">
              <Button variant="outlined" color="primary" component="span">
                อัพโหลดลายเซ็นอิเล็กทรอนิกส์
              </Button>
            </label>
          ) : (
            ''
          )}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {imageUrl && selectedImage && (
              <Box mt={2} textAlign="center" sx={{ margin: '10px' }}>
                <div>ลายเซ็นอิเล็กทรอนิกส์(new):</div>
                <img src={imageUrl} alt={selectedImage.name} height="200px" />
              </Box>
            )}
            {ImgSignatureTest.length === 0 || Access !== 'ผอ.' ? (
              ''
            ) : (
              <Box mt={2} textAlign="center" sx={{ margin: '10px' }}>
                <div>ลายเซ็นอิเล็กทรอนิกส์(old):</div>
                <img
                  src={process.env.REACT_APP_IMG_SIGN + `/${ImgSignatureTest}`} //LOCAL
                  // src={`https://sscd2022.rtaf.mi.th/uploadsign/${ImgSignatureTest}`} SERVER
                  alt=""
                  height="200px"
                />
              </Box>
            )}
          </Box>
        </FormControl>

        <Button
          variant="outlined"
          sx={{ minWidth: 500, m: 1 }}
          onClick={() => editUserS()}
        >
          แก้ไขประวัติ
        </Button>
      </div>
    </React.Fragment>
  )
}

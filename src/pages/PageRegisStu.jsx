import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PageRegisStu() {
  const Ranks = [
    "นาย",
    "นาง",
    "นางสาว",
    "จ.ต.",
    "จ.ต.หญิง",
    "จ.ท.",
    "จ.ท.หญิง",
    "จ.อ.",
    "จ.อ.หญิง",
    "พ.อ.ต.",
    "พ.อ.ต.หญิง",
    "พ.อ.ท.",
    "พ.อ.ท.หญิง",
    "พ.อ.อ.",
    "พ.อ.อ.หญิง",
    "ร.ต.",
    "ร.ต.หญิง",
    "ร.ท.",
    "ร.ท.หญิง",
    "ร.อ.",
    "ร.อ.หญิง",
    "น.ต.",
    "น.ต.หญิง",
    "น.ท.",
    "น.ท.หญิง",
    "น.อ.",
    "น.อ.หญิง",
    "พล.อ.ต.",
    "พล.อ.ต.หญิง",
    "พล.อ.ท.",
    "พล.อ.ท.หญิง",
    "พล.อ.อ.",
    "พล.อ.อ.หญิง",
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

  // const Companys = [
  //   "ศบพ.",
  //   "ศฮพ.",
  //   "ศกอ.",
  //   "บก.ทอ.",
  //   "สพร.ทอ.",
  //   "สคม.ทอ.",
  //   "สลก.ทอ.",
  //   "สบ.ทอ.",
  //   "กพ.ทอ.",
  //   "ขว.ทอ.",
  //   "ยก.ทอ.",
  //   "กบ.ทอ.",
  //   "กร.ทอ.",
  //   "ทสส.ทอ.",
  //   "สปช.ทอ.",
  //   "กง.ทอ.",
  //   "จร.ทอ.",
  //   "สตน.ทอ.",
  //   "สนภ.ทอ.",
  //   "สธน.ทอ.",
  //   "ศซบ.ทอ.",
  //   "สบน.ทอ.",
  //   "คปอ.ทอ.",
  //   "อย.",
  //   "รร.การบิน",
  //   "บน.1",
  //   "บน.2",
  //   "บน.3",
  //   "บน.4",
  //   "บน.5",
  //   "บน.7",
  //   "บน.6",
  //   "บน.23",
  //   "บน.21",
  //   "บน.41",
  //   "บน.46",
  //   "บน.56",
  //   "ศปอว.ทอ.",
  //   "พธ.ทอ.",
  //   "ชอ.",
  //   "สอ.ทอ.",
  //   "สพ.ทอ.",
  //   "พอ.",
  //   "ขส.ทอ.",
  //   "ชย.ทอ.",
  //   "ศซว.ทอ.",
  //   "ยศ.ทอ.",
  //   "รร.นนก.",
  //   "ศวอ.ทอ.",
  //   "สก.ทอ.",
  //   "สน.ผบ.ดม.",
  //   "สวบ.ทอ.",
  // ];
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
  // const school = localStorage.getItem('school')
  // const [courseid,setCourseId] = useState(JSON.parse(school)[0].CourseId);
  const [coursegrp, setCourseGrp] = useState("");
  const [courseyear, setCourseYear] = useState("");
  const [persid, setPersId] = useState("");
  const [rank, setRank] = useState("");
  const [persfname, setPersFname] = useState("");
  const [perslname, setPersLname] = useState("");
  const [perscorps, setPersCorps] = useState("");
  const [persgrp, setPersGrp] = useState("");
  const [perscurrposition, setPersCurrPosition] = useState("");
  const [persaffiliation, setPersAffiliation] = useState("");
  const [persdutynum, setPersDutyNum] = useState("");
  const [persweight, setPersWeight] = useState("");
  const [persheight, setPersHeight] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  // const courseyearid = "";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [state, setState] = useState([]);
  const [stateID, setStateID] = useState([0]);
  const [alerts, setAlerts] = useState(false);
  const [FetchEmailRegister, setFetchEmailRegister] = useState([]);
  const [FetchAccessRightsId, setFetchAccessRightsId] = useState([]);
  const [FetchFileCourseYear, setFetchFileCourseYear] = useState([]);
  const [FetchCourseYear, setFetchCourseYear] = useState([]);
  const AccessRightsIdS = persid + "-" + stateID[0].CourseId;
 
//  console.log(email)
//  const withoutLastChunk = email.slice(0, email.lastIndexOf("@"));
//  console.log(withoutLastChunk)


  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/FetchFileCourseYear`)
      .then((res) => {
        setFetchFileCourseYear(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/FetchAccessRightsId`)
      .then((res) => {
        setFetchAccessRightsId(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/FetchEmailRegister`)
      .then((res) => {
        setFetchEmailRegister(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/FetchCourseYear`)
      .then((res) => {
        setFetchCourseYear(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    fetch(process.env.REACT_APP_API +"/pmecourse")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const EmailRegisters = FetchEmailRegister.map(
    (FetchEmailRegis) => FetchEmailRegis.email
  );
  const FilterEmailRegister = EmailRegisters.filter(
    (EmailRegister) => EmailRegister === email
  );

  const FetchAccessRightsIdSs = FetchAccessRightsId.map(
    (FetchEmailRegis) => FetchEmailRegis.AccessRightsId
  );
  const FilterAccessRightsIdSs = FetchAccessRightsIdSs.filter(
    (AccessRightsIdSs) => AccessRightsIdSs === AccessRightsIdS
  );

  const FetchFileCourseYears = FetchFileCourseYear.map(
    (FetchFileCourseYearsS) => FetchFileCourseYearsS.Id_file
  );

  const FilterFileCourseYears = FetchFileCourseYears.filter(
    (FilterFileCourseYearsS) =>
      FilterFileCourseYearsS === stateID[0].CourseId + "-" + coursegrp
  );

  const FetchCourseYears = FetchCourseYear.map(
    (FetchCourseYearsS) => FetchCourseYearsS.CourseYearId
  );

  const FilterCourseYears = FetchCourseYears.filter(
    (FetchCourseYearsS) =>
      FetchCourseYearsS === stateID[0].CourseId + "-" + coursegrp + "-" + persid
  );

  // console.log(FilterCourseYears);

  const submit = () => {
    if (
      coursegrp === "" ||
      courseyear === "" ||
      persid === "" ||
      rank === "" ||
      persfname === "" ||
      perslname === "" ||
      perscorps === "" ||
      persgrp === "" ||
      perscurrposition === "" ||
      persaffiliation === "" ||
      persdutynum === "" ||
      persweight === "" ||
      persheight === "" ||
      email === "" ||
      state === "" ||
      stateID === "" 
      
    ) {
      setAlerts(true);
      toast.error("กรุณากรอกข้อมูลให้เรียบร้อยเรียบร้อย");
    }
    else if(  email.search("@") > 0 ){
      setAlerts(true);
      toast.error("กรุณาอย่าใส่@rtaf.mi.th");
    }
    else if(  persid.length < 10 ){
      setAlerts(true);
      toast.error("กรุณากรอกเลขประจำตัวข้าราชการให้ครบ10หลัก");
    }
    else if (
      FilterEmailRegister.length > 0 &&
      FilterCourseYears.length === 0 &&
      FilterAccessRightsIdSs.length === 0 &&
      FilterFileCourseYears.length === 0
    ) {
      setAlerts(true);
      toast.success("สมัครสมาชิกเสร็จเรียบร้อย");
      Axios.post(process.env.REACT_APP_API +"/RegisStuNoFileCourseYears", {
        coursegrp: coursegrp,
        courseyear: courseyear,
        stateid: stateID[0].Academy,
        courseid: stateID[0].CourseId,
        states: state[0],
        persid: persid,
        accessrightsid: persid + "-" + stateID[0].CourseId,
        rank: rank,
        persfname: persfname,
        perslname: perslname,
        perscorps: perscorps,
        persgrp: persgrp,
        perscurrposition: perscurrposition,
        persaffiliation: persaffiliation,
        persdutynum: persdutynum,
        email: email,
        // password:password,
        courseyearid: stateID[0].CourseId + "-" + coursegrp + "-" + persid,
        persweight: persweight,
        persheight: persheight,
      }).then(() => {
        setUser([
          ...user,
          {
            coursegrp: coursegrp,
            courseyear: courseyear,
            stateid: stateID[0].Academy,
            states: state[0],
            courseid: stateID[0].CourseId,
            persid: persid,
            accessrightsid: persid + "-" + stateID[0].CourseId,
            rank: rank,
            persfname: persfname,
            perslname: perslname,
            perscorps: perscorps,
            persgrp: persgrp,
            perscurrposition: perscurrposition,
            persaffiliation: persaffiliation,
            persdutynum: persdutynum,
            email: email,
            // password:password,
            courseyearid: stateID[0].CourseId + "-" + coursegrp + "-" + persid,
            persweight: persweight,
            persheight: persheight,
          },
        ]);
      });

      setTimeout(() => {
        navigate(`/`);
      }, 3000);
    } else if (
      FilterEmailRegister.length > 0 &&
      FilterCourseYears.length === 0 &&
      FilterAccessRightsIdSs.length === 0 &&
      FilterFileCourseYears.length === 1
    ) {
      setAlerts(true);
      toast.success("สมัครสมาชิกเสร็จเรียบร้อย");
      Axios.post(process.env.REACT_APP_API + "/RegisStuHaveFileCourseYears", {
        coursegrp: coursegrp,
        courseyear: courseyear,
        stateid: stateID[0].Academy,
        courseid: stateID[0].CourseId,
        states: state[0],
        persid: persid,
        accessrightsid: persid + "-" + stateID[0].CourseId,
        rank: rank,
        persfname: persfname,
        perslname: perslname,
        perscorps: perscorps,
        persgrp: persgrp,
        perscurrposition: perscurrposition,
        persaffiliation: persaffiliation,
        persdutynum: persdutynum,
        email: email,
        // password:password,
        courseyearid: stateID[0].CourseId + "-" + coursegrp + "-" + persid,
        persweight: persweight,
        persheight: persheight,
      }).then(() => {
        setUser([
          ...user,
          {
            coursegrp: coursegrp,
            courseyear: courseyear,
            stateid: stateID[0].Academy,
            states: state[0],
            courseid: stateID[0].CourseId,
            persid: persid,
            accessrightsid: persid + "-" + stateID[0].CourseId,
            rank: rank,
            persfname: persfname,
            perslname: perslname,
            perscorps: perscorps,
            persgrp: persgrp,
            perscurrposition: perscurrposition,
            persaffiliation: persaffiliation,
            persdutynum: persdutynum,
            email: email,
            // password:password,
            courseyearid: stateID[0].CourseId + "-" + coursegrp + "-" + persid,
            persweight: persweight,
            persheight: persheight,
          },
        ]);
      });

      setTimeout(() => {
        navigate(`/`);
      }, 3000);
    }

    else if (
      FilterEmailRegister.length === 0 &&
      FilterCourseYears.length === 0 &&
      FilterAccessRightsIdSs.length === 0 &&
      FilterFileCourseYears.length === 1
    ) {
      setAlerts(true);
      toast.success("สมัครสมาชิกเสร็จเรียบร้อย");
      Axios.post(process.env.REACT_APP_API +"/RegisStu", {
        coursegrp: coursegrp,
        courseyear: courseyear,
        stateid: stateID[0].Academy,
        courseid: stateID[0].CourseId,
        states: state[0],
        persid: persid,
        accessrightsid: persid + "-" + stateID[0].CourseId,
        rank: rank,
        persfname: persfname,
        perslname: perslname,
        perscorps: perscorps,
        persgrp: persgrp,
        perscurrposition: perscurrposition,
        persaffiliation: persaffiliation,
        persdutynum: persdutynum,
        email: email,
        // password:password,
        courseyearid: stateID[0].CourseId + "-" + coursegrp + "-" + persid,
        persweight: persweight,
        persheight: persheight,
      }).then(() => {
        setUser([
          ...user,
          {
            coursegrp: coursegrp,
            courseyear: courseyear,
            stateid: stateID[0].Academy,
            states: state[0],
            courseid: stateID[0].CourseId,
            persid: persid,
            accessrightsid: persid + "-" + stateID[0].CourseId,
            rank: rank,
            persfname: persfname,
            perslname: perslname,
            perscorps: perscorps,
            persgrp: persgrp,
            perscurrposition: perscurrposition,
            persaffiliation: persaffiliation,
            persdutynum: persdutynum,
            email: email,
            // password:password,
            courseyearid: stateID[0].CourseId + "-" + coursegrp + "-" + persid,
            persweight: persweight,
            persheight: persheight,
          },
        ]);
      });

      setTimeout(() => {
        navigate(`/`);
      }, 3000);
    } else if (
      FilterEmailRegister.length === 0 &&
      FilterCourseYears.length === 0 &&
      FilterAccessRightsIdSs.length === 0 &&
      FilterFileCourseYears.length === 0
    ) {
      setAlerts(true);
      toast.success("สมัครสมาชิกเสร็จเรียบร้อย");
      Axios.post(process.env.REACT_APP_API +"/HaveAllRegisStu", {
        coursegrp: coursegrp,
        courseyear: courseyear,
        stateid: stateID[0].Academy,
        courseid: stateID[0].CourseId,
        states: state[0],
        persid: persid,
        accessrightsid: persid + "-" + stateID[0].CourseId,
        rank: rank,
        persfname: persfname,
        perslname: perslname,
        perscorps: perscorps,
        persgrp: persgrp,
        perscurrposition: perscurrposition,
        persaffiliation: persaffiliation,
        persdutynum: persdutynum,
        email: email,
        // password:password,
        courseyearid: stateID[0].CourseId + "-" + coursegrp + "-" + persid,
        persweight: persweight,
        persheight: persheight,
      }).then(() => {
        setUser([
          ...user,
          {
            coursegrp: coursegrp,
            courseyear: courseyear,
            stateid: stateID[0].Academy,
            states: state[0],
            courseid: stateID[0].CourseId,
            persid: persid,
            accessrightsid: persid + "-" + stateID[0].CourseId,
            rank: rank,
            persfname: persfname,
            perslname: perslname,
            perscorps: perscorps,
            persgrp: persgrp,
            perscurrposition: perscurrposition,
            persaffiliation: persaffiliation,
            persdutynum: persdutynum,
            email: email,
            // password:password,
            courseyearid: stateID[0].CourseId + "-" + coursegrp + "-" + persid,
            persweight: persweight,
            persheight: persheight,
          },
        ]);
      });

      setTimeout(() => {
        navigate(`/`);
      }, 3000);
    } else if (FilterAccessRightsIdSs.length === 1) {
      setAlerts(true);
      toast.error(
        "ท่านได้เป็นสมาชิกอยู่ในหลักสูตรนี้แล้วกรุณาแจ้งAdminเพื่อเปลี่ยนสิทธิ์"
      );
    } else {
      setAlerts(true);
      toast.error("เกิดข้อผิดพลาดกรุณาติดต่อAdmin");
    }
  };

  // console.log("FilterEmailRegister", FilterEmailRegister.length);
  // console.log("FilterCourseYears", FilterCourseYears.length);
  // console.log("FilterAccessRightsIdSs", FilterAccessRightsIdSs.length);
  // console.log("FilterFileCourseYears", FilterFileCourseYears.length);

  const academy = [...new Set(data.map((item) => item.Academy))];
  academy.sort();
  const handleAcademy = (e) => {
    let Singleacademy = data.filter((item) => item.Academy === e.target.value);
    let states = [...new Set(Singleacademy.map((item) => item.CourseName))];
    setState(states);
  };

  const handleStateChange = (e) => {
    let singleCourse = data.filter(
      (item) => item.CourseName === e.target.value
    );
    setStateID(singleCourse);
  };

  return (
    <React.Fragment>
      {alerts ? (
        <ToastContainer draggable={false} transition={Zoom} autoClose={3000} />
      ) : (
        <></>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <p className="HeadTextRegis">สมัครสมาชิกสำหรับ นทน.</p>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel error={coursegrp.length <= 0} required htmlFor="outlined">
            รุ่น
          </InputLabel>
          <OutlinedInput
            error={coursegrp.length <= 0}
            id="outlined"
            label="รุ่น"
            type="number"
            onChange={(event) => {
              setCourseGrp(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel
            error={courseyear.length <= 0}
            required
            htmlFor="outlined"
          >
            ปีการศึกษา
          </InputLabel>
          <OutlinedInput
            error={courseyear.length <= 0}
            id="outlined"
            label="ปีการศึกษา"
            type="number"
            onChange={(event) => {
              setCourseYear(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 500 }}>
          <InputLabel
            error={state.length <= 0}
            required
            htmlFor="grouped-select"
          >
            สถานศึกษา
          </InputLabel>
          <Select
            error={state.length <= 0}
            onChange={(e) => handleAcademy(e)}
            defaultValue=""
            id="grouped-select"
            label="สถานศึกษา"
            name="school"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {academy.map((items, index) => (
              <MenuItem key={index} value={items}>
                {items}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 500 }}>
          <InputLabel
            error={state.length <= 0}
            required
            htmlFor="grouped-select"
          >
            หลักสูตร
          </InputLabel>
          <Select
            error={state.length <= 0}
            onChange={(e) => handleStateChange(e)}
            defaultValue=""
            id="grouped-select"
            label="หลักสูตร"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {state.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel error={persid.length <= 0 && persid.length < 10} required htmlFor="outlined">
            เลขประจำตัวข้าราชการ(กรุณากรอกเลข10หลัก)
          </InputLabel>
          <OutlinedInput
            error={persid.length <= 0 && persid.length < 10}
            id="outlined"
            type="text"
            placeholder="กรุณากรอกเลข10หลัก (ตัวอย่าง 0123456789 หรือ STU1234567)"
            // inputProps={{ maxLength: 1 }}
            // onInput={(e)=>{ 
            //   e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
            // }}
            // min={0}
            inputProps={{ maxLength: 10 ,mixLength: 10 }}
            label="เลขประจำตัวข้าราชการ(กรุณากรอกเลข10หลัก)"
            onChange={(event) => {
              setPersId(event.target.value);
            }}
            
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 500 }}>
          <InputLabel
            error={rank.length <= 0}
            required
            htmlFor="grouped-select"
          >
            ยศ
          </InputLabel>
          <Select
            error={rank.length <= 0}
            defaultValue=""
            id="grouped-select"
            label="ยศ"
            onChange={(event) => {
              setRank(event.target.value);
            }}
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
          <InputLabel error={persfname.length <= 0} required htmlFor="outlined">
            ชื่อ
          </InputLabel>
          <OutlinedInput
            error={persfname.length <= 0}
            id="outlined"
            label="ชื่อ"
            onChange={(event) => {
              setPersFname(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel error={perslname.length <= 0} required htmlFor="outlined">
            นามสกุล
          </InputLabel>
          <OutlinedInput
            error={perslname.length <= 0}
            id="outlined"
            label="นามสกุล"
            onChange={(event) => {
              setPersLname(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 500 }}>
          <InputLabel
            error={perscorps.length <= 0}
            required
            htmlFor="grouped-select"
          >
            เหล่า
          </InputLabel>
          <Select
            error={perscorps.length <= 0}
            defaultValue=""
            id="grouped-select"
            label="เหล่า"
            onChange={(event) => {
              setPersCorps(event.target.value);
            }}
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
        <FormControl sx={{ m: 1, minWidth: 500 }}>
          <InputLabel
            error={persgrp.length <= 0}
            required
            htmlFor="grouped-select"
          >
            จำพวก
          </InputLabel>
          <Select
            error={persgrp.length <= 0}
            defaultValue=""
            id="grouped-select"
            label="จำพวก"
            onChange={(event) => {
              setPersGrp(event.target.value);
            }}
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
          <InputLabel
            error={persdutynum.length <= 0}
            required
            htmlFor="outlined"
          >
            ลชทอ.
          </InputLabel>
          <OutlinedInput
            error={persdutynum.length <= 0}
            id="outlined"
            label="ลชทอ."
            onChange={(event) => {
              setPersDutyNum(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel
            error={perscurrposition.length <= 0}
            required
            htmlFor="outlined"
          >
            ตำแหน่งปัจจุบัน
          </InputLabel>
          <OutlinedInput
            error={perscurrposition.length <= 0}
            id="outlined"
            label="ตำแหน่งปัจจุบัน"
            onChange={(event) => {
              setPersCurrPosition(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 500 }}>
          <InputLabel
            error={persaffiliation.length <= 0}
            required
            htmlFor="grouped-select"
          >
            สังกัด
          </InputLabel>
          <Select
            error={persaffiliation.length <= 0}
            defaultValue=""
            id="grouped-select"
            label="สังกัด"
            onChange={(event) => {
              setPersAffiliation(event.target.value);
            }}
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
          <InputLabel error={email.length <= 0} required htmlFor="outlined">
            Email Rtaf
          </InputLabel>
          <OutlinedInput
            error={email.length <= 0}
            id="outlined"
            label="Email Rtaf"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder="ไม่ต้องใส่ @rtaf.mi.th"
          />
        </FormControl>
        {/* <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
                <InputLabel error={password.length <= 0} required htmlFor="outlined">Password</InputLabel>
                <OutlinedInput error={password.length <= 0} id="outlined" label="Password" onChange={(event) => {setPassword(event.target.value)}}/>
            </FormControl> */}
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel
            error={persweight.length <= 0}
            required
            htmlFor="outlined"
          >
            น้ำหนัก
          </InputLabel>
          <OutlinedInput
            error={persweight.length <= 0}
            id="outlined"
            label="น้ำหนัก"
            type="number"
            onChange={(event) => {
              setPersWeight(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 500 }} variant="outlined">
          <InputLabel
            error={persheight.length <= 0}
            required
            htmlFor="outlined"
          >
            ส่วนสูง
          </InputLabel>
          <OutlinedInput
            error={persheight.length <= 0}
            id="outlined"
            label="ส่วนสูง"
            type="number"
            onChange={(event) => {
              setPersHeight(event.target.value);
            }}
          />
        </FormControl>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            m: 1,
          }}
        >
          {/* <Link to="/RegisStu"><Button variant="outlined" sx={{minWidth: 244, m:1  }} >ตกลง</Button></Link> */}
          <Button
            variant="outlined"
            sx={{ minWidth: 244, m: 1 }}
            onClick={() => submit()}
          >
            ตกลง
          </Button>
          <Link to="/">
            <Button variant="outlined" sx={{ minWidth: 244, m: 1 }}>
              ย้อนกลับ
            </Button>
          </Link>
        </Box>
      </Box>
    </React.Fragment>
  );
}

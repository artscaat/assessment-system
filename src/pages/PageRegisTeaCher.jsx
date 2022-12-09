import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PageTeaCher() {
  const navigate = useNavigate();
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
  // const Companys = [
  //   "ศบพ.",
  //   "ศฮพ.",
  //   "ศกอ.",
  //   'บก.ทอ.',
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
  const [persid, setPersId] = useState("");
  const [rank, setRank] = useState("");
  const [persfname, setPersFname] = useState("");
  const [perslname, setPersLname] = useState("");
  const [perscurrposition, setPersCurrPosition] = useState("");
  const [persaffiliation, setPersAffiliation] = useState("");
  const [email, setEmail] = useState("");
  const [userteach, setUserTeach] = useState([]);
  const [data, setData] = useState([]);
  const [state, setState] = useState([]);
  const [stateID, setStateID] = useState([0]);
  const [alerts, setAlerts] = useState(false);
  const [FetchEmailInstructor, setFetchEmailInstructor] = useState([]);
  const [FetchAccessRightsId, setFetchAccessRightsId] = useState([]);
  const AccessRightsIdS = persid + "-" + stateID[0].CourseId;

  // const withoutLastChunk = email.slice(0, email.lastIndexOf("@"));
// console.log(email.search("@"))

  useEffect(() => {
    fetch(process.env.REACT_APP_API +"/pmecourse")
      .then((res) => res.json())
      .then((data) => setData(data));
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
    Axios.get(process.env.REACT_APP_API + `/FetchEmailInstructor`)
      .then((res) => {
        setFetchEmailInstructor(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const EmailInstructors = FetchEmailInstructor.map(
    (FetchEmailInstruc) => FetchEmailInstruc.email
  );
  const FilterEmailInstructor = EmailInstructors.filter(
    (EmailInstructor) => EmailInstructor === email
  );
  const FetchAccessRightsIdSs = FetchAccessRightsId.map(
    (FetchEmailRegis) => FetchEmailRegis.AccessRightsId
  );
  const FilterAccessRightsIdSs = FetchAccessRightsIdSs.filter(
    (AccessRightsIdSs) => AccessRightsIdSs === AccessRightsIdS
  );

  // console.log(FilterEmailInstructor)
  // console.log("FilterEmailInstructor" , FilterEmailInstructor)
  // console.log("FilterAccessRightsIdSs" , FilterAccessRightsIdSs)
  const submit = () => {
    if (
      persid === "" ||
      rank === "" ||
      persfname === "" ||
      perslname === "" ||
      perscurrposition === "" ||
      persaffiliation === "" ||
      email === "" ||
      state === "" ||
      stateID === ""
    ) {
      setAlerts(true);
      toast.error("กรุณากรอกข้อมูลให้เรียบร้อยเรียบร้อย");
    }
      else if(  persid.length < 10 ){
      setAlerts(true);
      toast.error("กรุณากรอกเลขประจำตัวข้าราชการให้ครบ10หลัก");
    }
    else if(  email.search("@") > 0 ){
      setAlerts(true);
      toast.error("กรุณาอย่าใส่@rtaf.mi.th");
    }
     else if (FilterEmailInstructor.length > 0 && FilterAccessRightsIdSs.length === 0 ) {
      setAlerts(true);
      toast.success("สมัครสมาชิกหลักสูตรนี้เสร็จเรียบร้อย");
      Axios.post(process.env.REACT_APP_API +"/RegisTeacAccessRightsIdSsZero", {
        stateid: stateID[0].Academy,
        accessrightsid: persid + "-" + stateID[0].CourseId,
        persid: persid,
        rank: rank,
        persfname: persfname,
        perslname: perslname,
        perscurrposition: perscurrposition,
        persaffiliation: persaffiliation,
        email: email,
        // password:password,
        // accessrightsid:accessrightsid
      }).then(() => {
        setUserTeach([
          ...userteach,
          {
            stateid: stateID[0].Academy,
            accessrightsid: persid + "-" + stateID[0].CourseId,
            persid: persid,
            rank: rank,
            persfname: persfname,
            perslname: perslname,
            perscurrposition: perscurrposition,
            persaffiliation: persaffiliation,
            email: email,
            // password:password,
            // accessrightsid:accessrightsid
          },
        ]);
      });
      setTimeout(() => {
        navigate(`/`);
      }, 3000);
    } else if (FilterAccessRightsIdSs.length === 0 && FilterEmailInstructor.length === 0) {
      setAlerts(true);
      toast.success("สมัครสมาชิกเสร็จเรียบร้อย");
      Axios.post(process.env.REACT_APP_API +"/RegisTeac", {
        stateid: stateID[0].Academy,
        accessrightsid: persid + "-" + stateID[0].CourseId,
        persid: persid,
        rank: rank,
        persfname: persfname,
        perslname: perslname,
        perscurrposition: perscurrposition,
        persaffiliation: persaffiliation,
        email: email,
        // password:password,
        // accessrightsid:accessrightsid
      }).then(() => {
        setUserTeach([
          ...userteach,
          {
            stateid: stateID[0].Academy,
            accessrightsid: persid + "-" + stateID[0].CourseId,
            persid: persid,
            rank: rank,
            persfname: persfname,
            perslname: perslname,
            perscurrposition: perscurrposition,
            persaffiliation: persaffiliation,
            email: email,
            // password:password,
            // accessrightsid:accessrightsid
          },
        ]);
      });
      setTimeout(() => {
        navigate(`/`);
      }, 3000);
    } else if(FilterAccessRightsIdSs.length === 1 && FilterEmailInstructor.length > 0){
      setAlerts(true);
      toast.success("เป็นสมาชิกอยู่แล้ว");
     
    }
  };

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
        <p className="HeadTextRegis">สมัครสมาชิกสำหรับ เจ้าหน้าที่</p>
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
            placeholder="เลขประจำตัวข้าราชการ(กรุณากรอกเลข10หลัก)"
            // onInput={(e)=>{ 
            //   e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
            // }}
            // min={0}
            label="เลขประจำตัวข้าราชการ(กรุณากรอกเลข10หลัก)"
           
            onChange={(event) => {
              setPersId(event.target.value);
            }}
            inputProps={{ maxLength: 10 ,mixLength: 10 }}
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
                <InputLabel htmlFor="outlined">Password</InputLabel>
                <OutlinedInput id="outlined" label="Password" onChange={(event) => {setPassword(event.target.value)}}/>
            </FormControl> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            m: 1,
          }}
        >
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

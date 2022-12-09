/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import {
  Settings,
  Report,
  AccountBox,
  SignalCellularAlt,
  AccessTime,
  Group,
  HowToReg,
  MenuBook,
} from '@material-ui/icons'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../img/logo.png'
import Axios from 'axios'

export default function Sidebar() {
  // const id = localStorage.getItem('AccessRights')
  const CourseName = localStorage.getItem('CourseName')
  const Academy = localStorage.getItem('Academy')
  const Access = localStorage.getItem('Access')
  const user = localStorage.getItem('PersonalHistory')
  const [PersId, setPersId] = useState(JSON.parse(user)[0].PersId)
  const courIds = localStorage.getItem('AccessRights')
  const courId = courIds.substring(11, 14)
  const [selected, setSelected] = React.useState([])
  const navigate = useNavigate()
  // const [AccessRights, setAccessRights] = useState([]);
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [dataSuccess, setSuccess] = useState([])
  // const [chkAttFile1, setchkAttFile1] = useState('')

  const [isLoading, setLoading] = useState(true);
  const [ldataid, setLDataId] = useState('');

  // useEffect(() => {
  //   getdatastuByid()
  // }, [])

  const listStudent = async () => {
    try {
      const data = await Axios.get(
        process.env.REACT_APP_API + `/menustudent/${PersId}/${courId}`,
      )
      return data.data[0]
    } catch (error) {
      console.log(error)
    }
  }

  const loadData = async (listStudent1) => {
    try {
      const selected = await Axios.get(
        process.env.REACT_APP_API + `/pageInsertScore/coursegrp/${listStudent1.CourseGrp}/${listStudent1.Seminar}/${courId}`,
      )
    //   .then((res) => {
        if (Access === 'นทน.') {
            localStorage.setItem(
                'datastorage',
                JSON.stringify(selected.data.map((e) => Object.assign(e, { 'courseid': courId })))
            );
        }
        // setSelected(res.data);
        // setLoading(false);
    // })
      // console.log("data: ",selected.data)
      setLoading(false);
      return selected.data
    } catch (err) {
      console.log("-")
    }
  }

  const loadNor = async (listStudent1) => {
    try {
      const data2 = await Axios.get(
        process.env.REACT_APP_API + `/getpercentment/courseid/${courId}/coursegrp/${listStudent1.CourseGrp}`,
      )
      // console.log("getData: ",res.data);
      // })
      return data2.data
    } catch (err) {
      console.log("-")
    }
  }

  const chkSendScoreE = async (listStudent1) => {
    try {
      const data3 = await Axios.get(process.env.REACT_APP_API + `/chkSendScore/${courIds}/${listStudent1.CourseGrp}`,
      )
      // console.log("getData: ",data3.data);
      // })
      setLoading(false);
      return data3.data[0].Chksendscore
    } catch (err) {
      console.log("-")
    }
  }

  const getdatastuByid = async () => {
    const result = await listStudent()
    const result3 = await chkSendScoreE(result)
    const result1 = await loadData(result)
    const result2 = await loadNor(result)    
    setSuccess(result3)
    setData(result)
    setSelected(result1)
    setData2(result2)
  }

  // const fetchWithPromiseAll = async () => {
  //   const listStudentPromise = listStudent()
  //   const chkSendScoreEPromise = chkSendScoreE()
  //   const loadDataPromise = loadData()
  //   const loadNorPromise = loadNor()

  //   const [liststudent, chksendscore, loaddata, loadnor] = await Promise.all([
  //     listStudentPromise,
  //     chkSendScoreEPromise,
  //     loadDataPromise,
  //     loadNorPromise,

  //     setSuccess(chksendscore),
  //     setData(liststudent),
  //     setSelected(loaddata),
  //     setData2(loadnor)


  //   ])
  // }

  useEffect(() => {
    getdatastuByid()
    // fetchWithPromiseAll()
  }, [])

  const chkSucess = (dataSuccess) => {
    // console.log("dataSuccess === []: ",dataSuccess)
    if (Access === 'นทน.') {
      if (dataSuccess === undefined) {
        const chkSucess = undefined !== dataSuccess === 0 ? true : false
        // console.log("dataSuccess === []1: ",chkSucess)
        return chkSucess
      } 
      else {
        const chkSucess = dataSuccess === "1" ? true : false
        // console.log("dataSuccess === []2: ",dataSuccess)
        return chkSucess
      }
    } else {
      const chkSucess = undefined !== (dataSuccess === [] || dataSuccess === '0') ? false : true
      // console.log("dataSuccess: ",dataSuccess)
    return chkSucess
  }
}

// console.log("chkSucess: ",chkSucess())
  

  const result = undefined !== selected ? selected : []
  // console.log("selected: ",selected)
  // console.log("data: ",data)
  let storeitem = result.filter((item) => {
    return item.persid === PersId
  })

  // console.log("storeitem: ", storeitem);

  const merged = storeitem.map((item) => Object.assign(item, { 'AccessRightsId': data.AccessRightsId }))
    
  
  // setDataStorage(response.data.map((e) => Object.assign(e, { 'CourseId': courId, 'CourseGrp': _coursegrp, 'Seminar': _seminar })));

  // console.log("merged: ", merged);

  useEffect(() => {
    if (merged.length !== 0) {
        setLDataId(merged[0].id);
    }
  }, [merged.length]);

  const result2 = undefined !== data2 ? data2 : []
  let storeitem1 = result2.filter((item) => {
    return item.PersId === PersId
  })

  let dataToUse = Object.keys(merged).map((el) => {
    let obj = {
      courseid: courId,
      period: storeitem[el].period,
      coursegrp: storeitem[el].coursegrp,
      seminar: storeitem[el].seminar,
      persid: storeitem[el].persid,
      studentid: storeitem[el].studentid,
      studentname: storeitem[el].studentname,
      businessleave: storeitem[el].businessleave,
      sickleave: storeitem[el].sickleave,
      conductscore: storeitem[el].conductscore,
      sumattendhrs: storeitem[el].sumattendhrs,
      percentattendhrs: storeitem[el].percentattendhrs,
      remark: storeitem[el].remark,
      AccessRightsId: storeitem[el].AccessRightsId,
    }
    return obj
  })

  let dataOrdnr = Object.keys(storeitem1).map((el) => {
    let obj = {
      CourseGrp: storeitem1[el].CourseGrp,
      CourseId: storeitem1[el].CourseId,
      PersId: storeitem1[el].PersId,
      avg: storeitem1[el].avg,
      ordnr: storeitem1[el].ordnr === undefined ? '-' : storeitem1[el].ordnr,
    }
    return obj
  })

  //   console.log("dataOrdnr: ", dataOrdnr);
    // console.log("dataToUse: ", dataToUse[0]);
  // const dataStu = dataToUse[0]

  const dataToUse1 = dataToUse.map((e) => {
    return {
      ...e,
      ...dataOrdnr.find((s) => s.PersId === e.persid),
    }
  })

//   console.log("dataToUse1: ", dataToUse1);

  return (
    <React.Fragment>
      {Access === 'กรรมวิธีส่วนกลาง' && (
        <div className="sidebar">
          <div className="sidebarWrapper">
            <div className="sidebarMenu">
              <div className="imgSidebar">
                <Link to="/PageEducationInfo" className="link">
                  <img src={Logo} alt="logo" className="logoSidebar" />
                </Link>
              </div>
              <div className="containerTextTitleSidebar">
                <p className="sidebarTitle">สถานศึกษา {Academy}</p>
                <p className="sidebarTitle">หลักสูตร {CourseName}</p>
              </div>

              <ul className="sidebarList">
                <Link to="/PageHistory" className="link">
                  <li className="sidebarListItem ">
                    <AccountBox className="sidebarIcon" />
                    ทะเบียนประวัติผู้ใช้
                  </li>
                  <hr />
                </Link>

                <Link to="/PageHistoyrS" className="link">
                  <li className="sidebarListItem ">
                    <AccountBox className="sidebarIcon" />
                    ทะเบียนประวัติผู้เข้ารับการศึกษา
                  </li>
                  <hr />
                </Link>
                <Link to="/PageInsertScore" className="link">
                  <li className="sidebarListItem">
                    <AccessTime className="sidebarIcon" />
                    ชั่วโมงการศึกษา และคะแนนความประพฤติ
                  </li>
                  <hr />
                </Link>
                <Link to="/PageEstimate" className="link">
                  <li className="sidebarListItem">
                    <HowToReg className="sidebarIcon" />
                    การวัด และประเมินผลการเรียน
                  </li>
                  <hr />
                </Link>
                <Link to="/PageAttribute" className="link">
                  <li className="sidebarListItem">
                    <HowToReg className="sidebarIcon" />
                    การวัด และประเมินคุณลักษณะส่วนบุคคล
                  </li>
                  <hr />
                </Link>
                <Link to="/PageSummarize" className="link">
                  <li className="sidebarListItem">
                    <SignalCellularAlt className="sidebarIcon" />
                    ผลการศึกษาสรุปรวม
                  </li>
                  <hr />
                </Link>
                <Link to="/PageStudyResults" className="link">
                  <li className="sidebarListItem">
                    <Report className="sidebarIcon" />
                    รายงานผลการศึกษา
                  </li>
                  <hr />
                </Link>
                <Link to="/PageSubject" className="link">
                  <li className="sidebarListItem">
                    <MenuBook className="sidebarIcon" />
                    หมวดวิชาของสถานศึกษา
                  </li>
                  <hr />
                </Link>
                <Link to="/PagePersonalAttributes" className="link">
                  <li className="sidebarListItem">
                    <Group className="sidebarIcon" />
                    คุณลักษณะส่วนบุคคลทั้งหมด
                  </li>
                  <hr />
                </Link>
                <Link to="/PageListTeacher" className="link">
                  <li className="sidebarListItem">
                    <Group className="sidebarIcon" />
                    รายชื่อเจ้าหน้าที่
                  </li>
                  <hr />
                </Link>
                <Link to="/PageManage" className="link">
                  <li className="sidebarListItem">
                    <Settings className="sidebarIcon" />
                    จัดการสมาชิก
                  </li>
                  <hr />
                </Link>
              </ul>
            </div>
          </div>
        </div>
      )}
      {Access === 'ปกครอง' && (
        <div className="sidebar">
          <div className="sidebarWrapper">
            <div className="sidebarMenu">
              <div className="imgSidebar">
                <Link to="/PageEducationInfo" className="link">
                  <img src={Logo} alt="logo" className="logoSidebar" />
                </Link>
              </div>
              <div className="containerTextTitleSidebar">
                <p className="sidebarTitle">สถานศึกษา {Academy}</p>
                <p className="sidebarTitle">หลักสูตร {CourseName}</p>
              </div>

              <ul className="sidebarList">
                <Link to="/PageHistory" className="link">
                  <li className="sidebarListItem ">
                    <AccountBox className="sidebarIcon" />
                    ทะเบียนประวัติผู้ใช้
                  </li>
                  <hr />
                </Link>

                <Link to="/PageHistoyrS" className="link active">
                  <li className="sidebarListItem ">
                    <AccountBox className="sidebarIcon" />
                    ทะเบียนประวัติผู้เข้ารับการศึกษา
                  </li>
                  <hr />
                </Link>
                <Link to="/PageInsertScore" className="link">
                  <li className="sidebarListItem">
                    <AccessTime className="sidebarIcon" />
                    ชั่วโมงการศึกษา และคะแนนความประพฤติ
                  </li>
                  <hr />
                </Link>

                <Link to="/PageAttribute" className="link">
                  <li className="sidebarListItem">
                    <HowToReg className="sidebarIcon" />
                    การวัด และประเมินคุณลักษณะส่วนบุคคล
                  </li>
                  <hr />
                </Link>
                <Link to="/PageSummarize" className="link">
                  <li className="sidebarListItem">
                    <SignalCellularAlt className="sidebarIcon" />
                    ผลการศึกษาสรุปรวม
                  </li>
                  <hr />
                </Link>

                <Link to="/PageListTeacher" className="link">
                  <li className="sidebarListItem">
                    <Group className="sidebarIcon" />
                    รายชื่อเจ้าหน้าที่
                  </li>
                  <hr />
                </Link>
              </ul>
            </div>
          </div>
        </div>
      )}
      {Access === 'นทน.' && (
        <div className="sidebar">
          <div className="sidebarWrapper">
            <div className="sidebarMenu">
              <div className="imgSidebar">
                <img src={Logo} alt="logo" className="logoSidebar" />
              </div>
              <div className="containerTextTitleSidebar">
                <p className="sidebarTitle">สถานศึกษา {Academy}</p>
                <p className="sidebarTitle">หลักสูตร {CourseName}</p>
              </div>

              <ul className="sidebarList">
                <Link to="/PageHistory" className="link">
                  <li className="sidebarListItem ">
                    <AccountBox className="sidebarIcon" />
                    ทะเบียนประวัติผู้ใช้
                  </li>
                  <hr />
                </Link>
                <Link
                  to="/PageEditInsertScore"
                  className="link"
                  state={{
                    id: ldataid,
                    prev_page: 0,
                    newdatastorage: '',
                  }}
                >
                  <li className="sidebarListItem">
                    <AccessTime className="sidebarIcon" />
                    ชั่วโมงการศึกษา และคะแนนความประพฤติ
                  </li>
                  <hr />
                </Link>

                {chkSucess(dataSuccess) || isLoading
                  ?
                  courId === '074' || courId === '075' || courId === '082' || courId === '083' ? (
                  <Link
                  to="/PagePrintStudyResultsOne"
                  state={{
                    coursegrp: dataToUse.coursegrp,
                    seminar: dataToUse.seminar,
                    businessleave: dataToUse.businessleave,
                    sickleave: dataToUse.sickleave,
                    percentattendhrs: dataToUse.percentattendhrs,
                    period: dataToUse.period,
                    PersId: dataToUse.persid,
                    AccessRightsId: dataToUse.AccessRightsId,
                    Cutstring: dataToUse.courseid,
                    CourseGrp: dataToUse.coursegrp,
                    ordnr: dataOrdnr.ordnr,
                    imgInstrId: dataToUse.InstructorId
                      ? dataToUse.InstructorId
                      : '-',
                    imgpath: dataToUse.SignatureImg
                      ? dataToUse.SignatureImg
                      : '-',
                    chkattackfile : "0",
                    dateattechfile : "-",
                    data: dataToUse1,
                  }}
                  className="link"
                >
                  <li className="sidebarListItem">
                    <Report className="sidebarIcon" />
                    รายงานผลการศึกษา
                  </li>
                  <hr />
                </Link>)
                : (
                  <Link
              to={`/PagePrintStudyResults`}
              state={{
                coursegrp: dataToUse.coursegrp,
                seminar: dataToUse.seminar,
                businessleave: dataToUse.businessleave,
                sickleave: dataToUse.sickleave,
                percentattendhrs: dataToUse.percentattendhrs,
                period: dataToUse.period,
                PersId: dataToUse.persid,
                AccessRightsId: dataToUse.AccessRightsId,
                Cutstring: dataToUse.Cutstring,
                CourseGrp: dataToUse.CourseGrp,
                ordnr: dataOrdnr.ordnr,
                imgInstrId: dataToUse.InstructorId
                      ? dataToUse.InstructorId
                      : '-',
                    imgpath: dataToUse.SignatureImg
                      ? dataToUse.SignatureImg
                      : '-',
                    chkattackfile : "0",
                    dateattechfile : "-",
                    data: dataToUse1,
              }}
              className="link"
            >
              <li className="sidebarListItem">
                    <Report className="sidebarIcon" />
                    รายงานผลการศึกษา
                  </li>
                  <hr />
            </Link>
                )
                  : ''
                }
              </ul>
            </div>
          </div>
        </div>
      )}
      {Access === 'อาจารย์ประจำหมวดวิชา' && (
        <div className="sidebar">
          <div className="sidebarWrapper">
            <div className="sidebarMenu">
              <div className="imgSidebar">
                <img src={Logo} alt="logo" className="logoSidebar" />
              </div>
              <div className="containerTextTitleSidebar">
                <p className="sidebarTitle">สถานศึกษา {Academy}</p>
                <p className="sidebarTitle">หลักสูตร {CourseName}</p>
              </div>

              <ul className="sidebarList">
                <Link to="/PageHistory" className="link">
                  <li className="sidebarListItem ">
                    <AccountBox className="sidebarIcon" />
                    ทะเบียนประวัติผู้ใช้
                  </li>
                  <hr />
                </Link>

                <Link to="/PageHistoyrS" className="link active">
                  <li className="sidebarListItem ">
                    <AccountBox className="sidebarIcon" />
                    ทะเบียนประวัติผู้เข้ารับการศึกษา
                  </li>
                  <hr />
                </Link>
                <Link to="/PageInsertScore" className="link">
                  <li className="sidebarListItem">
                    <AccessTime className="sidebarIcon" />
                    ชั่วโมงการศึกษา และคะแนนความประพฤติ
                  </li>
                  <hr />
                </Link>
                <Link to="/PageEstimate" className="link">
                  <li className="sidebarListItem">
                    <HowToReg className="sidebarIcon" />
                    การวัด และประเมินผลการเรียน
                  </li>
                  <hr />
                </Link>
                <Link to="/PageListTeacher" className="link">
                  <li className="sidebarListItem">
                    <Group className="sidebarIcon" />
                    รายชื่อเจ้าหน้าที่
                  </li>
                  <hr />
                </Link>
              </ul>
            </div>
          </div>
        </div>
      )}
      {Access === 'วัดผล' && (
        <div className="sidebar">
          <div className="sidebarWrapper">
            <div className="sidebarMenu">
              <div className="imgSidebar">
                <Link to="/PageEducationInfo" className="link">
                  <img src={Logo} alt="logo" className="logoSidebar" />
                </Link>
              </div>
              <div className="containerTextTitleSidebar">
                <p className="sidebarTitle">สถานศึกษา {Academy}</p>
                <p className="sidebarTitle">หลักสูตร {CourseName}</p>
              </div>

              <ul className="sidebarList">
                <Link to="/PageHistory" className="link">
                  <li className="sidebarListItem ">
                    <AccountBox className="sidebarIcon" />
                    ทะเบียนประวัติผู้ใช้
                  </li>
                  <hr />
                </Link>

                <Link to="/PageHistoyrS" className="link active">
                  <li className="sidebarListItem ">
                    <AccountBox className="sidebarIcon" />
                    ทะเบียนประวัติผู้เข้ารับการศึกษา
                  </li>
                  <hr />
                </Link>
                <Link to="/PageInsertScore" className="link">
                  <li className="sidebarListItem">
                    <AccessTime className="sidebarIcon" />
                    ชั่วโมงการศึกษา และคะแนนความประพฤติ
                  </li>
                  <hr />
                </Link>
                <Link to="/PageEstimate" className="link">
                  <li className="sidebarListItem">
                    <HowToReg className="sidebarIcon" />
                    การวัด และประเมินผลการเรียน
                  </li>
                  <hr />
                </Link>
                <Link to="/PageAttribute" className="link">
                  <li className="sidebarListItem">
                    <HowToReg className="sidebarIcon" />
                    การวัด และประเมินคุณลักษณะส่วนบุคคล
                  </li>
                  <hr />
                </Link>
                <Link to="/PageSummarize" className="link">
                  <li className="sidebarListItem">
                    <SignalCellularAlt className="sidebarIcon" />
                    ผลการศึกษาสรุปรวม
                  </li>
                  <hr />
                </Link>
                <Link to="/PageStudyResults" className="link">
                  <li className="sidebarListItem">
                    <Report className="sidebarIcon" />
                    รายงานผลการศึกษา
                  </li>
                  <hr />
                </Link>
                <Link to="/PageSubject" className="link">
                  <li className="sidebarListItem">
                    <MenuBook className="sidebarIcon" />
                    หมวดวิชาของสถานศึกษา
                  </li>
                  <hr />
                </Link>
                <Link to="/PagePersonalAttributes" className="link">
                  <li className="sidebarListItem">
                    <Group className="sidebarIcon" />
                    คุณลักษณะส่วนบุคคลทั้งหมด
                  </li>
                  <hr />
                </Link>
                <Link to="/PageListTeacher" className="link">
                  <li className="sidebarListItem">
                    <Group className="sidebarIcon" />
                    รายชื่อเจ้าหน้าที่
                  </li>
                  <hr />
                </Link>
              </ul>
            </div>
          </div>
        </div>
      )}
      {Access === 'กรรมวิธี' && (
        <div className="sidebar">
          <div className="sidebarWrapper">
            <div className="sidebarMenu">
              <div className="imgSidebar">
                <Link to="/PageEducationInfo" className="link">
                  <img src={Logo} alt="logo" className="logoSidebar" />
                </Link>
              </div>
              <div className="containerTextTitleSidebar">
                <p className="sidebarTitle">สถานศึกษา {Academy}</p>
                <p className="sidebarTitle">หลักสูตร {CourseName}</p>
              </div>

              <ul className="sidebarList">
                <Link to="/PageHistory" className="link">
                  <li className="sidebarListItem ">
                    <AccountBox className="sidebarIcon" />
                    ทะเบียนประวัติผู้ใช้
                  </li>
                  <hr />
                </Link>

                <Link to="/PageHistoyrS" className="link active">
                  <li className="sidebarListItem ">
                    <AccountBox className="sidebarIcon" />
                    ทะเบียนประวัติผู้เข้ารับการศึกษา
                  </li>
                  <hr />
                </Link>
                <Link to="/PageInsertScore" className="link">
                  <li className="sidebarListItem">
                    <AccessTime className="sidebarIcon" />
                    ชั่วโมงการศึกษา และคะแนนความประพฤติ
                  </li>
                  <hr />
                </Link>
                <Link to="/PageEstimate" className="link">
                  <li className="sidebarListItem">
                    <HowToReg className="sidebarIcon" />
                    การวัด และประเมินผลการเรียน
                  </li>
                  <hr />
                </Link>
                <Link to="/PageAttribute" className="link">
                  <li className="sidebarListItem">
                    <HowToReg className="sidebarIcon" />
                    การวัด และประเมินคุณลักษณะส่วนบุคคล
                  </li>
                  <hr />
                </Link>
                <Link to="/PageSummarize" className="link">
                  <li className="sidebarListItem">
                    <SignalCellularAlt className="sidebarIcon" />
                    ผลการศึกษาสรุปรวม
                  </li>
                  <hr />
                </Link>
                <Link to="/PageStudyResults" className="link">
                  <li className="sidebarListItem">
                    <Report className="sidebarIcon" />
                    รายงานผลการศึกษา
                  </li>
                  <hr />
                </Link>
                <Link to="/PageSubject" className="link">
                  <li className="sidebarListItem">
                    <MenuBook className="sidebarIcon" />
                    หมวดวิชาของสถานศึกษา
                  </li>
                  <hr />
                </Link>
                <Link to="/PagePersonalAttributes" className="link">
                  <li className="sidebarListItem">
                    <Group className="sidebarIcon" />
                    คุณลักษณะส่วนบุคคลทั้งหมด
                  </li>
                  <hr />
                </Link>
                <Link to="/PageListTeacher" className="link">
                  <li className="sidebarListItem">
                    <Group className="sidebarIcon" />
                    รายชื่อเจ้าหน้าที่
                  </li>
                  <hr />
                </Link>
                <Link to="/PageManage" className="link">
                  <li className="sidebarListItem">
                    <Settings className="sidebarIcon" />
                    จัดการสมาชิก
                  </li>
                  <hr />
                </Link>
              </ul>
            </div>
          </div>
        </div>
      )}
      {Access === 'ผอ.' && (
        <div className="sidebar">
          <div className="sidebarWrapper">
            <div className="sidebarMenu">
              <div className="imgSidebar">
                <Link to="/PageEducationInfo" className="link">
                  <img src={Logo} alt="logo" className="logoSidebar" />
                </Link>
              </div>
              <div className="containerTextTitleSidebar">
                <p className="sidebarTitle">สถานศึกษา {Academy}</p>
                <p className="sidebarTitle">หลักสูตร {CourseName}</p>
              </div>

              <ul className="sidebarList">
                <Link to="/PageHistory" className="link">
                  <li className="sidebarListItem ">
                    <AccountBox className="sidebarIcon" />
                    ทะเบียนประวัติผู้ใช้
                  </li>
                  <hr />
                </Link>

                <Link to="/PageHistoyrS" className="link active">
                  <li className="sidebarListItem ">
                    <AccountBox className="sidebarIcon" />
                    ทะเบียนประวัติผู้เข้ารับการศึกษา
                  </li>
                  <hr />
                </Link>
                <Link to="/PageInsertScore" className="link">
                  <li className="sidebarListItem">
                    <AccessTime className="sidebarIcon" />
                    ชั่วโมงการศึกษา และคะแนนความประพฤติ
                  </li>
                  <hr />
                </Link>
                <Link to="/PageEstimate" className="link">
                  <li className="sidebarListItem">
                    <HowToReg className="sidebarIcon" />
                    การวัด และประเมินผลการเรียน
                  </li>
                  <hr />
                </Link>
                <Link to="/PageAttribute" className="link">
                  <li className="sidebarListItem">
                    <HowToReg className="sidebarIcon" />
                    การวัด และประเมินคุณลักษณะส่วนบุคคล
                  </li>
                  <hr />
                </Link>
                <Link to="/PageSummarize" className="link">
                  <li className="sidebarListItem">
                    <SignalCellularAlt className="sidebarIcon" />
                    ผลการศึกษาสรุปรวม
                  </li>
                  <hr />
                </Link>
                <Link to="/PageStudyResults" className="link">
                  <li className="sidebarListItem">
                    <Report className="sidebarIcon" />
                    รายงานผลการศึกษา
                  </li>
                  <hr />
                </Link>

                <Link to="/PageListTeacher" className="link">
                  <li className="sidebarListItem">
                    <Group className="sidebarIcon" />
                    รายชื่อเจ้าหน้าที่
                  </li>
                  <hr />
                </Link>
              </ul>
            </div>
          </div>
        </div>
      )}
      {Access === 'วัดผลส่วนกลาง' && (
        <div className="sidebar">
          <div className="sidebarWrapper">
            <div className="sidebarMenu">
              <div className="imgSidebar">
                <Link to="/PageEducationInfo" className="link">
                  <img src={Logo} alt="logo" className="logoSidebar" />
                </Link>
              </div>
              <div className="containerTextTitleSidebar">
                <p className="sidebarTitle">สถานศึกษา {Academy}</p>
                <p className="sidebarTitle">หลักสูตร {CourseName}</p>
              </div>

              <ul className="sidebarList">
                <Link to="/PageHistory" className="link">
                  <li className="sidebarListItem ">
                    <AccountBox className="sidebarIcon" />
                    ทะเบียนประวัติผู้ใช้
                  </li>
                  <hr />
                </Link>

                <Link to="/PageHistoyrS" className="link active">
                  <li className="sidebarListItem ">
                    <AccountBox className="sidebarIcon" />
                    ทะเบียนประวัติผู้เข้ารับการศึกษา
                  </li>
                  <hr />
                </Link>
                <Link to="/PageInsertScore" className="link">
                  <li className="sidebarListItem">
                    <AccessTime className="sidebarIcon" />
                    ชั่วโมงการศึกษา และคะแนนความประพฤติ
                  </li>
                  <hr />
                </Link>
                <Link to="/PageEstimate" className="link">
                  <li className="sidebarListItem">
                    <HowToReg className="sidebarIcon" />
                    การวัด และประเมินผลการเรียน
                  </li>
                  <hr />
                </Link>
                <Link to="/PageAttribute" className="link">
                  <li className="sidebarListItem">
                    <HowToReg className="sidebarIcon" />
                    การวัด และประเมินคุณลักษณะส่วนบุคคล
                  </li>
                  <hr />
                </Link>
                <Link to="/PageSummarize" className="link">
                  <li className="sidebarListItem">
                    <SignalCellularAlt className="sidebarIcon" />
                    ผลการศึกษาสรุปรวม
                  </li>
                  <hr />
                </Link>
                <Link to="/PageStudyResults" className="link">
                  <li className="sidebarListItem">
                    <Report className="sidebarIcon" />
                    รายงานผลการศึกษา
                  </li>
                  <hr />
                </Link>
                <Link to="/PageSubject" className="link">
                  <li className="sidebarListItem">
                    <MenuBook className="sidebarIcon" />
                    หมวดวิชาของสถานศึกษา
                  </li>
                  <hr />
                </Link>
                <Link to="/PagePersonalAttributes" className="link">
                  <li className="sidebarListItem">
                    <Group className="sidebarIcon" />
                    คุณลักษณะส่วนบุคคลทั้งหมด
                  </li>
                  <hr />
                </Link>
                <Link to="/PageListTeacher" className="link">
                  <li className="sidebarListItem">
                    <Group className="sidebarIcon" />
                    รายชื่อเจ้าหน้าที่
                  </li>
                  <hr />
                </Link>
                <Link to="/PageManage" className="link">
                  <li className="sidebarListItem">
                    <Settings className="sidebarIcon" />
                    จัดการสมาชิก
                  </li>
                  <hr />
                </Link>
              </ul>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

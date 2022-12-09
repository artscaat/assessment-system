
/* eslint-disable no-unused-vars */
import React from "react";
import { Link,useNavigate } from "react-router-dom";
import {useState} from 'react'
import {ToastContainer ,toast,Zoom} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

export default function NavbarMain() {

    const user = localStorage.getItem('PersonalHistory')
    const [confirm,setComfirm] = useState(false);
    const [Rank,setRank] = useState(JSON.parse(user)[0].Rank);
    const [PersFname,setPersFname] = useState(JSON.parse(user)[0].PersFname);
    const [PersLname,setPersLname] = useState(JSON.parse(user)[0].PersLname);
    const Access = localStorage.getItem('Access')
    const AllAccessRights = localStorage.getItem('AllAccessRights')
    const [allAccessRights , setAllAccessRights] = useState(JSON.parse(AllAccessRights))
    const navigate = useNavigate()
    var delayInMilliseconds = 3000;
    const logout = () => {
        setComfirm(true)
      toast.success("ระบบจะออกในอีก3วิ");
      setTimeout(function() {
        localStorage.clear();
        navigate('/')
      }, delayInMilliseconds);
    }
// console.log(Access)
    // useEffect(() =>{
    //   const auth = localStorage.getItem('user')
    // })


  return(
            <React.Fragment>
                {confirm ? <ToastContainer draggable={false} transition={Zoom} autoClose={3000} /> : <></> }
                              
           
<div className="topbar">
               <div className="topbarWraper">
                    <div className="topLeft">
                        <span className="TextNavMain">ระบบสารสนเทศเพื่อการวัดและประเมินผลการศึกษา</span>
                    </div>
                    <div className="topRight">
                        <div className="NameUses">
                            <span className="NameUse">ชื่อผู้ใช้งาน: {Rank} {PersFname} {PersLname}</span>
                            <span className="NameUse">สถานะสิทธิ์: {Access}</span>
                        </div>
                       
                        <div className="topbarBtnContainer">
                        {/* <Link to="/login" variant="body2">  
                            <button  className="btnLogout" type="submit">Logout</button>
                        </Link> */}
                        <Link to="/PageAccessRights" variant="body2">  
                             <button  className="btnHome" type="submit">กลับหน้าเลือกสิทธิ์</button>
                         </Link>
                         
{
        Access === "นทน."  ? (<Link to="/PageEducationStatus" variant="body2">  <button  className="btnHome" type="submit">สถานภาพการศึกษา</button></Link>) 
    :   Access === "อาจารย์ประจำหมวดวิชา" ? (    <button disabled  className="btnDisabledHome" type="submit">ข้อมูลการศึกษา</button>)
    : (  <Link to="/PageEducationInfo" variant="body2">  <button  className="btnHome" type="submit">ข้อมูลการศึกษา</button></Link>)
}


                        {/* {
                            allAccessRights.Student === 0 ? (  <Link to="/PageEducationInfo" variant="body2">  
                            <button  className="btnHome" type="submit">ข้อมูลการศึกษา</button>
                        </Link>) : ''
                        } */}
                    {/* {
                        allAccessRights.Student === 1 ? (  <Link to="/PageEducationStatus" variant="body2">  
                        <button  className="btnHome" type="submit">สถานภาพการศึกษา</button>
                    </Link>) : ''
                    } */}

                         <button  className="btnLogout" type="submit" onClick={()=>logout()}>Logout</button>
                        
                        </div>
                    </div>
               </div>
            </div>

                
               
                 
            </React.Fragment>
  );
}

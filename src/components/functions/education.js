// import { useState } from 'react'
import axios from "axios";

export const listSchools = async (authtoken, id) => {
    return await axios.get(process.env.REACT_APP_API + `/pmecourse/${id}`, {
        headers: {
            authtoken
        }
    });
}

export const listSchoolsRegis = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/pmecourse", {
        headers: {
            authtoken
        }
    });
}

export const listEducation = async (authtoken, courId) => {
    return await axios.get(process.env.REACT_APP_API + `/education/${courId}`, {
        headers: {
            authtoken
        }
    });
}

export const studentNum = async (authtoken, courId, coursegrp) => {
    return await axios.get(process.env.REACT_APP_API + `/number/${courId}/${coursegrp}`, {
        headers: {
            authtoken
        }
    });
}

export const listStudyResults = async (authtoken, setClass, setSeminar, CourseId, course2) => {
    return await axios.get(process.env.REACT_APP_API + `/result/course/${setClass}/seminar/${setSeminar}/${CourseId}/${course2}`, {
        headers: {
            authtoken
        }
    });
}

export const studentById = async (authtoken, PersId, courId) => {
    return await axios.get(process.env.REACT_APP_API + `/summarize/${PersId}/${courId}`, {
        headers: {
            authtoken
        }
    });
}

export const listSubjects = async (authtoken, courId, PersId) => {
    return await axios.get(process.env.REACT_APP_API + `/subjects/${courId}/${PersId}`, {
        headers: {
            authtoken
        }
    });
}

export const listSubjects2 = async (authtoken, courId) => {
    return await axios.get(process.env.REACT_APP_API + `/subjects2/${courId}`, {
        headers: {
            authtoken
        }
    });
}

export const listSubjectsAJ = async (authtoken, access ,accessId) => {
    return await axios.get(process.env.REACT_APP_API + `/listsubjectsaj/${access}/${accessId}`, {
        headers: {
            authtoken
        }
    });
}

export const deleteSubject = async (authtoken,id) => {
    return await axios.delete(process.env.REACT_APP_API + "/deletesubject/"+ id, {},{
        headers: {
            authtoken
        }
    });
}

export const addsubjectAJ = async (authtoken, value ) => {
    return await axios.post(process.env.REACT_APP_API + "/addsubjectaj", value,{
        headers: {
            authtoken
        }
    });
}

export const listStudyReport = async (authtoken, setClass, setSeminar, CourseId, course2) => {
    return await axios.get(process.env.REACT_APP_API + `/result/report/${setClass}/seminar/${setSeminar}/${CourseId}/${course2}`, {
        headers: {
            authtoken
        }
    });
}

export const studentReport = async (authtoken, PersId, CourseId) => {
    return await axios.get(process.env.REACT_APP_API + `/report/${PersId}/${CourseId}`, {
        headers: {
            authtoken
        }
    });
}

export const CourseyearByid = async (authtoken, CourseGrp) => {
    return await axios.get(process.env.REACT_APP_API + `/courseyearByid/${CourseGrp}`, {
        headers: {
            authtoken
        }
    });
}

export const dataById = async (authtoken, id, courId) => {
    return await axios.get(process.env.REACT_APP_API + `/dataById/${id}/${courId}`, {
        headers: {
            authtoken
        }
    });
}

export const studentUpdate = async (authtoken, value, courId, id) => {
    return await axios.put(process.env.REACT_APP_API + `/studentUpdate/${courId}/${id}`, value, {
        headers: {
            authtoken
        }
    });
}

export const educateUpdate = async (authtoken, formData) => {
    return await axios.put(process.env.REACT_APP_API + `/educateUpdate`, formData, {
        headers: {
            authtoken
        }
    });
}

export const persattrScore = async (authtoken, PersId, courId) => {
    return await axios.get(process.env.REACT_APP_API + `/persattrScore/${PersId}/${courId}`, {
        headers: {
            authtoken
        }
    });
}

export const attrScore = async (authtoken, courseGrp, courseid, persid) => {
    return await axios.get(process.env.REACT_APP_API + `/attrScore/${courseGrp}/${courseid}/${persid}`, {
        headers: {
            authtoken
        }
    });
}

export const pageInsertScore = async (authtoken, selectedClass, selectedSeminar, courId) => {
    return await axios.get(process.env.REACT_APP_API + `/pageInsertScore/${selectedClass}/${selectedSeminar}/${courId}`, {
        headers: {
            authtoken
        }
    });
}

export const lastestScore = async (authtoken, data) => {
    return await axios.put(process.env.REACT_APP_API + `/lastestscore/`, data, {
        headers: {
            authtoken
        }
    });
}

export const addandUpdateleave = async (authtoken, data) => {
    return await axios.put(process.env.REACT_APP_API + "/addandupdateleave", data,{
        headers: {
            authtoken,
        }
    });
}

export const removeFile = async (authtoken, filename, classattendid) => {
    return await axios.post(process.env.REACT_APP_API + `/deletefile`,{filename, classattendid}, {
        headers: {
            authtoken,
        }
    });
}

export const listTableleave = async (authtoken, courseid, persid) => {
    return await axios.get(process.env.REACT_APP_API + `/listtableleave/courseid/${courseid}/persid/${persid}`, {
        headers: {
            authtoken
        }
    });
}

export const deleteLeave = async (authtoken,data) => {
    return await axios.delete(process.env.REACT_APP_API + "/deleteleave", {data},{
        headers: {
            authtoken
        }
    });
}

export const pageAttribute = async (authtoken, classno, seminar, courId) => {
    return await axios.get(process.env.REACT_APP_API + `/pageattribute/${classno}/${seminar}/${courId}`, {
        headers: {
            authtoken
        }
    });
}

export const pageEditAttribute = async (authtoken, courid, classno, studid, name) => {
    return await axios.get(process.env.REACT_APP_API + `/editattribute/${courid}/${classno}/${studid}/${name}`, {
        headers: {
            authtoken
        }
    });
}

export const addandUpdateattr = async (authtoken, lastestscore) => {
    return await axios.put(process.env.REACT_APP_API + "/addandupdateattr", lastestscore,{
        headers: {
            authtoken,
        }
    });
}

export const menuStudent = async (authtoken, PersId, courId) => {
    return await axios.get(process.env.REACT_APP_API + `/menustudent/${PersId}/${courId}`, {
        headers: {
            authtoken
        }
    });
}

export const gradearrangement = async (authtoken, coursegrp, courId) => {
    return await axios.get(process.env.REACT_APP_API + `/courseid/${courId}/coursegrp/${coursegrp}`, {
        headers: {
            authtoken
        }
    });
}

export const getpercentment = async (authtoken, courId, coursegrp) => {
    // console.log("getpercent: ",coursegrp, courId)
    return await axios.get(process.env.REACT_APP_API + `/getpercentment/courseid/${courId}/coursegrp/${coursegrp}`, {
        headers: {
            authtoken
        }
    });
}

//ค่าระดับคะแนน
export const showGPA = (grade) => {
  switch (grade) {
    case "A": return 4.00; 
    case "A-": return 3.75; 
    case "B+": return 3.50; 
    case "B-": return 2.75; 
    case "B": return 3.00; 
    case "C+": return 2.50; 
    case "C": return 2.00; 
    case "C-": return 1.75; 
    case "D+": return 1.50; 
    case "D": return 1.00; 
    default: return 0; 
  }
}

//คิดเป็นร้อยละ
export const showPercent = (score, fullScore) => {
    return ((score / fullScore)*100).toFixed(2);
}

//ผลการประเมิน
export const estiResult = (grade) => {
  switch (grade) {
    case "A" : return "ดีมาก"; 
    case "B+" : return "ค่อนข้างดีมาก"; 
    case "B" : return "ดี"; 
    case "C+" : return "ค่อนข้างดี"; 
    case "C" : return "พอใช้"; 
    case "D+" : return "ค่อนข้างพอใช้"; 
    case "D" : return "ควรปรับปรุง";
    case "P" : return "ผ่านเกณฑ์";
    case "U" : return "ไม่ผ่าน (พ้นสภาพ)"
    default: return "ไม่ผ่านเกณฑ์"; 
  }
}

//ผลการประเมินร้อยละ
export const estiResult2 = (score, grade, courId) => {
    // console.log("data: ", score, grade, courId)
    if (courId === "073") {
     if(grade === "P"){
        return "ผ่าน";
       }else if(grade === "U"){
        return "ไม่ผ่าน";
       }}
    else {
        // console.log("allAccessRights: ", courId)
            if(score >= 90 && score <= 100 && grade !== "P" && grade !== "U" && grade !== "F"){
                return "ดีมาก";
            }else if(score >= 80 && score <= 89.99 && grade !== "P" && grade !== "U" && grade !== "F"){
                return "ดี";
            }else if(score >= 70 && score <= 79.99 && grade !== "P" && grade !== "U" && grade !== "F"){
                return "ปานกลาง";
            }else if(score >= 60 && score <= 69.99 && grade !== "P" && grade !=="U" && grade !== "F"){
                return "พอใช้";
            }else if(grade === "P"){
                return "ผ่าน";
            }else if(grade === "U"){
                return "ไม่ผ่าน";
            }else{ return "ไม่ผ่านเกณฑ์"; }
        }
  }

//ผลรวมการประเมิน
export const estiGrade = (sumGPA2, grade) => {
  if (sumGPA2 >= 3.5 && sumGPA2 <= 4.0 && grade !== "P" && grade !== "U" && grade !== "F") {
    return "ดีมาก";
  } else if (sumGPA2 >= 3.0 && sumGPA2 < 3.49 && grade !== "P" && grade !== "U" && grade !== "F") {
    return "ดี";
  } else if (sumGPA2 >= 2.5 && sumGPA2 < 2.99 && grade !== "P" && grade !== "U" && grade !== "F") {
    return "ปานกลาง";
  } else if (sumGPA2 >= 2.0 && sumGPA2 < 2.49 && grade !== "P" && grade !== "U" && grade !== "F") {
    return "พอใช้";
  }else if(grade === "P"){
    return "ผ่าน";
  }else if(grade === "U"){
    return "ไม่ผ่าน";
  } else {
    return "ไม่ผ่านเกณฑ์";
  }
}

//แปลงเลขอารบิกเป็นไทย
export const thaiNumber = (num) => {
    var array = {"1":"๑", "2":"๒", "3":"๓", "4" : "๔", "5" : "๕", "6" : "๖", "7" : "๗", "8" : "๘", "9" : "๙", "0" : "๐"};
    var number = String(num);
    var str = number.toString();
    for (var val in array) {
     str = str.split(val).join(array[val]);
    }
    return str;
}


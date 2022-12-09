import React, { useEffect, useState } from 'react'
import Axios from 'axios'

import {
  showGPA,
  estiGrade,
  thaiNumber,
} from '../components/functions/education'

const Averagescore = (props) => {
  const PersId = props.id
  const checkPage = props.checkPage
  const grade = props.grade
  const checkPrint = props.checkPrint

  // const classToselected = useSelector((state) => state.class)
  // const courId = classToselected[0].CourseId
  const courId = localStorage.getItem('AccessRights').substring(11, 14)

  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    loadSubject()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadSubject = async () => {
    // listSubjects(idTokenResult, courId, PersId)
    Axios.get(
      process.env.REACT_APP_API + `/subjects/${courId}/${PersId}`,
    )
      .then((res) => {
        setSubjects(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const sumGPA = (subjects) => {
    let sum = 0
    let sum1 = 0
    for (let i = 0; i < subjects.length; i++) {
      sum = subjects[i].SubjectCreditOrScore * showGPA(subjects[i].Grade)
      sum1 += sum
    }
    return sum1
  }

  const totalcredit = (subjects) => {
    let total = 0
    for (let i = 0; i < subjects.length; i++) {
      total += subjects[i].SubjectCreditOrScore
    }
    return total
  }
  //ค่าระดับคะแนนรวมหารจำนวนหมวดวิชา
  // const sumGPA2 = sumGPA(subjects) / totalcredit(subjects)
  // const GPA = Math.floor(sumGPA2 * 100) / 100

  const averageScore = (subjects, checkPage, grade, checkPrint) => {
    const sumGPA2 = sumGPA(subjects) / totalcredit(subjects)
    const GPA = Math.floor(sumGPA2 * 100) / 100
        
    // console.log("sumGPA2: ", sumGPA2)
    // console.log("GPA: ", GPA)

    // console.log("GPA: ", GPA)
    // let sum = 0;
    if (checkPage === 0) {
      if (checkPrint === 1){
        return isNaN(GPA.toFixed(2)) ? '0.00' :  thaiNumber(GPA.toFixed(2))
      } else
      return isNaN(GPA.toFixed(2)) ? '0.00' :  GPA.toFixed(2)
    } else {
      if (estiGrade(GPA) === 'ไม่ผ่านเกณฑ์') {
        if (grade === "P") {
          return "ผ่าน"
        }
        return 'ไม่ผ่าน'
      }
      return 'ผ่าน (' + thaiNumber(estiGrade(GPA)) + ')'
    }
  }

  // console.log("str: ",averageScore(subjects, checkPage).substring(0, 7))
  return (
    <div>
      {/* {averageScore(subjects, checkPage) === '0.00' ? ( */}
      {averageScore(subjects, checkPage) === '0.00' ? (
        <>
          <h5>-</h5>
        </>
      ) : (
        <>
          {averageScore(subjects, checkPage, grade, checkPrint).substring(0, 7) === 'ไม่ผ่าน' ? (
            <div className="text-danger">
              <h6>
                <small>{averageScore(subjects, checkPage, grade, checkPrint)}</small>
              </h6>
            </div>
          ) : (
            averageScore(subjects, checkPage, grade, checkPrint)
          )}
        </>
      )}
    </div>
  )
}

export default Averagescore

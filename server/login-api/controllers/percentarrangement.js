/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
const mysql = require('mysql2')
const connection = require('../../config/database')

// const grademapping = {
//   'A': 4.0,
//   'A-': 3.75,
//   'B+': 3.5,
//   'B': 3.0,
//   'B-': 2.75,
//   'C+': 2.5,
//   'C': 2.0,
//   'C-': 1.75,
//   'D+': 1.5,
//   'D': 1.0,
//   'F': 0,
// }

class PercentArragement {
  async initial() {
    // eslint-disable-next-line no-unused-expressions
    connection
  }

  async dataQuery(sqlcmd) {
    const [rows, fields] = await connection.promise().query(sqlcmd)
    return rows
  }

  async percentArragement(courId, coursegrp) {
    // console.log("gradeArragement: ", courId, coursegrp)
    let creditinfo = await this.totalCreditEachCourse(courId)
    // console.log("creditinfo: ", creditinfo)

    let studtlist = await this.dataQuery(
      `select PersId from tbcourseyear where CourseId = ${courId} and CourseGrp = ${coursegrp}`,
    )
    // console.log("studtlist: ", studtlist)

    let gradeAvgList = studtlist.map(async (e, i) => {
      let item = await this.dataQuery(
        `select * from tbsubjectscore inner join tbcoursesubjects on tbsubjectscore.SubjectId = tbcoursesubjects.SubjectId where SubjectScoreId like '%${e.PersId}-${courId}%'`,
      )
    //   console.log("item: ", item)

      if (item.length != 0) {
        let sum = 0,
          persid = '',
          studtname = ''
        item.map((e, i) => {
          persid = e.PersId
          sum += e.SubjectScore
        //   sum += Number(grademapping[e.Grade] * e.SubjectCreditOrScore)
        })

        return {
          CourseId: courId,
          CourseGrp: coursegrp,
          PersId: persid,
          avg: Number(sum / creditinfo[0].creditsum).toFixed(4),
        }
      }
    })
    let rawfinalresults = await Promise.all(gradeAvgList)
    // console.log("rawfinalresultsPercent: ", rawfinalresults)
    let finalresults = rawfinalresults.filter((e) => e !== undefined)
    finalresults.sort((a, b) => b.avg - a.avg)
    let ordnum = 1
    for (let i = 0; i < finalresults.length; i++) {
      for (let k = i + 1; k < finalresults.length; k++) {
        if (Number(finalresults[i].avg) == Number(finalresults[k].avg)) {
          Object.assign(finalresults[i], { ordnr: ordnum })
          Object.assign(finalresults[k], { ordnr: ordnum })
        } else {
          Object.assign(finalresults[i], { ordnr: ordnum })
          Object.assign(finalresults[k], { ordnr: ++ordnum })
        }
        break
      }
    }
    return finalresults
  }

  async totalCreditEachCourse(courId) {
    let credit = []
    await this.dataQuery(
      `select sum(SubjectCreditOrScore) as creditsum, count(CourseId) as subjtotal from tbcoursesubjects where CourseId = ${courId}`,
    )
      .then((res) => {
        credit = res
      })
      .catch((err) => {
        console.log('totalCreditEachCourse failed -> err : ', err.message)
      })
    return credit
  }
}

module.exports = PercentArragement

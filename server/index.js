/* eslint-disable no-useless-concat */
const express = require('express')
const app = express()
// const mysql = require('mysql2');
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

// const root = path.join(__dirname, '../');
require('dotenv').config()

const corsOptions = {
  // origin: 'http://10.107.209.24:3000', // test
  origin: 'http://localhost:3000',
  credentials: true,
}

app.use(cors(corsOptions))

let studyhrsrouter = require('./router/studyHrs/studyHrsRouter')
let editstudyhrsrouter = require('./router/studyHrs/editStudyHrsRouter')

let persattrrouter = require('./router/persAttr/persAttrRouter')
let editpersattrrouter = require('./router/persAttr/editPersAttrRouter')
let studyevaluationrouter = require('./router/studyEvaluate/studyEvaluationRouter')

let updrecleaverouter = require('./router/studyHrs/updAndRecLeaveRouter')
// let test = require('./router/studyHrs/updAndRecLeaveRouter');

let GradeArragement = require('./login-api/controllers/gradearrangement')
let PercentArragement = require('./login-api/controllers/percentarrangement')
const mysql0 = new GradeArragement()
const mysql1 = new PercentArragement()
mysql0.initial()

app.set('_port', process.env.PORT)
// console.log('env: ', process.env );

app.use('/PageInsertScore', jsonParser, studyhrsrouter)
app.use('/PageEditInsertScore', jsonParser, editstudyhrsrouter)

app.use('/PageAttribute', jsonParser, persattrrouter)
app.use('/PageEditAttribute', jsonParser, editpersattrrouter)
app.use('/PageEstimate', jsonParser, studyevaluationrouter)

app.use('/PageUpdateAndRecordLeave', jsonParser, updrecleaverouter)

const dbs = require('./models')
dbs.sequelize.sync()

// app.use(cors());
app.use(express.json())
app.use(express.static('./public'))
app.use(express.static('../public_html'))
app.use(express.static('../Signature_Test'))
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))

const db = require('./config/database')

app.get(process.env.PATH + 'PageSelectSchools', (req, res) => {
  try {
    const id = req.body.id
    db.query(
      `SELECT AccessRightsId,Approve,ProcessCenter,Director,Professor,Student,EvaluationCenter,Process,Evaluation,Administrative FROM tbaccessrights WHERE AccessRightsId = ?`,
      [id],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
app.get(process.env.API_PATH + 'PageSelectSchoolsss/:id', (req, res) => {
  try {
    const id = req.params.id
    // console.log(id)
    db.query(
      `SELECT AccessRightsId,Approve,ProcessCenter,Director,Professor,Student,EvaluationCenter,Process,Evaluation,Administrative FROM tbaccessrights WHERE AccessRightsId = ?`,
      [id],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
          // console.log(result);
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'PersonalHistory/:persid', (req, res) => {
  try {
    const persid = req.params.persid;
  const Student = req.params.Student;
  // const persid = "1234567891-011"
// console.log(persid)

  db.query("SELECT tbaccessrights.AccessRightsId , tbaccessrights.Approve ,tbaccessrights.ProcessCenter ,tbaccessrights.Director ,tbaccessrights.Professor ,tbaccessrights.Student ,tbaccessrights.EvaluationCenter ,tbaccessrights.Process ,tbaccessrights.Evaluation ,tbaccessrights.Administrative ,tbaccessrights.AcctStatus ,tbaccessrights.PersId ,tbaccessrights.Rank ,tbaccessrights.PersFname ,tbaccessrights.PersLname ,tbaccessrights.PersHeight ,tbaccessrights.PersWeight , tbaccessrights.PersCorps ,tbaccessrights.PersGrp ,tbaccessrights.PersDutyNum ,tbaccessrights.PersCurrPosition ,tbaccessrights.PersAffiliation ,tbaccessrights.email,tbcourseyear.CourseYearId,tbcourseyear.CourseYear,tbcourseyear.CourseId,tbcourseyear.CourseGrp,tbcourseyear.CourseBegin,tbcourseyear.CourseEnd,tbcourseyear.StudentId,tbcourseyear.Seminar,tbcourseyear.Id_file,tbcourseyear.SignatureId  FROM tbaccessrights LEFT JOIN tbcourseyear ON tbaccessrights.AccessRightsId = tbcourseyear.AccessRightsId WHERE tbaccessrights.AccessRightsId = ? ",[persid],
    (err,result)=>{
        if(err){
           res.send({err:err});
        }else{
          res.send(result)
          // console.log(result)
        }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'PageHistoyrS', (req, res) => {
  try {
    db.query(
      "SELECT tbaccessrights.PersId as id , StudentId , tbaccessrights.Rank ,tbaccessrights.PersFname, tbaccessrights.PersLname , tbaccessrights.PersCorps , tbaccessrights.PersGrp , tbaccessrights.PersDutyNum , tbaccessrights.PersCurrPosition, tbaccessrights.PersAffiliation ,tbcourseyear.AccessRightsId, tbaccessrights.Student , tbcourseyear.CourseGrp,tbcourseyear.Seminar FROM tbaccessrights join tbcourseyear ON tbcourseyear.AccessRightsId = tbaccessrights.AccessRightsId WHERE tbaccessrights.Student = '1'",
      // "SELECT tbregister.PersId as id , StudentId , tbregister.Rank ,tbregister.PersFname, tbregister.PersLname , tbregister.PersCorps , tbregister.PersGrp , tbregister.PersDutyNum , tbregister.PersCurrPosition, tbregister.PersAffiliation ,tbcourseyear.AccessRightsId, tbaccessrights.Student , tbcourseyear.CourseGrp,tbcourseyear.Seminar FROM tbregister join tbcourseyear ON tbregister.PersId = tbcourseyear.PersId join tbaccessrights ON tbcourseyear.AccessRightsId = tbaccessrights.AccessRightsId WHERE tbaccessrights.Student = '1'",
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'PageManageUser/:Id', (req, res) => {
  try {
    const school = req.params.Id
    db.query(`SELECT tbaccessrights.AccessRightsId as AccessRightsId,
    tbaccessrights.PersId as PerId ,
    CONCAT(Rank,'',PersFname,'  ',PersLname) as Fullname ,
    RIGHT(tbaccessrights.AccessRightsId,3) as  cutString ,
    AcctStatus,
    Approve,
    ProcessCenter,
    Director,
    Professor,
    Student,
    EvaluationCenter,
    Process,
    Evaluation,
    Administrative 
    FROM tbaccessrights 
    WHERE tbaccessrights.AccessRightsId Not in  ( SELECT tbcourseyear.AccessRightsId as AccessRightsId FROM tbcourseyear) And RIGHT(tbaccessrights.AccessRightsId,3) = ${school} 
    ORDER BY (CASE WHEN Approve = '0' THEN 1 ELSE 0 END) DESC`,
    
    
    (err,result) => {
        if(err){
            console.log(err);
        }else{ 
            res.send(result);
        }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//แสดงข้อมูลสมาชิก --นทน.
app.get(process.env.API_PATH + 'PageManageUserstu/:Id', (req, res) => {
  try {
    const school = req.params.Id
    db.query(`SELECT tbcourseyear.AccessRightsId as AccessRightsId,
  tbaccessrights.PersId as PerId,CONCAT(tbaccessrights.Rank,'',tbaccessrights.PersFname,'  ',tbaccessrights.PersLname) as Fullname , RIGHT(tbcourseyear.AccessRightsId,3) as  cutString,
      tbaccessrights.AcctStatus,
      tbaccessrights.Approve,
      tbaccessrights.ProcessCenter,
      tbaccessrights.Director,
      tbaccessrights.Professor,
      tbaccessrights.Student,
      tbaccessrights.EvaluationCenter,
      tbaccessrights.Process,
      tbaccessrights.Evaluation,
      tbaccessrights.Administrative
      FROM tbaccessrights 
      JOIN tbcourseyear ON tbaccessrights.AccessRightsId = tbcourseyear.AccessRightsId
      WHERE  RIGHT(tbaccessrights.AccessRightsId,3) = ${school}
      ORDER BY (CASE WHEN tbaccessrights.Approve = '0' THEN 1 ELSE 0 END) DESC`,
  
  (err,result) => {
      if(err){
          console.log(err);
      }else{ 
          res.send(result);
      }
  })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'PageEditHistorySstudentId/:id', (req, res) => {
  try {
    const id = req.params.id
    db.query(
      'SELECT * FROM tbcourseyear WHERE AccessRightsId = ?',
      [id],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put(process.env.API_PATH + 'PageEditHistoryS/:id', (req, res) => {
  try {
    const id = req.params.id
    const PersId = req.body.PersId
    const Rank = req.body.Rank
    const PersFname = req.body.PersFname
    const PersLname = req.body.PersLname
    const PersCurrPosition = req.body.PersCurrPosition
    const PersAffiliation = req.body.PersAffiliation
    const PersWeight = req.body.PersWeight
    const PersHeight = req.body.PersHeight
    const StudentId = req.body.StudentId
    const Seminar = req.body.Seminar
    const PersCorps = req.body.PersCorps
    const PersGrp = req.body.PersGrp
    const PersDutyNum = req.body.PersDutyNum

    db.query(
      'UPDATE tbaccessrights SET PersId = ? , Rank = ? , PersFname = ? , PersLname = ? , PersHeight = ? , PersWeight = ? , PersCorps = ? , PersGrp = ? , PersDutyNum = ? , PersCurrPosition = ? ,PersAffiliation = ?  WHERE AccessRightsId = ?',
      [
        PersId,
        Rank,
        PersFname,
        PersLname,
        PersHeight,
        PersWeight,
        PersCorps,
        PersGrp,
        PersDutyNum,
        PersCurrPosition,
        PersAffiliation,
        id,
      ],
      (err, result) => {
        db.query(
          'UPDATE tbcourseyear SET StudentId = ? , Seminar = ? WHERE AccessRightsId = ?',
          [StudentId, Seminar, id],
        )
        if (err) {
          console.log(err)
        } else {
          res.send('Values inserted')
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public_html/', 'uploads'),
  filename: function (req, file, cb) {
    // null as first argument means no error
    const id = req.params.id
    const Id_file = id.substring(0, id.length - 11)
    // console.log("id: ",id);
    // console.log("Id_file: ",Id_file);
    cb(null, Id_file + '-' + Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
})

app.put(
  process.env.API_PATH + 'PageEditEducationInfo/:id',
  upload.single('file'),
  (req, res) => {
    try {
      const id = req.params.id
      const CourseYear = req.body.CourseYear
      const CourseBegin = req.body.start
      const CourseEnd = req.body.end
      const Id_file = id.substring(0, id.length - 11)
      if (typeof req.file !== 'undefined') {
        const newfilename = req.file.filename
        const m_path = __dirname.substring(0, __dirname.search('server'))
        const path =
          m_path + 'public_html' + '\\' + 'uploads' + '\\' + req.body.filename
        fs.unlink(path, (err) => {
          if (err) {
            console.log(`${newfilename} cannot be deleted >>> err : ${err}`)
          } else {
            console.log(`${newfilename} is successfully deleted`)
          }
        })
        const sql1 = `UPDATE tbcourseyear, tbfilecourseyear SET tbcourseyear.CourseYear = ?, tbcourseyear.CourseBegin = ?, tbcourseyear.CourseEnd = ?, tbfilecourseyear.namefile = ? WHERE tbfilecourseyear.Id_file = ?`
        db.query(
          sql1,
          [CourseYear, CourseBegin, CourseEnd, newfilename, Id_file],
          (err, result) => {
            if (err) {
              res.status(500).json({ err: err.message })
            }
            res.status(200).send(result)
          },
        )
      } else {
        const sql = `UPDATE tbcourseyear SET CourseYear = ?, CourseBegin = ?, CourseEnd = ? WHERE Id_file = ?`
        db.query(
          sql,
          [CourseYear, CourseBegin, CourseEnd, Id_file],
          (err, result) => {
            if (err) {
              res.status(500).json({ err: err.message })
            }
            res.status(200).send(result)
          },
        )
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
)

app.get(process.env.API_PATH + 'PageEditHistoryS/:id', (req, res) => {
  try {
    const id = req.params.id
    // console.log("get data PageEditHistoryS: " ,id)
    db.query(
      'SELECT * FROM tbaccessrights WHERE AccessRightsId = ?',
      [id],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'CourseTotalHrs/:id', (req, res) => {
  try {
    const id = req.params.id
    db.query(
      'SELECT CourseTotalHrs FROM tbpmecourse WHERE CourseId = ?',
      [id],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// app.delete(process.env.API_PATH + 'PageManageDelete/:id', (req, res) => {
//   try {
//     const PersId = req.params.id
//     //  console.log(PersId)
//     db.query(
//       `DELETE tbregister,tbaccessrights from tbregister LEFT join tbaccessrights on tbregister.AccessRightsId = tbaccessrights.AccessRightsId LEFT join tbinstructor on tbregister.AccessRightsId = tbinstructor.AccessRightsId WHERE tbregister.PersId = ?`,
//       [PersId],
//       (err, result) => {
//         if (err) {
//           console.log(err)
//         } else {
//           res.send(result)
//         }
//       },
//     )
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// })


const storageSignature = multer.diskStorage({
  destination: path.join(__dirname, '../Signature_Test/', 'uploads'),
  filename: function (req, file, cb) {   
      const AccessRightsId = req.params.AccessRightsId;
      const id = req.params.Id;
            if (id == undefined ) {
        cb(null, AccessRightsId + "-" + Date.now() + path.extname(file.originalname))  
      } else {
        cb(null, id + "-" + Date.now() + path.extname(file.originalname)) 
      }
  }
})

const uploadSignature = multer({
  storage: storageSignature
});

//หน้า update ข้อมูลอาจารย์
app.put(
  process.env.API_PATH + 'updateListTeacher/:Id/:CourseId',
  uploadSignature.single('file'),
  (req, res) => {
    try {
      const AccessRightsId = req.body.AccessRightsId ;
  const PersId = req.body.PersId;
  const Rank = req.body.Rank;
  const PersFname = req.body.PersFname;
  const PersLname = req.body.PersLname;
  const PersCurrPosition = req.body.PersCurrPosition;
  const PersAffiliation = req.body.PersAffiliation;
  const email = req.body.email;
  const SignatureId = req.body.SignatureId;
  const CourseId = req.body.CourseId;
  const ImgSignatureTest = req.body.ImgSignatureTest;
  const SignatureImg = req.file === undefined ?  ImgSignatureTest : req.file.filename ;
  const dateAttach = new Date()
  const Chkattackfile = 0;
  const Chksendscore = 0;

if(typeof req.file !== "undefined" && ImgSignatureTest === "NoSignature"){
          db.query("INSERT INTO tbsignature (SignatureId , CourseId , InstructorId , SignatureImg, Dateattechfile, Chkattackfile, Chksendscore) VALUES(?,?,?,?,?,?,?)"
      ,   [SignatureId, CourseId, PersId , SignatureImg, dateAttach ,Chkattackfile,Chksendscore], 
      (err, result) => {
        db.query(`UPDATE tbaccessrights SET Rank = ? , PersFname = ? , PersLname = ? , PersCurrPosition = ? , PersAffiliation = ? , email = ?  WHERE AccessRightsId = ?` 
        , [Rank,PersFname,PersLname,PersCurrPosition,PersAffiliation,email,AccessRightsId] ,
        )
        if(err) {
            console.log(err);
        }else{
            res.send("Values inserted")
        }
      }
      )
}else{
       const m_path = __dirname.substring(0, __dirname.search('server'));
     const path = m_path +'Signature_Test'+'\\' +'uploads'+'\\' + ImgSignatureTest
    
    fs.unlink(path, (err) =>{
       if(err) {
           console.log(`${ImgSignatureTest} cannot be deleted >>> err : ${err}`);
       } else {
           console.log(`${ImgSignatureTest} is successfully deleted`);
       }
      });
      db.query("UPDATE tbsignature SET SignatureImg = ? WHERE SignatureId = ?"
      ,   [SignatureImg, SignatureId], 
      (err, result) => {
        db.query(`UPDATE tbaccessrights SET Rank = ? , PersFname = ? , PersLname = ? , PersCurrPosition = ? , PersAffiliation = ? , email = ?  WHERE AccessRightsId = ?` 
        , [Rank,PersFname,PersLname,PersCurrPosition,PersAffiliation,email,AccessRightsId] ,
        )
        if(err) {
            console.log(err);
        }else{
            res.send("Values inserted")
        }
      }
      )
}
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
)

app.put(
  '/PageHistory/:AccessRightsId',
  uploadSignature.single('file'),
  (req, res) => {
    try {
      const AccessRightsId = req.body.AccessRightsId
      const PersId = req.body.PersId
      const Rank = req.body.Rank
      const PersFname = req.body.PersFname
      const PersLname = req.body.PersLname
      const PersCurrPosition = req.body.PersCurrPosition
      const PersAffiliation = req.body.PersAffiliation
      const email = req.body.email
      const allAccessRights = req.body.allAccessRights
      const persweight = req.body.persweight
      const persheight = req.body.persheight
      const PersCorps = req.body.PersCorps
      const PersGrp = req.body.PersGrp
      const PersDutyNum = req.body.PersDutyNum
      const CourseId = req.body.CourseId
      const SignatureId = req.body.SignatureId
      const ImgSignatureTest = req.body.ImgSignatureTest
      const SignatureImg =
        req.file === undefined ? ImgSignatureTest : req.file.filename
      const dateAttach = new Date()
      const Chkattackfile = 0
      const Chksendscore = 0
      // console.log(SignatureImg)

      if (
        typeof req.file !== 'undefined' &&
        allAccessRights === '0' &&
        ImgSignatureTest === 'NoSignature'
      ) {
        console.log('/PageHistory5')
        const m_path = __dirname.substring(0, __dirname.search('server'))
        const path =
          m_path + 'Signature_Test' + '\\' + 'uploads' + '\\' + ImgSignatureTest

        fs.unlink(path, (err) => {
          if (err) {
            console.log(
              `${ImgSignatureTest} cannot be deleted >>> err : ${err}`,
            )
          } else {
            console.log(`${ImgSignatureTest} is successfully deleted`)
          }
        })

        db.query(
          'INSERT INTO tbsignature (SignatureId , CourseId , InstructorId , SignatureImg, Dateattechfile, Chkattackfile, Chksendscore) VALUES(?,?,?,?,?,?,?)',
          [
            SignatureId,
            CourseId,
            PersId,
            SignatureImg,
            dateAttach,
            Chkattackfile,
            Chksendscore,
          ],
          (err, result) => {
            db.query(
              `UPDATE tbaccessrights SET Rank = ?  , PersFname = ? , PersLname = ? , PersHeight = ? , PersWeight = ? , PersCorps = ? , PersGrp = ? , PersDutyNum = ? , PersCurrPosition = ? , PersAffiliation = ? , email = ? WHERE AccessRightsId = ?`,
              [
                Rank,
                PersFname,
                PersLname,
                persheight,
                persweight,
                PersCorps,
                PersGrp,
                PersDutyNum,
                PersCurrPosition,
                PersAffiliation,
                email,
                AccessRightsId,
              ],
            )
            if (err) {
              console.log(err)
            } else {
              res.send('Values inserted')
            }
          },
        )
      } else if (typeof req.file === 'undefined') {
        console.log('/PageHistory4')
        db.query(
          `UPDATE tbaccessrights SET Rank = ?  , PersFname = ? , PersLname = ? , PersHeight = ? , PersWeight = ? , PersCorps = ? , PersGrp = ? , PersDutyNum = ? , PersCurrPosition = ? , PersAffiliation = ? , email = ? WHERE AccessRightsId = ?`,
          [
            Rank,
            PersFname,
            PersLname,
            persheight,
            persweight,
            PersCorps,
            PersGrp,
            PersDutyNum,
            PersCurrPosition,
            PersAffiliation,
            email,
            AccessRightsId,
          ],
          (err, result) => {
            // if(err) {
            //     console.log(err);
            // }else{
            //     res.send("Values inserted")
            // }
            db.query(
              `UPDATE tbaccessrights SET Rank = ?  , PersFname = ? , PersLname = ? , PersHeight = ? , PersWeight = ? , PersCorps = ? , PersGrp = ? , PersDutyNum = ? , PersCurrPosition = ? , PersAffiliation = ? , email = ? WHERE AccessRightsId = ?`,
              [
                Rank,
                PersFname,
                PersLname,
                persheight,
                persweight,
                PersCorps,
                PersGrp,
                PersDutyNum,
                PersCurrPosition,
                PersAffiliation,
                email,
                AccessRightsId,
              ],
            )
            if (err) {
              console.log(err)
            } else {
              res.send('Values inserted')
            }
          },
        )
      } else if (
        typeof req.file !== 'undefined' &&
        allAccessRights === '0' &&
        ImgSignatureTest !== 'NoSignature'
      ) {
        //  const newfilename = req.file.filename;
        console.log('/PageHistory3')
        const m_path = __dirname.substring(0, __dirname.search('server'))
        const path =
          m_path + 'Signature_Test' + '\\' + 'uploads' + '\\' + ImgSignatureTest
        //  console.log(path)
        fs.unlink(path, (err) => {
          if (err) {
            console.log(
              `${ImgSignatureTest} cannot be deleted >>> err : ${err}`,
            )
          } else {
            console.log(`${ImgSignatureTest} is successfully deleted`)
          }
        })
        //   db.query(`UPDATE tbsignature SET SignatureImg = ? WHERE SignatureId = ?`
        // ,   [SignatureImg, SignatureId],
        db.query(
          `UPDATE tbsignature SET SignatureImg = ? WHERE SignatureId = ?`,
          [SignatureImg, SignatureId],
          (err, result) => {
            db.query(
              `UPDATE tbaccessrights SET Rank = ?  , PersFname = ? , PersLname = ? , PersHeight = ? , PersWeight = ? , PersCorps = ? , PersGrp = ? , PersDutyNum = ? , PersCurrPosition = ? , PersAffiliation = ? , email = ? WHERE AccessRightsId = ?`,
              [
                Rank,
                PersFname,
                PersLname,
                persheight,
                persweight,
                PersCorps,
                PersGrp,
                PersDutyNum,
                PersCurrPosition,
                PersAffiliation,
                email,
                AccessRightsId,
              ],
            )
            if (err) {
              console.log(err)
            } else {
              res.send('Values inserted')
            }
          },
        )
      } else if (
        ImgSignatureTest === 'NoSignature' &&
        typeof req.file === 'undefined'
      ) {
        console.log('/PageHistory2')
        db.query(
          `UPDATE tbaccessrights SET Rank = ?  , PersFname = ? , PersLname = ? , PersHeight = ? , PersWeight = ? , PersCorps = ? , PersGrp = ? , PersDutyNum = ? , PersCurrPosition = ? , PersAffiliation = ? , email = ?  WHERE AccessRightsId = ?`,
          [
            Rank,
            PersFname,
            PersLname,
            persheight,
            persweight,
            PersCorps,
            PersGrp,
            PersDutyNum,
            PersCurrPosition,
            PersAffiliation,
            email,
            AccessRightsId,
          ],
          (err, result) => {
            if (err) {
              console.log('Error', err)
            } else {
              res.send('Values inserted')
            }
          },
        )
      } else {
        console.log('/PageHistory1')
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
)

app.get(process.env.API_PATH + 'PageEducationInfo/:id', (req, res) => {
  try {
    const Id = req.params.id
    db.query(
      `SELECT CourseYearId as id, CourseYear, CourseGrp, CourseTotalHrs, CourseBegin, CourseEnd, COUNT(CourseGrp) as numberofpartic, COUNT(CourseGrp) as numberofgraduates , tbfilecourseyear.Id_file , namefile 
    FROM tbcourseyear
    JOIN tbpmecourse ON tbcourseyear.CourseId = tbpmecourse.CourseId
    JOIN tbfilecourseyear ON tbcourseyear.Id_file = tbfilecourseyear.Id_file
    WHERE tbpmecourse.CourseId = tbcourseyear.CourseId AND tbcourseyear.CourseId = ${Id} 
    GROUP BY CourseGrp`,
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post(process.env.API_PATH + 'download/:file', (req, res) => {
  try {
    // const id = req.params.file;
    const filename = req.params.file
    // console.log(id);
    console.log(filename)
    res.download(`../public_html/uploads/${filename}`)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post(process.env.API_PATH + 'RegisStu', (req, res) => {
  try {
    // console.log("data: " ,req.body)
    const courseyearid = req.body.courseyearid
    const courseyear = req.body.courseyear
    const coursegrp = req.body.coursegrp
    const courseid = req.body.courseid
    const persid = req.body.persid
    const rank = req.body.rank
    const persfname = req.body.persfname
    const perslname = req.body.perslname
    const PersCorps = req.body.perscorps
    const PersGrp = req.body.persgrp
    const perscurrposition = req.body.perscurrposition
    const persaffiliation = req.body.persaffiliation
    const PersDutyNum = req.body.persdutynum
    const accessrightsid = req.body.accessrightsid
    const email = req.body.email
    const PersWeight = req.body.persweight
    const PersHeight = req.body.persheight
    const Id_file = courseid + '-' + coursegrp
    const Approve = 0
    const ProcessCenter = 0
    const Director = 0
    const Professor = 0
    const Student = 0
    const EvaluationCenter = 0
    const Process = 0
    const Evaluation = 0
    const Administrative = 0
    const acctstatus = 'ถูกระงับ'
    const CourseBegin = new Date()
    const CourseEnd = new Date()
    const StudentId = ''
    const Seminar = '1'

    db.query(
      'INSERT INTO tbregister (PersId , Rank ,PersFname,PersLname,PersCorps,PersGrp,PersDutyNum,PersCurrPosition,PersAffiliation,email,PersWeight,PersHeight) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
      [
        persid,
        rank,
        persfname,
        perslname,
        PersCorps,
        PersGrp,
        PersDutyNum,
        perscurrposition,
        persaffiliation,
        email,
        PersWeight,
        PersHeight,
      ],
      (err, result) => {
        db.query(
          'INSERT INTO tbaccessrights (AccessRightsId , Approve,ProcessCenter,Director,Professor,Student,EvaluationCenter,Process,Evaluation,Administrative,AcctStatus,PersId,Rank,PersFname,PersLname,PersHeight,PersWeight,PersCorps,PersGrp,PersDutyNum,PersCurrPosition,PersAffiliation,email) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
          [
            accessrightsid,
            Approve,
            ProcessCenter,
            Director,
            Professor,
            Student,
            EvaluationCenter,
            Process,
            Evaluation,
            Administrative,
            acctstatus,
            persid,
            rank,
            persfname,
            perslname,
            PersHeight,
            PersWeight,
            PersCorps,
            PersGrp,
            PersDutyNum,
            perscurrposition,
            persaffiliation,
            email,
          ],
          (err, result) => {
            db.query(
              'INSERT INTO tbcourseyear (CourseYearId, CourseYear ,CourseId,CourseGrp,PersId,CourseBegin,CourseEnd,StudentId,Seminar,Id_file,AccessRightsId) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
              [
                courseyearid,
                courseyear,
                courseid,
                coursegrp,
                persid,
                CourseBegin,
                CourseEnd,
                StudentId,
                Seminar,
                Id_file,
                accessrightsid,
              ],
            )
          },
        )
        if (err) {
          console.log(err)
        } else {
          res.send('Values inserted')
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post(process.env.API_PATH + 'HaveAllRegisStu', (req, res) => {
  try {
    const courseyearid = req.body.courseyearid
    const courseyear = req.body.courseyear
    const coursegrp = req.body.coursegrp
    const courseid = req.body.courseid
    const persid = req.body.persid
    const rank = req.body.rank
    const persfname = req.body.persfname
    const perslname = req.body.perslname
    const PersCorps = req.body.perscorps
    const PersGrp = req.body.persgrp
    const perscurrposition = req.body.perscurrposition
    const persaffiliation = req.body.persaffiliation
    const PersDutyNum = req.body.persdutynum
    const accessrightsid = req.body.accessrightsid
    const email = req.body.email
    const PersWeight = req.body.persweight
    const PersHeight = req.body.persheight
    const Id_file = courseid + '-' + coursegrp
    // console.log(courseyearid,coursegrp , courseyear ,stateid  ,states , persid, rank, persfname ,perslname , perscorps, persgrp,perscurrposition ,persaffiliation , persdutynum,email ,password )
    const Approve = 0
    const ProcessCenter = 0
    const Director = 0
    const Professor = 0
    const Student = 0
    const EvaluationCenter = 0
    const Process = 0
    const Evaluation = 0
    const Administrative = 0
    const acctstatus = 'ถูกระงับ'
    const CourseBegin = new Date()
    const CourseEnd = new Date()
    const StudentId = ''
    const Seminar = '1'

    // console.log(CourseBegin )
    db.query(
      'INSERT INTO tbregister (PersId , Rank ,PersFname,PersLname,PersCorps,PersGrp,PersDutyNum,PersCurrPosition,PersAffiliation,email,PersWeight,PersHeight) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
      [
        persid,
        rank,
        persfname,
        perslname,
        PersCorps,
        PersGrp,
        PersDutyNum,
        perscurrposition,
        persaffiliation,
        email,
        PersWeight,
        PersHeight,
      ],
      (err, result) => {
        db.query(
          'INSERT INTO tbaccessrights (AccessRightsId , Approve,ProcessCenter,Director,Professor,Student,EvaluationCenter,Process,Evaluation,Administrative,AcctStatus,PersId,Rank,PersFname,PersLname,PersHeight,PersWeight,PersCorps,PersGrp,PersDutyNum,PersCurrPosition,PersAffiliation,email) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
          [
            accessrightsid,
            Approve,
            ProcessCenter,
            Director,
            Professor,
            Student,
            EvaluationCenter,
            Process,
            Evaluation,
            Administrative,
            acctstatus,
            persid,
            rank,
            persfname,
            perslname,
            PersHeight,
            PersWeight,
            PersCorps,
            PersGrp,
            PersDutyNum,
            perscurrposition,
            persaffiliation,
            email,
          ],
          (err, result) => {
            db.query(
              'INSERT INTO tbcourseyear (CourseYearId, CourseYear ,CourseId,CourseGrp,PersId,CourseBegin,CourseEnd,StudentId,Seminar,Id_file,AccessRightsId) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
              [
                courseyearid,
                courseyear,
                courseid,
                coursegrp,
                persid,
                CourseBegin,
                CourseEnd,
                StudentId,
                Seminar,
                Id_file,
                accessrightsid,
              ],
              (err, result) => {
                db.query('INSERT INTO tbfilecourseyear (Id_file) VALUES(?)', [
                  Id_file,
                ])
              },
            )
          },
        )
        if (err) {
          console.log(err)
        } else {
          res.send('Values inserted')
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'FetchEmailInstructor', (req, res) => {
  try {
    db.query(`SELECT email FROM tbaccessrights`, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
        // console.log(result);
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post(process.env.API_PATH + 'RegisTeacAccessRightsIdSsZero', (req, res) => {
  try {
    const persid = req.body.persid
    const rank = req.body.rank
    const persfname = req.body.persfname
    const perslname = req.body.perslname
    const perscurrposition = req.body.perscurrposition
    const persaffiliation = req.body.persaffiliation
    const email = req.body.email
    const PersHeight = null
    const PersWeight = null
    const PersCorps = null
    const PersGrp = null
    const PersDutyNum = null
    // const password = req.body.password;
    const accessrightsid = req.body.accessrightsid
    const stateid = req.body.stateid
    const accessrightstype = 'รออนุมัติ'
    const acctstatus = 'ถูกระงับ'
    const SubjectName = 'รออนุมัติ'
    const Approve = 0
    const ProcessCenter = 0
    const Director = 0
    const Professor = 0
    const Student = 0
    const EvaluationCenter = 0
    const Process = 0
    const Evaluation = 0
    const Administrative = 0
    db.query(
      'INSERT INTO tbaccessrights (AccessRightsId , Approve,ProcessCenter,Director,Professor,Student,EvaluationCenter,Process,Evaluation,Administrative,AcctStatus,PersId,Rank,PersFname,PersLname,PersHeight,PersWeight,PersCorps,PersGrp,PersDutyNum,PersCurrPosition,PersAffiliation,email) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [
        accessrightsid,
        Approve,
        ProcessCenter,
        Director,
        Professor,
        Student,
        EvaluationCenter,
        Process,
        Evaluation,
        Administrative,
        acctstatus,
        persid,
        rank,
        persfname,
        perslname,
        PersHeight,
        PersWeight,
        PersCorps,
        PersGrp,
        PersDutyNum,
        perscurrposition,
        persaffiliation,
        email,
      ],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send('Values inserted')
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post(process.env.API_PATH + 'RegisTeac', (req, res) => {
  try {
    const persid = req.body.persid
    const rank = req.body.rank
    const persfname = req.body.persfname
    const perslname = req.body.perslname
    const perscurrposition = req.body.perscurrposition
    const persaffiliation = req.body.persaffiliation
    const email = req.body.email
    const PersHeight = null
    const PersWeight = null
    const PersCorps = null
    const PersGrp = null
    const PersDutyNum = null
    // const password = req.body.password;
    const accessrightsid = req.body.accessrightsid
    const stateid = req.body.stateid
    const accessrightstype = 'รออนุมัติ'
    const acctstatus = 'ถูกระงับ'
    const SubjectName = 'รออนุมัติ'
    const Approve = 0
    const ProcessCenter = 0
    const Director = 0
    const Professor = 0
    const Student = 0
    const EvaluationCenter = 0
    const Process = 0
    const Evaluation = 0
    const Administrative = 0
        db.query(
          'INSERT INTO tbaccessrights (AccessRightsId , Approve,ProcessCenter,Director,Professor,Student,EvaluationCenter,Process,Evaluation,Administrative,AcctStatus,PersId,Rank,PersFname,PersLname,PersHeight,PersWeight,PersCorps,PersGrp,PersDutyNum,PersCurrPosition,PersAffiliation,email) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
          [
            accessrightsid,
            Approve,
            ProcessCenter,
            Director,
            Professor,
            Student,
            EvaluationCenter,
            Process,
            Evaluation,
            Administrative,
            acctstatus,
            persid,
            rank,
            persfname,
            perslname,
            PersHeight,
            PersWeight,
            PersCorps,
            PersGrp,
            PersDutyNum,
            perscurrposition,
            persaffiliation,
            email,
          ],
        )
        if (err) {
          console.log(err)
        } else {
          res.send('Values inserted')
        }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post(process.env.API_PATH + 'login', (req, res) => {
  try {
    const email = req.body.email
    db.query(
      'SELECT PersId , Approve , ProcessCenter , Director , Professor , Student , EvaluationCenter , Process , Evaluation ,Administrative , AcctStatus    FROM `tbaccessrights` where email= ? GROUP BY email',
      [email],
      (err, result) => {
        if (err) {
          res.send({ err: err })
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'FetchFileCourseYear', (req, res) => {
  try {
    db.query(`SELECT Id_file FROM tbfilecourseyear`, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
        // console.log(result);
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'FetchAccessRightsId', (req, res) => {
  try {
    db.query(`SELECT AccessRightsId FROM tbaccessrights`, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
        // console.log(result);
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'FetchEmailRegister', (req, res) => {
  try {
    db.query(`SELECT email FROM tbregister `, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
        // console.log(result);
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'FetchCourseYear', (req, res) => {
  try {
    db.query(`SELECT CourseYearId FROM tbcourseyear`, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
        // console.log(result);
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'SendAccessRightsId/:acc_id', (req, res) => {
  try {
    const accessrightsid = req.params.acc_id
    // console.log(accessrightsid)
    db.query(
      `SELECT 
  tbaccessrights.AccessRightsId, 
  tbaccessrights.PersId,
  SUBSTRING(tbaccessrights.School,1,2) AS school,
  tbpmecourse.CourseId,
  tbpmecourse.CourseName,
  tbpmecourse.Academy ,
  tbaccessrights.Approve ,
  tbaccessrights.AcctStatus
  
  FROM 
  (
      SELECT tbaccessrights.AccessRightsId ,
      RIGHT(tbaccessrights.AccessRightsId,3) as School ,
      LEFT(tbaccessrights.AccessRightsId,10) as PersId ,
      Approve,
      AcctStatus
      FROM tbaccessrights 
  ) as tbaccessrights 
  JOIN tbpmecourse ON tbpmecourse.CourseId = tbaccessrights.School 
  WHERE  tbaccessrights.PersId = ?`, [accessrightsid],
      (err, result) => {
        if (err) {
          res.send({ err: err })
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'schoolss/:id', (req, res) => {
  try {
    const PerId = req.params.id
    db.query(
      `SELECT 
  SUBSTRING(tbaccessrights.School,1,2) AS school
  FROM 
  (
      SELECT tbaccessrights.AccessRightsId ,
      RIGHT(tbaccessrights.AccessRightsId,3) as School ,
      LEFT(tbaccessrights.AccessRightsId,10) as PersId ,
      Approve,
      AcctStatus
      FROM tbaccessrights 
  ) as tbaccessrights 
  JOIN tbpmecourse ON tbpmecourse.CourseId = tbaccessrights.School 
  WHERE  tbaccessrights.PersId = ?`,[PerId],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'PageSelectSchools', (req, res) => {
  try {
    const id = req.body.id
    db.query(
      `SELECT AccessRightsId,Approve,ProcessCenter,Director,Professor,Student,EvaluationCenter,Process,Evaluation,Administrative FROM tbaccessrights WHERE AccessRightsId = ?`,
      [id],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'pmecourse', (req, res) => {
  try {
    db.query('SELECT * FROM tbpmecourse ', (err, result) => {
      if (err) {
        console.log(err)
      }
      // console.log(result);
      res.status(200).send(result)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'PmeCourse', (req, res) => {
  try {

    const courseyearid = req.body.courseyearid
    const courseyear = req.body.courseyear
    const coursegrp = req.body.coursegrp
    const stateid = req.body.stateid
    const states = req.body.states
    const courseid = req.body.courseid
    const persid = req.body.persid
    const rank = req.body.rank
    const persfname = req.body.persfname
    const perslname = req.body.perslname
    const PersCorps = req.body.perscorps
    const PersGrp = req.body.persgrp
    const perscurrposition = req.body.perscurrposition
    const persaffiliation = req.body.persaffiliation
    const PersDutyNum = req.body.persdutynum
    const accessrightsid = req.body.accessrightsid
    const email = req.body.email
    // const password = req.body.password;
    const PersWeight = req.body.persweight
    const PersHeight = req.body.persheight
    const Id_file = courseid + '-' + coursegrp
    // console.log(courseyearid,coursegrp , courseyear ,stateid  ,states , persid, rank, persfname ,perslname , perscorps, persgrp,perscurrposition ,persaffiliation , persdutynum,email ,password )
    const Approve = 0
    const ProcessCenter = 0
    const Director = 0
    const Professor = 0
    const Student = 0
    const EvaluationCenter = 0
    const Process = 0
    const Evaluation = 0
    const Administrative = 0
    const acctstatus = 'ถูกระงับ'
    const CourseBegin = new Date()
    const CourseEnd = new Date()
    const StudentId = ''
    const Seminar = '1'

    db.query(
      'INSERT INTO tbaccessrights (AccessRightsId , Approve,ProcessCenter,Director,Professor,Student,EvaluationCenter,Process,Evaluation,Administrative,AcctStatus,PersId,Rank,PersFname,PersLname,PersHeight,PersWeight,PersCorps,PersGrp,PersDutyNum,PersCurrPosition,PersAffiliation,email) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [
        accessrightsid,
        Approve,
        ProcessCenter,
        Director,
        Professor,
        Student,
        EvaluationCenter,
        Process,
        Evaluation,
        Administrative,
        acctstatus,
        persid,
        rank,
        persfname,
        perslname,
        PersHeight,
        PersWeight,
        PersCorps,
        PersGrp,
        PersDutyNum,
        perscurrposition,
        persaffiliation,
        email,
      ],
      (err, result) => {
        db.query(
          'INSERT INTO tbcourseyear (CourseYearId, CourseYear ,CourseId,CourseGrp,PersId,CourseBegin,CourseEnd,StudentId,Seminar,Id_file,AccessRightsId) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
          [
            courseyearid,
            courseyear,
            courseid,
            coursegrp,
            persid,
            CourseBegin,
            CourseEnd,
            StudentId,
            Seminar,
            Id_file,
            accessrightsid,
          ],
          (err, result) => {
            db.query('INSERT INTO tbfilecourseyear (Id_file) VALUES(?)', [
              Id_file,
            ])
          },
        )
        if (err) {
          console.log(err)
        } else {
          res.send('Values inserted')
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post(process.env.API_PATH + 'RegisStuHaveFileCourseYears', (req, res) => {
  try {
    const courseyearid = req.body.courseyearid
    const courseyear = req.body.courseyear
    const coursegrp = req.body.coursegrp
    const stateid = req.body.stateid
    const states = req.body.states
    const courseid = req.body.courseid
    const persid = req.body.persid
    const rank = req.body.rank
    const persfname = req.body.persfname
    const perslname = req.body.perslname
    const PersCorps = req.body.perscorps
    const PersGrp = req.body.persgrp
    const perscurrposition = req.body.perscurrposition
    const persaffiliation = req.body.persaffiliation
    const PersDutyNum = req.body.persdutynum
    const accessrightsid = req.body.accessrightsid
    const email = req.body.email
    // const password = req.body.password;
    const PersWeight = req.body.persweight
    const PersHeight = req.body.persheight
    const Id_file = courseid + '-' + coursegrp
    // console.log(courseyearid,coursegrp , courseyear ,stateid  ,states , persid, rank, persfname ,perslname , perscorps, persgrp,perscurrposition ,persaffiliation , persdutynum,email ,password )
    const Approve = 0
    const ProcessCenter = 0
    const Director = 0
    const Professor = 0
    const Student = 0
    const EvaluationCenter = 0
    const Process = 0
    const Evaluation = 0
    const Administrative = 0
    const acctstatus = 'ถูกระงับ'
    const CourseBegin = new Date()
    const CourseEnd = new Date()
    const StudentId = ''
    const Seminar = '1'

    db.query(
      'INSERT INTO tbaccessrights (AccessRightsId , Approve,ProcessCenter,Director,Professor,Student,EvaluationCenter,Process,Evaluation,Administrative,AcctStatus,PersId,Rank,PersFname,PersLname,PersHeight,PersWeight,PersCorps,PersGrp,PersDutyNum,PersCurrPosition,PersAffiliation,email) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [
        accessrightsid,
        Approve,
        ProcessCenter,
        Director,
        Professor,
        Student,
        EvaluationCenter,
        Process,
        Evaluation,
        Administrative,
        acctstatus,
        persid,
        rank,
        persfname,
        perslname,
        PersHeight,
        PersWeight,
        PersCorps,
        PersGrp,
        PersDutyNum,
        perscurrposition,
        persaffiliation,
        email,
      ],
      (err, result) => {
        db.query(
          'INSERT INTO tbcourseyear (CourseYearId, CourseYear ,CourseId,CourseGrp,PersId,CourseBegin,CourseEnd,StudentId,Seminar,Id_file,AccessRightsId) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
          [
            courseyearid,
            courseyear,
            courseid,
            coursegrp,
            persid,
            CourseBegin,
            CourseEnd,
            StudentId,
            Seminar,
            Id_file,
            accessrightsid,
          ],
        )
        if (err) {
          console.log(err)
        } else {
          res.send('Values inserted')
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// แสดงข้อมูลอาจารย์
// app.get(process.env.API_PATH + 'PageListTeacher/:CourseId', (req, res) => {
//   try {
//     const school = req.params.CourseId
//     // console.log(school)

//     db.query(
//       `SELECT InstructorId ,CONCAT(InstructorFname,'  ',InstructorLname) as Fullname,tbaccessrights.AccessRightsId,tbaccessrights.AccessRightsType,SubjectName,RIGHT(tbregister.AccessRightsId,3) as cutString 
//   FROM tbregister 
//   JOIN tbaccessrights ON tbregister.AccessRightsId = tbaccessrights.AccessRightsId
//   JOIN tbinstructor ON tbinstructor.AccessRightsId = tbaccessrights.AccessRightsId
//   WHERE tbinstructor.AccessRightsId = tbaccessrights.AccessRightsId AND AccessRightsType != 'นทน.'  AND RIGHT(tbregister.AccessRightsId,3) = ${school}
//   ORDER BY (CASE WHEN SubjectName = '' AND AccessRightsType = 'อาจารย์ประจำหมวดวิชา' THEN 1 ELSE 0 END) DESC`,
//       (err, result) => {
//         if (err) {
//           console.log(err)
//         } else {
//           res.send(result)
//         }
//       },
//     )
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// })

//ดึงข้อมูลมาใช้ในหน้าdropdownsubjectlist
// app.get(process.env.API_PATH + 'getListTeacher', (req, res) => {
//   try {
//     db.query('SELECT * FROM tbinstructor', (err, result) => {
//       if (err) {
//         console.log(err)
//       } else {
//         res.send(result)
//       }
//     })
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// })

//update สิทธิ์
// app.put(process.env.API_PATH + 'AccessRightsTypeUpdate', (req, res) => {
//   try {
//     const AccessRightsId = req.body.accessRightsId
//     const AccessRightsType = req.body.AccessRightsType
//     const SubjectName = ''

//     db.query(
//       'UPDATE tbaccessrights SET AccessRightsType = ? WHERE AccessRightsId = ?',
//       [AccessRightsType, AccessRightsId],
//       (err, result) => {
//         db.query(
//           'UPDATE tbinstructor SET SubjectName = ? WHERE AccessRightsId = ?',
//           [SubjectName, AccessRightsId],
//         )
//         if (err) {
//           console.log(err)
//         } else {
//           res.send('Values inserted')
//         }
//       },
//     )
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// })

// ลบสมาชิก

app.delete(process.env.API_PATH + 'DeleteUser/:id', (req, res) => {
  try {
    const PersId = req.params.id
    // console.log(PersId)
    db.query(
      `DELETE tbcourseyear, tbclassattendance, tbcomment, tbpersattrscore, tbsubjectscore ,tbaccessrights
   FROM tbcourseyear
   LEFT JOIN tbclassattendance ON tbcourseyear.PersId = tbclassattendance.PersId
   LEFT JOIN tbcomment ON tbcourseyear.PersId = tbcomment.PersId
   LEFT JOIN tbpersattrscore ON tbcourseyear.PersId = tbpersattrscore.PersId
   LEFT JOIN tbsubjectscore ON tbcourseyear.PersId = tbsubjectscore.PersId
   LEFT JOIN tbaccessrights ON tbcourseyear.PersId = tbaccessrights.PerId
  
   WHERE tbcourseyear.PersId = ${PersId}`,
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update สิทธิ์วัดผลส่วนกลาง users
app.put(process.env.API_PATH + 'EvaluationCenter/:id/:access', (req, res) => {
  try {
    const AccessRightsId = req.params.id
    const access = req.params.access
    // console.log(AccessRightsId,access)
    db.query(
      'UPDATE tbaccessrights SET EvaluationCenter = ?  WHERE AccessRightsId = ?',
      [access, AccessRightsId],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update สิทธิ์กรรมวิธีส่วนกลาง users
app.put(process.env.API_PATH + 'ProcessCenter/:id/:access', (req, res) => {
  try {
    const AccessRightsId = req.params.id
    const access = req.params.access
    // console.log(AccessRightsId,access)
    db.query(
      'UPDATE tbaccessrights SET ProcessCenter = ?  WHERE AccessRightsId = ?',
      [access, AccessRightsId],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update สิทธิ์ผอ. users
app.put(process.env.API_PATH + 'Director/:id/:access', (req, res) => {
  try {
    const AccessRightsId = req.params.id
    const access = req.params.access
    // console.log(AccessRightsId,access)
    db.query(
      'UPDATE tbaccessrights SET Director = ?  WHERE AccessRightsId = ?',
      [access, AccessRightsId],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update สิทธิ์กรรมวิธี users
app.put(process.env.API_PATH + 'Process/:id/:access', (req, res) => {
  try {
    const AccessRightsId = req.params.id
    const access = req.params.access
    // console.log(AccessRightsId,access)
    db.query(
      'UPDATE tbaccessrights SET Process = ?   WHERE AccessRightsId = ?',
      [access, AccessRightsId],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update สิทธิ์วัดผล users
app.put(process.env.API_PATH + 'Evaluation/:id/:access', (req, res) => {
  try {
    const AccessRightsId = req.params.id
    const access = req.params.access
    // console.log(AccessRightsId,access)
    db.query(
      'UPDATE tbaccessrights SET Evaluation=?  WHERE AccessRightsId = ?',
      [access, AccessRightsId],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update สิทธิ์ปกครอง users
app.put(process.env.API_PATH + 'Administrative/:id/:access', (req, res) => {
  try {
    const AccessRightsId = req.params.id
    const access = req.params.access
    // console.log(AccessRightsId,access)
    db.query(
      'UPDATE tbaccessrights SET Administrative=? WHERE AccessRightsId = ?',
      [access, AccessRightsId],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update สิทธิ์อาจารย์ประจำหมวดวิชา users
app.put(process.env.API_PATH + 'Professor/:id/:access', (req, res) => {
  try {
    const AccessRightsId = req.params.id
    // console.log(AccessRightsId)
    const access = req.params.access

    // console.log(AccessRightsId,access)
    db.query(
      'UPDATE tbaccessrights SET Professor= ?  WHERE AccessRightsId = ?',
      [access, AccessRightsId],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update สิทธิ์นทน users
app.put(process.env.API_PATH + 'Student/:id/:access', (req, res) => {
  try {
    const AccessRightsId = req.params.id
    const access = req.params.access
    // console.log(AccessRightsId,access)
    db.query(
      'UPDATE tbaccessrights SET Student= ?  WHERE AccessRightsId = ?',
      [access, AccessRightsId],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update อนุมัติสถานศึกษา users
app.put(process.env.API_PATH + 'Approve/:id/:access', (req, res) => {
  try {
    const AccessRightsId = req.params.id
    const access = req.params.access
    // console.log(AccessRightsId,access)
    db.query(
      'UPDATE tbaccessrights SET Approve = ? WHERE AccessRightsId = ?',
      [access, AccessRightsId],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update AcctStatus users
app.put(process.env.API_PATH + 'AcctStatus', (req, res) => {
  try {
    const AccessRightsId = req.body.AccessRightsId
    const access = req.body.checked
    const dataUpdate = access ? 'ปกติ' : 'ถูกระงับ'
    // ? "ปกติ":"ถูกระงับ";

    console.log("AcctStatus: ",AccessRightsId,dataUpdate, access)
    db.query(
      'UPDATE tbaccessrights SET AcctStatus=? WHERE AccessRightsId = ?',
      [dataUpdate, AccessRightsId],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//Update วิชาของสิทธิ์ users
// app.post(process.env.API_PATH + 'SubjectUserUpdate', (req, res) => {
//   try {
//     const InstructorId = req.body.InstructorId
//     const SubjectId = req.body.SubjectId
//     db.query(
//       'UPDATE tbinstructor SET SubjectId = ? WHERE InstructorId = ?',
//       [SubjectId, InstructorId],
//       (err, result) => {
//         if (err) {
//           console.log(err)
//         } else {
//           res.send(result)
//         }
//       },
//     )
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// })

//update สถานะบัญชี
app.post(process.env.API_PATH + 'AcctStatusUpdate', (req, res) => {
  try {
    const AccessRightsId = req.body.accessRightsId
    const AcctStatus = req.body.AcctStatus
    db.query(
      'UPDATE tbaccessrights SET AcctStatus = ? WHERE AccessRightsId = ?',
      [AcctStatus, AccessRightsId],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//เลือกสิทธิ์วิชา
app.post(process.env.API_PATH + 'getsubject', (req, res) => {
  try {
    const CourseId = req.body.CourseId
    // console.log(CourseId)
    db.query(
      'SELECT CourseId,SubjectId,SubjectName FROM tbcoursesubjects WHERE CourseId = ?',
      [CourseId],

      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
          console.log(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//หน้าดึงข้อมูลอาจารย์เพื่อมาแก้ไข
app.get(process.env.API_PATH + 'ListTeacher/:id', (req, res) => {
  try {
    const PersId = req.params.id.substring(0, 10)
    // db.query("SELECT tbinstructor.InstructorId,tbinstructor.Rank,tbinstructor.InstructorFname,tbinstructor.InstructorLname,tbinstructor.InstructorCurrPos,tbinstructor.InstructorAffiliation,tbinstructor.email, tbsignature.CourseId, tbsignature.Courseyear, tbsignature.SignatureImg FROM tbinstructor LEFT JOIN tbsignature ON tbinstructor.InstructorId = tbsignature.InstructorId LEFT JOIN tbaccessrights ON tbinstructor.AccessRightsId = tbaccessrights.AccessRightsId WHERE tbinstructor.InstructorId = ?",InstructorId,
    db.query("SELECT tbaccessrights.AccessRightsId,PersId,Rank,PersFname,PersLname,PersCurrPosition,PersAffiliation,email,tbsignature.CourseId,tbsignature.SignatureImg FROM tbaccessrights LEFT JOIN tbsignature ON tbaccessrights.PersId = tbsignature.InstructorId where tbaccessrights.AccessRightsId Not in  ( SELECT tbcourseyear.AccessRightsId as AccessRightsId FROM tbcourseyear) AND tbaccessrights.PersId = ?",[PersId],

  (err,result)=> {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        
      }
  })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'ImgSignature/:id', (req, res) => {
  try {
    const SignatureId = req.params.id
    // const SignatureId = '011-2565-1111111111';
    //  console.log(typeof SignatureId)
    db.query(
      'SELECT 	SignatureImg FROM tbsignature WHERE SignatureId = ?',
      [SignatureId],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          // console.log(result)
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//Update วิชาของสิทธิ์ users
// app.post(process.env.API_PATH + 'SubjectUserUpdate', (req, res) => {
//   try {
//     const InstructorId = req.body.InstructorId
//     const SubjectId = req.body.SubjectId
//     db.query(
//       'UPDATE tbinstructor SET SubjectId = ? WHERE InstructorId = ?',
//       [SubjectId, InstructorId],
//       (err, result) => {
//         if (err) {
//           console.log(err)
//         } else {
//           res.send(result)
//         }
//       },
//     )
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// })

{
  /*เลือกสถานศึกษา*/
}
//รับสถานศึกษาจาก tbpmecourse
app.get(process.env.API_PATH + 'Academy', (req, res) => {
  try {
    const sqlSelect = 'SELECT * FROM tbpmecourse'
    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

{
  /*หมวดวิชาของสถานศึกษา*/
}
//รับค่าวิชาของสถานศึกษาจาก tbcoursesubjects
app.get(process.env.API_PATH + 'TableSubject/:courId', (req, res) => {
  try {
    const courId = req.params.courId
    const sqlSelect =
      "SELECT SubjectId AS id,SubjectNr,SubjectName,SubjectCreditOrScore FROM tbcoursesubjects WHERE CourseId = ?";
      // 'SELECT SubjectId AS id,SubjectNr,SubjectName,SubjectCreditOrScore,CourseId FROM tbcoursesubjects'
    db.query(sqlSelect,[courId], (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//เพิ่มรายวิชาของสถานศึกษา
app.post(process.env.API_PATH + 'AddSubject', (req, res) => {
  try {
    const sqlInsert =
      'INSERT INTO tbcoursesubjects (SubjectId,SubjectNr,SubjectName,SubjectCreditOrScore,CourseId) VALUES(?,?,?,?,?)'
    const SubjectNr = req.body.SubjectNr
    const SubjectName = req.body.SubjectName
    const SubjectCreditOrScore = req.body.SubjectCreditOrScore
    const CourseId = req.body.CourseId
    db.query(
      sqlInsert,
      [
        `${CourseId}-${SubjectNr}`,
        SubjectNr,
        SubjectName,
        SubjectCreditOrScore,
        CourseId,
      ],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//แก้ไขรายวิชาของสถานศึกษา
app.put(process.env.API_PATH + 'EditSubject', (req, res) => {
  const sqlUpdate =
    'UPDATE tbcoursesubjects SET SubjectNr = ?,SubjectName = ?,SubjectCreditOrScore=? WHERE SubjectId=? '
  const SubjectId = req.body.SubjectId
  const SubjectNr = req.body.SubjectNr
  const SubjectName = req.body.SubjectName
  const SubjectCreditOrScore = req.body.SubjectCreditOrScore
  db.query(
    sqlUpdate,
    [SubjectNr, SubjectName, SubjectCreditOrScore, SubjectId],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    },
  )
})

//ลบรายวิชาของสถานศึกษา
app.delete(process.env.API_PATH + 'delete/:id', (req, res) => {
  try {
    const id = req.params.id
    db.query(
      'DELETE FROM tbcoursesubjects WHERE SubjectId = ?',
      id,
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

{
  /*ชั่วโมงการศึกษา*/
}
//รับค่าชั่วโมงการศึกษาของหลักสูตรจาก tbpmecourse
app.get(process.env.API_PATH + 'PmeCourse', (req, res) => {
  try {
    const sqlSelect =
      'SELECT CourseTotalHrs AS Hrs FROM tbpmecourse WHERE CourseId = 011'
    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//แก้ไขชั่วโมงการศึกษาของหลักสูตร
app.put(process.env.API_PATH + 'UpdateCourseHrs', (req, res) => {
  try {
    const sqlUpdate =
      'UPDATE tbpmecourse SET CourseTotalHrs = ? WHERE CourseId= ? '
    const CourseHrs = req.body.CourseHrs
    const CourseId = req.body.CourseId
    db.query(sqlUpdate, [CourseHrs, CourseId], (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

{
  /*คุณลักษณะส่วนบุคคล*/
}
//รับค่าคุณลักษณะส่วนบุคคลจาก tbpersattrcategory
app.get(process.env.API_PATH + 'TableAttr', (req, res) => {
  try {
    const sqlSelect =
      'SELECT PerAttrCatId AS id,PersAttrCatName,PersAttrCatFullscore FROM tbpersattrcategory'
    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//เพิ่มค่าคุณลักษณะส่วนบุคคล
app.post(process.env.API_PATH + 'AddAttr', (req, res) => {
  try {
    const sqlInsert =
      'INSERT INTO tbpersattrcategory (PerAttrCatId,PersAttrCatName,PersAttrCatFullscore) VALUES(?,?,?)'

    const PerAttrCatId = req.body.PerAttrCatId
    const PersAttrCatName = req.body.PersAttrCatName
    const PersAttrCatFullscore = req.body.PersAttrCatFullscore

    db.query(
      sqlInsert,
      [PerAttrCatId, PersAttrCatName, PersAttrCatFullscore],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//แก้ไขคุณลักษณะส่วนบุคคล
app.put(process.env.API_PATH + 'EditAttr', (req, res) => {
  try {
    const sqlUpdate =
      'UPDATE tbpersattrcategory SET PersAttrCatName = ?,PersAttrCatFullscore = ? WHERE PerAttrCatId=? '
    const PerAttrCatId = req.body.PerAttrCatId
    const PersAttrCatName = req.body.PersAttrCatName
    const PersAttrCatFullscore = req.body.PersAttrCatFullscore
    db.query(
      sqlUpdate,
      [PersAttrCatName, PersAttrCatFullscore, PerAttrCatId],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//ลบคุณลักษณะส่วนบุคคล
app.delete(process.env.API_PATH + 'deleteAttr/:id', (req, res) => {
  try {
    const id = req.params.id
    db.query(
      'DELETE FROM tbpersattrcategory WHERE PerAttrCatId=?',
      id,
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// comment
app.post(process.env.API_PATH + 'comment', (req, res) => {
  try {
    const { persId, insructorId, comment, courId } = req.body
    const commentId = persId + '-' + courId + 'COM'
    // console.log("createcomment: ",req.body);
    // console.log("commentId: ",commentId);
    let date = new Date()
    const commentDate =
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2)
    // console.log(persId, insructorId, comment, commentDate);
    const sql = `INSERT INTO tbcomment (CommentId, PersId, InsructorId, CommentDetails, CommentDate) VALUES (?,?,?,?,?)`
    db.query(
      sql,
      [commentId, persId, insructorId, comment, commentDate],
      (err, result) => {
        if (err) {
          console.log(err)
        }
        res.status(200).send(result)
      },
    )
  } catch (error) {
    res.status(500).json({ error: 'บันทึกข้อมูลไม่สำเร็จ' })
  }
})

// commentByid

app.get(process.env.API_PATH + 'commentbyid/:persid/:courId', (req, res) => {
  try {
    const PersId = req.params.persid
    const courId = req.params.courId
    const commentId = PersId + '-' + courId + 'COM'
    // console.log(PersId);
    const sql = `SELECT CommentId, tbcomment.PersId, tbcomment.InsructorId, tbaccessrights.Rank, tbaccessrights.PersFname, tbaccessrights.PersLname, CommentDetails, CommentDate FROM tbcomment, tbaccessrights WHERE CommentId = ? AND tbcomment.InsructorId = tbaccessrights.PersId GROUP BY tbcomment.PersId`
    db.query(sql, [commentId], (err, result) => {
      if (err) {
        console.log(err)
      }
      res.status(200).send(result)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// commentUpdate

app.put(process.env.API_PATH + 'commentupdate', (req, res) => {
  try {
    const { comment, commentid } = req.body
    // console.log("commentUpdate: ", req.body);
    if (comment === '') {
      res.status(200).send({ message: 'กรุณากรอกข้อมูล' })
    } else {
      const sql = 'UPDATE tbcomment SET CommentDetails = ? WHERE CommentId = ?'
      db.query(sql, [comment, commentid], (err, result) => {
        if (err) {
          console.log(err)
        }
        // console.log(result);
        res.status(200).send(result)
      })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// studentByid

app.get(process.env.API_PATH + 'summarize/:PersId', (req, res) => {
  try {
    const PersId = req.params.PersId
    db.query(
      'SELECT * FROM tbregister WHERE PersId =' + PersId,
      (err, result) => {
        if (err) {
          console.log(err)
        }
        console.log(result)
        res.status(200).send(result)
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'education', (req, res) => {
  try {
    db.query(
      'SELECT CourseYear, CourseGrp, CourseTotalHrs, CourseBegin, CourseEnd, COUNT(CourseGrp) as theCount, COUNT(CourseGrp) as theCount2 FROM tbcourseyear, tbpmecourse WHERE tbpmecourse.CourseId = tbcourseyear.CourseId GROUP BY CourseGrp',
      (err, result) => {
        if (err) {
          console.log(err)
        }
        console.log(result)
        res.status(200).send(result)
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// result

app.get(
  process.env.API_PATH + 'result/course/:course/seminar/:seminar/:school',
  (req, res) => {
    try {
      const course = req.params.course
      const seminar = req.params.seminar
      const CourseId = req.params.school

      if (seminar === '0') {
        db.query(
          `select tbaccessrights.AccessRightsId,
        tbaccessrights.PersId as PerId,
        tbcourseyear.StudentId,
        tbaccessrights.Rank,
        tbaccessrights.PersFname,
        tbaccessrights.PersLname,
        tbaccessrights.PersAffiliation,
        tbaccessrights.email,
        tbaccessrights.PersHeight,
        tbaccessrights.PersWeight,
        tbaccessrights.PersCorps,
        tbaccessrights.PersGrp,
        tbaccessrights.PersDutyNum,
        tbaccessrights.PersCurrPosition,
        tbaccessrights.email,
      RIGHT(tbaccessrights.AccessRightsId,3) as cutstring,
      max(case when subjectId = '${CourseId}-1' then Grade end) 'grade_1',
      max(case when subjectId = '${CourseId}-2' then Grade end) 'grade_2',
      max(case when subjectId = '${CourseId}-3' then Grade end) 'grade_3',
      max(case when subjectId = '${CourseId}-4' then Grade end) 'grade_4',
      max(case when subjectId = '${CourseId}-5' then Grade end) 'grade_5',
      max(case when subjectId = '${CourseId}-6' then Grade end) 'grade_6',
      max(case when subjectId = '${CourseId}-7' then Grade end) 'grade_7',
      CourseGrp,
      Seminar,
      Grade
     
      from tbaccessrights
      join tbcourseyear ON tbaccessrights.AccessRightsId = tbcourseyear.AccessRightsId
      LEFT JOIN tbsubjectscore ON tbsubjectscore.PersId = tbcourseyear.PersId
      WHERE tbaccessrights.PersId = tbcourseyear.PersId AND tbcourseyear.CourseGrp = ${course} AND
      tbaccessrights.PersId = tbcourseyear.PersId
      AND RIGHT(tbaccessrights.AccessRightsId,3) = ${CourseId}
      GROUP BY tbaccessrights.PersId
      ORDER BY tbcourseyear.StudentId`,
          // `SELECT Data1.PersId, Data1.Rank, Data1.PersFname, Data1.PersLname, Data1.PersAffiliation FROM (SELECT tbregister.PersId, Rank, PersFname, PersLname, PersAffiliation FROM tbregister, tbcourseyear WHERE tbregister.PersId = tbcourseyear.PersId AND tbcourseyear.CourseGrp = ${course}) as Data1 INNER JOIN (SELECT tbregister.PersId, Rank, PersFname, PersLname, PersAffiliation FROM tbregister, tbcourseyear WHERE tbregister.PersId = tbcourseyear.PersId AND tbregister.Seminar = ${seminar}) as Data2 ON Data1.PersId = Data2.PersId`,
          (err, result) => {
            if (err) {
              console.log(err)
            }
            // console.log("data: ",result);
            res.status(200).send(result)
          },
        )
      } else {
        db.query(
          `select tbaccessrights.AccessRightsId,
    tbaccessrights.PersId as PerId,
    tbcourseyear.StudentId,
    tbaccessrights.Rank,
    tbaccessrights.PersFname,
    tbaccessrights.PersLname,
    tbaccessrights.PersAffiliation,
    tbaccessrights.email,
    tbaccessrights.PersHeight,
    tbaccessrights.PersWeight,
    tbaccessrights.PersCorps,
    tbaccessrights.PersGrp,
    tbaccessrights.PersDutyNum,
    tbaccessrights.PersCurrPosition,
    tbaccessrights.email,
  RIGHT(tbaccessrights.AccessRightsId,3) as cutstring,
  max(case when subjectId = '${CourseId}-1' then Grade end) 'grade_1',
  max(case when subjectId = '${CourseId}-2' then Grade end) 'grade_2',
  max(case when subjectId = '${CourseId}-3' then Grade end) 'grade_3',
  max(case when subjectId = '${CourseId}-4' then Grade end) 'grade_4',
  max(case when subjectId = '${CourseId}-5' then Grade end) 'grade_5',
  max(case when subjectId = '${CourseId}-6' then Grade end) 'grade_6',
  max(case when subjectId = '${CourseId}-7' then Grade end) 'grade_7',
  CourseGrp,
  Seminar,
  Grade
 
from tbaccessrights
  join tbcourseyear ON tbaccessrights.AccessRightsId = tbcourseyear.AccessRightsId
  LEFT JOIN tbsubjectscore ON tbsubjectscore.PersId = tbcourseyear.PersId
  WHERE tbaccessrights.PersId = tbcourseyear.PersId AND tbcourseyear.CourseGrp = ${course} AND
  tbaccessrights.PersId = tbcourseyear.PersId AND tbcourseyear.Seminar = ${seminar} AND
  tbaccessrights.PersId = tbcourseyear.PersId
  AND RIGHT(tbaccessrights.AccessRightsId,3) = ${CourseId}
  GROUP BY tbaccessrights.PersId
  ORDER BY tbcourseyear.StudentId`,
          // `SELECT Data1.PersId, Data1.Rank, Data1.PersFname, Data1.PersLname, Data1.PersAffiliation FROM (SELECT tbregister.PersId, Rank, PersFname, PersLname, PersAffiliation FROM tbregister, tbcourseyear WHERE tbregister.PersId = tbcourseyear.PersId AND tbcourseyear.CourseGrp = ${course}) as Data1 INNER JOIN (SELECT tbregister.PersId, Rank, PersFname, PersLname, PersAffiliation FROM tbregister, tbcourseyear WHERE tbregister.PersId = tbcourseyear.PersId AND tbregister.Seminar = ${seminar}) as Data2 ON Data1.PersId = Data2.PersId`,
          (err, result) => {
            if (err) {
              console.log(err)
            }
            // console.log("data: ",result);
            res.status(200).send(result)
          },
        )
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
)

// report
app.get(
  process.env.API_PATH +
    'result/report/:course/seminar/:seminar/:school/:course2',
  (req, res) => {
    try {
      const course = req.params.course
      const seminar = req.params.seminar
      const CourseId = req.params.school
      // const courseNum = req.params.course2
      // const num = courseNum * 100
      // console.log("report: ",course, seminar, CourseId, courseNum, courseNum)
      if (seminar === '0') {
        db.query(
          `select tbaccessrights.PersId,
          tbaccessrights.AccessRightsId,
          tbaccessrights.Rank,
          tbaccessrights.PersFname,
          tbaccessrights.PersLname,
          tbaccessrights.PersAffiliation,
        RIGHT(tbaccessrights.AccessRightsId,3) as cutstring,
        max(case when subjectId = '${CourseId}-1' then SubjectScore end) 'course_1',
        max(case when subjectId = '${CourseId}-2' then SubjectScore end) 'course_2',
        max(case when subjectId = '${CourseId}-3' then SubjectScore end) 'course_3',
        max(case when subjectId = '${CourseId}-4' then SubjectScore end) 'course_4',
        max(case when subjectId = '${CourseId}-5' then SubjectScore end) 'course_5',
        max(case when subjectId = '${CourseId}-6' then SubjectScore end) 'course_6',
        max(case when subjectId = '${CourseId}-7' then SubjectScore end) 'course_7',
        CourseGrp,
        Seminar,
        Grade
       
      from tbaccessrights, tbcourseyear
      LEFT JOIN tbsubjectscore
      ON tbsubjectscore.PersId = tbcourseyear.PersId
      WHERE tbaccessrights.PersId = tbcourseyear.PersId AND tbcourseyear.CourseGrp = ${course} AND
      tbaccessrights.PersId = tbcourseyear.PersId 
      AND RIGHT(tbaccessrights.AccessRightsId,3) = ${CourseId}
      GROUP BY tbaccessrights.PersId
      ORDER BY tbcourseyear.StudentId`,
          // `SELECT Data1.PersId, Data1.Rank, Data1.PersFname, Data1.PersLname, Data1.PersAffiliation FROM (SELECT tbregister.PersId, Rank, PersFname, PersLname, PersAffiliation FROM tbregister, tbcourseyear WHERE tbregister.PersId = tbcourseyear.PersId AND tbcourseyear.CourseGrp = ${course}) as Data1 INNER JOIN (SELECT tbregister.PersId, Rank, PersFname, PersLname, PersAffiliation FROM tbregister, tbcourseyear WHERE tbregister.PersId = tbcourseyear.PersId AND tbregister.Seminar = ${seminar}) as Data2 ON Data1.PersId = Data2.PersId`,
          (err, result) => {
            if (err) {
              console.log(err)
            }
            // console.log(result);
            res.status(200).send(result)
          },
        )
      } else {
        db.query(
          `select tbaccessrights.PersId,
          tbaccessrights.AccessRightsId,
          tbaccessrights.Rank,
          tbaccessrights.PersFname,
          tbaccessrights.PersLname,
          tbaccessrights.PersAffiliation,
        RIGHT(tbaccessrights.AccessRightsId,3) as cutstring,
        max(case when subjectId = '${CourseId}-1' then SubjectScore end) 'course_1',
        max(case when subjectId = '${CourseId}-2' then SubjectScore end) 'course_2',
        max(case when subjectId = '${CourseId}-3' then SubjectScore end) 'course_3',
        max(case when subjectId = '${CourseId}-4' then SubjectScore end) 'course_4',
        max(case when subjectId = '${CourseId}-5' then SubjectScore end) 'course_5',
        max(case when subjectId = '${CourseId}-6' then SubjectScore end) 'course_6',
        max(case when subjectId = '${CourseId}-7' then SubjectScore end) 'course_7',
        CourseGrp,
        Seminar,
        Grade
       
      from tbaccessrights, tbcourseyear
      LEFT JOIN tbsubjectscore
      ON tbsubjectscore.PersId = tbcourseyear.PersId
      WHERE tbaccessrights.PersId = tbcourseyear.PersId AND tbcourseyear.CourseGrp = ${course} AND
      tbaccessrights.PersId = tbcourseyear.PersId AND tbcourseyear.Seminar = ${seminar}
      AND RIGHT(tbaccessrights.AccessRightsId,3) = ${CourseId}
      GROUP BY tbaccessrights.PersId
      ORDER BY tbcourseyear.StudentId`,
          // `SELECT Data1.PersId, Data1.Rank, Data1.PersFname, Data1.PersLname, Data1.PersAffiliation FROM (SELECT tbregister.PersId, Rank, PersFname, PersLname, PersAffiliation FROM tbregister, tbcourseyear WHERE tbregister.PersId = tbcourseyear.PersId AND tbcourseyear.CourseGrp = ${course}) as Data1 INNER JOIN (SELECT tbregister.PersId, Rank, PersFname, PersLname, PersAffiliation FROM tbregister, tbcourseyear WHERE tbregister.PersId = tbcourseyear.PersId AND tbregister.Seminar = ${seminar}) as Data2 ON Data1.PersId = Data2.PersId`,
          (err, result) => {
            if (err) {
              console.log(err)
            }
            // console.log(result);
            res.status(200).send(result)
          },
        )
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
)

app.get(
  process.env.API_PATH +
    'result/reportgrade/:course/seminar/:seminar/:CourseId/:course2',
  (req, res) => {
    try {
      const course = req.params.course
      const seminar = req.params.seminar
      const CourseId = req.params.CourseId
      if (seminar === '0') {
        db.query(
          `select tbaccessrights.PersId,
          tbaccessrights.AccessRightsId,
        tbaccessrights.Rank,
        tbaccessrights.PersFname,
        tbaccessrights.PersLname,
        tbaccessrights.PersAffiliation,
        RIGHT(tbaccessrights.AccessRightsId,3) as cutstring,
        max(case when tbsubjectscore.subjectId = '${CourseId}-1' then Grade end) 'grade_1',
        max(case when tbsubjectscore.subjectId = '${CourseId}-2' then Grade end) 'grade_2',
        max(case when tbsubjectscore.subjectId = '${CourseId}-3' then Grade end) 'grade_3',
        max(case when tbsubjectscore.subjectId = '${CourseId}-4' then Grade end) 'grade_4',
        max(case when tbsubjectscore.subjectId = '${CourseId}-5' then Grade end) 'grade_5',
        max(case when tbsubjectscore.subjectId = '${CourseId}-6' then Grade end) 'grade_6',
        max(case when tbsubjectscore.subjectId = '${CourseId}-7' then Grade end) 'grade_7',
        tbcourseyear.CourseGrp,
        tbcourseyear.Seminar,
        Grade
       
      from tbaccessrights, tbcourseyear
      LEFT JOIN tbsubjectscore
      ON tbsubjectscore.PersId = tbcourseyear.PersId
      WHERE tbaccessrights.PersId = tbcourseyear.PersId AND tbcourseyear.CourseGrp = ${course} AND
      tbaccessrights.PersId = tbcourseyear.PersId
      AND RIGHT(tbaccessrights.AccessRightsId,3) = ${CourseId}
      GROUP BY tbaccessrights.PersId
      ORDER BY tbcourseyear.StudentId`,
          (err, result) => {
            if (err) {
              console.log(err)
            }
            // console.log("report grade total: ",result);
            res.status(200).send(result)
          },
        )
      } else {
        db.query(
          `select tbaccessrights.PersId,
          tbaccessrights.AccessRightsId,
          tbaccessrights.Rank,
          tbaccessrights.PersFname,
          tbaccessrights.PersLname,
          tbaccessrights.PersAffiliation,
          RIGHT(tbaccessrights.AccessRightsId,3) as cutstring,
          max(case when tbsubjectscore.subjectId = '${CourseId}-1' then Grade end) 'grade_1',
          max(case when tbsubjectscore.subjectId = '${CourseId}-2' then Grade end) 'grade_2',
          max(case when tbsubjectscore.subjectId = '${CourseId}-3' then Grade end) 'grade_3',
          max(case when tbsubjectscore.subjectId = '${CourseId}-4' then Grade end) 'grade_4',
          max(case when tbsubjectscore.subjectId = '${CourseId}-5' then Grade end) 'grade_5',
          max(case when tbsubjectscore.subjectId = '${CourseId}-6' then Grade end) 'grade_6',
          max(case when tbsubjectscore.subjectId = '${CourseId}-7' then Grade end) 'grade_7',
          tbcourseyear.CourseGrp,
          tbcourseyear.Seminar,
        Grade
       
      from tbaccessrights, tbcourseyear
      LEFT JOIN tbsubjectscore
      ON tbsubjectscore.PersId = tbcourseyear.PersId
      WHERE tbaccessrights.PersId = tbcourseyear.PersId AND tbcourseyear.CourseGrp = ${course} AND
      tbaccessrights.PersId = tbcourseyear.PersId AND tbcourseyear.Seminar = ${seminar}
      AND RIGHT(tbaccessrights.AccessRightsId,3) = ${CourseId}
      GROUP BY tbaccessrights.PersId
      ORDER BY tbcourseyear.StudentId`,
          (err, result) => {
            if (err) {
              console.log(err)
            }
            // console.log("report grade By siminar 1: ",result);
            res.status(200).send(result)
          },
        )
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
)

// subjects

app.get(process.env.API_PATH + 'subjects/:courId/:AccessRightsId', (req, res) => {
  try {
    const courId = req.params.courId
    const AccessRightsId = req.params.AccessRightsId
    const id = AccessRightsId + "-" + courId

    db.query(
      `SELECT tbcoursesubjects.CourseId as CourseId, SubjectNr, SubjectName, SubjectCreditOrScore, SubjectScoreId,FullScore, SubjectScore, InstructorId, Grade FROM tbsubjectscore, tbcoursesubjects WHERE LEFT(tbsubjectscore.SubjectScoreId,14) = ? AND tbsubjectscore.SubjectId = tbcoursesubjects.SubjectId AND tbcoursesubjects.CourseId = ?`,[id,courId],
      (err, result) => {
        if (err) {
          console.log(err)
        }
        // console.log(result);
        res.status(200).send(result)
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// reportbyid

app.get(process.env.API_PATH + 'report/:PersId', (req, res) => {
  try {
    const PersId = req.params.PersId
    // console.log("data1: " ,PersId)
    db.query(
      `select tbaccessrights.PersId, StudentId, tbaccessrights.Rank, tbaccessrights.PersFname, tbaccessrights.PersLname, tbaccessrights.PersDutyNum, tbaccessrights.PersCorps, tbaccessrights.PersGrp, tbaccessrights.PersCurrPosition, tbaccessrights.PersAffiliation, CourseGrp, CourseYear, CourseBegin, CourseEnd from tbcourseyear, tbaccessrights where tbcourseyear.AccessRightsId = tbaccessrights.AccessRightsId AND tbaccessrights.AccessRightsId = ?`,
      [PersId],
      (err, result) => {
        if (err) {
          console.log(err)
        }
        // console.log("data: ",result);
        res.status(200).send(result)
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// courseyearByid

app.get(process.env.API_PATH + 'courseyearByid/:CourseGrp', (req, res) => {
  try {
    const CourseGrp = req.params.CourseGrp
    db.query(
      `SELECT CourseYear, CourseGrp, CourseTotalHrs, CourseBegin, CourseEnd FROM tbcourseyear, tbpmecourse WHERE tbpmecourse.CourseId = tbcourseyear.CourseId and tbcourseyear.CourseGrp = ${CourseGrp} GROUP BY CourseGrp;`,
      (err, result) => {
        if (err) {
          console.log(err)
        }
        // console.log(result);
        res.status(200).send(result)
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'listofficer/:id', (req, res) => {
  try {
    const id = req.params.id
    db.query( `SELECT 
    tbaccessrights.PersId as PersId ,
    tbaccessrights.Rank as Rank,
    tbaccessrights.PersFname as PersFname,
    tbaccessrights.PersLname as PersLname,
    tbaccessrights.PersCurrPosition as PersCurrPosition, 
    tbaccessrights.PersAffiliation as PersAffiliation,
    tbaccessrights.AccessRightsId as AccessRightsId,
    tbaccessrights.Professor as Professor,
    tbaccessrights.Director as Director
    FROM tbaccessrights 
    WHERE tbaccessrights.AccessRightsId Not in  ( SELECT tbcourseyear.AccessRightsId as AccessRightsId FROM tbcourseyear) AND AcctStatus ='ปกติ' And RIGHT(tbaccessrights.AccessRightsId,3) = ${id}`,
    (err,result) => {
      if(err){
        console.log(err);
      }else{
        // console.log("result: ",result);
        res.status(200).send(result);
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'checkLeveloffice/:id', (req, res) => {
  try {
    const id = req.params.id
    db.query("SELECT AccessRightsId, Rank ,PersFname , PersLname , ProcessCenter, Director, Professor, Student, EvaluationCenter, Process, Evaluation, Administrative FROM tbaccessrights WHERE tbaccessrights.AccessRightsId Not in  ( SELECT tbcourseyear.AccessRightsId FROM tbcourseyear) AND tbaccessrights.AccessRightsId = ? " , [id],
  (err, result) => {
    if(err){
      console.log(err);
    }else{
      res.status(200).send(result);
    }
  })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(
  process.env.API_PATH + 'listsubjectsaj/:access/:accessId',
  (req, res) => {
    try {
      const accessId = req.params.accessId
      const Course = accessId.substring(11, 14)
      db.query("SELECT tbaccessrights.Rank, tbaccessrights.PersFname,tbaccessrights.PersLname,tbclassroom.AccessRightsId,tbcoursesubjects.SubjectName,tbpmecourse.CourseName,tbclassroom.ClassId FROM tbcoursesubjects, tbpmecourse, tbclassroom, tbaccessrights WHERE tbclassroom.AccessRightsId = tbaccessrights.AccessRightsId AND tbclassroom.SubjectId = tbcoursesubjects.SubjectId AND tbpmecourse.CourseId = ? AND tbclassroom.AccessRightsId = ?" , [Course, accessId],
  (err, result) => {
    if(err){
      console.log(err);
    }else{
      res.status(200).send(result);
      // console.log(result);
    }
  })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
    // const access = req.params.access;
  },
)

app.get(process.env.API_PATH + 'subjects2/:courId', (req, res) => {
  try {
    const courId = req.params.courId
    db.query(
      'SELECT * FROM tbcoursesubjects WHERE CourseId = ?',
      [courId],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.status(200).send(result)
          // console.log(result);
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post(process.env.API_PATH + 'addsubjectaj', (req, res) => {
  try {
    const value = req.body.value
    // console.log(value.accessId.substring(0, 10))
    const classid = value.subjectId + '-' + value.accessId.substring(0, 10)
    db.query(
      'SELECT * FROM tbclassroom WHERE ClassId = ?',
      [classid],
      function (err, rows, fields) {
        if (err) {
          console.log(err)
          return res.status(500).send('Server Error')
        }
        if (rows.length > 0) {
          return res.status(400).json({ msg: 'อาจารย์สอนวิชานี้อยู่แล้ว' })
        } else {
          // console.log('addAJ: ',subjectId, classid, accessId);
          const sql = `INSERT INTO tbclassroom (ClassId, AccessRightsId, SubjectId) VALUES (?,?,?)`
          db.query(
            sql,
            [classid, value.accessId, value.subjectId],
            (err, result) => {
              if (err) {
                console.log(err)
              }
              res.status(200).send(result)
            },
          )
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'deletesubject/:id', (req, res) => {
  try {
    const id = req.params.id
    // console.log('del: ',id);
    db.query(
      `DELETE FROM tbclassroom WHERE ClassId = ?`,
      [id],
      (err, result) => {
        if (err) {
          console.log(err)
        }
        // console.log(result);
        res.status(200).send(result)
      },
    )
  } catch (error) {
    res.status(500).json({ error: 'ลบข้อมูลไม่สำเร็จ' })
  }
})

app.get(process.env.API_PATH + 'education/:courId', (req, res) => {
  try {
    const courId = req.params.courId
    // console.log(courId);
    db.query(
      `SELECT CourseYear, CourseGrp, CourseTotalHrs, CourseBegin, CourseEnd, COUNT(CourseGrp) as theCount, COUNT(CourseGrp) as theCount2 FROM tbcourseyear, tbpmecourse WHERE tbpmecourse.CourseId = tbcourseyear.CourseId AND tbcourseyear.CourseId = ${courId} GROUP BY CourseGrp`,
      (err, result) => {
        if (err) {
          console.log(err)
        }
        // console.log('Edu',result);
        res.status(200).send(result)
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'subjects2/:courId', (req, res) => {
  try {
    const courId = req.params.courId
    // const PersId = req.params.PersId;
    // connection.query(`SELECT SubjectNr,SubjectName FROM tbcoursesubjects WHERE tbcoursesubjects.CourseId = ${courId} ` , (err, result) => {
    db.query(
      `SELECT * FROM tbcoursesubjects WHERE CourseId = ${courId}`,
      (err, result) => {
        if (err) {
          console.log(err)
        }
        // console.log(result);
        res.status(200).send(result)
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'summarize/:AccessRightsId/:courId', (req, res) => {
  try {
    const PersId = req.params.AccessRightsId
    const courId = req.params.courId
    db.query(
      // `SELECT * FROM tbregister WHERE PersId = ${PersId} AND RIGHT(AccessRightsId,3) = ${courId}`,
      `SELECT tbcourseyear.StudentId, tbcourseyear.PersId, tbaccessrights.Rank, tbaccessrights.PersFname, tbaccessrights.PersLname 
      FROM tbaccessrights, tbcourseyear WHERE tbaccessrights.AccessRightsId = tbcourseyear.AccessRightsId
      AND tbaccessrights.AccessRightsId = ? AND RIGHT(tbcourseyear.AccessRightsId,3) = ?`,[PersId,courId],
      (err, result) => {
        if (err) {
          console.log(err)
        }
        // console.log(result);
        res.status(200).send(result)
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(
  process.env.API_PATH + 'commentbyidPageSum/:PersId/:courId',
  (req, res) => {
    try {
      const PersId = req.params.PersId
      const courId = req.params.courId
      const commentId = PersId + '-' + courId + 'COM'
      // console.log(PersId,courId);
      const sql = `SELECT CommentId, tbcomment.PersId, tbcomment.InsructorId, tbaccessrights.Rank, tbaccessrights.PersFname, tbaccessrights.PersLname, CommentDetails, CommentDate FROM tbcomment, tbaccessrights WHERE CommentId = ? AND tbcomment.InsructorId = tbaccessrights.PersId GROUP BY tbcomment.PersId`
      // const sql = `SELECT * FROM tbcomment WHERE CommentId = ?`;
      db.query(sql, [commentId], (err, result) => {
        if (err) {
          console.log(err)
        }
        res.status(200).send(result)
        // console.log("data: ",result);
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
)

app.post(process.env.API_PATH + 'comment', (req, res) => {
  try {
    const { persId, insructorId, comment } = req.body
    // console.log(req.body);
    let date = new Date()
    const commentDate =
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2)
    // console.log(persId, insructorId, comment, commentDate);
    const sql = `INSERT INTO tbcomment (PersId, InsructorId, CommentDetails, CommentDate) VALUES (?,?,?,?)`
    db.query(
      sql,
      [persId, insructorId, comment, commentDate],
      (err, result) => {
        if (err) {
          console.log(err)
        }
        res.status(200).send(result)
      },
    )
  } catch (error) {
    res.status(500).json({ error: 'บันทึกข้อมูลไม่สำเร็จ' })
  }
})

app.get(process.env.API_PATH + 'education/:courId', (req, res) => {
  try {
    const courId = req.params.courId
    // console.log(courId);
    db.query(
      `SELECT CourseYear, CourseGrp, CourseTotalHrs, CourseBegin, CourseEnd, COUNT(CourseGrp) as theCount, COUNT(CourseGrp) as theCount2 FROM tbcourseyear, tbpmecourse WHERE tbpmecourse.CourseId = tbcourseyear.CourseId AND tbcourseyear.CourseId = ${courId} GROUP BY CourseGrp`,
      (err, result) => {
        if (err) {
          console.log(err)
        }
        // console.log('Edu',result);
        res.status(200).send(result)
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'subjects2/:courId', (req, res) => {
  try {
    const courId = req.params.courId
    // const PersId = req.params.PersId;
    // connection.query(`SELECT SubjectNr,SubjectName FROM tbcoursesubjects WHERE tbcoursesubjects.CourseId = ${courId} ` , (err, result) => {
    db.query(
      `SELECT * FROM tbcoursesubjects WHERE CourseId = ${courId}`,
      (err, result) => {
        if (err) {
          console.log(err)
        }
        // console.log(result);
        res.status(200).send(result)
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(
  process.env.API_PATH + 'attrScore/:courseGrp/:courseid/:persid',
  (req, res) => {
    const { courseGrp, courseid, persid } = req.params
    // const attr = courseid+"-"+courseGrp;
    // console.log('attrScore : ', courseid, courseGrp, persid);
    try {
      const sql = `SELECT tbcourseyear.PersId as PersId, ROUND(SUM(tbpersattrscore.PerAttrScore),2) as persattr FROM tbcourseyear, tbpersattrscore WHERE tbcourseyear.PersId = tbpersattrscore.PersId AND SUBSTRING(tbpersattrscore.PersAttrScoreId,12,3) = ? AND tbcourseyear.CourseGrp = ? AND tbpersattrscore.PersId = ?`
      db.query(sql,[courseid,courseGrp,persid], (err, result) => {
        if (err) {
          console.log(err)
        }
        // console.log(result);
        res.status(200).send(result)
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
)

app.get(process.env.API_PATH + 'number/:cutstring/:coursegrp', (req, res) => {
  try {
    const { cutstring, coursegrp } = req.params
    // console.log(cutstring,coursegrp);
    db.query(
      `SELECT CourseYear, CourseGrp, CourseTotalHrs, COUNT(CourseGrp) as theCount FROM tbcourseyear, tbpmecourse WHERE tbpmecourse.CourseId = tbcourseyear.CourseId AND tbcourseyear.CourseId = ${cutstring} AND tbcourseyear.CourseGrp = ${coursegrp} GROUP BY CourseGrp;`,
      (err, result) => {
        if (err) {
          console.log(err)
        }
        // console.log('Edu',result);
        res.status(200).send(result)
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'persattrScore/:PersId/:courId', (req, res) => {
  const { PersId, courId } = req.params
  // console.log('persattrScore : ', PersId, courId);
  try {
    const sql = `SELECT * FROM tbpersattrscore WHERE PersId = ? AND SUBSTRING(PersAttrScoreId,12,3) = ?`
    db.query(sql,[PersId,courId], (err, result) => {
      if (err) {
        console.log(err)
      }
      // console.log(result);
      res.status(200).send(result)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'menustudent/:PersId/:courId', (req, res) => {
  try {
    const { PersId, courId } = req.params
    // console.log('menustudent : ', PersId, courId);
    const sql = `SELECT tbcourseyear.PersId as PersId, tbcourseyear.AccessRightsId as AccessRightsId, tbcourseyear.CourseId as CourseId, tbcourseyear.CourseGrp as CourseGrp, tbcourseyear.Seminar FROM tbcourseyear WHERE tbcourseyear.PersId = ? AND tbcourseyear.CourseId = ?`
    db.query(sql,[PersId,courId], (err, result) => {
      if (err) {
        console.log(err)
      }
      // console.log("menustudent: ", result);
      res.status(200).send(result)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(
  process.env.API_PATH + 'courseid/:courseid/coursegrp/:coursegrp',
  (req, res) => {
    try {
      const { courseid, coursegrp } = req.params
      mysql0.gradeArragement(courseid, coursegrp).then((result) => {
        //the promise is resolved here
        // console.log("data: ", JSON.stringify(result));
        res.send(result)
      })
    } catch (err) {
      console.log('getgrading failed err >>> ', err)
    }
  },
)

app.get(
  process.env.API_PATH + 'getpercentment/courseid/:courId/coursegrp/:coursegrp',
  (req, res) => {
    try {
      const { courId, coursegrp } = req.params
      // console.log('getPercent: ' + courId, coursegrp)
      mysql1.percentArragement(courId, coursegrp).then((result) => {
        //the promise is resolved here
        res.send(result)
      })
    } catch (err) {
      console.log('getpercent failed err >>> ', err)
    }
  },
)

app.get(process.env.API_PATH + 'pageStudyDir/:courId', (req, res) => {
  try {
    const { courId } = req.params
    // console.log('pageStudyDir : ', courId);
    const sql = `SELECT * FROM tbsignature WHERE CourseId = ${courId}`
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
      }
      // console.log("pageStudyDir: ", result);
      res.status(200).send(result)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'pageprintDir/:courId/:id', (req, res) => {
  try {
    const { courId, id } = req.params
    const access = id + '-' + courId
    const sql = `SELECT * FROM tbaccessrights WHERE AccessRightsId = ?`
    db.query(sql, [access], (err, result) => {
      if (err) {
        console.log(err)
      }
      // console.log("pageprintDir: ", result);
      res.status(200).send(result)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put(process.env.API_PATH + 'attachFile/:id/:selectedClass1', (req, res) => {
  try {
    const SignatureId = req.params.id
    const selectedClass1 = req.params.selectedClass1
    const perid = SignatureId.substring(0, 10)
    const courId = SignatureId.substring(11, 15)
    const signId = courId + '-' + perid
    const dateAttach = new Date()
    const Chkattackfile = 1
    const Id_file = courId + '-' + selectedClass1
    // console.log("data: ", dateAttach, Chkattackfile, signId, Id_file)
    db.query(
      'UPDATE tbsignature, tbcourseyear SET tbsignature.Dateattechfile = ?, tbsignature.Chkattackfile = ?, tbcourseyear.SignatureId = ? WHERE tbcourseyear.Id_file = ? AND tbsignature.SignatureId = ?',
      [dateAttach, Chkattackfile, signId, Id_file, signId],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put(process.env.API_PATH + 'sendScore/:id/:selectedClass1', (req, res) => {
  try {
    const SignatureId = req.params.id
    const selectedClass1 = req.params.selectedClass1
    // const perid = SignatureId.substring(0, 10)
    const courId = SignatureId.substring(11, 15)
    // const signId = courId + "-" + perid
    const Chksendscore = 1
    const Id_file = courId + '-' + selectedClass1
    // console.log("data: ", Chksendscore, Id_file)
    db.query(
      'UPDATE tbsignature, tbcourseyear SET tbsignature.Chksendscore = ? WHERE tbcourseyear.SignatureId = tbsignature.SignatureId AND tbcourseyear.Id_file = ?',
      [Chksendscore, Id_file],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      },
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(process.env.API_PATH + 'chkAttachFile/:id', (req, res) => {
  try {
    const SignatureId = req.params.id
    const perid = SignatureId.substring(0, 10)
    const courId = SignatureId.substring(11, 15)
    const signId = courId + '-' + perid
    const sql = `SELECT * FROM tbsignature WHERE SignatureId = ?`
    db.query(sql, [signId], (err, result) => {
      if (err) {
        console.log(err)
      }
      // console.log("chkAttachFile: ", result);
      res.status(200).send(result)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get(
  process.env.API_PATH + 'chkAttachFilestu/:id/:CourseGrp',
  (req, res) => {
    try {
      const SignatureId = req.params.id
      const CourseGrp = req.params.CourseGrp
      const perid = SignatureId.substring(0, 10)
      const courId = SignatureId.substring(11, 15)
      const signId = courId + '-' + CourseGrp + '-' + perid
      const sql = `SELECT Chkattackfile, Chksendscore FROM tbsignature,tbcourseyear WHERE tbcourseyear.SignatureId = tbsignature.SignatureId AND tbcourseyear.CourseYearId = ? GROUP BY Chkattackfile`
      db.query(sql, [signId], (err, result) => {
        if (err) {
          console.log(err)
        }
        res.status(200).send(result)
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
)

app.get(
  process.env.API_PATH + 'chkSendScore/:id/:selectedClass1',
  (req, res) => {
    try {
      const SignatureId = req.params.id
      const CourseGrp = req.params.selectedClass1
      // const perid = SignatureId.substring(0, 10)
      const courId = SignatureId.substring(11, 15)
      const signId = courId + '-' + CourseGrp
      // console.log("data: ", signId)
      const sql = `SELECT Chkattackfile, Chksendscore FROM tbsignature,tbcourseyear WHERE tbcourseyear.SignatureId = tbsignature.SignatureId AND tbcourseyear.Id_file = ? GROUP BY Chksendscore`
      db.query(sql, [signId], (err, result) => {
        if (err) {
          console.log(err)
        }
        // console.log("data: ",result)
        res.status(200).send(result)
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
)

app.listen(app.get('_port'), () =>
  console.log(`app listen on port ${app.get('_port')}`),
)

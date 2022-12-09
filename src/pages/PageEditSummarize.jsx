import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Axios from 'axios'
import { useParams } from 'react-router-dom'

import { toast } from 'react-toastify'

import { showGPA } from '../components/functions/education'

export default function PageEditSummarize() {
  const { PersId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { coursegrp, seminar, AccessRightsId } = location.state
  const id = localStorage.getItem('AccessRights').substring(0, 10)
  const courId = localStorage.getItem('AccessRights').substring(11, 14)

  // console.log(id)
  const [StudentId, setStudentId] = React.useState('')
  const [PersNo, setPersNo] = React.useState('')
  const [Rank, setRank] = React.useState('')
  const [PersFname, setPersFname] = React.useState('')
  const [PersLname, setPersLname] = React.useState('')

  const [subjects, setSubjects] = React.useState([])
  // const [gradesByid, setGradesByid] = React.useState([]);
  const [comment, setComment] = React.useState([])
  const [commentDetail, setcommentDetail] = React.useState('')
  const [setCommentid, setSetCommentid] = React.useState('')

  const initialState = {
    persId: PersId,
    insructorId: id,
    comment: commentDetail,
    courId: courId,
    commentid: setCommentid,
  }

  const [values, setValues] = React.useState(initialState)
  // console.log(values)
  useEffect(() => {
    loadStudent()
    loadSubject()
    loadComment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadStudent = async () => {
    Axios.get(process.env.REACT_APP_API + `/summarize/${AccessRightsId}/${courId}`)
      .then((res) => {
        setStudentId(res.data[0].StudentId)
        setPersNo(res.data[0].PersId)
        setRank(res.data[0].Rank)
        setPersFname(res.data[0].PersFname)
        setPersLname(res.data[0].PersLname)
      })
      .catch((err) => console.log(err))
  }

  const loadSubject = async () => {
    Axios.get(process.env.REACT_APP_API + `/subjects/${courId}/${PersId}`)
      .then((res) => {
        setSubjects(res.data)
        // console.log("data: ",res.data)
      })
      .catch((err) => console.log(err))
  }

  const loadComment = async () => {
    Axios.get(process.env.REACT_APP_API + `/commentbyid/${PersId}/${courId}`)
      .then((res) => {
        setComment(res.data[0])
        setcommentDetail(res.data[0].CommentDetails)
        setSetCommentid(res.data[0].CommentId)
      })
      .catch((err) => console.log(err))
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    Axios.post(process.env.REACT_APP_API + `/comment`, values)
      .then((res) => {
        console.log(res)
        toast.success('บันทึกข้อมูลสำเร็จ')
        navigate('/PageSummarize', {
          state: {
            coursegrp: coursegrp,
            seminar: seminar,
          },
        })
      })
      .catch((err) => {
        //  console.log(err);
        toast.error(err.response.data.error)
      })
  }

  const handleEdit = (e) => {
    e.preventDefault()
    const valuesEdit = {
      // ...values,
      commentid: setCommentid,
      comment: values.comment ? values.comment : commentDetail,
    }
    Axios.put(process.env.REACT_APP_API + `/commentupdate`, valuesEdit)
      .then((res) => {
        console.log(res)
        toast.success('แก้ไขข้อมูลสำเร็จ')
        navigate('/PageSummarize', {
          state: {
            coursegrp: coursegrp,
            seminar: seminar,
          },
        })
      })
      .catch((err) => {
        //  console.log(err);
        toast.error(err.response.data.error)
      })
  }

  const sumGPA = (subjects) => {
    let sum = 0
    for (let i = 0; i < subjects.length; i++) {
      sum += showGPA(subjects[i].Grade)
    }
    return sum
  }

  // console.log(sumGPA(subjects));

  return (
    <React.Fragment>
      <div className="cotainerDetail">
        <p className="HeadTextMain">ผลประเมินความรู้ความสามารถ</p>
        <div className="containerNameStu">
          <p className="HeadTextNameStu">
            เลขประจำตัว นทน. : {StudentId} เลขประจำตัวข้าราชการ : {PersNo} ชื่อ
            : {Rank} {PersFname} {PersLname}
          </p>
        </div>
        <Container>
          <div style={{ height: '80%', width: '100%' }}>
            <TableContainer component={Paper}>
              <Table aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <p className="TextHeadSum">ชื่อหมวดวิชา</p>
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: 'center',
                      }}
                    >
                      <p className="TextHeadSum">ค่าระดับคะแนน</p>
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: 'center',
                      }}
                    >
                      <p className="TextHeadSum">ระดับคะแนนที่ได้</p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjects.length > 0 ? (
                    subjects.map((sub, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          หมวดวิชา {sub.SubjectNr} {sub.SubjectName}
                        </TableCell>
                        <TableCell
                          style={{
                            textAlign: 'center',
                          }}
                        >
                          {sub.Grade}
                        </TableCell>
                        <TableCell
                          style={{
                            textAlign: 'center',
                          }}
                        >
                          {showGPA(sub.Grade)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3}>
                        <p className="HeadTextNameStu">ไม่มีข้อมูลคะแนน</p>
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={1}>เฉลี่ยตลอดหลังสูตร</TableCell>
                    <TableCell
                      style={{
                        textAlign: 'center',
                      }}
                    >
                      {sumGPA(subjects)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <TextField
            id="outlined-multiline-static"
            label="ความคิดเห็นของผู้บังคับบัญชา"
            name="comment"
            defaultValue={
              values.comment === [] ? comment[0].CommentDetails : commentDetail
            }
            onChange={handleChange}
            multiline
            rows={4}
            sx={{ width: '100%' }}
            focused={true}
          />

          <div className="containerBack">
          {commentDetail !== "" ? (
              <Button
                variant="outlined"
                sx={{ minWidth: 200, m: 1 }}
                onClick={handleEdit}
              >
                แก้ไข
              </Button>
            ) : (
              <Button
                variant="outlined"
                sx={{ minWidth: 200, m: 1 }}
                onClick={handleSubmit}
                disabled={!values.comment}
              >
                บันทึก
              </Button>
            )}

            <Link
              to="/PageSummarize"
              state={{
                coursegrp: coursegrp,
                seminar: seminar,
              }}
            >
              <Button variant="outlined" sx={{ minWidth: 200, m: 1 }}>
                ย้อนกลับ
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}


import * as React from 'react'
import { toast } from 'react-toastify'
import Axios from 'axios'

export default function TableclassRoom({
  subject,
  setSubject,
  subjects,
  setListUpdated,
}) {
  const checkStatus = localStorage.getItem('Access')

  const handleDelete = (id, SubjectName) => {
    // const idTokenResult = localStorage.token;
    if (window.confirm('คุณต้องการลบหมวดวิชา ' + SubjectName + ' หรือไม่')) {
      // deleteSubject(idTokenResult, id)
      Axios.get(process.env.REACT_APP_API + `/deletesubject/${id}`)
        .then((res) => {
          toast.success('ลบหมวดวิชาที่สอนสำเร็จ')
        })
        .catch((err) => {
          console.log(err.response)
        })
    }
    setListUpdated(true)
  }

  return (
    <table className="table">
      <thead>
        {checkStatus === 'กรรมวิธี' ? (
          <tr>
            <th>
              <center>ลำดับ</center>
            </th>
            <th>
              <center>หมวดวิชา</center>
            </th>
            <th>
              <center>หลักสูตร</center>
            </th>
            <th>
              <center>การจัดการ</center>
            </th>
          </tr>
        ) : (
          <tr>
            <th>
              <center>ลำดับ</center>
            </th>
            <th>
              <center>หมวดวิชา</center>
            </th>
            <th>
              <center>หลักสูตร</center>
            </th>
          </tr>
        )}
      </thead>
      {checkStatus === 'กรรมวิธี' ? (
        <tbody>
          {subjects.length > 0 ? (
            subjects.map((subject, index) => {
              return (
                <tr key={index}>
                  <td>
                    <center>{index + 1}</center>
                  </td>
                  <td>
                    <center>{subject.SubjectName}</center>
                  </td>
                  <td>
                    <center>{subject.CourseName}</center>
                  </td>
                  <td>
                    <center>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(subject.ClassId, subject.SubjectName)
                        }
                      >
                        Delete
                      </button>
                    </center>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan="4" align="center">
                ไม่มีวิชาที่สอน
              </td>
            </tr>
          )}
        </tbody>
      ) : (
        <tbody>
          {subjects.length > 0 ? (
            subjects.map((subject, index) => {
              return (
                <tr key={index}>
                  <td>
                    <center>{index + 1}</center>
                  </td>
                  <td>
                    <center>{subject.SubjectName}</center>
                  </td>
                  <td>
                    <center>{subject.CourseName}</center>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan="4" align="center">
                ไม่มีวิชาที่สอน
              </td>
            </tr>
          )}
        </tbody>
      )}
    </table>
  )
}

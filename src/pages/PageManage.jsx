// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */

import React from 'react'
import Container from '@mui/material/Container'
import { DataGrid } from '@mui/x-data-grid'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import Switch from '@mui/material/Switch'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'

export default function PageManage() {
  //-----------กรรมวิธี
  //เจ้าหน้าที่
  const columns = [
    {
      field: 'id',
      headerAlign: 'center',
      headerName: 'ลำดับ',
      width: 60,
      valueGetter: (params) => params.api.getRowIndex(params.row.PerId) + 1,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {cellValues.value}
          </div>
        )
      },
    },
    {
      field: 'PerId',
      headerAlign: 'center',
      headerName: 'เลขประจำตัว',
      width: 130,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {cellValues.value}
          </div>
        )
      },
    },
    {
      field: 'Fullname',
      headerAlign: 'center',
      headerName: 'ยศ ชื่อ สกุล',
      width: 200,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {cellValues.value}
          </div>
        )
      },
    },
    {
      field: 'Approve',
      headerAlign: 'center',
      headerName: 'เข้าถึงสถานศึกษา',
      align: 'center',
      width: 140,
      renderCell: (cellValues) => {
        return (
          <FormControl sx={{ minWidth: 100 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              size="small"
              align="center"
              defaultValue={
                cellValues.row.Approve === 1 ? 'อนุมัติ' : 'ไม่อนุมัติ'
              }
              onChange={(event) => {
                ApprovehandleChange(event, cellValues)
              }}
            >
              <MenuItem value={'อนุมัติ'}>อนุมัติ</MenuItem>
              <MenuItem value={'ไม่อนุมัติ'}>ไม่อนุมัติ</MenuItem>
            </Select>
          </FormControl>
        )
      },
    },
    {
      field: 'EvaluationCenter',
      headerAlign: 'center',
      headerName: 'สิทธิ์วัดผลส่วนกลาง',
      align: 'center',
      width: 140,
      renderCell: (cellValues) => {
        return (
          <FormControl sx={{ minWidth: 100 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              size="small"
              align="center"
              defaultValue={
                cellValues.row.EvaluationCenter === 1 ? 'อนุมัติ' : 'ไม่อนุมัติ'
              }
              onChange={(event) => {
                EvaluationCenterhandleChange(event, cellValues)
              }}
            >
              <MenuItem value={'อนุมัติ'}>อนุมัติ</MenuItem>
              <MenuItem value={'ไม่อนุมัติ'}>ไม่อนุมัติ</MenuItem>
            </Select>
          </FormControl>
        )
      },
    },
    {
      field: 'ProcessCenter',
      headerAlign: 'center',
      headerName: 'สิทธิ์กรรมวิธีส่วนกลาง',
      align: 'center',
      width: 150,
      renderCell: (cellValues) => {
        return (
          <FormControl sx={{ minWidth: 100 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              size="small"
              align="center"
              defaultValue={
                cellValues.row.ProcessCenter === 1 ? 'อนุมัติ' : 'ไม่อนุมัติ'
              }
              onChange={(event) => {
                ProcessCenterhandleChange(event, cellValues)
              }}
            >
              <MenuItem value={'อนุมัติ'}>อนุมัติ</MenuItem>
              <MenuItem value={'ไม่อนุมัติ'}>ไม่อนุมัติ</MenuItem>
            </Select>
          </FormControl>
        )
      },
    },
    {
      field: 'Director',
      headerAlign: 'center',
      headerName: 'สิทธิ์ผอ.',
      align: 'center',
      width: 120,
      renderCell: (cellValues) => {
        return (
          <FormControl sx={{ minWidth: 110 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              size="small"
              align="center"
              defaultValue={
                cellValues.row.Director === 1 ? 'อนุมัติ' : 'ไม่อนุมัติ'
              }
              onChange={(event) => {
                DirectorhandleChange(event, cellValues)
              }}
            >
              <MenuItem value={'อนุมัติ'}>อนุมัติ</MenuItem>
              <MenuItem value={'ไม่อนุมัติ'}>ไม่อนุมัติ</MenuItem>
            </Select>
          </FormControl>
        )
      },
    },
    {
      field: 'Process',
      headerAlign: 'center',
      headerName: 'สิทธิ์กรรมวิธี',
      align: 'center',
      width: 120,
      renderCell: (cellValues) => {
        return (
          <FormControl sx={{ minWidth: 110 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              size="small"
              align="center"
              defaultValue={
                cellValues.row.Process === 1 ? 'อนุมัติ' : 'ไม่อนุมัติ'
              }
              onChange={(event) => {
                ProcesshandleChange(event, cellValues)
              }}
            >
              <MenuItem value={'อนุมัติ'}>อนุมัติ</MenuItem>
              <MenuItem value={'ไม่อนุมัติ'}>ไม่อนุมัติ</MenuItem>
            </Select>
          </FormControl>
        )
      },
    },
    {
      field: 'Evaluation',
      headerAlign: 'center',
      headerName: 'สิทธิ์วัดผล',
      align: 'center',
      width: 120,
      renderCell: (cellValues) => {
        return (
          <FormControl sx={{ minWidth: 110 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              size="small"
              align="center"
              defaultValue={
                cellValues.row.Evaluation === 1 ? 'อนุมัติ' : 'ไม่อนุมัติ'
              }
              onChange={(event) => {
                EvaluationhandleChange(event, cellValues)
              }}
            >
              <MenuItem value={'อนุมัติ'}>อนุมัติ</MenuItem>
              <MenuItem value={'ไม่อนุมัติ'}>ไม่อนุมัติ</MenuItem>
            </Select>
          </FormControl>
        )
      },
    },
    {
      field: 'Administrative',
      headerAlign: 'center',
      headerName: 'สิทธิ์ปกครอง',
      align: 'center',
      width: 120,
      renderCell: (cellValues) => {
        return (
          <FormControl sx={{ minWidth: 110 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              size="small"
              align="center"
              defaultValue={
                cellValues.row.Administrative === 1 ? 'อนุมัติ' : 'ไม่อนุมัติ'
              }
              onChange={(event) => {
                AdministrativehandleChange(event, cellValues)
              }}
            >
              <MenuItem value={'อนุมัติ'}>อนุมัติ</MenuItem>
              <MenuItem value={'ไม่อนุมัติ'}>ไม่อนุมัติ</MenuItem>
            </Select>
          </FormControl>
        )
      },
    },
    {
      field: 'Professor',
      headerAlign: 'center',
      headerName: 'สิทธิ์อาจารย์',
      align: 'center',
      width: 120,
      renderCell: (cellValues) => {
        return (
          <FormControl sx={{ minWidth: 110 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              size="small"
              align="center"
              defaultValue={
                cellValues.row.Professor === 1 ? 'อนุมัติ' : 'ไม่อนุมัติ'
              }
              onChange={(event) => {
                ProfessorhandleChange(event, cellValues)
              }}
            >
              <MenuItem value={'อนุมัติ'}>อนุมัติ</MenuItem>
              <MenuItem value={'ไม่อนุมัติ'}>ไม่อนุมัติ</MenuItem>
            </Select>
          </FormControl>
        )
      },
    },
    {
      field: 'Student',
      headerAlign: 'center',
      headerName: 'สิทธิ์นทน.',
      align: 'center',
      width: 120,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              color: '#778899',
            }}
          >
            {cellValues.row.Student === 1 ? '--มีสิทธิ์--' : '--ไม่มีสิทธิ์--'}
          </div>
        )
      },
    },
    {
      field: 'AcctStatus',
      headerAlign: 'center',
      headerName: 'สถานะบัญชี',
      width: 120,
      renderCell: (cellValues) => {
        const AcctStatushandleChange = (event, data) => {
          const checked = event.target.checked
          const AccessRightsId = data

          const value = {
            AccessRightsId: AccessRightsId,
            checked: checked,
          }
          // console.log('value จนท: ', value)

          Axios.put(process.env.REACT_APP_API + `/AcctStatus`, value)
            .then((res) => {
              toast.success('ระบบได้ทำการอัพเดทสิทธิ์เรียบร้อยแล้ว')
            })
            .catch((err) => {
              console.log(err.response)
            })
        }
        return (
          <>
            <Switch
              onChange={(event) =>
                AcctStatushandleChange(event, cellValues.row.AccessRightsId)
              }
              checked={cellValues.row.AcctStatus === 'ปกติ' ? true : false}
            />
            {cellValues.row.AcctStatus === 'ปกติ' ? 'ปกติ' : 'ถูกระงับ'}
          </>
        )
      },
    },
  ]
  //นทน.
  const columns1 = [
    {
      field: 'id',
      headerAlign: 'center',
      headerName: 'ลำดับ',
      width: 100,
      valueGetter: (params) => params.api.getRowIndex(params.row.PerId) + 1,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {cellValues.value}
          </div>
        )
      },
    },
    {
      field: 'PerId',
      headerAlign: 'center',
      headerName: 'เลขประจำตัว',
      width: 200,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {cellValues.value}
          </div>
        )
      },
    },
    {
      field: 'Fullname',
      headerAlign: 'center',
      headerName: 'ยศ ชื่อ สกุล',
      width: 300,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {cellValues.value}
          </div>
        )
      },
    },
    {
      field: 'Approve',
      headerAlign: 'center',
      headerName: 'เข้าถึงสถานศึกษา',
      align: 'center',
      width: 140,
      renderCell: (cellValues) => {
        return (
          <FormControl sx={{ minWidth: 100 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              size="small"
              align="center"
              defaultValue={
                cellValues.row.Approve === 1 ? 'อนุมัติ' : 'ไม่อนุมัติ'
              }
              onChange={(event) => {
                ApprovehandleChange(event, cellValues)
              }}
            >
              <MenuItem value={'อนุมัติ'}>อนุมัติ</MenuItem>
              <MenuItem value={'ไม่อนุมัติ'}>ไม่อนุมัติ</MenuItem>
            </Select>
          </FormControl>
        )
      },
    },
    {
      field: 'Student',
      headerAlign: 'center',
      headerName: 'สิทธิ์ นทน.',
      align: 'center',
      width: 210,
      renderCell: (cellValues) => {
        return (
          <FormControl sx={{ minWidth: 100 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              size="small"
              align="center"
              defaultValue={
                cellValues.row.Student === 1 ? 'อนุมัติ' : 'ไม่อนุมัติ'
              }
              onChange={(event) => {
                StudenthandleChange(event, cellValues)
              }}
            >
              <MenuItem value={'อนุมัติ'}>อนุมัติ</MenuItem>
              <MenuItem value={'ไม่อนุมัติ'}>ไม่อนุมัติ</MenuItem>
            </Select>
          </FormControl>
        )
      },
    },

    {
      field: 'AcctStatus',
      headerAlign: 'center',
      headerName: 'สถานะบัญชี',
      width: 120,
      renderCell: (cellValues) => {
        const AcctStatushandleChange = (event, data) => {
          const checked = event.target.checked
          const AccessRightsId = data

          const value = {
            AccessRightsId: AccessRightsId,
            checked: checked,
          }
          // console.log("value: ",value);
          // console.log("AcctStatus: ",cellValues.row.AcctStatus);

          Axios.put(process.env.REACT_APP_API + `/AcctStatus`, value)
            .then((res) => {
              toast.success('ระบบได้ทำการอัพเดทสิทธิ์เรียบร้อยแล้ว')
            })
            .catch((err) => {
              console.log(err.response)
            })
        }
        return (
          <>
            <Switch
              onChange={(event) =>
                AcctStatushandleChange(event, cellValues.row.AccessRightsId)
              }
              checked={cellValues.row.AcctStatus === 'ปกติ' ? true : false}
              // checked = {false}
            />
            {cellValues.row.AcctStatus === 'ปกติ' ? 'ปกติ' : 'ถูกระงับ'}
          </>
        )
      },
    },
  ]
  //--------ของส่วนกลาง
  //เจ้าหน้าที่
  const columns2 = [
    {
      field: 'id',
      headerAlign: 'center',
      headerName: 'ลำดับ',
      width: 60,
      valueGetter: (params) => params.api.getRowIndex(params.row.PerId) + 1,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {cellValues.value}
          </div>
        )
      },
    },
    {
      field: 'PerId',
      headerAlign: 'center',
      headerName: 'เลขประจำตัว',
      width: 130,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {cellValues.value}
          </div>
        )
      },
    },
    {
      field: 'Fullname',
      headerAlign: 'center',
      headerName: 'ยศ ชื่อ สกุล',
      width: 200,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {cellValues.value}
          </div>
        )
      },
    },
    {
      field: 'Approve',
      headerAlign: 'center',
      headerName: 'เข้าถึงสถานศึกษา',
      align: 'center',
      width: 140,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              color: '#778899',
            }}
          >
            {cellValues.row.Approve === 1 ? 'มีสิทธิ์' : 'ไม่มีสิทธิ์'}
          </div>
        )
      },
    },
    {
      field: 'EvaluationCenter',
      headerAlign: 'center',
      headerName: 'สิทธิ์วัดผลส่วนกลาง',
      align: 'center',
      width: 140,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              color: '#778899',
            }}
          >
            {cellValues.row.EvaluationCenter === 1 ? 'มีสิทธิ์' : 'ไม่มีสิทธิ์'}
          </div>
        )
      },
    },
    {
      field: 'ProcessCenter',
      headerAlign: 'center',
      headerName: 'สิทธิ์กรรมวิธีส่วนกลาง',
      align: 'center',
      width: 150,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              color: '#778899',
            }}
          >
            {cellValues.row.ProcessCenter === 1 ? 'มีสิทธิ์' : 'ไม่มีสิทธิ์'}
          </div>
        )
      },
    },
    {
      field: 'Director',
      headerAlign: 'center',
      headerName: 'สิทธิ์ผอ.',
      align: 'center',
      width: 120,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              color: '#778899',
            }}
          >
            {cellValues.row.Director === 1 ? 'มีสิทธิ์' : 'ไม่มีสิทธิ์'}
          </div>
        )
      },
    },
    {
      field: 'Process',
      headerAlign: 'center',
      headerName: 'สิทธิ์กรรมวิธี',
      align: 'center',
      width: 120,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              color: '#778899',
            }}
          >
            {cellValues.row.Process === 1 ? 'มีสิทธิ์' : 'ไม่มีสิทธิ์'}
          </div>
        )
      },
    },
    {
      field: 'Evaluation',
      headerAlign: 'center',
      headerName: 'สิทธิ์วัดผล',
      align: 'center',
      width: 120,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              color: '#778899',
            }}
          >
            {cellValues.row.Evaluation === 1 ? 'มีสิทธิ์' : 'ไม่มีสิทธิ์'}
          </div>
        )
      },
    },
    {
      field: 'Administrative',
      headerAlign: 'center',
      headerName: 'สิทธิ์ปกครอง',
      align: 'center',
      width: 120,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              color: '#778899',
            }}
          >
            {cellValues.row.Administrative === 1 ? 'มีสิทธิ์' : 'ไม่มีสิทธิ์'}
          </div>
        )
      },
    },
    {
      field: 'Professor',
      headerAlign: 'center',
      headerName: 'สิทธิ์อาจารย์',
      align: 'center',
      width: 120,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              color: '#778899',
            }}
          >
            {cellValues.row.Professor === 1 ? 'มีสิทธิ์' : 'ไม่มีสิทธิ์'}
          </div>
        )
      },
    },
    {
      field: 'Student',
      headerAlign: 'center',
      headerName: 'สิทธิ์นทน.',
      align: 'center',
      width: 120,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              color: '#778899',
            }}
          >
            {cellValues.row.Student === 1 ? 'มีสิทธิ์' : 'ไม่มีสิทธิ์'}
          </div>
        )
      },
    },
    {
      field: 'AcctStatus',
      headerAlign: 'center',
      headerName: 'สถานะบัญชี',
      width: 120,
      renderCell: (cellValues) => {
        //   const AcctStatushandleChange = (event, data) => {
        //   const checked = event.target.checked
        //   const AccessRightsId = data

        //   const value = {
        //     AccessRightsId: AccessRightsId,
        //     checked: checked,
        //   };

        //   Axios.put(process.env.REACT_APP_API + `/AcctStatus`,value,)
        //   .then(res => {

        //     toast.success("ระบบได้ทำการอัพเดทสิทธิ์เรียบร้อยแล้ว");
        //   })
        //   .catch((err) => {
        //     console.log(err.response);
        //   });
        // }
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              color: '#778899',
            }}
          >
            {cellValues.row.AcctStatus === 'ปกติ' ? 'ปกติ' : 'ถูกระงับ'}
          </div>
        )
      },
    },
  ]
  //นทน.
  const columns3 = [
    {
      field: 'id',
      headerAlign: 'center',
      headerName: 'ลำดับ',
      width: 100,
      valueGetter: (params) => params.api.getRowIndex(params.row.PerId) + 1,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {cellValues.value}
          </div>
        )
      },
    },
    {
      field: 'PerId',
      headerAlign: 'center',
      headerName: 'เลขประจำตัว',
      width: 200,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {cellValues.value}
          </div>
        )
      },
    },
    {
      field: 'Fullname',
      headerAlign: 'center',
      headerName: 'ยศ ชื่อ สกุล',
      width: 300,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {cellValues.value}
          </div>
        )
      },
    },
    {
      field: 'Approve',
      headerAlign: 'center',
      headerName: 'เข้าถึงสถานศึกษา',
      align: 'center',
      width: 140,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              color: '#778899',
            }}
          >
            {cellValues.row.Approve === 1 ? 'มีสิทธิ์' : 'ไม่มีสิทธิ์'}
          </div>
        )
      },
    },
    {
      field: 'Student',
      headerAlign: 'center',
      headerName: 'สิทธิ์ นทน.',
      align: 'center',
      width: 210,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              color: '#778899',
            }}
          >
            {cellValues.row.Student === 1 ? 'มีสิทธิ์' : 'ไม่มีสิทธิ์'}
          </div>
        )
      },
    },

    {
      field: 'AcctStatus',
      headerAlign: 'center',
      headerName: 'สถานะบัญชี',
      width: 120,
      renderCell: (cellValues) => {
        //   const AcctStatushandleChange = (event, data) => {
        //   const checked = event.target.checked
        //   const AccessRightsId = data

        //   const value = {
        //     AccessRightsId: AccessRightsId,
        //     checked: checked,
        //   };
        //   Axios.put(process.env.REACT_APP_API + `/AcctStatus`,value,)
        //   .then(res => {

        //     toast.success("ระบบได้ทำการอัพเดทสิทธิ์เรียบร้อยแล้ว");
        //   })
        //   .catch((err) => {
        //     console.log(err.response);
        //   });
        // }
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              color: '#778899',
            }}
          >
            {cellValues.row.AcctStatus === 'ปกติ' ? 'ปกติ' : 'ถูกระงับ'}
          </div>
        )
      },
    },
  ]

  const [getUser, setGetUser] = useState([])
  const [getUserstu, setGetUserstu] = useState([])
  const AccessRights = localStorage.getItem('AccessRights')
  const Id = AccessRights.substring(11, 14)
  const checkStatus = localStorage.getItem('Access')

  //อัปเดตสิทธิ์วัดผล ส่วนกลาง
  const EvaluationCenterhandleChange = (event, cellValues) => {
    const EvaluationCenter = event.target.value
    const EvaluationCenters = EvaluationCenter === 'อนุมัติ' ? 1 : 0
    const AccessRightsId = cellValues.row.AccessRightsId
    Axios.put(
      process.env.REACT_APP_API +
        `/EvaluationCenter/${AccessRightsId}/${EvaluationCenters}`,
    )
      .then((res) => {
        toast.success('ระบบได้ทำการอัพเดทสิทธิ์เรียบร้อยแล้ว')
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
  //อัปเดตสิทธิ์กรรมวิธี ส่วนกลาง
  const ProcessCenterhandleChange = (event, cellValues) => {
    const ProcessCenter = event.target.value
    const ProcessCenters = ProcessCenter === 'อนุมัติ' ? 1 : 0
    const AccessRightsId = cellValues.row.AccessRightsId
    Axios.put(
      process.env.REACT_APP_API +
        `/ProcessCenter/${AccessRightsId}/${ProcessCenters}`,
    )
      .then((res) => {
        toast.success('ระบบได้ทำการอัพเดทสิทธิ์เรียบร้อยแล้ว')
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
  //อัปเดตสิทธิ์ผอ.
  const DirectorhandleChange = (event, cellValues) => {
    const Director = event.target.value
    const Directors = Director === 'อนุมัติ' ? 1 : 0
    const AccessRightsId = cellValues.row.AccessRightsId
    Axios.put(
      process.env.REACT_APP_API + `/Director/${AccessRightsId}/${Directors}`,
    )
      .then((res) => {
        toast.success('ระบบได้ทำการอัพเดทสิทธิ์เรียบร้อยแล้ว')
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
  //อัปเดตสิทธิ์กรรมวิธี
  const ProcesshandleChange = (event, cellValues) => {
    const Process = event.target.value
    const Processs = Process === 'อนุมัติ' ? 1 : 0
    const AccessRightsId = cellValues.row.AccessRightsId
    Axios.put(
      process.env.REACT_APP_API + `/Process/${AccessRightsId}/${Processs}`,
    )
      .then((res) => {
        toast.success('ระบบได้ทำการอัพเดทสิทธิ์เรียบร้อยแล้ว')
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
  //อัปเดตสิทธิ์วัดผล
  const EvaluationhandleChange = (event, cellValues) => {
    const Evaluation = event.target.value
    const Evaluations = Evaluation === 'อนุมัติ' ? 1 : 0
    const AccessRightsId = cellValues.row.AccessRightsId
    Axios.put(
      process.env.REACT_APP_API +
        `/Evaluation/${AccessRightsId}/${Evaluations}`,
    )
      .then((res) => {
        toast.success('ระบบได้ทำการอัพเดทสิทธิ์เรียบร้อยแล้ว')
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
  //อัปเดตสิทธิ์ปกครอง
  const AdministrativehandleChange = (event, cellValues) => {
    const Administrative = event.target.value
    const Administratives = Administrative === 'อนุมัติ' ? 1 : 0
    const AccessRightsId = cellValues.row.AccessRightsId
    Axios.put(
      process.env.REACT_APP_API +
        `/Administrative/${AccessRightsId}/${Administratives}`,
    )
      .then((res) => {
        toast.success('ระบบได้ทำการอัพเดทสิทธิ์เรียบร้อยแล้ว')
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
  //อัปเดตสิทธิ์อาจารย์ประจำหมวด
  const ProfessorhandleChange = (event, cellValues) => {
    const Professor = event.target.value
    const Professors = Professor === 'อนุมัติ' ? 1 : 0
    const AccessRightsId = cellValues.row.AccessRightsId
    Axios.put(
      process.env.REACT_APP_API + `/Professor/${AccessRightsId}/${Professors}`,
    )
      .then((res) => {
        toast.success('ระบบได้ทำการอัพเดทสิทธิ์เรียบร้อยแล้ว')
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
  //อัปเดตสิทธิ์นทน.
  const StudenthandleChange = (event, cellValues) => {
    const Student = event.target.value
    const Students = Student === 'อนุมัติ' ? 1 : 0
    const AccessRightsId = cellValues.row.AccessRightsId
    Axios.put(
      process.env.REACT_APP_API + `/Student/${AccessRightsId}/${Students}`,
    )
      .then((res) => {
        toast.success('ระบบได้ทำการอัพเดทสิทธิ์เรียบร้อยแล้ว')
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
  //อัปเดตสิทธิ์เข้าถึงการศึกษา
  const ApprovehandleChange = (event, cellValues) => {
    const Approve = event.target.value
    const Approves = Approve === 'อนุมัติ' ? 1 : 0
    const AccessRightsId = cellValues.row.AccessRightsId
    Axios.put(
      process.env.REACT_APP_API + `/Approve/${AccessRightsId}/${Approves}`,
    )
      .then((res) => {
        toast.success('ระบบได้ทำการอัพเดทสิทธิ์เรียบร้อยแล้ว')
      })
      .catch((err) => {
        console.log(err.response)
      })
  }

  //เจ้าหน้าที่
  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/PageManageUser/${Id}`)
      .then((res) => {
        setGetUser(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUser])
  //นทน.
  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + `/PageManageUserstu/${Id}`)
      .then((res) => {
        setGetUserstu(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserstu])

  //ปุ่มจัดการการเข้าถึงสิทธิ์เจ้าหน้าที่
  const [checkedtableinstructor, setcheckedtableinstructor] = useState(false)
  const Btncheckedtableinstructor = () => {
    setcheckedtableinstructor(!checkedtableinstructor)
    setcheckedtableStudent(false)
  }
  //ปุ่มจัดการการเข้าถึงสิทธิ์ นทน.
  const [checkedtableStudent, setcheckedtableStudent] = useState(false)
  const BtncheckedtableStudent = () => {
    setcheckedtableStudent(!checkedtableStudent)
    setcheckedtableinstructor(false)
  }

  return (
    <React.Fragment>
      {checkStatus === 'กรรมวิธี' ? (
        <div className="cotainerDetail">
          <b>
            <p className="HeadTextMain">จัดการสมาชิก</p>
          </b>

          {checkedtableinstructor === true ? (
            <div>
              <Button
                variant="contained"
                sx={{
                  minWidth: 100,
                  m: 1,
                  fontFamily: 'THSarabunNew',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}
                onClick={Btncheckedtableinstructor}
              >
                คลิกเพื่อจัดการการเข้าถึงสิทธิ์เจ้าหน้าที่
              </Button>

              <Button
                variant="outlined"
                sx={{
                  minWidth: 100,
                  m: 1,
                  fontFamily: 'THSarabunNew',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}
                onClick={BtncheckedtableStudent}
              >
                คลิกเพื่อจัดการการเข้าถึงสิทธิ์ นทน.
              </Button>
            </div>
          ) : checkedtableStudent === true ? (
            <div>
              <Button
                variant="outlined"
                sx={{
                  minWidth: 100,
                  m: 1,
                  fontFamily: 'THSarabunNew',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}
                onClick={Btncheckedtableinstructor}
              >
                คลิกเพื่อจัดการการเข้าถึงสิทธิ์เจ้าหน้าที่
              </Button>

              <Button
                variant="contained"
                sx={{
                  minWidth: 100,
                  m: 1,
                  fontFamily: 'THSarabunNew',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}
                onClick={BtncheckedtableStudent}
              >
                คลิกเพื่อจัดการการเข้าถึงสิทธิ์ นทน.
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant="outlined"
                sx={{
                  minWidth: 100,
                  m: 1,
                  fontFamily: 'THSarabunNew',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}
                onClick={Btncheckedtableinstructor}
              >
                คลิกเพื่อจัดการการเข้าถึงสิทธิ์เจ้าหน้าที่
              </Button>

              <Button
                variant="outlined"
                sx={{
                  minWidth: 100,
                  m: 1,
                  fontFamily: 'THSarabunNew',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}
                onClick={BtncheckedtableStudent}
              >
                คลิกเพื่อจัดการการเข้าถึงสิทธิ์ นทน.
              </Button>
            </div>
          )}
          {}

          {checkedtableinstructor === true ? (
            <Container>
              <br></br>
              <center>
                <p className="HeadTextMain">
                  จัดการการเข้าถึงสิทธิ์เจ้าหน้าที่
                </p>
              </center>
              <div style={{ height: 700, width: '100%' }}>
                <DataGrid
                  getRowId={(row) => row.PerId}
                  rows={getUser}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                />
              </div>
              <br></br>
              <center>
                <p>
                  **การให้สิทธิ์ของ นทน. ต้องสมัครสมาชิกสำหรับ นทน.
                  และสามารถอนุมัติสิทธิ์ได้ใน จัดการการเข้าถึงสิทธิ์ นทน.**
                </p>
              </center>
            </Container>
          ) : (
            ''
          )}

          {checkedtableStudent === true ? (
            <Container>
              <br></br>
              <center>
                <p className="HeadTextMain">จัดการการเข้าถึงสิทธิ์ นทน.</p>
              </center>
              <div style={{ height: 700, width: '100%' }}>
                <DataGrid
                  getRowId={(row) => row.PerId}
                  rows={getUserstu}
                  columns={columns1}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                />
              </div>
              <br></br>
              <center>
                <p>
                  **การให้สิทธิ์ของ นทน. ต้องสมัครสมาชิกสำหรับ นทน.
                  และสามารถอนุมัติสิทธิ์ได้ใน จัดการการเข้าถึงสิทธิ์ นทน.**
                </p>
              </center>
            </Container>
          ) : (
            ''
          )}
        </div>
      ) : (
        <div className="cotainerDetail">
          <b>
            <p className="HeadTextMain">จัดการสมาชิก</p>
          </b>

          <div>
            <Button
              variant="outlined"
              sx={{
                minWidth: 100,
                m: 1,
                fontFamily: 'THSarabunNew',
                fontWeight: 'bold',
                fontSize: 15,
              }}
              onClick={Btncheckedtableinstructor}
            >
              คลิกเพื่อจัดการการเข้าถึงสิทธิ์เจ้าหน้าที่
            </Button>

            <Button
              variant="outlined"
              sx={{
                minWidth: 100,
                m: 1,
                fontFamily: 'THSarabunNew',
                fontWeight: 'bold',
                fontSize: 15,
              }}
              onClick={BtncheckedtableStudent}
            >
              คลิกเพื่อจัดการการเข้าถึงสิทธิ์ นทน.
            </Button>
          </div>

          {checkedtableinstructor === true ? (
            <Container>
              <br></br>
              <center>
                <p className="HeadTextMain">
                  จัดการการเข้าถึงสิทธิ์เจ้าหน้าที่
                </p>
              </center>
              <div style={{ height: 700, width: '100%' }}>
                <DataGrid
                  getRowId={(row) => row.PerId}
                  rows={getUser}
                  columns={columns2}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                />
              </div>
              <br></br>
              <center>
                <p>
                  **การให้สิทธิ์ของ นทน. ต้องสมัครสมาชิกสำหรับ นทน.
                  และสามารถอนุมัติสิทธิ์ได้ใน จัดการการเข้าถึงสิทธิ์ นทน.**
                </p>
              </center>
            </Container>
          ) : (
            ''
          )}

          {checkedtableStudent === true ? (
            <Container>
              <br></br>
              <center>
                <p className="HeadTextMain">จัดการการเข้าถึงสิทธิ์ นทน.</p>
              </center>
              <div style={{ height: 700, width: '100%' }}>
                <DataGrid
                  getRowId={(row) => row.PerId}
                  rows={getUserstu}
                  columns={columns3}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                />
              </div>
              <br></br>
              <center>
                <p>
                  **การให้สิทธิ์ของ นทน. ต้องสมัครสมาชิกสำหรับ นทน.
                  และสามารถอนุมัติสิทธิ์ได้ใน จัดการการเข้าถึงสิทธิ์ นทน.**
                </p>
              </center>
            </Container>
          ) : (
            ''
          )}
        </div>
      )}
    </React.Fragment>
  )
}

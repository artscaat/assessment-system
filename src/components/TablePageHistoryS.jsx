/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Print } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useReactToPrint } from "react-to-print";
import HistoryBook from "../components/HistoryBook";

function TablePageHistoryS({ classNo, seminarNo, isSubmit }) {
  const setClass = classNo;
  const setSeminar = seminarNo;
  const AccessRights = localStorage.getItem("AccessRights");
  const CourseId = AccessRights.substring(11, 15);
  // const CourseId = Id[0];
  const Access = localStorage.getItem("Access");
  // console.log(CourseId);
  const [selected, setSelected] = useState([]);
  // console.log(selected)
  useEffect(() => {
    if (isSubmit) {
      Axios.get(
        process.env.REACT_APP_API + `/result/course/${setClass}/seminar/${setSeminar}/${CourseId}`
      )
        .then((res) => {
          setSelected(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);

  const columns = [
    {
      field: "id",
      headerName: "ลำดับ",
      width: 80,
      align: "center",
      valueGetter: (params) => params.api.getRowIndex(params.row.PerId) + 1,
    },
    {
      field: "PerId",
      headerName: "เลขประจำตัว",
      width: 120,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {cellValues.value}
          </div>
        );
      },
    },
    {
      field: "StudentId",
      headerName: "เลขประจำตัว นทน.",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {cellValues.value}
          </div>
        );
      },
    },
    {
      field: "Rank",
      headerName: "ยศ",
      width: 100,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {cellValues.value}
          </div>
        );
      },
    },
    {
      field: "PersFname",
      headerName: "ชื่อ",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {cellValues.value}
          </div>
        );
      },
    },
    {
      field: "PersLname",
      headerName: "นามสกุล",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {cellValues.value}
          </div>
        );
      },
    },
    {
      field: "PersCorps",
      headerName: "เหล่า",
      width: 100,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {cellValues.value}
          </div>
        );
      },
    },
    {
      field: "PersGrp",
      headerName: "จำพวก",
      width: 120,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {cellValues.value}
          </div>
        );
      },
    },
    {
      field: "PersDutyNum",
      headerName: "ลชทอ.",
      width: 100,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {cellValues.value}
          </div>
        );
      },
    },
    {
      field: "PersCurrPosition",
      headerName: "ตำแหน่ง",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {cellValues.value}
          </div>
        );
      },
    },
    {
      field: "PersAffiliation",
      headerName: "สังกัด",
      width: 120,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {cellValues.value}
          </div>
        );
      },
    },
    {
      field: "print",
      headerName: "พิมพ์",
      width: 70,
      renderCell: (params) => {
        // console.log(params)
        return (
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {/* <div ref={componentRef} >
                          <h1>Employee data</h1>
                    </div> */}
            <HistoryBook Data={params} />

            {/* <Print  onClick={handlePrint} /> */}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName:
        Access === "อาจารย์ประจำหมวดวิชา"
          ? ""
          : Access === "ปกครอง"
          ? ""
          : Access === "ผอ."
          ? ""
          : Access === "วัดผลส่วนกลาง"
          ? ""
          : "การจัดการ",
      width: 150,
      renderCell: (cellValues) => {
       
        return (
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {Access === "อาจารย์ประจำหมวดวิชา" ? (
              ""
            ) : Access === "ปกครอง" ? (
              ""
            ) : Access === "ผอ." ? (
              ""
            ) : Access === "วัดผลส่วนกลาง" ? (
              ""
            ) : (
            
              <Link
              to={`/PageEditHistoryS/${cellValues.row.AccessRightsId}`}
              state={{
                coursegrp: cellValues.row.CourseGrp,
                seminar: cellValues.row.Seminar,
              }}
            >
                <button
                  className="userListEdit"
                  onClick={(event) => {
                    handleClick(event, cellValues);
                  }}
                >
                  Edit
                </button>
              </Link>
            )}
          </div>
        );
      },
    },
  ];

  // เรียกข้อมูล

  const [studentList, setStudentList] = useState([]);

  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const handleClick = (event, cellValues) => {
    // console.log(cellValues.row);
  };

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API +"/PageHistoyrS")
      .then((res) => {
        setStudentList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // console.log(studentList)

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        getRowId={(row) => row.PerId}
        rows={selected}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        onCellClick={handleCellClick}
        onRowClick={handleRowClick}
      />
    </div>
  );
}

export default TablePageHistoryS;

/* eslint-disable no-unused-vars */
import React, { forwardRef, Fragment, useEffect, useRef, useState } from "react";
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { IconButton, Button } from '@mui/material';
import { useReactToPrint } from "react-to-print";
import axios from 'axios';

/*------------- Style for Table -----------*/
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontSize: 18,
        fontWeight: 'bold',
        //backgroundColor: theme.palette.common.black,
        //color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        //fontSize: 18,
        fontWeight: 'bold',
    },
}));

/*------------- Function Component to be called by ToPrintPageEditInsertScore -----------*/
const ComponentToPrint = forwardRef((props, ref) => {
    const { dataToPrint } = props;

    // console.log('dataToPrint ', dataToPrint);

    const changeDateToThaiFormat = (curr_date) => {
        const th_month = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
            'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
        const datearr = curr_date.split('-');
        let year = (parseInt(datearr[0]) + 543).toString().substring(2, 4);
        let month = th_month[parseInt(datearr[1]) - 1];
        let curr_thdate = parseInt(datearr[2]).toString() + ' ' + month + year;
        return curr_thdate;
    };

    const [rows, setRows] = useState([]);
    useEffect(() => {
        const fetchdata = async (data) => {
            let list = await axios.get(process.env.REACT_APP_API + `/PageEditInsertScore/courseid/${data.courseid}/persid/${data.persid}`);
            setRows(list.data);
            // console.log("data:", list.data)
        }
        fetchdata(dataToPrint);
    }, [dataToPrint])

    return (
        <div ref={ref} >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={3} align='center'>
                            <div style={{ fontSize: 24, fontWeight: 'bold' }}>
                                รายงานชั่วโมงการศึกษาและคะแนนความประพฤติรายบุคคล
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align='right'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                เลขประจำตัว นทน. :&ensp;{dataToPrint.studentid}
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                เลขประจำตัวข้าราชการ :&ensp;{dataToPrint.persid}
                            </div>
                        </TableCell>
                        <TableCell align='left'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                ชื่อ :&ensp;{dataToPrint.studentname}
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {/*------------------ สรุปชั่วโมงการศึกษา -----------------*/}
            <hr />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={6} align='center'>
                            <div style={{ fontSize: 18, fontWeight: 'bold' }}>
                                สรุปชั่วโมงการศึกษารายบุคคล
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                ระยะเวลาการศึกษา
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                จำนวนชั่วโมงลากิจ
                            </div>
                        </TableCell >
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                จำนวนชั่วโมงลาป่วย
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                รวมเวลามาเรียน
                            </div>
                        </TableCell >
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                ร้อยละเวลามาเรียน
                            </div>
                        </TableCell >
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                คะแนนความประพฤติ
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12 }}>
                                {dataToPrint.studyperiod}
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12 }}>
                                {dataToPrint.hoursofleave}
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12 }}>
                                {dataToPrint.hoursofsickleave}
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12 }}>
                                {dataToPrint.totaltimestudy}
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12 }}>
                                {dataToPrint.percentagestudy}
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12 }}>
                                {dataToPrint.conductscore}
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={6} align='right'>
                            <div style={{ fontSize: 16, fontWeight: 'bold' }}>
                                สถานะ : &ensp;
                                {
                                    Number(dataToPrint.percentagestudy) >= 80 ? 'ผ่าน' : 'ไม่ผ่าน'
                                }
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {/*------------------ ประวัติการลา -----------------*/}
            <hr />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={8} align='center'>
                            <div style={{ fontSize: 18, fontWeight: 'bold' }}>
                                ประวัติการลารายบุคคล
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                ลำดับ
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                วันเริ่มต้นลา
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                เวลาเริ่มต้นลา
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                วันสิ้นสุดการลา
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                เวลาสิ้นสุดการลา
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                จำนวนชั่วโมงลา
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                ประเภทการลา
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                ผู้ลงบันทึกการลา
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((e, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {parseInt(i) + 1}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {changeDateToThaiFormat(e.BeginLeaveDate)}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.BeginLeaveTime}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {changeDateToThaiFormat(e.EndLeaveDate)}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.EndLeaveTime}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.LeaveHrs}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {(e.LeaveType === 'B') ? 'ลากิจ' : 'ลาป่วย'}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12, whiteSpace: 'nowrap' }}>
                                            {
                                                e.tbaccessrights[0].Rank + ' ' +
                                                e.tbaccessrights[0].PersFname + ' ' +
                                                e.tbaccessrights[0].PersLname
                                            }
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </div>
    );
});

/*------------- Function Component to be called as child component -----------*/
const ToPrintPageEditInsertScore = (props) => {
    const { toprint } = props;
    // console.log('toprint ', toprint);
    const componentRef = useRef();

    const marginTop = '1cm';
    const marginRight = '0.5cm';
    const marginBottom = '1cm';
    const marginLeft = '0.5cm';

    const getPageMargin = () => {
        return (`
            @page {
                size: A4 landscape;
                margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important;
            }
        `);
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: getPageMargin()
    });

    /*------------------ updated on 24.09.2022 -------------------*/
    return (
        <Fragment>
            <div style={{ display: 'none' }}>
                <ComponentToPrint ref={componentRef} dataToPrint={toprint} />
            </div>
            <Button
                variant={'contained'}
                startIcon={<LocalPrintshopIcon/>}
                sx={{
                    minWidth: 100,
                    minHeight: 55,
                    m: 1,
                    fontFamily: 'THSarabunNew',
                    fontWeight: 'bold',
                    fontSize: 16,
                }}
                onClick={
                    handlePrint
                }
            >
                พิมพ์
            </Button>
            {/*<IconButton 
                onClick={ 
                    handlePrint
                }
            >
                <LocalPrintshopIcon sx={{ color: '#3A9CFE' }}/>
            </IconButton>*/}
        </Fragment>

    );
}

export default ToPrintPageEditInsertScore;
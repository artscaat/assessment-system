/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { forwardRef, Fragment, useEffect, useRef, useState } from "react";
// import { styled } from '@mui/material/styles';
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { Grid, Button, Box } from '@mui/material';
import { useReactToPrint } from "react-to-print";

/*------------- Style for Table -----------*/
/*const StyledTableCell = styled(TableCell)(({ theme }) => ({
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
}));*/

const gradegrptype = [
    /*------- 0 :: 051 : หลักสูตรนายทหารชั้นผู้บังคับหมวด --------*/
    {
        '--': 'รอลงคะแนน',
        'A': 'ดีมาก',
        'A-': 'ค่อนข้างดีมาก',
        'B+': 'ดีปานกลาง',
        'B': 'ดี',
        'B-': 'ค่อนข้างดี',
        'C+': 'ปานกลาง',
        'C': 'พอใช้',
        'C-': 'ค่อนข้างพอใช้',
        'D+': 'ควรปรับปรุง',
        'D': 'ผ่านเกณฑ์',
        'F': 'ไม่ผ่านเกณฑ์',
        'P': 'ผ่าน',
        'U': 'ไม่ผ่าน'
    },
    /*------- 1 :: 073 : หลักสูตรครูการบินเพื่อฝึกศิษย์การบิน --------*/
    {
        '--': 'รอลงคะแนน',
        'P': 'ผ่าน',
        'U': 'ไม่ผ่าน'
    },
    /*------- 2 :: หลักสูตรทั่วไป --------*/
    {
        '--': 'รอลงคะแนน',
        'A': 'ดีมาก',
        'B+': 'ค่อนข้างดีมาก',
        'B': 'ดี',
        'C+': 'ค่อนข้างดี',
        'C': 'พอใช้',
        'D+': 'ค่อนข้างพอใช้',
        'D': 'ควรปรับปรุง',
        'F': 'ไม่ผ่านเกณฑ์',
        'P': 'ผ่าน',
        'U': 'ไม่ผ่าน'
    },
];

/*------------- Function Component to be called by ToPrintPageInsertScore -----------*/
const ComponentToPrint = forwardRef((props, ref) => {
    const { dataToPrint, Func } = props;
    const [rows, setRows] = useState([]);
    const [selgrade, setSelGrade] = useState({});
    const coursenameref = useRef(localStorage.getItem('CourseName'));

    useEffect(() => {
        selectGradeForEachCourse();
        setRows(dataToPrint.Func());
    }, [props]);


    const selectGradeForEachCourse = () => {
        switch (dataToPrint.dataToPrint.subject.split('-')[0]) {
            case '041': //หลักสูตรนายทหารชั้นผู้บังคับหมวด 
                setSelGrade(gradegrptype[0]);
                break;
            case '073': //หลักสูตรครูการบินเพื่อฝึกศิษย์การบิน
                setSelGrade(gradegrptype[1]);
                break;
            default: //หลักสูตรทั่วไป
                setSelGrade(gradegrptype[2]);
                break;
        }
    };

    return (
        <div ref={ref}>
            <Table
                sx={{
                    [`& .${tableCellClasses.root}`]: {
                        border: 'none'
                    }
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2} align='center'>
                            <div style={{ fontSize: 24, fontWeight: 'bold' }}>
                                รายงานการวัด และประเมินผลการเรียน
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align='center'>
                            {/*<Box display={'flex'}
                                justifyContent={'center'}
                                maxWidth={500}
                            >*/}
                            <Grid container>
                                <Grid item xs={4}>
                                    <Box
                                        display='flex'
                                        justifyContent='flex-end'
                                        sx={{
                                            fontSize: 18,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        หลักสูตร&ensp;{coursenameref.current}
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box
                                        display='flex'
                                        justifyContent='center'
                                        sx={{
                                            fontSize: 18,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        รุ่นที่&ensp;{dataToPrint.dataToPrint.coursegrp}
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box
                                        display='flex'
                                        justifyContent='center'
                                        sx={{
                                            fontSize: 18,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        สัมมนาที่&ensp;{
                                            dataToPrint.dataToPrint.seminar === 0 ?
                                                '--' : dataToPrint.dataToPrint.seminar
                                        }
                                    </Box>
                                </Grid>
                            </Grid>
                            {/*</Box>*/}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Box
                                        display='flex'
                                        justifyContent='center'
                                        sx={{
                                            fontSize: 18,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {dataToPrint.dataToPrint.subjectname}
                                    </Box>
                                </Grid>
                            </Grid>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {/*------------------ สรุปชั่วโมงการศึกษา -----------------*/}
            <hr />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                ลำดับ
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                เลขประจำตัว นทน.
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                ยศ-ชื่อ-สกุล
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                คะแนนเต็ม
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                คะแนนรวม
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                ร้อยละคะแนนรวม
                            </div>
                        </TableCell >
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                ระดับคะแนน
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                สถานะ
                            </div>
                        </TableCell >
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                หมายเหตุ
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
                                            {i + 1}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.studentid}
                                        </div>
                                    </TableCell>
                                    <TableCell align='left'>
                                        <div style={{ fontSize: 12, whiteSpace: 'nowrap' }}>
                                            {e.studentname}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.fullscore}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.subjectscore}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {
                                                isNaN(Number(e.subjectscore / e.fullscore)) ?
                                                    0 : ((e.subjectscore / e.fullscore) * 100).toFixed(2)
                                            }
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {
                                                e.grade.length !== 0 ? e.grade : '--'
                                            }
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {
                                                e.grade.length !== 0 ? selgrade[e.grade] : 'รอลงคะแนน'
                                            }
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12, /*color: '#018822'*/ }}>
                                            {
                                                Number(e.subjectscore) !== 0 && e.grade.length !== 0 ?
                                                'เรียบร้อย' : 'ไม่เรียบร้อย'
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
    ); //end of return
});

/*------------- Function Component to be called as child component -----------*/
const ToPrintPageEstimate = (props) => {
    const { dataToPrint, Func } = props;
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

    /*------- updated on 23.09.2022 -> change button, color and fontweght ----*/
    return (
        <Fragment>
            <div style={{ display: 'none' }}>
                <ComponentToPrint ref={componentRef} dataToPrint={props} />
            </div>
            <Button
                variant={'outlined'}
                startIcon={<LocalPrintshopIcon />}
                sx={{
                    minWidth: 100,
                    minHeight: 50,
                    m: 1,
                    fontFamily: 'THSarabunNew',
                    fontWeight: 'bold',
                    fontSize: 14,
                }}
                onClick={
                    handlePrint
                }
            >
                พิมพ์
            </Button>
        </Fragment>

    );
}

export default ToPrintPageEstimate;
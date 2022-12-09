import React, { forwardRef, Fragment, useEffect, useRef, useState } from "react";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { Grid, Button, Box } from '@mui/material';
import { useReactToPrint } from "react-to-print";


/*------------- Function Component to be called by ToPrintPageInsertScore -----------*/
const ComponentToPrint = forwardRef((props, ref) => {
    const { dataToPrint } = props;
    const [ rows, setRows ] = useState([]);
    const coursenameref = useRef(localStorage.getItem('CourseName'));

    useEffect(() => {
        setRows(dataToPrint.Func());
    }, [props]);

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
                                รายงานการวัด และประเมินคุณลักษณะส่วนบุคคล
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align='center'>
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
                                        รุ่นที่&ensp;{dataToPrint.grpAndSem.coursegrp}
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
                                            dataToPrint.grpAndSem.seminar === 0 ?
                                                '--' : dataToPrint.grpAndSem.seminar
                                        }
                                    </Box>
                                </Grid>
                            </Grid>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {/*------------------ สรุปผลการประเมินคุณลักษณะส่วนบุคคล -----------------*/}
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
                                คะแนนรวมที่ได้
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                คะแนนรวมเฉลี่ย
                            </div>
                        </TableCell >
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
                                    {/*------- ลำดับ -----------*/}
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {i + 1}
                                        </div>
                                    </TableCell>
                                    {/*------- เลขประจำตัว นทน. -----------*/}
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.studentid}
                                        </div>
                                    </TableCell>
                                    {/*------- ยศ-ชื่อ-สกุล -----------*/}
                                    <TableCell align='left'>
                                        <div style={{ fontSize: 12, whiteSpace: 'nowrap' }}>
                                            {e.name}
                                        </div>
                                    </TableCell>
                                    {/*------- รวมคะแนนเต็ม -----------*/}
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.fullscore}
                                        </div>
                                    </TableCell>
                                    {/*------- รวมคะแนนที่ได้ -----------*/}
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.score}
                                        </div>
                                    </TableCell>
                                    {/*------- คะแนนเฉลี่ย -----------*/}
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.averagescore}
                                        </div>
                                    </TableCell>
                                    {/*------- สถานะ ---------*/}
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.status ? 'ผ่าน' : 'ไม่ผ่าน'}
                                        </div>
                                    </TableCell>
                                    {/*------- หมายเหตุ ---------*/}
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.note ? 'เรียบร้อยแล้ว' : 'รอลงคะแนน'}
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
const ToPrintPageAttrbute = (props) => {
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

export default ToPrintPageAttrbute;
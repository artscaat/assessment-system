/* eslint-disable no-unused-vars */
import React, { forwardRef, Fragment, useEffect, useRef, useState } from "react";
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { IconButton, Box, Button } from '@mui/material';
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

/*------------- Function Component to be called by ToPrintPageInsertScore -----------*/
const ComponentToPrint = forwardRef((props, ref) => {
    const { dataToPrint } = props;
    const [ rows, setRows ] = useState([]);
    const coursenameref = useRef(localStorage.getItem('CourseName')); 

    useEffect(()=>{
        const fetchdata = async () => {
            await axios.get(process.env.REACT_APP_API + `/PageInsertScore/coursegrp/${ dataToPrint.coursegrp }/${ dataToPrint.seminar }/${ dataToPrint.courseid }`)
            .then(list => {
                //console.log('ToPrintPageInsertScore >>> ', list.data);
                setRows(list.data);
            })
            .catch(err => {
                console.log('ToPrintPageInsertScore failed >>> err : ', err);
            });
        }
        if(dataToPrint.coursegrp !== '' && dataToPrint.seminar !== ''){
            fetchdata();
        }
    },[props])
    
    return (
        <div ref={ref}>
        <Table
            sx={{
                [`& .${ tableCellClasses.root }`]: {
                    border: 'none'
                }
            }} 
        >
            <TableHead>
                <TableRow>
                    <TableCell colSpan={2} align='center'>
                        <div style={{ fontSize: 24, fontWeight: 'bold' }}>
                            รายงานชั่วโมงการศึกษาและคะแนนความประพฤติ
                        </div>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={2} align='center'>
                        <div style={{ fontSize: 18, fontWeight: 'bold' }}>
                            หลักสูตร&ensp;{ coursenameref.current }
                        </div>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align='center'>
                        <strong>รุ่นที่</strong>&ensp;{ dataToPrint.coursegrp }  
                    </TableCell>
                    <TableCell align='center'>
                        <strong>สัมมนาที่</strong>&ensp;
                        { dataToPrint.seminar === 0 ? '--' : dataToPrint.seminar }  
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        {/*------------------ สรุปชั่วโมงการศึกษา -----------------*/}
        <hr/>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell colSpan={10} align='center'>
                        <div style={{ fontSize: 18, fontWeight: 'bold' }}>
                            สรุปชั่วโมงการศึกษา
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
                    </TableCell>
                    <TableCell align='center'>
                        <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                            คะแนนความประพฤติ
                        </div>
                    </TableCell>
                    <TableCell align='center'>
                        <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                            สถานะ
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
                                        { e.id }
                                    </div>
                                </TableCell>
                                <TableCell align='center'>
                                    <div style={{ fontSize: 12 }}>
                                        { e.studentid }
                                    </div>
                                </TableCell>
                                <TableCell align='left'>
                                    <div style={{ fontSize: 12, whiteSpace: 'nowrap' }}>
                                        { e.studentname }
                                    </div>
                                </TableCell>
                                <TableCell align='center'>
                                    <div style={{ fontSize: 12 }}>
                                        { e.period }
                                    </div>
                                </TableCell>
                                <TableCell align='center'>
                                    <div style={{ fontSize: 12 }}>
                                        { e.businessleave }
                                    </div>
                                </TableCell >
                                <TableCell align='center'>
                                    <div style={{ fontSize: 12 }}>
                                        { e.sickleave }
                                    </div>
                                </TableCell>
                                <TableCell align='center'>
                                    <div style={{ fontSize: 12 }}>
                                        { e.sumattendhrs }
                                    </div>
                                </TableCell >
                                <TableCell align='center'>
                                    <div style={{ fontSize: 12 }}>
                                        { e.percentattendhrs }
                                    </div>
                                </TableCell>
                                <TableCell align='center'>
                                    <div style={{ fontSize: 12 }}>
                                        { e.conductscore }
                                    </div>
                                </TableCell>
                                <TableCell align='center'>
                                    {
                                        Number(e.percentattendhrs) >= 80 ?
                                        <div style={{ fontSize: 12, color: '#018822' }}>
                                            ผ่าน
                                        </div> :
                                        <div style={{ fontSize: 12, color: '#A50000' }}>
                                            ไม่ผ่าน
                                        </div>
                                    }
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
const ToPrintPageInsertScore = (props) => {
    const { dataToPrint } = props;
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
    return(
        <Fragment>
            <div style={{ display: 'none' }}>
                <ComponentToPrint ref={ componentRef } dataToPrint={ dataToPrint }/>
            </div>
            {/*<IconButton onClick={ 
                handlePrint
            }>
                <LocalPrintshopIcon sx={{ color: '#3A9CFE' }} />
            </IconButton>*/}
            <Button 
                variant={'contained'} 
                startIcon={ <LocalPrintshopIcon/> }
                sx={{
                    minWidth: 100, 
                    minHeight: 55, 
                    m:1,
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
        </Fragment>

    );
}

export default ToPrintPageInsertScore;
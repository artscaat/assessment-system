import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Grid, Box } from '@mui/material';
import { useReactToPrint } from "react-to-print";

let title = [
    'ด้านที่ 1 ความวิริยะอุตสาหะ', 'ด้านที่ 2 วินัย', 'ด้านที่ 3 ความประพฤติ',
    'ด้านที่ 4 บุคลิกลักษณะ', 'ด้านที่ 5 นิสัยและอุปนิสัย', 'ด้านที่ 6 การสังคม',
    'ด้านที่ 7 ความเป็นผู้นำ', 'ด้านที่ 8 เชาว์ริเริ่ม', 'ด้านที่ 9 การปฏิบัติงาน',
    'ด้านที่ 10 ดุลยพินิจ'
];

/*------------- Function Component to be called by ToPrintPageInsertScore -----------*/
const ToPrintIndvPageAttrbute = forwardRef((props, ref) => {
    const marginTop = '1cm';
    const marginRight = '0.5cm';
    const marginBottom = '1cm';
    const marginLeft = '0.5cm';

    const getPageMargin = () => {
        return (`
            @page {
                size: A4;
                margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important;
            }
        `);
    };

    const componentRef = useRef();
    const coursenameref = useRef(localStorage.getItem('CourseName'));

    const handleprint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: getPageMargin()
    })

    useImperativeHandle(ref, () => ({ handleprint }));

    return (
        <div style={{ display: 'none' }}>
            <div ref={componentRef}>
                <Table
                    sx={{
                        [`& .${tableCellClasses.root}`]: {
                            border: 'none'
                        }
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>
                                <div style={{ fontSize: 16, fontWeight: 'bold' }}>
                                    รายงานการประเมินผลคุณลักษณะส่วนบุคคล
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='center'>
                                <div style={{ fontSize: 14, fontWeight: 'bold' }}>
                                    หลักสูตร&ensp;{coursenameref.current}
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
                                                fontSize: 12,
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            เลขประจำตัว นทน.:&ensp;{props.dataToPrint[0]?.studid}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box
                                            display='flex'
                                            justifyContent='center'
                                            sx={{
                                                fontSize: 12,
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            เลขประจำตัวข้าราชการ :&ensp;{props.dataToPrint[0]?.persid}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box
                                            display='flex'
                                            justifyContent='center'
                                            sx={{
                                                fontSize: 12,
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            ชื่อ :&ensp;{props.dataToPrint[0]?.name}
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
                                    คุณลักษณะส่วนบุคคล
                                </div>
                            </TableCell>
                            <TableCell align='center'>
                                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                    คะแนนเต็ม
                                </div>
                            </TableCell>
                            <TableCell align='center'>
                                <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                    คะแนนที่ได้
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.dataToPrint[0]?.score.map((e, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell align='left'>
                                            <div style={{ fontSize: 12 }}>
                                                {title[i]}
                                            </div>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <div style={{ fontSize: 12 }}>
                                                {
                                                    Number(
                                                        JSON.parse(
                                                            localStorage.getItem('datastorage')
                                                        )[0].fullscore / title.length
                                                    )
                                                }
                                            </div>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <div style={{ fontSize: 12 }}>
                                                {
                                                    e.score
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
        </div>
    ); //end of return
});

export default ToPrintIndvPageAttrbute;

/*------------- Function Component to be called as child component -----------*/
/*const ToPrintIndvPageAttrbute = (props) => {
    const componentRef = useRef();

    const marginTop = '1cm';
    const marginRight = '0.5cm';
    const marginBottom = '1cm';
    const marginLeft = '0.5cm';

    const getPageMargin = () => {
        return (`
            @page {
                size: A4;
                margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important;
            }
        `);
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: getPageMargin()
    });

    return (
        <div style={{ display: 'none' }}>
            <ComponentToPrint ref={componentRef} dataToPrint={props.id} />
        </div>
    );
}

export default ToPrintIndvPageAttrbute;*/
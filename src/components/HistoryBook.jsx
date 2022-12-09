/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React,{useRef,useEffect} from 'react'
import {Print} from '@material-ui/icons';
import {useReactToPrint} from 'react-to-print'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
// import Thitfiftysix from '../img/ArthitFiftysix.jpg'
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Axios from "axios";


// import '../../src/print.css'



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function HistoryBook({Data}) {
  const [open, setOpen] = React.useState(false);
  const [getImage, setgetImage] = React.useState([]);
// console.log(Data)
// console.log(Data.row.email)
const CourseName = localStorage.getItem('CourseName')
const EmailPersonStudent = Data.row.email

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const marginTop = '10cm';
  const marginRight = '0.5cm';
  const marginBottom = '0cm';
  const marginLeft = '0.5cm';

  const getPageMargin = () => {
    return (`
        @page {
            size: A4 portrait;
            margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important;
            height: initial !important;
            overflow: initial !important;
        }
    `);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: 'emp-data',
      pageStyle: getPageMargin(), 
      onAfterPrint: ()=> alert('Print success')
  })

  const getImageApi = () => {
// console.log(EmailPersonStudent)
    Axios.get(`https://otp.rtaf.mi.th/api/gateway/VnJOSTl5ZldBQVBkWnlKc2ZkN3NGhGbnhtNFJTVHUzS3BfWlRvd2/personalPicture/${EmailPersonStudent}/base64`)
      .then((res) => {
        setgetImage(res.data);
        // console.log(res.data)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getImageApi()
  }, []);

  return (
    <div>
       <Print  onClick={handleClickOpen} />
       <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              พิมพ์ประวัติบุคคล
            </Typography>
            <Button variant="contained" onClick={handlePrint} startIcon={<Print />} >Print</Button>
          </Toolbar>
        </AppBar>
        <List>
          <Box sx={{width: '100%',display: 'flex',justifyContent: 'center'}} ref={componentRef}>
          <Box sx={{border: '1px solid #000000',width:'540px' }} >
            <Box sx={{display: 'flex',margin:'10px'}}>
            <Box sx={{display: 'flex',flexDirection: 'column'}}>
              <Box sx={{width: '150px'}}>
                <Typography variant="subtitle1" gutterBottom>
                    หมายเลข: {Data.row.StudentId} 
                </Typography>
              </Box>
              <Box>
                <img className="imgPerson" src={`data:image/jpeg;base64,${getImage.picture_base64}`} alt="" />
              </Box>
            </Box>
<div className="ContainerPrint">
  <Box sx={{display: 'flex',marginLeft:'100px'}}>
      <Box >
          <Typography variant="subtitle1" gutterBottom>
                    ยศ-ชื่อ 
          </Typography>
      </Box>
      <Box sx={{marginLeft:'50px'}}>
          <Typography variant="subtitle1" gutterBottom>
          {Data.row.Rank}  {Data.row.PersFname}  
          </Typography>
      </Box>
      <Box sx={{marginLeft:'50px'}}>
          <Typography variant="subtitle1" gutterBottom>
          {Data.row.PersLname}  
          </Typography>
      </Box>
  </Box>
  {/* <Box sx={{display: 'flex',marginLeft:'300px'}}> 
      <Box>
          <Typography variant="subtitle1" gutterBottom>
              ชื่อเล่น: ทิตย์
          </Typography>
      </Box>
      <Box sx={{marginLeft:'140px'}}>
          <Typography variant="subtitle1" gutterBottom>
              อายุ: ๒๔ ปี
          </Typography>
      </Box>
  </Box> */}
  {/* <Box sx={{display: 'flex',marginLeft:'300px'}}> 
      <Box>
          <Typography variant="subtitle1" gutterBottom>
              ว/ด/ป เกิด ๖ ม.ค. ๒๕๔๑
          </Typography>
      </Box>
      <Box sx={{marginLeft:'50px'}}>
          <Typography variant="subtitle1" gutterBottom>
              บุตร: - คน
          </Typography>
      </Box>
  </Box> */}
  <Box sx={{display: 'flex',marginLeft:'100px'}}> 
      {/* <Box>
          <Typography variant="subtitle1" gutterBottom>
              สถานภาพ: สมรส
          </Typography>
      </Box> */}
        <Box>
          <Typography variant="subtitle1" gutterBottom>
              สังกัด: {Data.row.PersAffiliation}
          </Typography>
      </Box>
      <Box sx={{marginLeft:'50px'}}>
          <Typography variant="subtitle1" gutterBottom>
              เหล่า: {Data.row.PersCorps}
          </Typography>
      </Box>
  </Box>
  {/* <Box sx={{display: 'flex',marginLeft:'300px'}}> 
      <Box>
          <Typography variant="subtitle1" gutterBottom>
              สังกัด: {Data.row.PersAffiliation}
          </Typography>
      </Box>
      
  </Box> */}
  <Box sx={{display: 'flex',marginLeft:'100px'}}> 
      <Box>
          <Typography variant="subtitle1" gutterBottom>
              หลักสูตร: {CourseName}
          </Typography>
      </Box>
      
  </Box>
  <Box sx={{display: 'flex',marginLeft:'100px'}}> 
  <Box>
          <Typography variant="subtitle1" gutterBottom>
              ตำแหน่ง: {Data.row.PersCurrPosition}
          </Typography>
    </Box>
      
  </Box>
  <Box sx={{display: 'flex',marginLeft:'100px'}}> 
    <Box>
          <Typography variant="subtitle1" gutterBottom>
              e-mail: {Data.row.email}@rtaf.mi.th
          </Typography>
    </Box>
      
  </Box>
</div>

            </Box>
            <Box sx={{display: 'flex',flexDirection: 'column',margin:'10px'}}>
    {/* <Box>
          <Typography variant="subtitle1" gutterBottom>
              ตำแหน่ง: {Data.row.PersCurrPosition}
          </Typography>
    </Box> */}
    {/* <Box>
          <Typography variant="subtitle1" gutterBottom>
              การศึกษาสูงสุด: ตรี
          </Typography>
    </Box> */}
    {/* <Box>
          <Typography variant="subtitle1" gutterBottom>
              e-mail: {Data.row.email}@rtaf.mi.th
          </Typography>
    </Box> */}
    {/* <Box sx={{display: 'flex'}}>
      <Box>
          <Typography variant="subtitle1" gutterBottom>
              โทรทำงาน: ๒๘๔๔๖
          </Typography>
      </Box>
      <Box sx={{marginLeft:'50px'}}>
          <Typography variant="subtitle1" gutterBottom>
              โทรมือถือ: ๐๘๖-๐๒๕๖๐๑๕
          </Typography>
      </Box>
    </Box> */}
    {/* <Box>
          <Typography variant="subtitle1" gutterBottom>
              ติดต่อฉุกเฉิน: ร.ต.เก่งกาจ หาญกล้า
          </Typography>
    </Box> */}
    {/* <Box>
          <Typography variant="subtitle1" gutterBottom>
              โทร(ฉุกเฉิน): ๐๘๙-๙๙๙๙๙๙๙
          </Typography>
    </Box> */}
    {/* <Box>
          <Typography variant="subtitle1" gutterBottom>
              คติประจำใจ: เหนื่อยอาบน้ำก็หาย
          </Typography>
    </Box> */}
</Box>
          </Box>
          </Box>
        
         
        </List>
      </Dialog>
    </div>
  )
}

export default HistoryBook
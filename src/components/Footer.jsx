import React from 'react';
import Box from '@material-ui/core/Box'
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';

export default function Footer() {
   
  return(
    <React.Fragment>
        <Box sx={{backgroundColor: '#F2F2F7',width: '100%',height: '150px'}}>
          <Box sx={{display: 'flex',flexDirection:'column',alignItems: 'center'}}> 
          <Box sx={{fontWeight:'bold',marginTop:'40px'}}>
            
              <p>ติดต่อสอบถาม</p>
        
          </Box>
          <Box sx={{fontWeight:'bold',fontSize:'12px'}}>
              <p><PhoneForwardedIcon sx={{fontSize:'14px'}} /> กรมยุทธศึกษาทหารอากาศ โทร 2-5777</p>
            </Box>
            <Box sx={{fontWeight:'bold',fontSize:'10px'}}>
              <p>Version 0.0.1</p>    
            </Box>
            </Box>
        </Box>
    </React.Fragment>

  );
}

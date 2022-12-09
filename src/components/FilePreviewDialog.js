/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';

const FilePreviewDialogBox = (props) => {
    const { title, previewfile, openDialog, setOpenDialog } = props;

    useEffect(async () => {
        await axios.get(process.env.REACT_APP_API + '/PageEditInsertScore/previewfilepath', {
            params: { 'filepath': previewfile },
            responseType: 'blob'
        }).then((res) => {
            let output = document.getElementById('file-preview');
            output.src = URL.createObjectURL(new Blob([res.data]));
            output.onLoad = () => { 
                // console.log('res.data >>> ', output.src);
                URL.revokeObjectURL(output.src) 
            };
        })
    }, [props]);

    return (
        <Dialog
            maxWidth={200}
            open={openDialog}
        >
            <DialogTitle></DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Container>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box
                                    display={'flex'}
                                    sx={{
                                        height: 40,
                                        fontSize: 28,
                                        fontWeight: 'bold',
                                    }}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                >
                                    {title}
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    display={'flex'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                >
                                    <img
                                        id='file-preview'
                                        style={{
                                            display: 'block',
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    display={'flex'}
                                    justifyContent='center'
                                    alignItems='center'
                                >
                                    <Button
                                        variant='contained'
                                        sx={{
                                            height: 50,
                                            width: 100,
                                            fontFamily: 'THSarabunNew',
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                        }}
                                        onClick={() => {
                                            setOpenDialog(false);
                                        }}
                                    >
                                        ปิด
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </DialogContentText>
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>
    );
}

export default FilePreviewDialogBox;
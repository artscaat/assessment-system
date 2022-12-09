import React from 'react';
import Button from '@mui/material/Button';
import Dialog  from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const ConfirmDialogBox = ( props ) => {
    const { title, content, openDialog, setOpenDialog, setDelFlag } = props;
    return (
        <Dialog maxWidth='xs' open={ openDialog }>
            <DialogTitle>{ title }</DialogTitle>
            <DialogContent>
                <DialogContentText>{ content }</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setOpenDialog(false);
                    setDelFlag(false)
                }}>
                    ไม่ใช่
                </Button>
                <Button onClick={() => {
                    setOpenDialog(false);
                    setDelFlag(true);
                }}>
                    ใช่
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialogBox;
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Comment } from "@material-ui/icons";
import Axios from 'axios'

import {
    commentByid,
  } from "../components/functions/users";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ModelComment({ persid, name, stdId }) {
  const [open, setOpen] = React.useState(false);

  const [comment, setComment] = React.useState([]);
  const [commentDetail, setcommentDetail] = React.useState("");
  const [instrrank, setInstrrank] = React.useState("");
  const [instrfname, setInstrfname] = React.useState("");
  const [instrlname, setInstrlname] = React.useState("");
  const courIds = localStorage.getItem('AccessRights')
  const courId = courIds.substring(11, 14)

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadComment = async () => {
    // console.log(PersId);
    // commentByid(idTokenResult, persid)
    Axios.get(process.env.REACT_APP_API + `/commentbyidPageSum/${persid}/${courId}`)
      .then((res) => {
        setComment(res.data[0]);
        setcommentDetail(res.data[0].CommentDetails);
        setInstrrank(res.data[0].Rank);
        setInstrfname(res.data[0].PersFname);
        setInstrlname(res.data[0].PersLname);
      })
      .catch((err) => console.log(err));
  };

const instructorName = instrrank +" "+ instrfname + " " + instrlname;

  return (
    <div>
      
      <Comment className="userListComment" onClick={handleOpen} ></Comment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} sx={{
            // textAlign: 'center',
            fontFamily: 'THSarabunNew',
            fontSize: '1.3rem',
            fontWeight: 'bold',
        }}>
        ความคิดเห็นผู้บังคับบัญชา
        </BootstrapDialogTitle>
        <DialogContent dividers
            sx={{
                fontFamily: 'THSarabunNew',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                width: '500px',
            }}
        >
          <Typography gutterBottom
                sx={{
                    fontFamily: 'THSarabunNew',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                }}
          >
           หมายเลข นทน. {stdId} ชื่อ {name}
          </Typography>
          <Typography
          sx={{
            fontFamily: 'THSarabunNew',
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
          >ความคิดเห็น :: </Typography>
          <Typography gutterBottom
            sx={{
                fontFamily: 'THSarabunNew',
                fontSize: '1rem',
                textAlign: 'center',
            }}
          >
            <br/> <p>
                {!commentDetail
                ? <div className="text-danger">ไม่มีความคิดเห็น</div>
                : commentDetail
            }</p>
          </Typography>
          <br />
          <Typography gutterBottom
          sx={{
            fontFamily: 'THSarabunNew',
            fontSize: '1rem',
            fontWeight: 'bold',
            textAlign: 'right',
        }}
          >
            ผู้ลงความคิดเห็น :: {instructorName}
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

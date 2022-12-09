/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { Button, Grid } from '@mui/material';
import axios from 'axios';
import moment from 'moment-timezone';


export default class FileUpload extends Component {
    constructor(props) {
        super(props);
        // console.log('FileUpload this.props >>> ', this.props.data);
        this.state = {
            selectedFile : '',
            fileselectstate : false, 
            filename : '',
        }

        //this.filename = this.createUploadedFilename();
        this.handleFileSelect = this.handleFileSelect.bind(this);
    }

    uploadFileProgress = async () => {
        if (this.state.fileselectstate) {
            const formData = new FormData();
            //formData.append('newfilename', this.state.filename);//rename file
            formData.append('file', this.state.selectedFile);
            // console.log("selectedFile: ", this.state.selectedFile);
            try{
                let res = await axios({
                    method: 'post',
                    url: process.env.REACT_APP_API + '/PageUpdateAndRecordLeave/upload',
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                // console.log('data: ', res.data)
                return res.data;
            } catch(err) {
                console.log('error during uploading file : ', err);
            }
        } else {
            return this.state.filename;
        }
    }

    handleFileSelect = (event) => {
        if( event.target.files[0] !== undefined ) {
            this.setState({ selectedFile : event.target.files[0], 
                            fileselectstate : true,
                            filename : event.target.files[0].name });
            /*--------------------- add :: 25.08.2565 ----------------*/
            this.props.data.func(event.target.files[0].name);
            /*---------------------------------------------------------*/
            let output = document.getElementById('file-preview');
            output.src = URL.createObjectURL(event.target.files[0]);
            output.onLoad = () => { URL.revokeObjectURL(output.src) };
        }else{
            this.setState({ fileselectstate : false });
        }
    }

    async componentDidMount() {
        if (!this.state.fileselectstate && this.props.data._props.location.state.addleave !== 1) {
            let filepath = this.props.data._props.location.state.sel_student.leavedocument;
            filepath = filepath.replace(/\\/g, '/');

            await axios.get(process.env.REACT_APP_API + '/PageUpdateAndRecordLeave/handlefile', {
                params : { 'filepath' : filepath },
                responseType : 'blob'
            }).then((res) => {
                // let f_name = res.headers['content-disposition'].split('filename=')[1]
                // let startpos = f_name.indexOf('"')+1;
                // let lastpos = f_name.lastIndexOf('"');
                // f_name = f_name.substring(startpos, lastpos);
                let f_name = res.config.params.filepath.split('/')[1]
                let output = document.getElementById('file-preview');
                output.src = URL.createObjectURL(new Blob([res.data]));
                this.setState({ selectedFile : output.src,
                                filename : f_name });
                output.onLoad = () => { URL.revokeObjectURL(output.src) };

                /*--------------------- add :: 25.08.2565 ----------------*/
                this.props.data.func(f_name);
                /*---------------------------------------------------------*/
            }).catch((err) => {
                console.log('cannot get file to preview -> err >>> ', err);
            });            
        }
    }
    
    render() {
        return (
            <Fragment>
                <Grid container direction='column'>
                    <Grid item >
                        <label htmlFor='btn-files'>
                            <input 
                                id='btn-files'
                                style={{ display : 'none' }} 
                                type='file'
                                onChange={ this.handleFileSelect }
                            />
                            <Button 
                                component='span' 
                                variant="outlined" 
                                sx={{ width: 260 }}
                            >
                                เลือกไฟล์เอกสารการลา
                            </Button>
                        </label>
                    </Grid>
                    <Grid item style={{ height: '20px' }} />
                    <Grid item >
                        {
                            this.state.selectedFile !== '' ?
                                <li>{`${ this.state.filename }`}</li> :
                                <li>ยังไม่เลือกไฟล์</li>
                        }
                    </Grid>
                    <Grid item style={{ height: '20px' }} />
                    <Grid item >
                        <img 
                            id='file-preview'
                            style={{
                                display: 'block',
                                width: '200px',
                                height: 'auto',
                            }}
                        />
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}


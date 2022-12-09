const  StudyHoursManagement = require('./studyHours');

const path = require('path');
const express = require('express');
const router = express.Router();

const studyhours = new StudyHoursManagement();

router
    .get('/previewfilepath', async (req, res) => {
        let absolutepath = path.resolve(path.join('./', req.query.filepath));
        console.log("absolutepath: " + absolutepath);
        res.download(absolutepath);
    })

    .get('/courseid/:courseid/persid/:persid', async (req, res) => {
        const { courseid, persid } = req.params;
        let studlist = await studyhours.getIndvClassAttendanceByCourseIdPersId(persid, courseid);
        // console.log("data: ", studlist)
        res.send(studlist);
    })

    // .delete('/deleteitems', async (req, res) => {
    //     //console.log('req.body :: ', req.body);
    //     let delsuccess = await studyhours.handleDeleteProcess(req.body);
    //     res.send( delsuccess );
    // })

    .delete('/deleteitems', async (req, res) => {
        let delsuccess = await studyhours.handleDeleteProcess(req.body);
        console.log('delsuccess >> ', delsuccess);
        if(delsuccess) {
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    })


module.exports = router;
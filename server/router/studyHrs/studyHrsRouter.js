const  DropDownListMangement  =  require('../dropdownlist');
const  StudyHoursManagement = require('./studyHours');

let dropdownlist = new DropDownListMangement();
let studyhours = new StudyHoursManagement();

const express = require('express');
const router = express.Router();

router
    .get('/:courId', async (req, res) => {
        const { courId } = req.params;
        let dropdown = await dropdownlist.createSearchDropDownList(courId);
        res.send(dropdown);
    })

    .get('/coursegrp/:coursegrp/:seminar/:courId', async (req, res) => {
        const { courId,coursegrp, seminar } = req.params;
        // console.log("data PageInsert: ",coursegrp, courId, seminar);
        let studlist = await studyhours.getAllStudentClassAttendance(courId, coursegrp, seminar);
        // console.log("data: ", studlist)
        res.send(studlist);
    })

    .put('/lastestscore', async (req, res) => {
        res.send(await studyhours.handleIndvBehaveScore(req.body));
    })

    .put('/recordleavedata', async (req, res) => {
        
    })
module.exports = router;
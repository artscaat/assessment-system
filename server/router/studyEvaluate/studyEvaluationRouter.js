const DropDownListMangement = require('../dropdownlist');
const StudyEvaluationManagement = require('./studyEvaluation');

const path = require('path');
const express = require('express');
const router = express.Router();

let dropdownlist = new DropDownListMangement();
let studyevaluation = new StudyEvaluationManagement();

router
    /*----------- 1.get : handleGradeAndScore -----------------*/
    .get('/CourseGrpSeminar/:course_id', async (req, res) => {
        const { course_id } = req.params;
        let dropdown = await dropdownlist.createSearchDropDownList(course_id);
        res.send(dropdown);
    })

    /*----------- 2.get : SearchCourseSubjectList -----------------*/
    .get('/CourseSubject/:course_id', async (req, res) => {
        const { course_id } = req.params;
        let dropdown = await dropdownlist.createSearchCourseSubjectList(course_id);
        res.send(dropdown);
    })

    /*----------- 3.get : handleGradeAndScore -----------------*/
    .get('/Subject/:subject/CourseGrp/:coursegrp/Seminar/:seminar', async (req, res) => {
        const { subject, coursegrp, seminar } = req.params;
        //console.log('req.params >>> ', req.params);
        let studscorelist = await studyevaluation.newGetScoreSubjIdCourseGrpSem
            (
                subject,
                coursegrp,
                seminar
            );
        studscorelist.sort((a, b) => a.StudentId - b.StudentId);
        //console.log('studscorelist >>> ', studscorelist);
        res.send(studscorelist);
    })

    /*-------- get SubjectId from tbclassroom :: added on 07112022---------------*/
    .get('/accessrightid/:accessrightid', async (req, res) => {
        const { accessrightid } = req.params;
        try {
            let subjidlist = await studyevaluation.getSubjectIdByAccessRightsId(accessrightid);
            res.send(subjidlist);
        } catch (err) {
            console.log('studyevaluationrouter get accessrightid failed err >>> ', err);
        }
    })

    /*----------- put : handleGradeAndScore -----------------*/
    .put('/handleGradeAndScore', async (req, res) => {
        try {
            let ans = await studyevaluation.addOrUpdateGradeAndScore(req.body);
            res.send(ans);
        } catch (err) {
            console.log('handleGradeAndScore failed err >>> ', err);
        };
    })

module.exports = router;
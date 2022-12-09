const  PersAttrScoreManagement = require('./personalattributes');

let persattrscore = new PersAttrScoreManagement();

const express = require('express');
const router = express.Router();

router
.get('/', async (req, res) => {
    let instructorlist = await persattrscore.getInstructorData();
    res.send(instructorlist);
})

.get('/courseid/:courseid/coursegrp/:coursegrp/studentid/:studentid/name/:name', async (req, res) => {
    const { courseid, coursegrp, studentid, name } = req.params;
    let res_courseyear = await persattrscore.getDataFromCourseYearTable(courseid, coursegrp, studentid);
    let res_score = await persattrscore.getIndvPersAttrScore(res_courseyear[0].CourseGrp, res_courseyear[0].Seminar, res_courseyear[0].PersId);
    const [courseyear, score] = await Promise.all([res_courseyear, res_score]);

    let resarr = [];
    let resFormat = {};
    if (score.length > 0) {
        resFormat['persid'] = score[0].persid;
        resFormat['studid'] = score[0].studid;
        resFormat['name'] = score[0].studname;
        resFormat['score'] = score[0].persattrcatscore;
    } else {
        resFormat['persid'] = courseyear[0].PersId;
        resFormat['studid'] = courseyear[0].StudentId;
        resFormat['name'] = name;
        resFormat['score'] = new Array(10).fill().map(() => { return { 'score': 0, 'instructor': {} } });
    }
    resarr.push(resFormat);
    res.send(await Promise.all(resarr));
})

.put('/lastestscore', async (req, res) => {
    res.send(await persattrscore.handlePersAttrScore(req.body));
})

module.exports = router;
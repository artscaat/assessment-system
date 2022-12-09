const PersAttrScoreManagement = require('./personalattributes');
const DropDownListMangement = require('../dropdownlist');

let persattrscore = new PersAttrScoreManagement();
let dropdownlist = new DropDownListMangement();

const express = require('express');
const router = express.Router();

router
    .get('/:courId', async (req, res) => {
        const courId = req.params.courId;
        let dropdown = await dropdownlist.createSearchDropDownList(courId);
        res.send(dropdown);
    })

    .get('/coursegrp/:coursegrp/seminar/:seminar/:courId', async (req, res) => {
        const { coursegrp, seminar, courId } = req.params;
        // console.log("data PageAtt: ",coursegrp, courId, seminar);
        let studlist = await persattrscore.getStudListBySemAndGrp(courId, coursegrp, seminar);
        let obj = JSON.parse(JSON.stringify(studlist));
        let newstudlist = Object.keys(obj).map(async (key) => {
            //console.log(key, obj[key]);
            let _avg_sum = await persattrscore.getPersAttrScoreAvgSum(Object.values(obj[key]).at(0));
            let _tscore = await persattrscore.getPersAttrScoreCat(); //get data from persattrcat
            const [avgSum, tScore] = await Promise.all([_avg_sum, _tscore]);
            let avg = avgSum[0].get({ plain: true }).avg?.toFixed(2);
            let sum = avgSum[0].get({ plain: true }).sum?.toFixed(2);
            let total = tScore[0].get({ plain: true }).total;
            let stud = {};
            stud['id'] = parseInt(key) + 1;
            stud['persid'] = Object.values(obj[key]).at(0);
            stud['studentid'] = Object.values(obj[key]).at(1);
            stud['name'] = Object.values(obj[key]).at(2)[0].Rank +
                Object.values(obj[key]).at(2)[0].PersFname + " " +
                Object.values(obj[key]).at(2)[0].PersLname;
            stud['fullscore'] = parseInt(total);
            stud['score'] = (sum == null) ? 0.0 : sum;
            stud['averagescore'] = (avg == null) ? 0.0 : avg;
            stud['status'] = (avg >= 2.0) ? 1 : 0;
            stud['note'] = (stud['score'] != 0.0) ? 1 : 0;
            return (stud);
        });
        //console.log(await Promise.all(newstudlist));
        res.send(await Promise.all(newstudlist));
    });
module.exports = router;
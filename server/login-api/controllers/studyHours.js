// eslint-disable-next-line strict
'use strict'

const { Op, HasMany } = require('sequelize');
const models = require('../models/index');
const { sequelize } = require("../models/index");
const { PersAttrScoreManagement } = require("../controllers/personalattributes");
const { DateTimeFormatFunc } = require("../function/optional-func");
const path = require('path');
const fs = require('fs');

class StudyHoursManagement extends PersAttrScoreManagement {
    async getEachPMECourseTotalStudyHrs(courseid) {
        let condition = {
            attributes: [
                'CourseTotalHrs'
              ],
            where: {
                'CourseId' : courseid
            }
        };

        let results = JSON.parse(JSON.stringify(await models.tbpmecourse.findAll(condition)));
        return results;
    }

    async getIndvClassAttendance(persid) {
        let condition = {
            attributes: [
                'LeaveHrs',
                'LeaveType',
                'BeginLeaveDate',
                'BeginLeaveTime',
                'EndLeaveDate',
                'EndLeaveTime',
                'filepath'
            ],
            where: {'PersId' : persid }
        };
        
        let results = JSON.parse(JSON.stringify(await models.tbclassattendance.findAll(condition)));
        return results;
    }

    async getIndvClassAttendanceByCourseIdPersId(persid, courseid) {
        let condition = {
            attributes: [
                'ClassAttendId',
                'LeaveHrs',
                'LeaveType',
                'BeginLeaveDate',
                'BeginLeaveTime',
                'EndLeaveDate',
                'EndLeaveTime',
                'filepath',
                'Reason',
                'InstructorId'
            ],
            include:[
                {
                    model: models.tbaccessrights,
                    attributes: [
                        'Rank',
                        'PersFname', 
                        'PersLname', 
                    ],
                    association: new HasMany(models.tbclassattendance, models.tbaccessrights, {foreignKey: {
                        name: 'PersId',
                        allowNull: false
                    }}),
                    required: true,
                    on: {
                        'PersId': { [Op.eq]: sequelize.col('tbclassattendance.InstructorId') },
                    },
                },
            ],
            where: {'ClassAttendId': {
                [Op.like]: '%' + persid + '-' + courseid + '%'
            }}
        };
        
        let results = JSON.parse(JSON.stringify(await models.tbclassattendance.findAll(condition)));
        // console.log("getIndvClass: ",results);
        return results;
    }

    async getIndvBehaveScore(persid, courseid) {
        let condition = {
            attributes: [
                'BehaveScore'
            ],
            include:[
                {
                    model: models.tbaccessrights,
                    attributes: [
                        'Rank',
                        'PersFname', 
                        'PersLname', 
                    ],
                    association: new HasMany(models.tbbehavescore, models.tbaccessrights, {foreignKey: {
                        name: 'PersId',
                        allowNull: false
                    }}),
                    required: true,
                    on: {
                        'PersId': { [Op.eq]: sequelize.col('tbbehavescore.InstructorId') },
                    },
                },
            ],
            where: {'BehaveScoreId': {
                [Op.like]: '%' + persid + '-' + courseid + '%'
            }}
        };

        let results = JSON.parse(JSON.stringify(await models.tbbehavescore.findAll(condition)));
        return results;

    }

    async getAllStudentClassAttendance(courseid, coursegrp, seminar) {        
        let studlist = await this.getStudListBySemAndGrp(courseid, coursegrp, seminar);
        
        const [pmehrs, leavedata, behavescore] = await Promise.all([
            await this.getEachPMECourseTotalStudyHrs( courseid ),
            await Promise.all(Object.keys(studlist).map(async (key) => {
                //return await (this.getIndvClassAttendance( studlist[key].PersId ));
                return await (this.getIndvClassAttendanceByCourseIdPersId( studlist[key].PersId, courseid ));
            })),
            await Promise.all(Object.keys(studlist).map(async (key) => {
                return await (this.getIndvBehaveScore( studlist[key].PersId, courseid ));
            }))
        ]);

        let allstudlist = studlist.map((stud, key) => {
            let tmp = {};
                tmp['id'] = parseInt(key)+1;
                tmp['persid'] = stud.PersId;
                tmp['studentid'] = stud.StudentId;
                tmp['studentname'] = stud.tbregisters[0].Rank+
                                     stud.tbregisters[0].PersFname+" "+
                                     stud.tbregisters[0].PersLname;
                tmp['period'] = pmehrs[0].CourseTotalHrs;
                this.calLeaveHrsEachType(leavedata[key]);
                let totalleave = this.calLeaveHrsEachType(leavedata[key]);
                tmp['businessleave'] = totalleave.sumbusleave;
                tmp['sickleave'] = totalleave.sickleave;
                tmp['sumattendhrs'] = parseFloat(tmp['period']) - (parseFloat(tmp['businessleave']) + parseFloat(tmp['sickleave']));
                tmp['percentattendhrs'] = parseFloat(100*(parseFloat(tmp['sumattendhrs'])/parseFloat(tmp['period']))).toFixed(2);
                tmp['conductscore'] = behavescore[key].length !== 0 ? behavescore[key][0].BehaveScore : 0;
                tmp['remark'] = tmp['conductscore'] !== 0 ? 'เรียบร้อยแล้ว' : 'ยังไม่ได้ใส่คะแนน';
                tmp['coursegrp'] = coursegrp;
                tmp['seminar'] = seminar;
            return tmp;
        });
        
        return allstudlist;
    }

    async getIndvClsAttendToFrontEnd(courseid, coursegrp, seminar, persid) {
        let studlist = await this.getStudListBySemAndGrp(courseid, coursegrp, seminar);
        let persdata = studlist.filter((e) => {return e.PersId === persid});

        const [leavedata/*, behavescore*/] = await Promise.all([
            /*await this.getEachPMECourseTotalStudyHrs( courseid ),
            await this.getIndvClassAttendance( persid ),
            await this.getIndvBehaveScore( persid )*/
            await this.getIndvClassAttendanceByCourseIdPersId( persid, courseid ),
        ]);

        let res_data = [...persdata, ...leavedata];

        return res_data;
    }

    calLeaveHrsEachType( leaverecord ) {
        let sum_bushrs = 0;
        let sum_sickhrs = 0;
        leaverecord.forEach((e) => {
            // eslint-disable-next-line default-case
            switch(e.LeaveType){
                case 'B':
                    sum_bushrs += e.LeaveHrs;
                    break;
                case 'S':
                    sum_sickhrs += e.LeaveHrs;
                    break;
            }
        });
        return {'sumbusleave' : sum_bushrs, 'sickleave' : sum_sickhrs};
    }

    async handleIndvBehaveScore( indv_scoredata ) {
        let res = await this.getIndvBehaveScore(indv_scoredata[0].persid, indv_scoredata[0].CourseId);
        if(res.length !== 0) {
            try {
                await models.tbbehavescore.update(
                {
                    'BehaveScore': indv_scoredata[0].conductscore,
                    'InstructorId': indv_scoredata[0].InstructorId,
                    'Date': DateTimeFormatFunc()
                },
                {
                    where: {'BehaveScoreId': {
                        [Op.like]: '%' + indv_scoredata[0].persid + '-' + indv_scoredata[0].CourseId + '%'
                    }}
                });
                return 'updated';
            } catch(err) {
                console.log(err);
            }
        }else{
            try {
                await models.tbbehavescore.create(
                {
                    'BehaveScoreId': indv_scoredata[0].persid+'-'+indv_scoredata[0].CourseId+'BH',
                    'PersId': indv_scoredata[0].persid,
                    'BehaveScore': indv_scoredata[0].conductscore,
                    'InstructorId': indv_scoredata[0].InstructorId,
                    'Date': DateTimeFormatFunc()
                });
                return 'created';
            } catch(err) {
                console.log(err);
            }
        }
    }

    createClassAttendId = (persid, courseid, nums) => {
        return (persid+'-'+courseid+'CA'+nums);
    }

    /*----------- updated :: 24.07.2022 -----------------*/
    async handleClassAttendance ( newclassattend, response ) {
        // console.log( 'newclassattend : ', newclassattend);
        if( newclassattend.newleave ) {
            /*---------------- Create New Class Attendance --------------------*/
            let condition = {
                attributes: [
                    'ClassAttendId'
                ],
                where: {'ClassAttendId': {
                    [Op.like]: '%' + newclassattend.PersId + '-' + newclassattend.courId + '%'
                }},
                raw : true,
            };
    
            let clsAttdIdList = await models.tbclassattendance.findAll(condition);
            let num_arr = [];
            clsAttdIdList.forEach((e) => {
                num_arr.push(parseInt(e.ClassAttendId.substring((e.ClassAttendId.search('A')+1), e.ClassAttendId.length)));
            });

            let new_classattendid = this.createClassAttendId(newclassattend.PersId, newclassattend.courId, (num_arr.length === 0 ? 1 : (Math.max(...num_arr)+1)));

            await models.tbclassattendance.create({
                'ClassAttendId' : new_classattendid,
                'PersId' : newclassattend.PersId,
                'BeginLeaveDate' : newclassattend.BeginLeaveDate,
                'BeginLeaveTime' : newclassattend.BeginLeaveTime,
                'EndLeaveDate' : newclassattend.EndLeaveDate, 
                'EndLeaveTime' : newclassattend.EndLeaveTime,
                'LeaveHrs' : newclassattend.LeaveHrs,
                'LeaveType' : newclassattend.LeaveType ? 'B' : 'S',
                'Reason' : newclassattend.Reason,
                'filepath' : newclassattend.filepath,
                'InstructorId' : newclassattend.InstructorId
            })
            .then((res) => {
                console.log('tbclassattendance : insert successful');
                return { classattendance_created : true }
            })
            .catch((err) => {
                console.log('tbclassattendance : insert failed >> err : ', err);
                return { classattendance_created : false }
            });
        } else {
            /*---------------- Update --------------------*/
            await models.tbclassattendance.update({
                'BeginLeaveDate' : newclassattend.BeginLeaveDate,
                'BeginLeaveTime' : newclassattend.BeginLeaveTime,
                'EndLeaveDate' : newclassattend.EndLeaveDate, 
                'EndLeaveTime' : newclassattend.EndLeaveTime,
                'LeaveHrs' : newclassattend.LeaveHrs,
                'LeaveType' : newclassattend.LeaveType ? 'B' : 'S',
                'Reason' : newclassattend.Reason,
                'filepath' : newclassattend.filepath,
                'InstructorId' : newclassattend.InstructorId
            },{
                where: {'ClassAttendId': newclassattend.ClassAttendId},
                returning: true,
                plain: true
            }).then((update_res) => {
                console.log('tbclassattendance : update successful');
                // return { classattendance_updated : true };
                return update_res.send;
            }).catch((err) => {
                console.log('tbclassattendance : update failed >> err : ', err);
                return { classattendance_updated : false }
            });
        }  
    }

    /*--------------------- Delete Process ----------------------*/
    handleDeleteProcess = async ( data ) => {
        let success = 0;
        console.log('data : ', data);
        await models.tbclassattendance.destroy({ where : { ClassAttendId : data.itemid }})
        .then((del_res) => {
            console.log('del_res >>> ', del_res);
            this.deleteFileInFolder(data.filename);
            console.log(`tbclassattendance : delete ${ data.itemid } successful`);
            success = del_res;
            
        })
        .catch((err) => {
            console.log(`tbclassattendance : delete ${ data.itemid } failed >> err : ${err}`);
            success = 0;
        });

        return success;
    }

    deleteFileInFolder = (fname) => {
        const m_path = __dirname.substring(0, __dirname.search('controllers'));
        const f_path = path.join(m_path, fname);
        console.log('__dirname : ', __dirname);
        console.log('m_path : ', m_path);
        console.log('f_path : ', f_path);
        // fs.unlink(f_path, (err) =>{
        //     if(err) {
        //         console.log(`${fname} cannot be deleted >>> err : ${err}`);
        //     } else {
        //         console.log(`${fname} is successfully deleted`);
        //     }
        // });
    }
}

module.exports = { StudyHoursManagement };
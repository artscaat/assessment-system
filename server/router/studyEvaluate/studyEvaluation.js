'use strict'

const { isNull } = require('lodash');
const { Op, HasMany } = require('sequelize');
const models = require('../../models/index');
//import { sequelize } from '../../models/index';
const PersAttrScoreManagement = require('../persAttr/personalattributes');

class StudyEvaluationManagement extends PersAttrScoreManagement {

    getIndvScoreBySubjectIdPersId = async (subjectid, persid) => {
        let condition = {
            attributes: [
                'SubjectScoreId',
                'SubjectId',
                'PersId',
                'FullScore',
                'SubjectScore',
                'InstructorId',
                'Grade',
                'SubjectScoreDate'
            ],
            where: {
                'SubjectScoreId': persid + '-' + subjectid,
            },
            raw: true,
            nest: true,
        };
        let results = JSON.parse(JSON.stringify(await models.tbsubjectscore.findAll(condition)));
        //console.log('getIndvScoreBySubjectIdPersId results >>> ', results);
        //let results = JSON.parse(JSON.stringify(await models.tbsubjectscore.findOne(condition)));
        return results;
    }

    getScoreBySubjectIdCourseGrpSeminar = async (subjectid, coursegrp, seminar) => {
        let courseid = subjectid.split('-')[0];
        let studentscorelist = null;
        await this.getStudListBySemAndGrp(courseid, coursegrp, seminar)
            .then(async (list) => {
                studentscorelist = await Promise.all(list.map(async (e) => {
                    try {
                        let data = {};
                        let res = await this.getIndvScoreBySubjectIdPersId(subjectid, e.PersId);
                        let mergedata = null;
                        if (res.filter((e) => e !== undefined)[0] !== undefined) {
                            mergedata = Object.assign(data, res.filter((e) => e !== undefined)[0], {
                                'PersId': e.PersId,
                                'StudentId': e.StudentId,
                                'StudentName': e.tbaccessrights[0].Rank + ' ' +
                                    e.tbaccessrights[0].PersFname + ' ' +
                                    e.tbaccessrights[0].PersLname,
                            });
                        }
                        return mergedata;
                    } catch (err) {
                        console.log('StudyEvaluationManagement getIndvScoreBySubjectIdPersId >>> err ', err);
                    }
                }));
            })
            .catch((err) => {
                console.log('StudyEvaluationManagement getScoreBySubjectIdCourseGrpSeminar >>> err ', err);
            });

        //console.log('getScoreBySubjectIdCourseGrpSeminar studentscorelist >>> ', studentscorelist);
        return studentscorelist;
    }

    newGetScoreSubjIdCourseGrpSem = async (subjectid, coursegrp, seminar) => {
        let studscorelist = [];
        await this.getStudListBySemAndGrp(subjectid.split('-')[0], coursegrp, seminar)
            .then(async stdlist => {
                
                await Promise.all(stdlist.map(async (e, i) => {
                    await this.getIndvScoreBySubjectIdPersId(subjectid, e.PersId)
                        .then(indstdlist => {
                            //console.log('newGetScoreSubjIdCourseGrpSem >>> indstdlist ', indstdlist);
                            if (indstdlist.length === 0) {
                                studscorelist.push(
                                    {
                                        'SubjectScoreId': e.PersId + '-' + subjectid,
                                        'SubjectId': subjectid,
                                        'PersId': e.PersId,
                                        'FullScore': 0,
                                        'SubjectScore': 0,
                                        'InstructorId': '',
                                        'Grade': '',
                                        'SubjectScoreDate': '',
                                        'StudentId': e.StudentId,
                                        'StudentName': e.tbaccessrights[0].Rank + ' ' +
                                            e.tbaccessrights[0].PersFname + ' ' +
                                            e.tbaccessrights[0].PersLname,
                                        'Status': 'เรียบร้อย'
                                    }
                                )

                            }else {
                                indstdlist.map(item => {
                                    //console.log('newGetScoreSubjIdCourseGrpSem >>> ', item);
                                    item['StudentId'] = e.StudentId;
                                    item['StudentName'] = e.tbaccessrights[0].Rank + ' ' +
                                        e.tbaccessrights[0].PersFname + ' ' +
                                        e.tbaccessrights[0].PersLname;
                                    item['Status'] = item['Grade'] === '--' || item['SubjectScore'] == 0 ? 'ไม่เรียบร้อย' : 'เรียบร้อย';
                                    studscorelist.push(item);
                                });
                            }
                        })
                        .catch(err => {
                            console.log('studyevaluation 3.get inner failed >>> err : ', err);
                        });
                }));
                
            })
            .catch(err => {
                console.log('studyevaluation 3.get outer failed >>> err : ', err);
            });
            
        return studscorelist;
    }

    addOrUpdateGradeAndScore = async (data) => {
        let response = {};
        await this.getIndvScoreBySubjectIdPersId(data.subjectid, data.persid)
            .then(async (indvexist) => {
                if (indvexist.length !== 0) {
                    //--------------- Update -----------------
                    await models.tbsubjectscore.update(
                        {
                            'FullScore': data.fullscore,
                            'SubjectScore': data.subjectscore,
                            'Grade': data.grade,
                            'InstructorId': data.instructorid,
                            'SubjectScoreDate': data.date
                        },
                        {
                            where: { 'SubjectScoreId': data.persid + '-' + data.subjectid },
                            returning: true,
                            plain: true,
                        })
                        .then(res => {
                            response = { created: false };
                        })
                        .catch(err => {
                            console.log('addOrUpdateGradeAndScore update >>> err : ', err);
                        });
                } else {
                    //--------------- Insert -----------------
                    //console.log('addOrUpdateGradeAndScore data >>> ', data);
                    await models.tbsubjectscore.create(
                        {
                            'SubjectScoreId': data.persid + '-' + data.subjectid,
                            'SubjectId': data.subjectid,
                            'PersId': data.persid,
                            'FullScore': data.fullscore,
                            'SubjectScore': data.subjectscore,
                            'InstructorId': data.instructorid,
                            'Grade': data.grade,
                            'SubjectScoreDate': data.currentdate,
                        }
                    ).then(res => {
                        response = { created: true };
                    })
                        .catch(err => {
                            console.log('addOrUpdateGradeAndScore insert >>> err : ', err);
                        });
                }
            })
            .catch(err => {
                console.log('addOrUpdateGradeAndScore >>> err ', err);
            });

        return response;
    }

    /*------------------ added on 12112022 ------------------*/
    getSubjectIdByAccessRightsId = async (accsrightid) => {
        let condition = {
            attributes: [
                'SubjectId',
            ],
            where: {
                'AccessRightsId': accsrightid
            }
        };

        try{
            let results = JSON.parse(JSON.stringify(await models.tbclassroom.findAll(condition)));
            return results;
        }catch(err){
            console.log('studyEvaluation :: getSubjectIdByAccessRightsId failed -> err :: ', err);
        }
    }
}

module.exports = StudyEvaluationManagement;
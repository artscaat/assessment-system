// eslint-disable-next-line strict
'use strict'

const { Op, HasMany } = require('sequelize');
const models = require('../models/index');
const { sequelize } = require("../models/index");
const { DateTimeFormatFunc } = require("../function/optional-func");

class PersAttrScoreManagement{
    /*---------------------------------- addOrUpdatePersAttrScore ----------------------------*/
    async addOrUpdatePersAttrScore (course_id, pers_id){
        let found = await models.tbpersattrscore.findAll({where: {'PersAttrScoreId': pers_id.concat("-",course_id,"E01")}});
            let count = 0;
            if (found.length === 0){
                try{
                    let attr_list = ["E01", "E02", "E03", "E04", "E05",
                                    "E06", "E07", "E08", "E09", "E10",];
               
                    attr_list.forEach((item) => {
                        let persattr = {
                            'PersAttrScoreId': (pers_id + "-" + course_id + item), 
                            'PersAttrCatId': item,
                            'PersId': pers_id,
                            'PerAttrScore': 0.0,
                            'InstructorId': "0000000000",
                            'PerAttrScoreDate': DateTimeFormatFunc()
                        };
                        (async () => {
                            await models.tbpersattrscore.create(persattr);
                        })();
                        count++;
                    });
                }catch(err){
                    console.log(err);
                }
            }
            return (count !== 10) ? false : true;
    } //addOrUpdatePersAttrScore

    /*---------------------------------- handlePersAttrScore ----------------------------*/
    async handlePersAttrScore ( lastestscore ) {
        let attr_list = ["E01", "E02", "E03", "E04", "E05",
                         "E06", "E07", "E08", "E09", "E10",];
       
        let persattr = lastestscore['PerAttrScore'].map((item, index) => {
            return {
                'PersAttrScoreId': (lastestscore['PersId'] + "-" + lastestscore['CourseId'] + attr_list[index]), 
                'PersAttrCatId': attr_list[index],
                'PersId': lastestscore['PersId'],
                'PerAttrScore': item,
                'InstructorId': lastestscore['InstructorId'],
                'PerAttrScoreDate': DateTimeFormatFunc()
            };
        });

    /*--------------------- check the existance of data in database -----------------*/
        let found = await models.tbpersattrscore.findAll({where: { 'PersAttrScoreId': lastestscore['PersId'].concat("-",lastestscore['CourseId'],"E01")}});
        if (found.length === 0){
            try{
                persattr.forEach((e) => {
                    (async () => {
                        await models.tbpersattrscore.create(e);
                    })();
                });
                return 'created';
            }catch (err) {
                console.log(err);
            }
                
        }else{
            try{
                persattr.forEach((e) => {
                    (async () => {
                        await models.tbpersattrscore.update(e, { where : { 'PersAttrScoreId' : e['PersAttrScoreId'] }});
                    })();
                });
                return 'updated';
            }catch (err) {
                console.log(err);
            }
        }
    } //handlePersAttrScore

    /*----------------------------- getAllPersAttrScore -----------------------*/
    async getAllPersAttrScore(coursegrp, seminar){
        let condition = {
            attributes: [
                'PersId',
                'StudentId'
            ],
            include:[
                {
                    model: models.tbpersattrscore,
                    attributes: [
                        'PerAttrScore',
                        'InstructorId'
                    ],
                    association: new HasMany(models.tbcourseyear, models.tbpersattrscore, {foreignKey: {
                        name: 'PersId',
                        allowNull: false
                    }}),
                    required: true,
                    on: {
                        'PersId': { [Op.eq]: sequelize.col('tbcourseyear.PersId') },
                    }
                },
                {
                    model: models.tbregister,
                    attributes: [
                        //'StudentId',
                        'Rank',
                        'PersFname', 
                        'PersLname', 
                    ],
                    association: new HasMany(models.tbcourseyear, models.tbregister, {foreignKey: {
                        name: 'PersId',
                        allowNull: false
                    }}),
                    required: true,
                    on: {
                        'PersId': { [Op.eq]: sequelize.col('tbcourseyear.PersId') },
                    },
                },
                {
                    model: models.tbaccessrights,
                    attributes: [
                        'PersId',
                        'Rank',
                        'PersFname', 
                        'PersLname'
                    ],
                    association: new HasMany(models.tbpersattrscore, models.tbaccessrights, {foreignKey: {
                        name: 'PersId',
                        allowNull: false
                    }}),
                    required: true,
                        on: {
                            'PersId': { [Op.eq]: sequelize.col('tbpersattrscores.InstructorId') },
                        }
                    }
            ],
            where: {
                [Op.and]:[
                    {'CourseGrp': coursegrp},
                    {'Seminar': seminar}
                ]
            }
        };
        let results = await models.tbcourseyear.findAll(condition);
        //console.log("results : "+results);

        /*-------------------------- End of Reading Data from Database ------------------*/
        let obj = JSON.parse(JSON.stringify(results));
        let dataToDisplay = Object.keys(obj).map((key) => {
            //console.log(key, obj[key]);
            let res = {};
            let namelist = Object.keys(obj[key]);
            for(let i = 0; i < namelist.length-1; i++){
                res['persid']  = Object.values(obj[key]).at(0);
                res['studid'] = Object.values(obj[key]).at(1);
                res['studname'] = Object.values(obj[key]).at(3)[0].Rank+" "+
                                Object.values(obj[key]).at(3)[0].PersFname+" "+
                                Object.values(obj[key]).at(3)[0].PersLname;
                res['persattrcatscore'] = Object.values(obj[key]).at(2).map((item) => {
                    let instrlist = {};
                    // for(let i = 0; i < Object.values(obj[key]).at(4).length; i++){
                        for (let i = 0; i < Object.keys(obj[key]); i++) {
                        let str = Object.values(obj[key]).at(4)[i].Rank +" "+
                                  Object.values(obj[key]).at(4)[i].InstructorFname+" "+
                                  Object.values(obj[key]).at(4)[i].InstructorLname;
                        if(item.InstructorId === Object.values(obj[key]).at(4)[i].InstructorId){
                           instrlist = {"instr_id": Object.values(obj[key]).at(4)[i].InstructorId,             
                                        "instr_name": str,
                                            //"instr_rights": Object.values(obj[key].tbaccessrights).map(
                                            //   (item) => { return(Object.values(item));}).at(count++)
                                        };
                        }//If

                    }//for loop
                    return ({"score": parseFloat(item.PerAttrScore), "instructor": instrlist});
                });
            } //for loop
            return (res);
        }); //DataToDisplay
        return dataToDisplay;
    }//getAllPersAttrScore

    async getIndvPersAttrScore(coursegrp, seminar, pers_id){
        let condition = {
            attributes: [
                'PersId',
                'StudentId'
            ],
            include:[
                {
                    model: models.tbpersattrscore,
                    attributes: [
                        'PerAttrScore',
                        'InstructorId'
                    ],
                    association: new HasMany(models.tbcourseyear, models.tbpersattrscore, {foreignKey: {
                        name: 'PersId',
                        allowNull: false
                    }}),
                    required: true,
                    on: {
                        'PersId': { [Op.eq]: sequelize.col('tbcourseyear.PersId') },
                    }
                },
                {
                    model: models.tbregister,
                    attributes: [
                        //'StudentId',
                        'Rank',
                        'PersFname', 
                        'PersLname', 
                    ],
                    association: new HasMany(models.tbcourseyear, models.tbregister, {foreignKey: {
                        name: 'PersId',
                        allowNull: false
                    }}),
                    required: true,
                    on: {
                        'PersId': { [Op.eq]: sequelize.col('tbcourseyear.PersId') },
                    },
                },
                {
                    model: models.tbaccessrights,
                    attributes: [
                        'PersId',
                        'Rank',
                        'PersFname', 
                        'PersLname'
                    ],
                    association: new HasMany(models.tbpersattrscore, models.tbaccessrights, {foreignKey: {
                        name: 'InstructorId',
                        allowNull: false
                    }}),
                    required: true,
                        on: {
                            'PersId': { [Op.eq]: sequelize.col('tbpersattrscores.InstructorId') },
                        }
                    }
            ],
            where: {
                [Op.and]:[
                    {'CourseGrp': coursegrp},
                    {'Seminar': seminar},
                    {'PersId': pers_id}
                ]
            }
        };
        let results = await models.tbcourseyear.findAll(condition);
        /*-------------------------- End of Reading Data from Database ------------------*/

        let obj = JSON.parse(JSON.stringify(results));
        let dataToDisplay = Object.keys(obj).map((key) => {
            //console.log("here : ", key, obj[key]);
            let res = {};
                res['persid']  = Object.values(obj[key]).at(0);
                res['studid'] = Object.values(obj[key]).at(1);
                res['studname'] = Object.values(obj[key]).at(3)[0].Rank+" "+
                                Object.values(obj[key]).at(3)[0].PersFname+" "+
                                Object.values(obj[key]).at(3)[0].PersLname;
                res['persattrcatscore'] = Object.values(obj[key]).at(2).map((item) => {
                    let instrlist = {};
                    for(let i = 0; i < Object.values(obj[key]).at(4).length; i++){
                        let str = Object.values(obj[key]).at(4)[i].Rank +" "+
                                Object.values(obj[key]).at(4)[i].InstructorFname+" "+
                                Object.values(obj[key]).at(4)[i].InstructorLname;
                        if(item.InstructorId === Object.values(obj[key]).at(4)[i].InstructorId){
                            instrlist = {"instr_id": Object.values(obj[key]).at(4)[i].InstructorId,             
                                        "instr_name": str,
                                        };
                        }//If
                    }//for loop
                    return ({"score": parseFloat(item.PerAttrScore), "instructor": instrlist});
                });
            //} //for loop
            return (res);
        });
        return dataToDisplay;
    }//getIndvPersAttrScore

    /*----------------------------- getPersAttrScoreCount -----------------------*/
    async getPersAttrScoreCat() {
        let condition = {
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('PerAttrCatId')), 'count'],
                [sequelize.fn('SUM', sequelize.col('PersAttrCatFullscore')), 'total'],
              ]
        };

        let results = await models.tbpersattrcategory.findAll(condition);
        return results;
    }//getPersAttrScoreCount

    /*----------------------------- getIndvPersAttrScoreData -----------------------*/
    async getPersAttrScoreAvgSum(persid) {
        let condition = {
            attributes: [
                [sequelize.fn('AVG', sequelize.col('PerAttrScore')), 'avg'],
                [sequelize.fn('SUM', sequelize.col('PerAttrScore')), 'sum'],
              ],
            where: {
                PersId: persid
            }
        };

        let results = await models.tbpersattrscore.findAll(condition);
        return results;
    }//getIndvPersAttrScoreData

    /*----------------------------- getStudListBySemAndGrp -----------------------*/
    async getStudListBySemAndGrp(courseid, classno, seminar){
        // console.log("getStudListBySemAndGrp", courseid, coursegrp, seminar);
        let condition = {
            attributes: [
                'PersId',
                'StudentId'
            ],
            include:[
                {
                    model: models.tbregister,
                    attributes: [
                        //'StudentId',
                        'Rank',
                        'PersFname', 
                        'PersLname', 
                    ],
                    association: new HasMany(models.tbcourseyear, models.tbregister, {foreignKey: {
                        name: 'PersId',
                        allowNull: false
                    }}),
                    required: true,
                    on: {
                        'PersId': { [Op.eq]: sequelize.col('tbcourseyear.PersId') },
                    },
                },
            ],
            where: {
                [Op.and]:[
                    {'CourseId': courseid},
                    {'CourseGrp': classno},
                    {'Seminar': seminar}
                ]
            }
        };
        
        let results = await models.tbcourseyear.findAll(condition);
        // console.log("results : ", results);
        let persIdList = [];
        if(results.length > 0){
            let obj = JSON.parse(JSON.stringify(results));
            // eslint-disable-next-line array-callback-return
            Object.keys(obj).map((key) => {
                //console.log(key, obj[key]);
                persIdList.push(obj[key]);
            });
        }
        return persIdList;
        // console.log("persIdList : ", persIdList);
    }//getAllRelatedStudent

    async checkScoreExistInTable(pers_id){
        let condition = {
            where: {'PersAttrScoreId': {
                // eslint-disable-next-line no-useless-concat
                [Op.like]: '%' + pers_id + '-' + '011' + '%'
            }}
        }
        let count = await models.tbpersattrscore.count(condition);
        return (count > 0 ? true : false);
    }

    /*----------------------------- getInstructorData -----------------------*/
    async getInstructorData() {
        let condition = {
            attributes: [
                'InstructorId',
                'Rank',
                'InstructorFname',
                'InstructorLname'
            ],
            include: [{
                model: models.tbaccessrights,
                attributes: [
                    'ProcessCenter',
                    'Director',
                    'Professor',
                    'Student',
                    'EvaluationCenter',
                    'Process',
                    'Evaluation',
                    'Administrative'
                ],
                association: new HasMany(models.tbaccessrights, {foreignKey: {
                // association: new HasMany(models.tbinstructor, models.tbaccessrights, {foreignKey: {
                    name: 'AccessRightsId',
                    allowNull: false
                }}),
                required: true,
                on: {
                    'AccessRightsId': { [Op.eq]: sequelize.col('tbaccessrights.AccessRightsId') },
                }
            }],
            //where: {}
          };      
          let instrdata = await models.tbaccessrights.findAll(condition);
          /*------------------- End of Database Query ------------------------------*/

          let obj = JSON.parse(JSON.stringify(instrdata));
          let instrdatalist = Object.keys(obj).map((key) => {
            //console.log(key, obj[key]);
            let instrdata = {};
            instrdata['instr_id'] = obj[key].InstructorId;
            instrdata['instr_name'] = obj[key].Rank + " " + obj[key].InstructorFname + " " + obj[key].InstructorLname;
            let i = 0;
            instrdata['instr_rights'] = { "accessrights" : Object.values(obj[key].tbaccessrights).map((item) => {return(Object.values(item));}).at(i++)};
            return instrdata;
          });
          //console.log(instrdatalist);
        return (instrdatalist);
    }//getInstructorData

    /*---------------------------------- getDataFromCourseYearTable ---------------------------*/
    async getDataFromCourseYearTable(courseid, studid, classno){
        let condition = {
            where: {
                [Op.and]:[
                    {'CourseId': courseid},
                    {'StudentId': studid},
                    {'CourseGrp': classno}
                ]
            }
        };
        let results = await models.tbcourseyear.findAll(condition);
        let obj = JSON.parse(JSON.stringify(results));
        // eslint-disable-next-line array-callback-return
        let res = Object.keys(obj).map((key) => {
            //console.log(key, obj[key]);
            if(obj[key].StudentId === studid){
                return obj[key];
            }
        });

        // console.log('res : ', res);
        return res;
    }

}

module.exports = { PersAttrScoreManagement };
'use strict'
const models = require('../models/index');
const  {ListItemGenFunc} = require('../function/optional-func')

class DropDownListMangement{
    async createSearchDropDownList (course_id) {
        let condition = {
          attributes: [
            'CourseGrp',
            'Seminar'
          ],
          where: {
            'CourseId': course_id
          }
        };

        let dbdata = await models.tbcourseyear.findAll(condition);
        let grp_arr = [], sem_arr = []; 
        Object.values(dbdata).forEach(item => {
          // console.log("data: ", item.dataValues)
          grp_arr.push(item.dataValues.CourseGrp)
          sem_arr.push(item.dataValues.Seminar);
        });

        return ({
          "coursegrp": ListItemGenFunc(grp_arr, "รุ่น"),
          "seminar": ListItemGenFunc(sem_arr, "สัมมนา")
        });
    }

    /*------------------ created :: 29.08.2565 -----------------*/
    async createSearchCourseSubjectList (course_id) {
      let condition = {
        attributes: [
          'SubjectId',
          'SubjectNr',
          'SubjectName',
          'SubjectCreditOrScore'
        ],
        where: {
          'CourseId': course_id
        }
      };

      let dbdata = await models.tbcoursesubjects.findAll(condition);
      let subj_arr = [];

      Object.values(dbdata).forEach(item => {
        subj_arr.push( item.dataValues.SubjectId + 
                       ':หมวดวิชาที่ ' + 
                       item.dataValues.SubjectNr + 
                       ' ' + 
                       item.dataValues.SubjectName)
        });
      return (subj_arr);
    }
}

module.exports =  DropDownListMangement ;
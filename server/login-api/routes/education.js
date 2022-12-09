const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const { studentByid, 
        pmecourse, 
        education, 
        result, 
        report, 
        subjects, 
        subjects2, 
        reportbyid, 
        courseyearByid, 
        dataById, 
        studentUpdate,
        studentNum,
        persattrScore,
        educateUpdate,
        pmecourseRegis,
        listSubjectsAJ,
        addsubjectAJ,
        deleteSubject,
        studyhrsrouter,
        lastestscore,
        attrScore,
        addandupdateleave,
        removefile,
        listtableleave,
        deleteLeave,
        pageattribute,
        editattribute,
        addandupdateattr,
} = require("../controllers/education");

const { upload } = require("../middleware/uploadfile");
const { uploadorder } = require("../middleware/uploadfileorder");

//  @route  GET    localhost:3300/api/summarize/:PersId                                                 @@get ข้อมูล นทน.รายบุคคล
router.get('/summarize/:PersId/:courId' ,studentByid); 

//  @route  GET    localhost:3300/api/pmecourse/:id                                                     @@get แสดงข้อมูลหลักสูตรและโรงเรียนตามสิทธิผู้ใช้งาน
router.get('/pmecourse/:id' ,pmecourse);

//  @route  GET    localhost:3300/api/pmecourse                                                         @@get ลงทะเบียนเลือกหลักสูตรและโรงเรียน
router.get('/pmecourse' ,pmecourseRegis);

//  @route  GET    localhost:3300/api/education/:courId                                                 @@get ข้อมูลการศึกษา
router.get('/education/:courId' ,education);

//  @route  GET    localhost:3300/api/number/:cutstring/:coursegrp                                      @@get จำนวนผู้เข้ารับการศึกษา/หลักสูตร/รุ่น
router.get('/number/:cutstring/:coursegrp' ,studentNum); 

//  @route  GET    localhost:3300/api/result/course/:course/seminar/:seminar/:CourseId/:course2         @@get ผลการศึกษาสรุปรวม && ทะเบียนประวัติผู้เข้ารับการศึกษา
router.get('/result/course/:course/seminar/:seminar/:CourseId/:course2' ,result);

//  @route  GET    localhost:3300/api/result/report/:course/seminar/:seminar/:CourseId/:course2         @@get รายงานผลการศึกษา
router.get('/result/report/:course/seminar/:seminar/:CourseId/:course2' ,report);

//  @route  GET    localhost:3300/api/subjects/:courId/:PersId                                          @@get เกรดคะแนนรายวิชารายบุคคล
router.get('/subjects/:courId/:PersId' ,subjects);

//  @route  GET    localhost:3300/api/subjects2/:courId                                                 @@get หมวดวิชาตามหลักสูตรที่เลือก
router.get('/subjects2/:courId' ,subjects2);

//  @route  GET    localhost:3300/api/listsubjectsaj/:accessId                                          @@get รายวิชาที่อาจารย์สอน
router.get('/listsubjectsaj/:access/:accessId' ,listSubjectsAJ);

//  @route  POST    localhost:3300/api/addsubjectaj                                                     @@post เพิ่มวิชาสอนของอาจารย์   
router.post('/addsubjectaj', jsonParser ,addsubjectAJ);

//  @route  DELETE    localhost:3300/api/deletesubject/:id                                              @@delete ลบหมวดวิชาที่สอน อ.  
router.delete('/deletesubject/:id', jsonParser ,deleteSubject);

//  @route  GET    localhost:3300/api/report/:PersId/:CourseId                                          @@get รายงานผลการศึกษารายบุคคล   
router.get('/report/:PersId/:CourseId' ,reportbyid);

//  @route  GET    localhost:3300/api/courseyearByid/:CourseGrp                                         @@get ข้อมูลรุ่นการศึกษา
router.get('/courseyearByid/:CourseGrp' ,courseyearByid); 

//  @route  GET    localhost:3300/api/dataById/:PersId/:CourseId                                        @@get ข้อมูล นทน.รายบุคคล
router.get('/dataById/:id/:CourseId' ,dataById); 

//  @route  PUT    localhost:3300/api/studentUpdate/:courId/:id                                         @@put แก้ไขข้อมูล นทน. 
router.put('/studentUpdate/:courId/:id', jsonParser, studentUpdate);

//  @route  PUT    localhost:3300/api/educateUpdate/:courId/:id                                         @@put แก้ไขข้อมูลปีการศึกษาวันที่เริ่มวันที่จบการศึกษา 
router.put('/educateUpdate', jsonParser, uploadorder, educateUpdate);

//  @route  GET    localhost:3300/api/persattrScore/:PersId/:courId                                     @@get ข้อมูลคะแนนคุณลักษณะส่วนบุคคล 10 ด้าน
router.get('/persattrScore/:PersId/:courId' ,jsonParser ,persattrScore); 

//  @route  GET    localhost:3300/api/attrScore                                                         @@get ข้อมูลคะแนนเฉลี่ยคุณลักษณะส่วนบุคคล  
router.get('/attrScore/:courseGrp/:courseid/:persid', jsonParser ,attrScore);

//  @route  GET    localhost:3300/api/pageInsertScore/:selectedClass/:selectedSeminar/:courId           @@get ข้อมูล นทน.หน้าชั่วโมงการศึกษา และคะแนนความประพฤติ  
router.get('/pageInsertScore/:selectedClass/:selectedSeminar/:courId', jsonParser ,studyhrsrouter);

//  @route  PUT    localhost:3300/api/lastestscore/                                                     @@put เพิ่ม แก้ไขข้อมูลคะแนนความประพฤติ 
router.put('/lastestscore/', jsonParser, lastestscore);

//  @route  PUT    localhost:3300/api/addandupdateleave                                                 @@post เพิ่มและแก้ไขวันลา นทน.   
router.put('/addandupdateleave', jsonParser, addandupdateleave);

//  @route  POST    localhost:3300/api/upload/:newname                                                  @@post Upload ใบลา   
router.post('/upload/:newname' , async (req, res) => {
        // console.log('req body1 :',req.params);
        upload(req, res, (err) => {
                // console.log('req body :',req.params.newname);
                if(err){
                        console.log(err);
                        res.status(500).send(err);
                }
                else{
                        if(req.file === undefined){
                                res.status(500).send('No file selected');
                        }
                        else{
                                console.log('req file : ', req.file);
                                // console.log('req body : ', req.body);
                                res.send(req.file.path);
                        }
                }      
        });
})

//  @route  POST    localhost:3300/api/deletefile                                                      @@post ลบไฟล์ใบลา  
router.post('/deletefile', jsonParser ,removefile);

//  @route  GET    localhost:3300/api/listtableleave/courseid/:courseid/persid/:persid                 @@get ข้อมูลการลารายบุคคล 
router.get('/listtableleave/courseid/:courseid/persid/:persid', jsonParser ,listtableleave);

//  @route  DELETE    localhost:3300/api/deleteleave                                                   @@delete ลบรายการใบลา  
router.delete('/deleteleave', jsonParser ,deleteLeave);

//  @route  GET    localhost:3300/api/pageAttribute/:classno/:seminar/:courId                          @@get ข้อมูลการวัดและประเมินผลคุณลักษณะส่วนบุคคล 
router.get('/pageattribute/:classno/:seminar/:courId', jsonParser ,pageattribute);

//  @route  GET    localhost:3300/api/pageeditattribute/:courId/:classno/:studid/:name                          @@get คะแนนคุณลักษณะส่วนบุคคล 
router.get('/editattribute/:courid/:classno/:studid/:name', jsonParser ,editattribute);

//  @route  PUT    localhost:3300/api/addandupdateattr                                                 @@post เพิ่มและแก้ไขวันลา นทน.   
router.put('/addandupdateattr', jsonParser, addandupdateattr);

module.exports = router;
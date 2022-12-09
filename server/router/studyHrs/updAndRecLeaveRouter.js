const DropDownListMangement = require('../dropdownlist');
const StudyHoursManagement = require('./studyHours');

let dropdownlist = new DropDownListMangement();
let studyhours = new StudyHoursManagement();

const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();

/*------------- updated :: 26.08.2565 --------------*/
let filestorage = multer.diskStorage({
    destination: './leavedoc',
    filename: (req, file, cb) => {
        // console.log('file16: ' + file.fieldname);
        //cb(null, `${req.body.newfilename}` + path.extname(file.originalname));
        //cb(null, `${file.fieldname}-${req.body.newfilename}`+path.extname(file.originalname));
        cb(null, file.fieldname + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: filestorage,
    /*limits: {
        fileSize: 20000000,
    },*/
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg|pdf)$/)){
            return cb(new Error('Please upload a file with filetype (png, jpg or pdf)'));
        }
        cb(undefined, true);
    },
    preservePath: true,
 });

router
    .get('/', async (req, res) => {
        let dropdown = await dropdownlist.createSearchDropDownList('051');
        res.send(dropdown);
    })

    .get('/instructor', async (req, res) => {
        let instrlist = await studyhours.getInstructorData();
        res.send(instrlist);
    })

    .get('/handlefile', async(req, res) => {
        let absolutepath = path.resolve(path.join('./', req.query.filepath));
        // console.log("absolutepath: " + absolutepath);
        res.download(absolutepath);
    })

    .post('/upload', upload.single('file'), async (req, res) => {
        // console.log('upload :', req.file);
        res.send(req.file.path);
    })

    .put('/handleleavedata', async (req, res) => {
        // console.log('handleleavedata :', req.body);
        res.send(await studyhours.handleClassAttendance(req.body));
    })

module.exports = router;
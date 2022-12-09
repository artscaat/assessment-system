const multer = require('multer');
const path = require('path');
let filestorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log('Newname :',req.body.newname) // YAY, IT'S POPULATED
        cb(null, './orderpdf')
      },                    
      filename: function (req, file, cb) {
        cb(null, req.body.CourseId + "-" +req.body.CourseGrpP + "-" +Date.now() + path.extname(file.originalname))
      } 
    });
exports.uploadorder = multer({ 
    storage: filestorage,
    // limits: {
    //     fileSize: 100000000,
    // },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg|pdf)$/)){
            return cb(new Error('Please upload a file with filetype (png, jpg or pdf) and size less than 10 MB'));
        }
        cb(undefined, true);
    },
    preservePath: true,
 }).single('file')



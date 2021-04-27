const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

exports.fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4()+'_'+file.originalname);
    }
});

exports.fileFilter = (req, file, cb) => {
    const mymeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    cb(null, mymeTypes.includes(file.mimetype));
}
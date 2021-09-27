const express = require("express");
const fs = require("fs");

const PDFMerger = require("pdf-merger-js");
const multer = require('multer')
const {v4: uuidv4} = require('uuid');
const Router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype !== 'application/pdf') {
        cb(new Error('You can upload only pdf'));
    }
    else {
        cb(null, true);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 30 }

});
const merger = new PDFMerger();

Router.post('/mergePdf', upload.array('pdf', 10), (req, res, next) => {
    if (req.files) {
        console.log(req.files)
        req.files.forEach(file => {
            merger.add(file.path);
        })
        const fileName = uuidv4() + '.pdf';
        merger.save('uploads/' + fileName).then(() => {
            req.files.forEach(file => {
                fs.unlink(file.path, err => {
                    if (err) throw err;
                    else console.log('Successfully deleted');
                });
            })
            res.download('uploads/' + fileName);
        });
    }
});

Router.get('/list', (req, res) => res.send(['ciao', 'ciao', 'ciao']));

module.exports = Router;


// merger.add('pdf2.pdf', [2]); // merge only page 2
// merger.add('pdf2.pdf', [1, 3]); // merge the pages 1 and 3
// merger.add('pdf2.pdf', '4, 7, 8'); // merge the pages 4, 7 and 8
// merger.add('pdf3.pdf', '1 to 2'); //merge pages 1 to 2
// merger.add('pdf3.pdf', '3-4'); //merge pages 3 to 4






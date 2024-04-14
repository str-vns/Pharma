const multer = require('multer');
const path = require('path');

module.exports = multer({
    limits: { fileSize: 100 * 1024 * 1024 },
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            return cb(new Error("File type is not supported"));
        }
        cb(null, true);
    }
});
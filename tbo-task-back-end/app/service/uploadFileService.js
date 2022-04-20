import Multer from 'multer'
import Responder from '../../lib/expressResponder';

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 200 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
});


const imageConfigStorage = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        var ext = file.originalname;
        var name = file.originalname.split('.')[0]
        file.originalname = name.replace(/[^a-zA-Z0-9]/g, '_');

        if (file.mimetype == 'image/png' || file.mimetype == 'uploads/png')
            cb(null, `${file.originalname.split('.')[0]}_${datetimestamp}.png`)
        else
            cb(null, file.originalname.split('.')[0] + '_' + datetimestamp + '.' + ext.split('.')[ext.split('.').length - 1])

    }
});

export default class UploadFileService {
    static uploadImage(req, res) {
        return new Promise((resolve, reject) => {
            try {
                let uploadSingle = Multer({ storage: imageConfigStorage }).single('file');
                uploadSingle(req, res, (err) => {
                    if (!req.file)
                        return Responder.success(res, { status: false, statusCode: 301, msg: "Please select file for upload." })
                    err ? reject(err) : resolve(req.file)
                });
            } catch (error) {
            }
        });
    }

}

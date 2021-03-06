const multer = require('multer');
const helper = require('../response/res')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + ' - ' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }


// upload = multer({ 
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: {
//       fileSize: 1024 * 1024 * 2
//     }
//  })
const imageSize = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 2 * 1024 * 1024
    }
 })

const upload = multer(imageSize).single('image')

const uploadFile = (req, res, next) => {
  upload(req, res, function(error) {
    if (error) {
      if (error.code === 'LIMIT_FILE_SIZE') return helper.response(res, [], 413, null, 'Max file 2MB')
    } else {
      next ()
    }
  })
}

module.exports = {
    // upload
    uploadFile
}


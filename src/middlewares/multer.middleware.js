import multer from "multer";

//Using disk storage as memory-storage may exhaust while storing buffer of entire file.

const storage = multer.diskStorage({ //Returns local path of file with original file name i.e. ./public/temp/file_name
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) //Storing file with original name provided by user. Be cautious as there may be multiple files with same name.
    }
})
  
export const upload = multer({storage}); 
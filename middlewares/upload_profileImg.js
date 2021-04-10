const multer = require("multer")
const jimp = require("jimp")
const { v4: uuidv4 } = require('uuid');

const multerOption = {
  storage: multer.memoryStorage(),
  //eslint-disable-next-line
  fileFilter(req, file, next){
    const isPhoto = file.mimetype.startsWith("image/")
    if(isPhoto) {
      next(null, true)
    }else{
      next({message: "The filetype is not allowed!"}, false)
    }   
  }
}

exports.upload = multer(multerOption).single("profilePic")

//eslint-disable-next-line
exports.resizeImage = async (req, res, next) => {
  //if there is no new file to resize
  if(!req.file) 
    return next() //skip to the next middleware in the chain
  
  const extension = req.file.mimetype.split("/")[1]
  req.body.photo = `${uuidv4()}.${extension}`

  //here we resize the image
  const photo = await jimp(req.file.buffer)
  await photo.resize(800, jimp.AUTO)
  await photo.write(`./uploads/${req.body.photo}`)

  //after resizing the image, and written the photo in our filesystem
  //then pass it to the next middleware in chain
  next()
}
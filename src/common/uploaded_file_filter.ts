export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed'), false)
  }
  callback(null, true)
}

export const pdfOrWordFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(doc|docx|pdf)$/)) {
    return callback(new Error('Only documents with "doc|docx|pdf" extentions allowed files are allowed'), false)
  }
  callback(null, true)
}

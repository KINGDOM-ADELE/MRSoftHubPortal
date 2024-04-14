const fileSizeFormatter = require('./fileSizeFormatter');

module.exports = (req) => {

  let filesArray = []

  req.files.forEach(element => {
      const file = {
          fileName: element.originalname,
          // filePath: `${req.protocol}://${req.get('host')}`${req.protocol}://${req.get('host')}/${element.path}`,
          
          filePath: `${element.path}`,
          fileType: element.mimetype,
          fileSize: fileSizeFormatter(element.size, 2) //0.00
        }
      filesArray.push(file)
  })
  return (filesArray)
}
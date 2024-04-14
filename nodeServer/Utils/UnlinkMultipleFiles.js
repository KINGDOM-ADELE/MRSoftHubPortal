const fs = require('fs');

module.exports = (filesArray, req)=> {
  filesArray.map((fileObj, i) => {
    let BasePath = `${req.protocol}://${req.get('host')}`
    localfilePath = fileObj.filePath.replace(BasePath, "./");
    // fs.unlinkSync('file.txt');
    if (fs.existsSync(localfilePath)) {
      fs.unlinkSync(localfilePath);
    }
    return i
  })

}
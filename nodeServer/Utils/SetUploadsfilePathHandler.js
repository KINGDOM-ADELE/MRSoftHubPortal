const fs = require('fs')

const SetuploadfilePathhandler = (req, dir) => {
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }
    req.headers.targetFilepath = dir
    return (dir)
}

module.exports = SetuploadfilePathhandler
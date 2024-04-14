const fs = require('fs');

module.exports = (file, req) => {
    let BasePath = `${req.protocol}://${req.get('host')}`
    localfilePath = file.replace(BasePath, "./");
    if (fs.existsSync(localfilePath)) {
      fs.unlinkSync(localfilePath);
    }
}
const util = require('util')
const jwt = require('jsonwebtoken')



module.exports = async(testToken) => {

  let token
  if(testToken && testToken.startsWith('Bearer')){
     token = testToken.split(' ')[1] // to get th second element of the generated array
  }
  if(!token){
      next(new CustomError('You are not logged in!', 401))
  }
  
  const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRETKEY)// returns a promise

  return(decodedToken)
}
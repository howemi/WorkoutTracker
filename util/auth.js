var bcrypt = require('bcryptjs')
var AuthToken = require('../data/models/AuthToken')

module.exports = {
  hashPassword: (password, rounds, callback) => {
    bcrypt.hash(password, rounds, (error, hash) => {
      callback(error, hash)
    })
  },
  compare: (password, dbHash, callback) => {
    bcrypt.compare(password, dbHash, (err, match) => {
      if(err) {
        throw err
      } else if(!match) {
        callback('Invalid password', null)
      } else {
        callback(null, true)
      }
    })
  },
  makeid: (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  /**
   * @param request the request object
   * @param callback function. format: fn(err, userID)
   */
  checkAuthToken: (request, callback) => {
    var authHeader = request.header('Authorization').split(" ")[1]
    if(authHeader !== undefined) {
      AuthToken.findOne({where: {token: authHeader}})
        .then(token => {
          if(token) {
            callback(false, token.user_id)
          } else {
            callback(true, null)
          }
        })
        .catch(err => {
          console.log(err)
          throw err
        })
    } else {
      callback(true, null)
    }
  }
 
}
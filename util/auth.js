var bcrypt = require('bcryptjs')

module.exports = {
  hashPassword: (password, rounds, callback) => {
    bcrypt.hash(password, rounds, (error, hash) => {
      callback(error, hash)
    })
  },
  compare: (password, dbHash, callback) => {
    bcrypt.compare(password, dbHash, (err, match) => {
      if(match) {
        callback(null, true)
      } else {
        callback('Invalid password', null)
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
 }
}
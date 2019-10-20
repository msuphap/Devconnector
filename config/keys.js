// module.exports = {
//   mongoURI: `mongodb+srv://Devadmin:${encodeURIComponent('PASSWORD123')}@devconnector-te7me.mongodb.net/test?retryWrites=true&w=majority`,
//   secretOrKey: 'secret'
// }

if (process.env.NODE_ENV === 'production'){
  module.exports = require('./keys_prod');
} else {
  module.exports = require('./keys_dev');
}
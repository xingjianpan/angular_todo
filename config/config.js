//used to load config file from env folder
//loaded by express.js or mongoose.js, server.js

module.exports = require('./env/' + process.env.NODE_ENV + '.js');
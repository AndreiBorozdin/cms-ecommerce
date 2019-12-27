const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
firstName: {type: String, required: true},
lastName: {type: String, required: true},
email: {type: String, required: true, unique: true},
password: {type: String, required: true},
role: {type: String, default: 'user'},
});


module.exports = mongoose.model('users', usersSchema);
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const keys = require('./config/keys');
const { User } = require('./helpers/userClass');
const _ = require('lodash');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

require('./socket/streams')(io, User, _);

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error))

app.use(passport.initialize());
require('./middleware/passport')(passport);




app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(require('cors')());
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);







module.exports = app
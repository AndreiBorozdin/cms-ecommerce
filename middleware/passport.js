const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const keys = require('../config/keys')
const User = mongoose.model('users');
const Admin = mongoose.model('admin');
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(new JwtStrategy(opts, async (payload, done) => {
        try {
            const user = await User.findOne({_id: payload.userId}).select('email id');
            const admin = await Admin.findOne({_id:payload.adminId}).select('email id');
           if(admin){
                return done(null, admin)
            }
            else if (user) {
                return done(null, user)
            }

            else {
               return done(null, false)
            }
        } catch (e) {
            console.log(e)
        }
    }))
}
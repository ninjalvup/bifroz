const models = require("../models/index");
const passport = require('passport');
const config = require('../config/index')

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_KEY;
//opts.issuer = 'accounts.examplesoft.com';
//opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await models.User.findOne({
            where: {
              uuid: jwt_payload.uuid,
            },
        });

       if (!user) {
           return done(new Error('ไม่พบผู้ใช้ในระบบ'), null);
       }

       return done(null, user);

    } catch (error) {
        done(error);
    }
}));

module.exports.isLogin = passport.authenticate('jwt', { session: false });
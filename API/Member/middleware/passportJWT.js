// const config = require('../config/index');
// // const User = require('../models/user');
// const models = require('../models/index');
// const passport = require('passport');

// const JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt = require('passport-jwt').ExtractJwt;
// const opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = config.JWT_SECRET;
// //opts.issuer = 'accounts.examplesoft.com';
// //opts.audience = 'yoursite.net';
// passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
//     try {
//         console.log(jwt_payload.uuid);
//        const member = await models.Member.findOne({
//            where:{
//             uuid: jwt_payload.uuid
//            }
//        }); 

//        console.log(member.uuid);

//        if (!member) {
//            return done(new Error('ไม่พบผู้ใช้ในระบบ'), null);
//        }
     
//        console.log(member);
//        return done(null, member);

//     } catch (error) {
//         done(error);
//     }
// }));

// module.exports.isLogin = passport.authenticate('jwt', { session: false });

const config = require('../config/index');
const models = require("../models/index");
const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'Gq8UDMFbcXQiQtukJYdHhr5gv9KrjdDQp4u5Ekun7B7sKKcuJLm9cYIp1tjo9bT';
//opts.issuer = 'accounts.examplesoft.com';
//opts.audience = 'yoursite.net';
opts.secretOrKey = config.JWT_SECRET;
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const member = await models.Member.findOne({
            where: {
              uuid: jwt_payload.uuid,
            },
        });

       if (!member) {
           return done(new Error('ไม่พบผู้ใช้ในระบบ'), null);
       }
    

       return done(null, member);

    } catch (error) {
        done(error);
    }
}));

module.exports.isLogin = passport.authenticate('jwt', { session: false });
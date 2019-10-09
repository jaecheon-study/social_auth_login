// 토큰 검증을 위한 라이브러리
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
// jwt를 풀어줌
const { ExtractJwt } = require('passport-jwt');
// local Strategy
const LocalStrategy = require('passport-local');

const userModel = require('../../models/User');


// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    // 헤더에 담아서 보낸다.
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
}, async (payload, done) => {
    try {
        // Find the user specified(명시된) in token
        const user = await userModel.findById({ _id: payload.sub });

        // If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }

        // Otherwise(그렇지 않으면), return the user
        done(null, user);

    } catch(error) {
        done(error, false);
    }
}));
//
// // Local Strategy
// passport.use(new LocalStrategy({
//     userNameField: 'email'
// }, async (email, password, done) => {
//     try{
//         // Find the user given the email
//         const user = await userModel.findOne({ 'local.email': email });
//
//         // If not handle it
//         if (!user) {
//             return done(null, false);
//         }
//
//         // Check if the password is correct
//         isMatch = await user.isValidPassword(password);
//         // If not, handle it
//         if (!isMatch) {
//             return done(null, false);
//         }
//         // Otherwise, return the user
//         done(null, user);
//     } catch(error) {
//         done(error, false);
//     }
// }));

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {

    try{
        const user = await userModel.findOne({"local.email": email});

        // Check password
        const isMatch = await user.isValidPassword(password);

        //If not, handle it
        if(!isMatch){
            return done(null, false);
        }
        //Otherwise, return the user
        done(null, user);
    }catch (err) {
        done(error, false);
    }
}));




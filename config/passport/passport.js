// 토큰 검증을 위한 라이브러리
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
// jwt를 풀어줌
const { ExtractJwt } = require('passport-jwt');
// local Strategy
const LocalStrategy = require('passport-local');
// google Strategy
const GooglePlusTokenStrategy = require('passport-google-plus-token');
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
        done(err, false);
    }
}));

// Google
// passport.use('googleToken', new GooglePlusTokenStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET
// }, async (accessToken, refreshToken, profile, done) => {
//     console.log('profile', profile);
//     console.log('accessToken', accessToken);
//     console.log('refreshToken', refreshToken);
//     try {
//         // 이메일 유무 체크
//         const existingUser = await userModel.findOne({'google.id': profile.id});
//         if (existingUser) {
//             return done(null, existingUser);
//         }
//
//         // 유저가 없다면 저장
//         const newUser = new userModel({
//             method: 'google',
//             google: {
//                 id: profile.id,
//                 email: profile.emails[0].value
//             }
//         });
//
//         await newUser.save();
//         done(null, newUser);
//
//     } catch (e) {
//         done(e, false, e.message);
//     }
// }));
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET
}, async(accessToken, refreshToken, profile, done) => {
    // console.log('profile', profile);
    // console.log('accessToken', accessToken);
    // console.log('refreshToken', refreshToken);
    try{
        const existingUser = await userModel.findOne({"google.id": profile.id});
        if(existingUser){
            return done(null, existingUser);
        }
        const newUser = new userModel({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value,
                // photo: profile.photos[0].value
            }
        });
        await newUser.save();
        done(null, newUser);

    }catch(error){
        done(error, false, error.message)
    }


}));

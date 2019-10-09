const userModle = require('../models/User');
const JWT = require('jsonwebtoken');


// 토큰 생성
signToken = user => {
    return JWT.sign({
        iss: 'JcToken', // 발급자
        sub: user._id, // 발급자 아이디
        iat: new Date().getTime(), // 현재 시간
        exp: new Date().setDate(new Date().getDate() + 1)// 만료 시간
    }, process.env.SECRET);
}

module.exports = {
    signUp: async (req, res, next) => {
        console.log('UsersController.signUP() called...');
        // contents of req.value.body: { email: 'a1@test.com', password: '123456' }
        console.log('contents of req.value.body:', req.value.body);

        const { email, password } = req.value.body;

        const foundUser = await userModle.findOne({ 'local.email': email });
        // 이미 가입한 유저가 있다면 (email 이 있다면)
        if (foundUser) {
            return res.status(403).json({
                error: 'email is already is use'
            });
        }

        const newUser = new userModle({
            method: 'local',
            local: {
                email,
                password
            }
        });
        const token = signToken(newUser);
        await newUser.save()
            .then(user => {
                res.status(200).json({
                    user: 'created user',
                    userInfo: user,
                    tokenInfo: token
                });
            })
            .catch(err => console.log(err));
    },
    signIn: async (req, res) => {
        console.log('UsersController.signIn() called...');
        const token = signToken(req.user);
        res.status(200).json({
            tokenInfo: 'Bearer ' + token
        });
    },
    google: async (req, res) => {
        const token = signToken(req.user);
        res.status(200).json({
            tokenInfo: 'Bearer ' + token
        });
    },
    facebook: async (req, res) => {
        const token = signToken(req.user);
        res.status(200).json({
            tokenInfo: 'Bearer ' + token
        });
    },
    // 토큰 인증 확인
    secret: async (req, res) => {
        console.log('UsersController.secret() called...');
        res.json({secret: 'resource'});
    }
};

const userModle = require('../models/User');

module.exports = {
    signup: async (req, res, next) => {
        console.log('UsersController.signUP() called...');
        // contents of req.value.body: { email: 'a1@test.com', password: '123456' }
        console.log('contents of req.value.body:', req.value.body);

        const { email, password } = req.value.body;

        const foundUser = await userModle.findOne({ email });
        // 이미 가입한 유저가 있다면 (email 이 있다면)
        if (foundUser) {
            return res.status(403).json({
                error: 'email is already is use'
            });
        }

        const newUser = new userModle({ email, password });
        await newUser.save()
            .then(user => {
                res.status(200).json({
                    user: 'created user',
                    userInfo: user
                });
            })
            .catch(err => console.log(err));
    },
    signin: async (req, res, next) => {
        console.log('UsersController.signIn() called...');
    },
    secret: async (req, res, next) => {
        console.log('UsersController.secret() called...');
    }
};

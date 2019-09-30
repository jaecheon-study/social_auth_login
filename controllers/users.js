module.exports = {
    signup: async (req, res, next) => {
        console.log('UsersController.signUP() called...');
    },
    signin: async (req, res, next) => {
        console.log('UsersController.signIn() called...');
    },
    secret: async (req, res, next) => {
        console.log('UsersController.secret() called...');
    }
};

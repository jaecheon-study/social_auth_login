const router = require('express-promise-router')();
const userController = require('../controllers/users');
// validation
const {validateBody, schemas} = require('../helpers/routeHelpers');
const passport = require('passport');
const passportConf = require('../config/passport/passport');

const checkAuth = passport.authenticate('jwt', { session: false });


/**
 * @route   POST /users/signup
 * @desc    Test signup url
 * @access  Public
 */
router.route('/signup').post(validateBody(schemas.authSchema), userController.signUp);

/**
 * @route   POST /users/login
 * @desc    Test login url
 * @access  Public
 */
router.route('/login').post(userController.signIn);

/**
 * @route   GET /users/secret
 * @desc    Test secret url
 * @access  Private
 */
router.route('/secret').get(checkAuth, userController.secret);

module.exports = router;
const router = require('express-promise-router')();
const userController = require('../controllers/users');
// validation
const {validateBody, schemas} = require('../helpers/routeHelpers');
const passport = require('passport');
const passportConf = require('../config/passport/passport');

const checkAuth = passport.authenticate('jwt', { session: false });
const passportSignIn = passport.authenticate('local', {session: false});


/**
 * @route   POST /users/signup
 * @desc    SignIp url
 * @access  Public
 */
router.route('/signup').post(validateBody(schemas.authSchema), userController.signUp);

/**
 * @route   POST /users/login
 * @desc    Login url
 * @access  Public
 */
router.route('/login').post(passportSignIn, userController.signIn);

/**
 * @route   POST /users/google
 * @desc    Google Login Url
 * @access  Public
 */
router.route('/google').post(userController.google);

/**
 * @route   POST /users/facebook
 * @desc    Facebook Login Url
 * @access  Public
 */
router.route('/facebook').post(userController.facebook);

/**
 * @route   GET /users/secret
 * @desc    Secret url
 * @access  Private
 */
router.route('/secret').get(checkAuth, userController.secret);

module.exports = router;
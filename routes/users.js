const router = require('express-promise-router')();
const userController = require('../controllers/users');
// validation
const {validateBody, schemas} = require('../helpers/routeHelpers');

/**
 * @route   POST /users/signup
 * @desc    Test signup url
 * @access  Public
 */
router.route('/signup').post(validateBody(schemas.authSchema), userController.signup);

/**
 * @route   POST /users/login
 * @desc    Test login url
 * @access  Public
 */
router.route('/login').post(userController.signin);

/**
 * @route   GET /users/secret
 * @desc    Test secret url
 * @access  Private
 */
router.route('/secret').get(userController.secret);

module.exports = router;
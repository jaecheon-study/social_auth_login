const router = require('express-promise-router')();
const userController = require('../controllers/users');

/**
 * @route   POST /users/signup
 * @desc    Test signup url
 * @access  Public
 */
router.route('/signup').post(userController.signup);

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
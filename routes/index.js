const router = require('express').Router();

router.use('auth', require('../apiServices/Auth/auth.routes'));
router.use('/users', require('../apiServices/users/routes'));
router.use('/tasks', require('../apiServices/tasks/routes'));

module.exports = router;
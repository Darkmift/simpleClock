const { Router } = require('express');
const router = Router();

const { findUser, loginUser, logoutUser } = require('./user.controller');

router.post('/exists', findUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;
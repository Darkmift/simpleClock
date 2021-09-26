var { Router } = require('express');
var router = Router();

router.get('/', (req, res) => {
  res.send('api working');
});

const userRoutes = require('./api/user/user.routes');
router.use('/user', userRoutes);

module.exports = router;
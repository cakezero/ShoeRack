const express = require('express');
const RNLC = require('../controllers/rnlc')

const router  = express();

router.get('/register', RNLC.register);
router.post('/register', RNLC.register_post);
router.get('/login', RNLC.login);
router.post('/login', RNLC.login_post);
router.get('/logout', RNLC.logout);

module.exports = router;


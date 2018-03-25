const express = require('express');
const router = express.Router();
const group = require('./group');
const habit = require('./habit');

router.use('/group', group);
router.use('/habit', habit);

module.exports = router;

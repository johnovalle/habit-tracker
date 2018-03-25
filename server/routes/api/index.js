const express = require('express');
const router = express.Router();
const group = require('./group');
const habit = require('./habit');
const entry = require('./entry');

router.use('/group', group);
router.use('/habit', habit);
router.use('/entry', entry);

module.exports = router;

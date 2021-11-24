const express = require('express');

const router = express.Router();

router.get('/make', (req, res) => {
    res.send('Already making a drink.');
});

module.exports = router;
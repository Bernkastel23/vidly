const express = require('express');
const router = express.Router();

//GET
router.get('/', (req, res) => {
	res.send('Hello Hello');
});

module.exports = router;
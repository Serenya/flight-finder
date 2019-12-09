const express = require('express');
const router = express.Router();
const application = require('../../../application');

router.get('/', async function(req, res) {
  try {
    res.send(await application.fetchFlights());
  }
  catch (e) {
    res.send(e.message);
  }
});

module.exports = router;

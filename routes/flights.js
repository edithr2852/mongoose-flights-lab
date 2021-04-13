const express = require('express');
const { route } = require('.');
const router = express.Router();
const flightsCtrl = require('../controllers/flights');


router.get('/', flightsCtrl.index);

router.get('/new', flightsCtrl.new);

router.get('/:id', flightsCtrl.show);

router.post('/', flightsCtrl.create);


module.exports = router;
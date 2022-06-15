var express = require('express');
var router = express.Router();
var phongController = require('../controllers/phong.controller.api');
router.get('/getall', phongController.GetAll);
module.exports = router;
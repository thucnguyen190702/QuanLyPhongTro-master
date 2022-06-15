var phongController = require('../controllers/phong.controller');
var express = require('express');
var multer = require('multer');
const authMiddleware = require("../middleware/auth.midddleware");
var router = express.Router();

router.get('/list',authMiddleware.LoginRequire, phongController.getListPhong);
router.get('/add',authMiddleware.LoginRequire, phongController.getAddPhong);
router.post('/add',authMiddleware.LoginRequire, phongController.postAddPhong);
router.get('/edit:id',authMiddleware.LoginRequire, phongController.getEdit);
router.post('/edit:id',authMiddleware.LoginRequire, phongController.postEdit);
router.get('/delete:id',authMiddleware.LoginRequire, phongController.getDeletePhong);
router.post('/delete:id',authMiddleware.LoginRequire, phongController.postDeletePhong);
var multerupload = multer({dest: './tmp/'});
router.get('/image/:id', phongController.getPhoto);
router.post('/image/:id', multerupload.array('hinhanh', 10),phongController.postAddPhoto);
module.exports = router;
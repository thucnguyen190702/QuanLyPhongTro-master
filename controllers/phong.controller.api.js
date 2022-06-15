var PhongModelApi = require('../models/phong.model');
exports.GetAll = async (req, res, next) => {
    var listPhong = await PhongModelApi.find();
    res.json(listPhong);
}
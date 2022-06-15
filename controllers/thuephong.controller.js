var ThuePhong = require('../models/thuephong.model');
var Phong = require('../models/phong.model');
var KhachHang = require('../models/khachhang.model');
exports.getListTP = async (req, res, next) => {
    let listTP = await ThuePhong.find();
    console.log(listTP);
    res.render('./thuephong/list', {
        listTP: listTP
    });
}
exports.getAddTP = async (req, res, next) => {
    let listPhong = await Phong.find();
    let listKhachHang = await KhachHang.find();
    console.log('a' + listPhong);
    console.log('b' + listKhachHang);
    res.render('./thuephong/add', {listPhong: listPhong, listKhachHang: listKhachHang,title:'Thêm thuê phòng'});
}
exports.postAddTP = async (req, res, next) => {
    console.log(req.body);
    let objThuePhong = new ThuePhong({
        idphong: req.body.idphong,
        idkhachhang: req.body.idkhachhang,
        giaphong: req.body.giaphong,
        tiendatcoc: req.body.tiendatcoc,
        ngaythue: req.body.ngaythue,
        ngaytra: req.body.ngaytra,
        tienthanhtoan: req.body.tienthanhtoan
    });
    await objThuePhong.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Thêm thành công");
            res.redirect('/thuephong/list');
        }
    });
}
exports.getEditTP = async (req, res, next) => {
    let thuephong = await ThuePhong.findById(req.params.id).exec().catch(function (err) {
        console.log(err);
    });
    if (thuephong == null) {
        res.send('Khong tim thay thue phong');
    }
    res.render('./thuephong/edit', {thuephong: thuephong,title:'Sửa thuê phòng'});
}
exports.postEditTP = function (req, res) {
    let dieukien = {
        _id: req.params.id
    };
    console.log(dieukien);
    let data = {

        idkhachhang: req.body.idkhachhang,
        idphong: req.body.idphong,
        giaphong: req.body.giaphong,
        tiendatcoc: req.body.tiendatcoc,
        ngaythue: req.body.ngaythue,
        ngaytra: req.body.ngaytra,
        tienthanhtoan: req.body.tienthanhtoan
    };
    ThuePhong.updateOne(dieukien, data, function (err) {
        if (err) {
            res.send('Update ERROR !' + err.message);
        }

    });
    console.log('Sua thanh cong');
    res.redirect('/thuephong/list');
}
exports.getDeleteTP = async (req, res, next) => {

    let thuephong = await ThuePhong.findById(req.params.id).exec().catch(function (err) {
        console.log(err);
    });
    if (thuephong == null) {
        res.send('Khong tim thay thue phong');
    }
    res.render('./thuephong/delete', {thuephong: thuephong,title:'Xóa thuê phòng'});
}
exports.postDeleteTP = async (req, res, next) => {
    let dieukien = {
        _id: req.params.id
    };
    ThuePhong.deleteOne(dieukien, function (err) {
        if (err) {
            res.send('Delete ERROR !' + err.message);
        }
        console.log('Xóa thành công');
        res.redirect('/thuephong/list');
    })
}
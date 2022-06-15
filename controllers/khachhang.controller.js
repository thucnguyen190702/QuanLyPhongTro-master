var KhachHang = require('../models/khachhang.model');

//getLis
exports.getListKH = async (req, res, next) => {
    let listKH = await KhachHang.find();
    res.render('./khachhang/list', {listKH: listKH,title: 'Danh sách khách hàng'});
}
exports.getAddKH = (req, res, next) => {
    res.render('./khachhang/add', {title: 'Thêm khách hàng'});
}
exports.postAddKH = async (req, res, next) => {
    let khachhang = new KhachHang({
        tenkhachhang: req.body.tenkhachhang,
        namsinh: req.body.namsinh,
        sdt: req.body.sdt,
        socmnd: req.body.socmnd,
        biensoxe: req.body.biensoxe,
        quequan: req.body.quequan,
        hktt: req.body.hktt,
        soluong: req.body.soluong,
    });
    await khachhang.save(function (err) {
        if (err) {
            console.log(err);
            return;
        }else{
            console.log("Thêm thành công");
            res.redirect('/khachhang/list');
        }
    });
}
exports.getEditKH = async (req, res, next) => {
    let khachhang = await KhachHang.findById(req.params.id).exec().catch(function (err) {
        console.log(err);
    });
    if (khachhang==null) {
        res.send('Không tìm thấy khách hàng');
    }
    res.render('./khachhang/edit', {khachhang: khachhang,title: 'Sửa khách hàng'});
}
exports.postEditKH = (req, res, next) => {
    let dieukien = {
        _id: req.params.id,
    }
    console.log(dieukien)
let data ={
    tenkhachhang : req.body.tenkhachhang,
    namsinh : req.body.namsinh,
    sdt : req.body.sdt,
    socmnd : req.body.socmnd,
    biensoxe : req.body.biensoxe,
    quequan : req.body.quequan,
    hktt : req.body.hktt,
    soluong: req.body.soluong,
}
    console.log(data);
    KhachHang.updateOne(dieukien, data, function (err,res) {
        if (err) {
            res.send('Update ERROR !' + err.message);
        }

    });
    console.log("Sửa thành công");
    res.redirect('/khachhang/list');
}
exports.getDeleteKH = async (req, res, next) => {
    let khachhang = await KhachHang.findById(req.params.id).exec().catch(function (err) {
        console.log(err);
    });
    if (khachhang==null) {
        res.send('Không tìm thấy khách hàng');
    }
    res.render('./khachhang/delete', {khachhang: khachhang,title: 'Xóa khách hàng'});
}
exports.postDeleteKH = async (req, res, next) => {
    let dieukien = {
        _id: req.params.id,
    }
    await KhachHang.deleteOne(dieukien, function (err) {
        if (err) {
            console.log(err);
            return;
        }else{
            console.log("Xóa thành công");
            res.redirect('/khachhang/list');
        }
    });
}
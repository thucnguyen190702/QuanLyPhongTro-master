var PhongModel = require('../models/phong.model');
var LoaiPhong = require('../models/loaiphong.model');
const {resolve} = require("path");
// const multer = require("multer");
const fs = require("fs");
exports.getListPhong = async (req, res, next) => {
    let phong = await PhongModel.find();
    res.render('phong/list', {
        phong: phong
    });
}
exports.getListLP = async function (req, res) {
    res.render('./phong/add',);
};
exports.getAddPhong = async (req, res, next) => {
    let listLP = await LoaiPhong.find();
    console.log(listLP);

    res.render('./phong/add', {listLP: listLP,title: 'Thêm phòng'});
}

exports.postAddPhong = async (req, res, next) => {
    let phong = new PhongModel({
        idloaiphong: req.body.idloaiphong,
        tenphong: req.body.tenphong,
        tinhtrang: req.body.tinhtrang,
        giaphong: req.body.giaphong, // hinhanh: req.body.hinhanh,
        mota: req.body.mota,
    });
    console.log(phong);
    await phong.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Them thanh cong');
        }
    });
    res.redirect('/phong/list');
}
exports.getPhoto = async (req, res, next) => {
    res.render('phong/image');
}
exports.postAddPhoto = async (req, res, next) => {
    function removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
        str = str.replace(/\u02C6|\u0306|\u031B/g, "");
        str = str.trim();
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        return str;
    }

    let condition = {_id: req.params.id};
    const phongs = await PhongModel.findById(req.params.id).exec().catch(err => {
        console.log(err);
    });
    console.log(phongs);
    if (phongs == null) {
        return log("Phong not found");
    }
    console.log(req.files);
    const imageDirPath = resolve(__dirname, '../tmp');
    const files = fs.readdirSync(imageDirPath);
    const nameFolder = phongs.tenphong.replace("", '-');
    let newNameDir = removeVietnameseTones(nameFolder);
    var dir = './public/uploads/' + newNameDir;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        console.log("Create folder: " + dir);
    } else {
        console.log("Directory already exist");
    }
    let nameImages = [];
    let date = Date.now();
    await files.forEach((file, index) => {
        fs.renameSync(imageDirPath + `/${file}`, './public/uploads/' + newNameDir + '/' + date + "hinhanh" + index + ".png", function (err) {
            if (err) {
                console.log(err);
            }
        })
    });
    const files_info = req.files;
    nameImages = files_info.map((file, index) => "/uploads/" + newNameDir + '/' + date + "hinhanh" + index + ".png");
    // req.session.listing = nameImages;
    let phongObj = {
        idloaiphong: phongs.idloaiphong,
        tenphong: phongs.tenphong,
        tinhtrang: phongs.tinhtrang,
        giaphong: phongs.giaphong,
        hinhanh: nameImages,
        mota: phongs.mota,
    }
    PhongModel.updateOne(condition, phongObj, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Thanh cong");
        }
    });

    return res.redirect('/phong/list');

}
exports.getEdit = async (req, res, next) => {
    const phong = await PhongModel.findById(req.params.id).exec().catch(err => {
        console.log(err);
    });
    if (phong == null) {
        return log("Phong not found");
    }
    res.render('phong/edit', {phong: phong,title: 'Sửa Phong'});
}
exports.postEdit = (req, res, next) => {
    let dieukien = {_id: req.params.id};
    let phongObj = {
        idloaiphong: req.body.idloaiphong,
        tenphong: req.body.tenphong,
        tinhtrang: req.body.tinhtrang,
        giaphong: req.body.giaphong, // hinhanh: req.body.hinhanh,
        mota: req.body.mota,
    }
    PhongModel.updateOne(dieukien, phongObj, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Thanh cong");
        }
    })
    res.redirect('/phong/list');
}
exports.getDeletePhong = async (req, res, next) => {
    let phongs = await PhongModel.findById(req.params.id).exec().catch(err => {
        console.log(err);
    });
    console.log(phongs);
    if (phongs == null) {
        res.send('Khong tim thay ban ghi');
    }

    res.render('./phong/delete',{phongs: phongs,title: 'Xóa Phong'});
}
exports.postDeletePhong = async (req, res, next) => {
let dieukien = {_id: req.params.id};
    PhongModel.deleteOne(dieukien, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Thanh cong");
        }
    })
    res.redirect('/phong/list');
}
exports.postSearchPhong = async (req, res, next) => {

}

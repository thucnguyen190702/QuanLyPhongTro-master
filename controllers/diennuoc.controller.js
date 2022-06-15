var DienNuoc = require('../models/diennuoc.model');
var DichVu = require('../models/dichvu.model');
var Phong = require('../models/phong.model');
exports.getListDN = async function (req, res) {
    let listDN = await DienNuoc.find();
    res.render('./diennuoc/list', {listDN: listDN});
}
exports.getAddDN = async function (req, res) {
    let listDV = await DichVu.find();
    let listPhong = await Phong.find();
    res.render('./diennuoc/add',{listPhong: listPhong,listDV: listDV,title: 'Thêm điên nước'});
}
exports.postAddDN = async function (req, res) {
    const diennuoc = new DienNuoc({
        idphong: req.body.idphong,
        iddichvu: req.body.iddichvu,
        tungay: req.body.tungay,
        denngay: req.body.denngay,
        chisodiencu: req.body.chisodiencu,
        chisodienmoi: req.body.chisodienmoi,
        chisonuoccu: req.body.chisonuoccu,
        chisonuocmoi: req.body.chisonuocmoi,
        dongiadien: req.body.dongiadien,
        dongianuoc: req.body.dongianuoc,
        dathanhtoan: req.body.dathanhtoan,
    });
    await diennuoc.save(function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    console.log('Them thanh cong');
    res.redirect('/diennuoc/list');
}
exports.getEditDN = async function (req, res) {
    let diennuoc = await DienNuoc.findById(req.params.id).exec().catch(err => {
        console.log(err);
    });
    console.log(diennuoc);
    if (diennuoc==null) {
        res.send('Không tìm thấy dịch vụ');
    }
    res.render('./diennuoc/edit', {diennuoc: diennuoc,title: 'Sửa điện nước'});
}
exports.postEditDN =  function (req, res) {
    const data = {
        idphong: req.body.idphong,
        iddichvu: req.body.iddichvu,
        tungay: req.body.tungay,
        denngay: req.body.denngay,
        chisodiencu: req.body.chisodiencu,
        chisodienmoi: req.body.chisodienmoi,
        chisonuoccu: req.body.chisonuoccu,
        chisonuocmoi: req.body.chisonuocmoi,
        dongiadien: req.body.dongiadien,
        dongianuoc: req.body.dongianuoc,
        dathanhtoan: req.body.dathanhtoan,
    };
    console.log(data);
    const dieukien = {
        _id: req.params.id
    };
    console.log(dieukien);
    DienNuoc.updateOne(dieukien, data, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    console.log('Sua thanh cong');
    res.redirect('/diennuoc/list');
}
exports.getDeleteDN = async function (req, res) {
    let diennuoc = await DienNuoc.findById(req.params.id).exec().catch(err => {
        console.log(err);
    });
    if (diennuoc == null) {
        res.send('Không tìm thấy dịch vụ');
    }
    res.render('./diennuoc/delete', {diennuoc: diennuoc,title: 'Xóa điện nước'});
}
exports.postDeleteDN = function (req, res) {
    const dieukien = {
        _id: req.params.id
    };
    DienNuoc.deleteOne(dieukien, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    console.log('Xoa thanh cong');
    res.redirect('/diennuoc/list');
}
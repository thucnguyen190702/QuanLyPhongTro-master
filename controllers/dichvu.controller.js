var DichVu = require('../models/dichvu.model');

exports.getListDV = async function (req, res) {
    let listDV =await DichVu.find();
    res.render('./dichvu/list', {listDV: listDV});
};
exports.getAddDV = function (req, res) {
    res.render('./dichvu/add',{title:'Thêm dịch vụ'});
};
exports.postAddDV = async function (req, res) {

    const dichvu = new DichVu({
        tendichvu: req.body.tendichvu,
        giadichvu: req.body.giadichvu,
        motadichvu: req.body.motadichvu,
    });
    await dichvu.save(function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    console.log('Them thanh cong');
    res.redirect('/dichvu/list');
};
exports.getEditDV = async function (req, res) {
    let dichvu = await DichVu.findById(req.params.id).exec().catch(err => {
        console.log(err);
    });
    if (dichvu==null) {
        res.send('Khoong tim thay dich vu');
    }
    res.render('./dichvu/edit', {dichvu: dichvu, title: 'Sửa dịch vụ'});
};
exports.postEditDV =  function (req, res) {
    const data = {
        tendichvu: req.body.tendichvu,
        giadichvu: req.body.giadichvu,
        motadichvu: req.body.motadichvu,
    };
    console.log(data);
    const dieukien = {
        _id: req.params.id
    };
    console.log(dieukien);
    DichVu.updateOne(dieukien, data, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    console.log('Sua thanh cong');
    res.redirect('/dichvu/list');
};
exports.getDeleteDV = async function (req, res) {
    let dichvu = await DichVu.findById(req.params.id).exec().catch(function (err) {
        console.log(err);
    });
    if (dichvu==null) {
        res.send('Không tìm thấy dịch vụ');
    }
    res.render('./dichvu/delete', {dichvu: dichvu, title: 'Xóa dịch vụ'});
};
exports.postDeleteDV = async function (req, res) {
    const dieukien = {
        _id: req.params.id
    };
    await DichVu.deleteOne(dieukien, function (err) {
        if (err) {
            console.log(err);
            return;
        }else {
            console.log('Xoa thanh cong');
            res.redirect('/dichvu/list');
        }
    });
};
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thucnguyen1907:thucnguyen1907@cluster0.k8cgd.mongodb.net/quanlyphongtro');
const phongSchema =new mongoose.Schema({
    idloaiphong: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoaiPhong'
    },
    tenphong: 'String',
    tinhtrang : 'String',
    giaphong : 'Number',
    hinhanh:Array,
    mota:'String',
});
const Phong = mongoose.model('Phong', phongSchema);
module.exports = Phong;
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thucnguyen1907:thucnguyen1907@cluster0.k8cgd.mongodb.net/quanlyphongtro');
const loaiPhongSchema = new mongoose.Schema({
    tenloaiphong: 'String'
});
const LoaiPhong = mongoose.model('LoaiPhong', loaiPhongSchema);
module.exports = LoaiPhong;
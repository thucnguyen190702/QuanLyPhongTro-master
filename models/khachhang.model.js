const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thucnguyen1907:thucnguyen1907@cluster0.k8cgd.mongodb.net/quanlyphongtro');
const khachHangSchema = mongoose.Schema({
    tenkhachhang: 'String',
    namsinh:'String',
    sdt: 'String',
    socmnd: 'String',
    biensoxe: 'String',
    quequan: 'String',
    hktt: 'String',
    soluong: Number,

});
const KhachHang = mongoose.model('KhachHang', khachHangSchema);
module.exports = KhachHang;
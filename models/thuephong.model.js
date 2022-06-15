const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thucnguyen1907:thucnguyen1907@cluster0.k8cgd.mongodb.net/quanlyphongtro');
const thuePhongSchema = mongoose.Schema({
    idkhachhang: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'KhachHang'
    },
    idphong: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phong'
    },
    giaphong: 'Number',
    tiendatcoc: 'Number',
    ngaythue: 'String',
    ngaytra: 'String',
    tienthanhtoan: 'Number'
});
const ThuePhong = mongoose.model('ThuePhong', thuePhongSchema);
module.exports = ThuePhong;
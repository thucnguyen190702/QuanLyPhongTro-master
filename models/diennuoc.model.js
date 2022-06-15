const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thucnguyen1907:thucnguyen1907@cluster0.k8cgd.mongodb.net/quanlyphongtro');
const dienNuocSchema = new mongoose.Schema({
    idphong: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phong'
    },
    iddichvu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DichVu'
    },
    tungay: 'String',
    denngay: 'String',
    chisodiencu: 'Number',
    chisodienmoi: 'Number',
    chisonuoccu: 'Number',
    chisonuocmoi: 'Number',
    dongiadien: 'String',
    dongianuoc: 'String',
    dathanhtoan: 'String',
});
const DienNuoc = mongoose.model('DienNuoc', dienNuocSchema);
module.exports = DienNuoc;
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thucnguyen1907:thucnguyen1907@cluster0.k8cgd.mongodb.net/quanlyphongtro');
const dichvuSchema = new mongoose.Schema({
    tendichvu: 'String',
    giadichvu: 'Number',
    motadichvu: 'String'
});
const DichVu = mongoose.model('DichVu', dichvuSchema);
module.exports = DichVu;
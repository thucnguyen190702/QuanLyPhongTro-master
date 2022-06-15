const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thucnguyen1907:thucnguyen1907@cluster0.k8cgd.mongodb.net/quanlyphongtro');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const hiddenString = process.env.TOKEN_SEC_KEY;
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    fullname: 'String',
    email: 'String',
    password: 'String',
    tokens: [{
        token: {
            type: String,
            require: true,
        }
    }]
});
/**
 * Hàm tạo token để đăng nhập với API
 * @returns {Promise<*>}
 */
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id}, hiddenString);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}
/**
 * Hàm tìm kiếm user theo tài khoản
 * @param username
 * @param passwd
 * @returns {Promise<*>}
 */
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if (!user) {
        throw new Error({error: 'Invalid login credentials'})
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({error: 'Invalid login credentials'})
    }
    return user;
}
const User = mongoose.model('User', userSchema);
module.exports = User;
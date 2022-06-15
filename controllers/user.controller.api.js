let UserModel = require('../models/user.model');
var bcrypt = require('bcrypt');
//đăng kí user
exports.postRegister = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const objUser = new UserModel(req.body);
        console.log(req.body);
        objUser.password = await bcrypt.hash(req.body.password, salt);
        await objUser.save();
        const token = await objUser.generateAuthToken();
        res.status(201).send({objUser, token});
    }catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
//đăng nhập user
exports.postLogin = async (req, res, next) => {
    try {
        const user = await UserModel.findByCredentials(req.body.email, req.body.password);
        console.log(user);
        if (!user) {
            return res.status(401).send({error: 'Login failed ! Check authentication credentials'})
        }
        const token = await user.generateAuthToken();
        res.status(200).send({user, token});
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
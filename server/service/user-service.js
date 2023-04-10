const UserModel = require('../models/user-model');
const bcrypt = require('bctypt');
const uuid = require('uuid');
const mailService = require('./mail-service');

class UserService {
  async registration(email, password) {
    const candidate = await userModel.findOne({ email });
    if (candidate) {
      throw new Error(`User with this email ${email} address already exists`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({ email, password: hashPassword, activationLink });
    await mailService.sendActivationMail(email, activationLink);
  }
}

module.exports = new UserService();

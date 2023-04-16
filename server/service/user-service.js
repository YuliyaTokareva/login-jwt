const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exeptions/api-error');

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`User with this email ${email} address already exists`);
    } //audit if candidate is in DB
    const hashPassword = await bcrypt.hash(password, 3); //do hash
    const activationLink = uuid.v4(); //do link for actovation
    const user = await UserModel.create({ email, password: hashPassword, activationLink });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    ); //save user to BD

    const userDto = new UserDto(user); //id,email,isActivated. send letter to activation
    const tokens = tokenService.generateTokens({ ...userDto }); //genetrate tokens
    await tokenService.saveToken(userDto.id, tokens.refreshToken); // save refreshToken to BD
    return {
      ...tokens,
      user: userDto
    };
  }
  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('Incorrect activation link');
    }

    user.isActived = true;
    await user.save();
  }
  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest('User with this email not found');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Incorect password');
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken); // save refreshToken to BD
    return {
      ...tokens,
      user: userDto
    };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
}

module.exports = new UserService();

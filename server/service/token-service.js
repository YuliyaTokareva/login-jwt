const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30d' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken
    };
  }
  validateAccesToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      console.log('refresh valide', userData);
      return userData;
    } catch (e) {
      console.log('is null refresh');
      return null;
    }
  }
  // validateRefreshToken(token) {
  //   try {
  //     const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  //     return userData;
  //   } catch (e) {
  //     if (e instanceof jwt.TokenExpiredError) {
  //       throw new ApiError.UnauthorizedError('Refresh token expired');
  //     }
  //     if (e instanceof jwt.JsonWebTokenError) {
  //       throw new ApiError.UnauthorizedError('Invalid refresh token');
  //     }
  //     throw e;
  //   }
  // }
  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }
  async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }
  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ refreshToken });
    console.log('is user BD', tokenData);
    return tokenData;
  }
}

module.exports = new TokenService();

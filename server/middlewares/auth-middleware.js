const ApiError = require('../exeptions/api-error');
const tokenService = require('../service/token-service');
module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnautorizedError());
    }
    console.log('header', authorizationHeader);
    const accessToken = authorizationHeader.split(' ')[1];
    console.log('TTTTOKEN', accessToken);
    if (!accessToken) {
      return next(ApiError.UnautorizedError());
    }
    const userData = tokenService.validateAccesToken(accessToken);
    // console.log(userData);
    if (!userData) {
      return next(ApiError.UnautorizedError());
    }
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnautorizedError());
  }
};

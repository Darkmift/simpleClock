const userService = require('./user.service');
const { CustomError } = require('../../services/ErrorHandlers.service');

async function findUser(req, res, next) {
  try {
    const { uniqueId } = req.body;
    if (!uniqueId) {
      throw new CustomError(400, 'uniqueId required');
    }
    const [user, error] = await userService.findUser({ uniqueId });

    if (error) throw new CustomError(400, error);
    res.json({ user });
  } catch (error) {
    next(error);
  }
}

async function loginUser(req, res, next) {
  try {
    const { uniqueId, asManager } = req.body;
    if (!uniqueId) {
      throw new CustomError(400, 'uniqueId required');
    }
    const [user, error] = await userService.loginUser({ uniqueId, asManager });
    if (error.authError) {
      return res.json({ error: error.authError });
    } else if (error) {
      throw new CustomError(400, error);
    }
    res.json({ user });
  } catch (error) {
    next(error);
  }
}

async function logoutUser(req, res, next) {
  try {
    const { uniqueId } = req.body;
    if (!uniqueId) {
      throw new CustomError(400, 'uniqueId required');
    }
    const [logoutSuccess, error] = await userService.logoutUser({ uniqueId });
    if (error) throw new CustomError(400, error);
    res.json({ logoutSuccess });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  findUser,
  loginUser,
  logoutUser
};
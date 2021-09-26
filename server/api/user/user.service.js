const User = require('../../Models/User')

async function findUser({ uniqueId }) {
  try {
    const user = await User.findOne({ uniqueId });
    return [user, null]
  } catch (error) {
    return [null, error];
  }
}

async function loginUser({ uniqueId, asManager }) {
  try {
    const user = await User.findOne({ uniqueId });
    if (!user.isManager && asManager) {
      return [null, 'not a manager']
    } else {
      user.loggedAsManager = true;
    }
    user.isLogged = true;
    await user.save()
    return [user, null]
  } catch (error) {
    return [null, error];
  }
}

async function logoutUser({ uniqueId, asManager }) {
  try {
    const user = await User.findOne({ uniqueId });
    user.loggedAsManager = false;
    user.isLogged = false;
    await user.save()
    return [true, null]
  } catch (error) {
    return [null, error];
  }
}



module.exports = {
  findUser,
  loginUser,
  logoutUser
};
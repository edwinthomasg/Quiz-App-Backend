const { addRefreshToken } = require('../repository/user.repository');

const getUserToken = async(user) => {
  const token = user.generateJsonToken();
  const refreshToken = user.generateRefreshToken();
  await addRefreshToken(user._id, refreshToken)
  const options = {
    expires: new Date(Date.now() + 2 * 60 * 1000),
    httpOnly: true,
  };
  return {
    token,
    refreshToken,
    options,
  };
};

module.exports = getUserToken
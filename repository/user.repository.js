const User = require("../model/user");

createUser = async (credential, _id) => {
  return new User({
    ...credential,
    role: _id,
  });
};

const saveUser = async (user) => {
  await user.save();
};

const getUserByEmail = async (credential) => {
  return await User.findOne({ email: credential.email }, { __v: 0 });
};

const getUserById = async (userId) => {
  return await User.findOne({ _id: userId }, { __v: 0 });
};

const addRefreshToken = async (userId, refreshToken) => {
  await User.updateOne({ _id: userId }, { $push: { refreshToken } });
};

const getRefreshTokenById = async (userId) => {
  return await User.findOne({ _id: userId }, { refreshToken: 1, _id: 0 });
};

module.exports = {
  createUser,
  saveUser,
  getUserByEmail,
  getUserById,
  addRefreshToken,
  getRefreshTokenById
};

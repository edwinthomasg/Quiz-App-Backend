const {authenticate, authenticateUser} = require("../../helpers/authenticate");
const { getRoleId } = require("../../repository/role.repository");
const {
  saveUser,
  getUserByEmail,
  createUser,
} = require("../../repository/user.repository");
const getUserToken = require("../../utils/token");

const registerResolver = async (_, { credential }) => {
  const { _id } = await getRoleId();
  const user = await createUser(credential, _id);
  await saveUser(user);
  return {
    status: 201,
    message: "Successfully Registered",
  };
};

const loginResolver = async (_, { credential }) => {
  const user = await getUserByEmail(credential);
  authenticate(user, credential);
  const { token, refreshToken } = await getUserToken(user);
  return { status: 200, token, refreshToken };
};


module.exports = {
  registerResolver,
  loginResolver,
};

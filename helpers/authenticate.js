const { getUserById } = require("../repository/user.repository");

const authenticate = (user, credential) => {
  if (!user) throw "No user exist with this email id";
  if (user.password !== credential.password) throw "Password doesn't match";
};

const authenticateUser = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw "UnAuthorized";
  }
};

module.exports = { authenticate, authenticateUser };

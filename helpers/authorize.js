const { default: jwtDecode } = require("jwt-decode");
const Role = require("../model/role");

const authorize = async (token) => {
  const decodedToken = jwtDecode(token);
  const { role } = await Role.findOne(
    { _id: decodedToken.role },
    { role: 1, _id: 0 }
  );
  return role;
};

module.exports = authorize;

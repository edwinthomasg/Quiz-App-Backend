const Role = require('../model/role')

const getRoleId = async() => {
    return await Role.findOne({ role: "user" }, { _id: 1 });
}

module.exports = {
    getRoleId
}
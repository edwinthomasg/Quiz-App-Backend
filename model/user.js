const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref: 'Role',
        required: false
    },
    refreshToken: {
        type: Array,
        required: false
    }
})

UserSchema.methods.generateJsonToken = function(){
    return jwt.sign({id: this._id, role: this.role}, 'secret', {
        expiresIn: '60000'
    })
}

UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign({id: this._id, role: this.role}, 'refreshtoken')
}
module.exports = mongoose.model('User', UserSchema)
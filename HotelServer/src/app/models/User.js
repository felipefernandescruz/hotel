const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const mongoosePaginate = require('mongoose-paginate')

const UserModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  isHotel: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

UserModel.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 8)
})

UserModel.methods = {
  compareHash (password) {
    return bcrypt.compare(password, this.password)
  }
}

UserModel.statics = {
  generateToken ({ id, isHotel }) {
    return jwt.sign({ id, isHotel }, authConfig.secret, {
      expiresIn: authConfig.ttl
    })
  }
}

UserModel.plugin(mongoosePaginate)

module.exports = mongoose.model('User', UserModel)

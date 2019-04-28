const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const HotelModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  classification: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  vacancy: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

HotelModel.plugin(mongoosePaginate)

module.exports = mongoose.model('Hotel', HotelModel)

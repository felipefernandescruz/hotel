const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const RentModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  dateRent: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

RentModel.plugin(mongoosePaginate)

module.exports = mongoose.model('Rent', RentModel)

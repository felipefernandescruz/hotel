const Rent = require('../models/Rent')

class RentController {
  async getAll (req, res) {
    const filters = {}

    filters.userId = req.userId

    const rents = await Rent.paginate(filters, {
      page: req.query.page || 1,
      limit: 10,
      populate: ['userId', 'hotelId'],
      sort: '-createdAt'
    })

    return res.json(rents)
  }

  async rentUserHotel (req, res) {
    const rent = await Rent.create({ ...req.body, userId: req.userId })

    return res.json(rent)
  }
}

module.exports = new RentController()

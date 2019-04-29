const Hotel = require('../models/Hotel')

class HotelController {
  async getAll (req, res) {
    const filters = {}

    if (req.query.price_min || req.query.price_max) {
      filters.price = {}

      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min
      }

      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max
      }
    }

    if (req.query.classification_min) {
      filters.classification = {}
      filters.classification.$gte = req.query.classification_min
    }

    if (req.query.date_min || req.query.date_max) {
      filters.date = {}

      if (req.query.date_min) {
        filters.date.$gte = req.query.date_min
      }

      if (req.query.date_max) {
        filters.date.$lte = req.query.date_max
      }
    }

    if (req.query.owner.name) {
      filters.name = new RegExp(req.query.name)
    }

    if (req.query.city) {
      filters.city = new RegExp(req.query.city)
    }

    const hotels = await Hotel.paginate(filters, {
      page: req.query.page || 1,
      limit: 10,
      populate: ['owner'],
      sort: '-createdAt'
    })

    return res.json(hotels)
  }

  async getByKey (req, res) {
    const hotel = await Hotel.findById(req.params.id)

    return res.json(hotel)
  }

  async hotelCreate (req, res) {
    if (!req.isHotel) {
      return res
        .status(400)
        .json({ error: 'usuário não permitido para cadastrar hotel' })
    }
    const hotel = await Hotel.create({ ...req.body, owner: req.userId })

    return res.json(hotel)
  }

  async hotelUpdate (req, res) {
    if (!req.isHotel) {
      return res
        .status(400)
        .json({ error: 'usuário não permitido para alterar hotel' })
    }
    const hotel = await Hotel.findOneAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(hotel)
  }

  async hotelDelete (req, res) {
    if (!req.isHotel) {
      return res
        .status(400)
        .json({ error: 'usuário não permitido para deletar hotel' })
    }
    await Hotel.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new HotelController()

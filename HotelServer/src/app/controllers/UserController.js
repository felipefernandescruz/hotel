const UserModel = require('../models/User')

class UserController {
  async userCreate (req, res) {
    const { email } = req.body
    if (await UserModel.findOne({ email })) {
      return res
        .status(400)
        .json({ error: 'Usuário já cadastrado com esse email!' })
    }

    const user = await UserModel.create(req.body)

    return res.json(user)
  }

  async userGetAllHotels (req, res) {
    const filters = {}

    if (req.query.name) {
      filters.name = new RegExp(req.query.name)
    }

    filters.isHotel = true
    const hotels = await UserModel.paginate(filters, {
      page: req.query.page || 1,
      limit: 10,
      sort: '-createdAt'
    })
    return res.json(hotels)
  }
}

module.exports = new UserController()

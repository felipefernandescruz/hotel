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
}

module.exports = new UserController()

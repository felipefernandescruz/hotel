const User = require('../models/User')

class AuthController {
  async login (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ error: 'Usuário não cadastrado' })
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: 'Senha incorreta' })
    }

    return res.json({ user, token: User.generateToken(user) })
  }
}

module.exports = new AuthController()

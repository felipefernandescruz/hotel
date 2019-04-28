const express = require('express')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')

routes.post('/users', controllers.UserController.userCreate)
routes.post('/auth', controllers.AuthController.login)

routes.use(authMiddleware)
/**
 * NEED TOKEN
 */

routes.get('/hotel', controllers.HotelController.getAll)
routes.get('/hotel/:id', controllers.HotelController.getByKey)
routes.post('/hotel', controllers.HotelController.hotelCreate)
routes.put('/hotel/:id', controllers.HotelController.hotelUpdate)
routes.delete('/hotel/:id', controllers.HotelController.hotelDelete)

module.exports = routes

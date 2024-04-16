const express  = require("express")
const router =  express.Router()
const userController = require("../controllers/userController")
const { METHOD, PATH, ROLE } = require("../constants/index")

const authRoutes = [
    {
        method: METHOD.POST,
        path: PATH.LOGIN,
        roles: [],
        middleware: [],
        handler: userController.login
    },
    {
        method: METHOD.POST,
        path: PATH.LOGOUT,
        roles: [],
        middleware: [],
        handler: userController.logout
    },
]

authRoutes.forEach((route) =>
{
  const {method, path, roles = [], middleware = [], handler} = route
  router[method](path, handler)
})

module.exports = router
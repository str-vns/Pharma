const express  = require("express")
const router =  express.Router()
const userController = require("../controllers/userController")
const { METHOD, PATH, ROLE } = require("../constants/index")

const userRoutes = [
    {
        method: METHOD.POST,
        path: PATH.REGISTER,
        roles: [],
        middleware: [],
        handler: userController.RegisterUser
    },
    {
        method: METHOD.GET,
        path: PATH.USERS,
        roles: [],
        middleware: [],
        handler: userController.GetAllUsers
    },
    {
        method: METHOD.PATCH,
        path: PATH.USER_EDIT_ID,
        roles: [],
        middleware: [],
        handler: userController.UpdateUser
    },
    {
        method: METHOD.PATCH,
        path: PATH.USER_ID,
        roles: [],
        middleware: [],
        handler: userController.SofttDeleteUser
    },
    {
        method: METHOD.PATCH,
        path: PATH.RESTORE_ID,
        roles: [],
        middleware: [],
        handler: userController.RestoreUser
    },
    {
        method: METHOD.DELETE,
        path: PATH.USER_ID,
        roles: [],
        middleware: [],
        handler: userController.DeleteUser
    },

]

userRoutes.forEach((route) =>
{
  const {method, path, roles = [], middleware = [], handler} = route
  router[method](path, handler)
})

module.exports = router
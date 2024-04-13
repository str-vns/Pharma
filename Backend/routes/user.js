const express  = require("express")
const route =  express.Router()
const userController = require("../controllers/userController")
const { METHOD, PATH, ROLE } = require("../constants/index")

const userRoutes = [
    {
        method: METHOD.POST,
        path: PATH.USERS,
        // handler: userController.
    }
]
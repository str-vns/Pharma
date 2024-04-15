const express  = require("express")
const router =  express.Router()
const categoryController = require("../controllers/categoryController")
const { METHOD, PATH, ROLE } = require("../constants/index")

const categoryRoutes = [
    {
        method: METHOD.POST,
        path: PATH.CATEGORY,
        roles: [],
        middleware: [],
        handler: categoryController.addCategory
    },
    {
        method: METHOD.GET,
        path: PATH.CATEGORY,
        roles: [],
        middleware: [],
        handler: categoryController.GetAllCategory
    },
    {
        method: METHOD.PATCH,
        path: PATH.CATEGORY_EDIT_ID,
        roles: [],
        middleware: [],
        handler: categoryController.UpdateCategory
    },
    {
        method: METHOD.DELETE,
        path: PATH.CATEGORY_ID,
        roles: [],
        middleware: [],
        handler: categoryController.DeleteCategory
    },
    {
        method: METHOD.PATCH,
        path: PATH.CATEGORY_ID,
        roles: [],
        middleware: [],
        handler: categoryController.SofttDeleteCategory
    },
    {
        method: METHOD.PATCH,
        path: PATH.RESTORE_CATEGORY_ID,
        roles: [],
        middleware: [],
        handler: categoryController.RestoreCategory
    },
   

]

categoryRoutes.forEach((route) =>
{
  const {method, path, roles = [], middleware = [], handler} = route
  router[method](path, handler)
})

module.exports = router
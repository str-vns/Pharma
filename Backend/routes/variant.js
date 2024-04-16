const express  = require("express")
const router =  express.Router()
const variantController = require("../controllers/variantController")
const { METHOD, PATH, ROLE } = require("../constants/index")

const variantRoutes = [
    {
        method: METHOD.POST,
        path: PATH.VARIANT,
        roles: [],
        middleware: [],
        handler: variantController.CreateVariant
    },
    {
        method: METHOD.GET,
        path: PATH.VARIANT,
        roles: [],
        middleware: [],
        handler: variantController.GetAllVariant
    },
    {
        method: METHOD.PATCH,
        path: PATH.VARIANT_EDIT_ID,
        roles: [],
        middleware: [],
        handler: variantController.UpdateVariant
    },
    {
        method: METHOD.DELETE,
        path: PATH.VARIANT_ID,
        roles: [],
        middleware: [],
        handler: variantController.DeleteVariant
    },
    {
        method: METHOD.PATCH,
        path: PATH.VARIANT_ID,
        roles: [],
        middleware: [],
        handler: variantController.SofttDeleteVariant
    },
    {
        method: METHOD.PATCH,
        path: PATH.RESTORE_VARIANT_ID,
        roles: [],
        middleware: [],
        handler: variantController.RestoreVariant
    },

]

variantRoutes.forEach((route) =>
{
  const {method, path, roles = [], middleware = [], handler} = route
  router[method](path, handler)
})

module.exports = router
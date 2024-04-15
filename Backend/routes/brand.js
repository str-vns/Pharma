const express  = require("express")
const router =  express.Router()
const brandController = require("../controllers/brandController")
const { METHOD, PATH, ROLE } = require("../constants/index")

const brandRoutes = [
    {
        method: METHOD.POST,
        path: PATH.BRAND,
        roles: [],
        middleware: [],
        handler: brandController.addBrand
    },
    {
        method: METHOD.GET,
        path: PATH.BRAND,
        roles: [],
        middleware: [],
        handler: brandController.GetAllBrand
    },
    {
        method: METHOD.PATCH,
        path: PATH.BRAND_EDIT_ID,
        roles: [],
        middleware: [],
        handler: brandController.UpdateBrand
    },
    {
        method: METHOD.DELETE,
        path: PATH.BRAND_ID,
        roles: [],
        middleware: [],
        handler: brandController.DeleteBrand
    },
    {
        method: METHOD.PATCH,
        path: PATH.BRAND_ID,
        roles: [],
        middleware: [],
        handler: brandController.SofttDeleteBrand
    },
    {
        method: METHOD.PATCH,
        path: PATH.RESTORE_BRAND_ID,
        roles: [],
        middleware: [],
        handler: brandController.RestoreBrand
    },
   

]

brandRoutes.forEach((route) =>
{
  const {method, path, roles = [], middleware = [], handler} = route
  router[method](path, handler)
})

module.exports = router
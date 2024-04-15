const express  = require("express")
const router =  express.Router()
const productController = require("../controllers/productsController")
const { METHOD, PATH, ROLE } = require("../constants/index")

const productRoutes = [
    {
        method: METHOD.POST,
        path: PATH.PRODUCT,
        roles: [],
        middleware: [],
        handler: productController.addProduct
    },
    {
        method: METHOD.GET,
        path: PATH.PRODUCT,
        roles: [],
        middleware: [],
        handler: productController.GetAllProducts
    },
    {
        method: METHOD.PATCH,
        path: PATH.PRODUCT_EDIT_ID,
        roles: [],
        middleware: [],
        handler: productController.UpdateProduct
    },
    {
        method: METHOD.DELETE,
        path: PATH.PRODUCT_ID,
        roles: [],
        middleware: [],
        handler: productController.DeleteProduct
    },
    {
        method: METHOD.PATCH,
        path: PATH.PRODUCT_ID,
        roles: [],
        middleware: [],
        handler: productController.SofttDeleteProduct
    },
    {
        method: METHOD.PATCH,
        path: PATH.RESTORE_PRODUCT_ID,
        roles: [],
        middleware: [],
        handler: productController.RestoreProduct
    },
   
]

productRoutes.forEach((route) =>
{
  const {method, path, roles = [], middleware = [], handler} = route
  router[method](path, handler)
})

module.exports = router
const express  = require("express")
const router =  express.Router()
const inventoryController = require("../controllers/inventoryController")
const { METHOD, PATH, ROLE } = require("../constants/index")

const variantRoutes = [
    {
        method: METHOD.POST,
        path: PATH.INVENTORY_ID,
        roles: [],
        middleware: [],
        handler: inventoryController.CreateInvetory
    },
    {
        method: METHOD.GET,
        path: PATH.INVENTORY_ID,
        roles: [],
        middleware: [],
        handler: inventoryController.GetAllInventory
    },
    {
        method: METHOD.PATCH,
        path: PATH.INVENTORY_EDIT_ID,
        roles: [],
        middleware: [],
        handler: inventoryController.UpdateInventory
    },
    {
        method: METHOD.DELETE,
        path: PATH.INVENTORY_ID,
        roles: [],
        middleware: [],
        handler: inventoryController.DeleteInventory
    },
    {
        method: METHOD.PATCH,
        path: PATH.INVENTORY_ID,
        roles: [],
        middleware: [],
        handler: inventoryController.SofttDeleteInventory
    },
    {
        method: METHOD.PATCH,
        path: PATH.RESTORE_INVENTORY_ID,
        roles: [],
        middleware: [],
        handler: inventoryController.RestoreInventory
    },
   

]

variantRoutes.forEach((route) =>
{
  const {method, path, roles = [], middleware = [], handler} = route
  router[method](path, handler)
})

module.exports = router
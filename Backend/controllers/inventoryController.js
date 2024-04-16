const inventoryProcess = require("../process/inventoryProcess")
const ErrorHandler = require("../utils/errorHandler")
const SuccessHandler = require("../utils/successHandler")
const asyncHandler =  require("express-async-handler")
const MonitorRequiredFields = require("../helpers/MonitorRequiredFields")
const { STATUSCODE } = require("../constants/index")

exports.CreateInvetory = [
   MonitorRequiredFields(["location","stock","manufactured","expiration"]),
    asyncHandler(async (req, res, next) =>
    {
        const inventory = await inventoryProcess.CreateInventory(req,res,req.params.id)

        return SuccessHandler(
            res,
            `New Inventory ${inventory?.batchNum}, Manufactured ${inventory?.manufactured} Had Been Add Successfully`
        )
    })
]

exports.GetAllInventory = asyncHandler(async (req, res, next) => {
        const inventorys = await inventoryProcess.ReadInventory(req.params.id)
        return inventorys?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Inventory Found"))
        : SuccessHandler(
            res, 
            inventorys
        )
})

exports.UpdateInventory = [
    MonitorRequiredFields(["stock","location"]),
    asyncHandler(async (req, res, next) => {

        const inventory =  await inventoryProcess.UpdateVariant(req, res, req.params.id)

         console.log("hello", inventory)
         return SuccessHandler(
            res,
            `Inventory ${inventory?.inventory[0]?.batchNum}, Manufactured ${inventory?.inventory[0]?.manufactured} Had Been Update Successfully`
        )
    })
]

exports.DeleteInventory = asyncHandler(async (req, res, next) => 
{
    const inventory = await inventoryProcess.DeleteInventory(req, res, req.params.id)

    return inventory?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Inventory Found"))
        : SuccessHandler(
            res, 
            inventory
        )
}
)
exports.SofttDeleteInventory = asyncHandler(async (req, res, next) => 
{
    const inventory = await inventoryProcess.SoftDeleteInventory(req, res, req.params.id)

    return inventory?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Inventory Found"))
        : SuccessHandler(
            res, 
            inventory
        )
}
)

exports.RestoreInventory  = asyncHandler(async (req, res, next) => 
{
    const inventory = await inventoryProcess.RestoreInventory(req, res, req.params.id)

    return inventory?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Inventory Found"))
        : SuccessHandler(
            res, 
            inventory
        )
}
)

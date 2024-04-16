const variantProcess = require("../process/variantProcess")
const ErrorHandler = require("../utils/errorHandler")
const SuccessHandler = require("../utils/successHandler")
const asyncHandler =  require("express-async-handler")
const MonitorRequiredFields = require("../helpers/MonitorRequiredFields")
const { STATUSCODE } = require("../constants/index")

exports.CreateVariant = [
   MonitorRequiredFields(["form","strength","dosage","price"]),
    asyncHandler(async (req, res, next) =>
    {
        const variant = await variantProcess.CreateVariant(req,res)

        return SuccessHandler(
            res,
            `New Variant ${variant?.form}, Strength ${variant?.strength} Had Been Add Successfully`
        )
    })
]

exports.GetAllVariant = asyncHandler(async (req, res, next) => {
        const variants = await variantProcess.ReadVariant()
        return variants?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Variants Found"))
        : SuccessHandler(
            res, 
            variants
        )
})

exports.UpdateVariant = [
    MonitorRequiredFields(["form","strength","dosage","price"]),
    asyncHandler(async (req, res, next) => {

        const variant =  await variantProcess.UpdateVariant(req, res, req.params.id)

        return SuccessHandler(
            res,
            `New Variant ${variant?.form}, Strength ${variant?.strength} Had Been Update Successfully`
        )
    })
]

exports.DeleteVariant = asyncHandler(async (req, res, next) => 
{
    const variant = await variantProcess.DeleteVariant(req, res, req.params.id)

    return variant?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Variant Found"))
        : SuccessHandler(
            res, 
            variant
        )
}
)

exports.SofttDeleteVariant = asyncHandler(async (req, res, next) => 
{
    const variant = await variantProcess.SoftDeleteVariant(req, res, req.params.id)

    return variant?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Variant Found"))
        : SuccessHandler(
            res, 
            variant
        )
}
)

exports.RestoreVariant = asyncHandler(async (req, res, next) => 
{
    const variant = await variantProcess.RestoreVariant(req, res, req.params.id)

    return variant?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Variant Found"))
        : SuccessHandler(
            res, 
            variant
        )
}
)
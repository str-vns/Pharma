const brandProcess = require("../process/brandProcess")
const ErrorHandler = require("../utils/errorHandler")
const SuccessHandler = require("../utils/successHandler")
const asyncHandler =  require("express-async-handler")
const MonitorRequiredFields = require("../helpers/MonitorRequiredFields")
const { STATUSCODE } = require("../constants/index")
const upload = require("../utils/multer")

exports.addBrand = [
   upload.single("image"),
   MonitorRequiredFields(["brandName", "variant"]),
    asyncHandler(async (req, res, next) =>
    {
        console.log("Received file:", req.file); 
        const brand = await brandProcess.CreateBrand(req)

        return SuccessHandler(
            res,
            `New Brand ${brand?.brandName} Had Been Add Successfully`
        )
    })
]

exports.GetAllBrand = asyncHandler(async (req, res, next) => {
        const brands = await brandProcess.ReadBrand()

        return brands?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Brand Found"))
        : SuccessHandler(
            res, 
            brands
        )
})

exports.UpdateBrand = [
    upload.single("image"),
    MonitorRequiredFields(["brandName", "variant"]),
    asyncHandler(async (req, res, next) => {

        console.log("Received file:", req.file); 
        const brand =  await brandProcess.UpdateBrand(req, res, req.params.id)

        return SuccessHandler(
            res,
            `User ${brand?.brandName} Has Been Updated Successfully`,
            brand
        )
    })
]

exports.DeleteBrand = asyncHandler(async (req, res, next) => 
{
    const brand = await brandProcess.DeleteBrand(req, res, req.params.id)

    return brand?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Brand Found"))
        : SuccessHandler(
            res, 
            brand
        )
}
)

exports.SofttDeleteBrand = asyncHandler(async (req, res, next) => 
{
    const brand = await brandProcess.SoftDeleteBrand(req, res, req.params.id)

    return brand?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Brand Found"))
        : SuccessHandler(
            res, 
            brand
        )
}
)

exports.RestoreBrand = asyncHandler(async (req, res, next) => 
{
    const brand = await brandProcess.RestoreBrand(req, res, req.params.id)

    return brand?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Brand Found"))
        : SuccessHandler(
            res, 
            brand
        )
}
)

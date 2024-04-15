const productProcess = require("../process/productProcess")
const ErrorHandler = require("../utils/errorHandler")
const SuccessHandler = require("../utils/successHandler")
const asyncHandler =  require("express-async-handler")
const MonitorRequiredFields = require("../helpers/MonitorRequiredFields")
const { STATUSCODE } = require("../constants/index")
const upload = require("../utils/multer")

exports.addProduct = [
   upload.array("image"),
   MonitorRequiredFields(["productName", "brand","category","description" ]),
    asyncHandler(async (req, res, next) =>
    {
        console.log("Received file:", req.files); 
        const product = await productProcess.CreateProduct(req)

        return SuccessHandler(
            res,
            `New Product ${product?.productName} Had Been Add Successfully`
        )
    })
]

exports.GetAllProducts = asyncHandler(async (req, res, next) => {
        const products = await productProcess.ReadProduct()

        return products?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Product Found"))
        : SuccessHandler(
            res, 
            products
        )
})

exports.UpdateProduct = [
    upload.array("image"),
    MonitorRequiredFields(["productName", "brand","category","description" ]),
    asyncHandler(async (req, res, next) => {

        console.log("Received file:", req.files); 
        const product =  await productProcess.UpdateProduct(req, res, req.params.id)

        return SuccessHandler(
            res,
            `Product ${product?.productName} Has Been Updated Successfully`,
            product
        )
    })
]

exports.DeleteProduct = asyncHandler(async (req, res, next) => 
{
    const product = await productProcess.DeleteProduct(req, res, req.params.id)

    return product?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Product Found"))
        : SuccessHandler(
            res, 
            product
        )
}
)

exports.SofttDeleteProduct = asyncHandler(async (req, res, next) => 
{
    const product = await productProcess.SoftDeleteProduct(req, res, req.params.id)

    return product?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Product Found"))
        : SuccessHandler(
            res, 
            product
        )
}
)

exports.RestoreProduct = asyncHandler(async (req, res, next) => 
{
    const product = await productProcess.RestoreProduct(req, res, req.params.id)

    return product?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Product Found"))
        : SuccessHandler(
            res, 
            product
        )
}
)
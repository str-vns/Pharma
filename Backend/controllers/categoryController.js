const categoryProcess = require("../process/categoryProcess")
const ErrorHandler = require("../utils/errorHandler")
const SuccessHandler = require("../utils/successHandler")
const asyncHandler =  require("express-async-handler")
const MonitorRequiredFields = require("../helpers/MonitorRequiredFields")
const { STATUSCODE } = require("../constants/index")

exports.addCategory = [
   MonitorRequiredFields(["categoryName",]),
    asyncHandler(async (req, res, next) =>
    {
        const category = await categoryProcess.CreateCategory(req)

        return SuccessHandler(
            res,
            `New Category ${category?.categoryName} Had Been Add Successfully`
        )
    })
]

exports.GetAllCategory = asyncHandler(async (req, res, next) => {
        const categorys = await categoryProcess.ReadCategory()

        return categorys?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Brand Found"))
        : SuccessHandler(
            res, 
            categorys
        )
})

exports.UpdateCategory = [
    MonitorRequiredFields(["categoryName",]),
    asyncHandler(async (req, res, next) => {

        console.log("Received file:", req.file); 
        const category =  await categoryProcess.UpdateCategory(req, res, req.params.id)

        return SuccessHandler(
            res,
            `Category ${category?.categoryName} Has Been Updated Successfully`,
            category
        )
    })
]

exports.DeleteCategory = asyncHandler(async (req, res, next) => 
{
    const category = await categoryProcess.DeleteCategory(req, res, req.params.id)

    return category?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Category Found"))
        : SuccessHandler(
            res, 
            category
        )
}
)

exports.SofttDeleteCategory = asyncHandler(async (req, res, next) => 
{
    const category = await categoryProcess.SoftDeleteCategory(req, res, req.params.id)

    return category?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Category Found"))
        : SuccessHandler(
            res, 
            category
        )
}
)

exports.RestoreCategory = asyncHandler(async (req, res, next) => 
{
    const category = await categoryProcess.RestoreCategory(req, res, req.params.id)

    return category?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Category Found"))
        : SuccessHandler(
            res, 
            category
        )
}
)

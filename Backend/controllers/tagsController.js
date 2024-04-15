const tagsProcess = require("../process/tagsProcess")
const ErrorHandler = require("../utils/errorHandler")
const SuccessHandler = require("../utils/successHandler")
const asyncHandler =  require("express-async-handler")
const MonitorRequiredFields = require("../helpers/MonitorRequiredFields")
const { STATUSCODE } = require("../constants/index")

exports.addTags = [
   MonitorRequiredFields(["tagsName",]),
    asyncHandler(async (req, res, next) =>
    {
        const tag = await tagsProcess.CreateTags(req)

        return SuccessHandler(
            res,
            `New Tag ${tag?.tagsName} Had Been Add Successfully`
        )
    })
]

exports.GetAllTags = asyncHandler(async (req, res, next) => {
        const tags = await tagsProcess.ReadTags()

        return tags?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Tags Found"))
        : SuccessHandler(
            res, 
            tags
        )
})

exports.UpdateTags = [
    MonitorRequiredFields(["tagsName",]),
    asyncHandler(async (req, res, next) => {
        const tag =  await tagsProcess.UpdateTags(req, res, req.params.id)

        return SuccessHandler(
            res,
            `Tags ${tag?.tagsName} Has Been Updated Successfully`,
            tag
        )
    })
]

exports.DeleteTags = asyncHandler(async (req, res, next) => 
{
    const tag = await tagsProcess.DeleteTags(req, res, req.params.id)

    return tag?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Tags Found"))
        : SuccessHandler(
            res, 
            tag
        )
}
)

exports.SofttDeleteTags = asyncHandler(async (req, res, next) => 
{
    const tag = await tagsProcess.SoftDeleteTags(req, res, req.params.id)

    return tag?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Tags Found"))
        : SuccessHandler(
            res, 
            tag
        )
}
)

exports.RestoreTags = asyncHandler(async (req, res, next) => 
{
    const tag = await tagsProcess.RestoreTags(req, res, req.params.id)

    return tag?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No Tags Found"))
        : SuccessHandler(
            res, 
            tag
        )
}
)

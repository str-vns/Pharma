const userProcess = require("../process/userProcess")
const ErrorHandler = require("../utils/errorHandler")
const SuccessHandler = require("../utils/successHandler")
const asyncHandler =  require("express-async-handler")
const MonitorRequiredFields = require("../helpers/MonitorRequiredFields")
const { STATUSCODE } = require("../constants/index")
const upload = require("../utils/multer")

exports.RegisterUser = [
   upload.array("image"),
   MonitorRequiredFields(["name", "email", "password","age", "phone","image"]),
    asyncHandler(async (req, res, next) =>
    {
        console.log("Received file:", req.files); 
        const user = await userProcess.CreateUserInfo(req)

        return SuccessHandler(
            res,
            `New User ${user?.name} Had Been Resgistered Successfully`
        )
    })
]

exports.GetAllUsers = asyncHandler(async (req, res, next) => {
        const users = await userProcess.GetAllUser()

        return users?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No User Found"))
        : SuccessHandler(
            res, 
            users
        )
})

exports.UpdateUser = [
    upload.array("image"),
    MonitorRequiredFields(["name", "email", "phone"]),
    asyncHandler(async (req, res, next) => {

        console.log("Received file:", req.files); 
        const user =  await userProcess.UpdateUserInfo(req, res, req.params.id)

        return SuccessHandler(
            res,
            `User ${user?.name} Has Been Updated Successfully`,
            user
        )
    })
]

exports.DeleteUser = asyncHandler(async (req, res, next) => 
{
    const user = await userProcess.DeleteUserInfo(req, res, req.params.id)

    return user?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No User Found"))
        : SuccessHandler(
            res, 
            user
        )
}
)

exports.SofttDeleteUser = asyncHandler(async (req, res, next) => 
{
    const user = await userProcess.SoftDeleteUser(req, res, req.params.id)

    return user?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No User Found"))
        : SuccessHandler(
            res, 
            user
        )
}
)

exports.RestoreUser = asyncHandler(async (req, res, next) => 
{
    const user = await userProcess.RestoreUser(req, res, req.params.id)

    return user?.length === STATUSCODE.ZERO
        ? next(new ErrorHandler("No User Found"))
        : SuccessHandler(
            res, 
            user
        )
}
)

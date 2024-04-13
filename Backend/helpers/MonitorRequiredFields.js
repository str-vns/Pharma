const { RESOURCE } = require('../constants/index')
const ErrorHandler = require('../utils/errorHandler')

const MonitorRequiredFields = (fields) => (req, res, next) => 
{
    const missingfields = fields.filter((field) => 
    field === RESOURCE.IMAGE ? !req.body.image && !req.files : !req.body[field]
    )
    if(missingfields.length)
    return next (
    new ErrorHandler(
        JSON.stringify(
            missingfields.map((field) => ({ [field]: ` ${field} is required`}))
        ).replace(/[{}\[\]\\"]/g, "")
        )
    )
    next()
}

module.exports = MonitorRequiredFields
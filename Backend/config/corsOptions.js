const allowedOrigins = require("./allowedOrigins")
const { STATUSCODE } = require("../constants/index")

const corsOptions = {
    origin: function (origin, callback){
        if(allowedOrigins.indexOf(origin) !== STATUSCODE.NEGATIVE_ONE || !origin)
        {
            callback(null, true);
        }else callback(new Error("No Access Allowed In Cors!!!"));
    },
    credentials: true,
    exposedHeaders: ["Access-Control-Allow-Origin"],
}

module.exports = corsOptions;
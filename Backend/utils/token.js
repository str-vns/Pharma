const jwt = require("jsonwebtoken")
const { RESOURCE } = require("../constants/index")

exports.generateToken = (email, roles) =>{

    const accessToken = jwt.sign(
        {
            userInfo: {
                email,
                roles
            }
        },
     process.env.ACCESS_TOKEN_SECRET,
     {
        expiresIn: "3d"
     }
    )
    return accessToken
}

exports.verifyToken = (accessToken) => {
    const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    return decode
}

exports. setAccessTokenCookies = (accessTokenMaxAge) => 
{
    return (res, accessToken) =>
    {
        res.cookie(RESOURCE.JWT, accessToken,
        {
            httpOnly: true, 
            secure: process.env.NODE_ENV === RESOURCE.PRODUCTION,
            sameSite: RESOURCE.NONE,
            maxAge: accessTokenMaxAge,
        })
    }
}